import Point from '../mapEntities/Point';
import City from '../mapEntities/City';
import Unit from '../mapEntities/Unit';
import { gridService, gridServiceInit } from './GridService';
import { Road } from '../mapEntities/Road';
import { cellToIndex, getNeighbours } from './gridUtils';


class Map {
  
  constructor(size, cellNumber, context) {
    //  Draw grid of squares
    this.context = context;
    this.size = size;
    this.cellNumber = cellNumber;
    this.viewPortOrigin = new Point(0, 0);
    this.origin = new Point(0, 0);
    this.selectedCell = null;
    this.selectedEntity = null;

    gridServiceInit(cellNumber);

    this.clippedGrid = [];
    this.viewPortSize = size; //  how large the view port is
    this.zoomLevel = 40;  //  how many cells are in view port
    this.viewPortEnd = new Point(this.viewPortOrigin.x +  this.zoomLevel, this.viewPortOrigin.y +  this.zoomLevel);
     
    this.clippedGrid = gridService.createClippedGrid(this.viewPortOrigin, this.viewPortEnd);
    this.cellSize = this.viewPortSize / this.zoomLevel; //  should be view port size / view port content size
  }

  grid() {
    return gridService.grid;
  }

  clickCell(x, y) {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);

    const cell = this.clippedGrid[cellY] && this.clippedGrid[cellY][cellX];

    if (cell) {  
      if (this.selectedCell) {
        this.selectedCell.selected = false;
      }
      if (cell.unit || cell.road || cell.city) {
        this.selectedEntity = cell.unit || cell.road || cell.city;
      } else {
        this.selectedEntity = null;
      }
      this.selectedCell = cell;
      cell.selected = true;
      this.draw();
    }

    return cell;
  }

  drag(diffX, diffY) {

    const minDrag = 1;
    if (Math.abs(diffX) > minDrag || Math.abs(diffY) > minDrag) {
      if (diffX > 0) {
        const sum = this.viewPortOrigin.x + Math.round(diffX);
        this.viewPortOrigin.x = Math.min(sum, this.cellNumber);
        this.viewPortEnd.x = this.viewPortOrigin.x + this.zoomLevel;
      } else {
        const sum = this.viewPortOrigin.x + Math.round(diffX);
        this.viewPortOrigin.x = Math.max(sum, 0);
        this.viewPortOrigin.x = this.viewPortOrigin.x + this.zoomLevel;
      }

      if (diffY > 0) {
        const sum = this.viewPortOrigin.y + Math.round(diffY);
        this.viewPortOrigin.y = Math.min(sum, this.cellNumber);
        this.viewPortOrigin.y = this.viewPortOrigin.y + this.zoomLevel;
      } else {
        const sum = this.viewPortOrigin.x + Math.round(diffY);
        this.viewPortOrigin.y = Math.max(sum, 0);
        this.viewPortOrigin.y = this.viewPortOrigin.y + this.zoomLevel;
      }
      
      this.update();
    }
  }

  moveUnit(unit, neighbour) {
    const originalCell = unit.cell;
    unit.cell = this.grid()[neighbour.point.y][neighbour.point.x];
    this.grid()[neighbour.point.y][neighbour.point.x].unit = unit;
    originalCell.unit = null;
    this.update();
  }


  leftKey(){
    if (this.selectedEntity && this.selectedEntity instanceof Unit) {
      this.entityLeft();
    } else {
      this.panLeft();
    }
  }

  rightKey(){
    if (this.selectedEntity && this.selectedEntity instanceof Unit) {
      this.entityRight();
    } else {
      this.panRight();
    }
  }

  upKey(){
    if (this.selectedEntity && this.selectedEntity instanceof Unit) {
      this.entityUp();
    } else {
      this.panUp();
    }
  }

  downKey(){
    if (this.selectedEntity && this.selectedEntity instanceof Unit) {
      this.entityDown();
    } else {
      this.panDown();
    }
  }

  entityLeft() {
    const neighbour = this.findCrossNeighbours(this.selectedEntity.cell)[1];
    if (neighbour && neighbour.type !== 'water') {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }
  
  entityRight() {
    const neighbour = this.findCrossNeighbours(this.selectedEntity.cell)[2];
    if (neighbour && neighbour.type !== 'water') {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }
  
  entityUp() {
    const neighbour = this.findCrossNeighbours(this.selectedEntity.cell)[0];
    if (neighbour && neighbour.type !== 'water') {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }

  entityDown() {
    const neighbour = this.findCrossNeighbours(this.selectedEntity.cell)[3];
    if (neighbour && neighbour.type !== 'water') {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }

  panLeft() {
    if (this.viewPortOrigin.x > 0) {
      this.viewPortOrigin.x--;
      this.viewPortEnd.x--;
      this.update();
    }
  }

  panRight() {
    if (this.viewPortOrigin.x + this.zoomLevel < this.cellNumber) {
      this.viewPortOrigin.x++;
      this.viewPortEnd.x++;
      this.update();
    }
  }

  panUp() {
    if (this.viewPortOrigin.y > 0) {
      this.viewPortOrigin.y--;
      this.viewPortEnd.y--;
      this.update();  
    }
  }

  panDown() {
    if (this.viewPortOrigin.y + this.zoomLevel < this.cellNumber) {
      this.viewPortOrigin.y++;
      this.viewPortEnd.y++;
      this.update();
    }
  }

  zoomOut() {
    if (this.zoomLevel < 100) {
      this.zoomLevel++;
      this.zoom();
    }
  }

  zoomIn() {
    if (this.zoomLevel > 1) {
      this.zoomLevel--;
      this.zoom();
    }
  }

  zoom() {
    this.viewPortEnd = new Point(this.viewPortOrigin.x +  this.zoomLevel, this.viewPortOrigin.y +  this.zoomLevel);
    this.cellSize = this.viewPortSize / this.zoomLevel;
    this.update();
  }

  update() {
    this.clippedGrid = gridService.createClippedGrid(this.viewPortOrigin, this.viewPortEnd);
    this.draw();
  }

  draw() {
    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, 0, this.size, this.size);
    this.context.fillStyle = '#000000';

    for(let h=0;h<this.clippedGrid.length;h++) {
      for(let w=0;w<this.clippedGrid[h].length;w++) {
        const cell = this.clippedGrid[h][w];
        if (cell && (cell.drawingPoint.x) <= this.viewPortEnd.x && (cell.drawingPoint.x) >= 0 && (cell.drawingPoint.y) >= 0 && cell.drawingPoint.y <= this.viewPortEnd.y) {
          if (cell.type === 'grass') {
            this.context.fillStyle = '#00FF00';
          }
          if (cell.type === 'water') {
            this.context.fillStyle = '#0000FF';
          }
          if (cell.type === 'blank') {
            this.context.fillStyle = '#FFFFFF';
          }
          this.context.fillRect(cell.drawingPoint.x * this.cellSize, cell.drawingPoint.y * this.cellSize, this.cellSize, this.cellSize);

          if (cell.selected) {
            this.context.strokeStyle = '#000000';
            this.context.strokeRect(cell.drawingPoint.x * this.cellSize, cell.drawingPoint.y * this.cellSize, this.cellSize, this.cellSize);
            this.context.strokeStyle = '#FFFFFF';
          }

          if (cell.city) {
            cell.city.draw(this.context, this.cellSize);
          }

          if (cell.road) {
            cell.road.draw(this.context, this.cellSize);
          }

          if (cell.unit) {
            cell.unit.draw(this.context, this.cellSize);
          }
        }
      }
    }
  }

  addUnitToSelectedTile() {
    if (!this.selectedCell) return;

    if (this.selectedCell.city || this.selectedCell.road || this.selectedCell.unit) return;

    if (this.selectedCell.type === 'water') return;
    this.selectedCell.unit = new Unit(this.selectedCell, 'New Unit');

    this.draw();
  }

  findSelectedCellCrossNeighbours() {
    return this.findCrossNeighbours(this.selectedCell);
  }

  findCrossNeighbours(cell) {
    return getNeighbours(this.grid(), cellToIndex(cell), true, true);
  }

  addRoadToSelectedTile() {
    if (!this.selectedCell) return;

    if (this.selectedCell.city || this.selectedCell.road) return;

    if (this.selectedCell.type === 'water') return;

    const neighbours = this.findSelectedCellCrossNeighbours();

    this.selectedCell.road = new Road(this.selectedCell, neighbours);

    this.draw();
  }

  addCityToSelectedTile() {
    if (!this.selectedCell) return;

    if (this.selectedCell.city || this.selectedCell.road) return;

    if (this.selectedCell.type === 'water') return;
    const neighbours = this.findSelectedCellCrossNeighbours();
    this.selectedCell.city = new City(this.selectedCell, 'New City', 1, neighbours);

    //   TODO - move this into road.
    neighbours.filter(x => x && x.road).forEach(neighbour => {
      const n = this.findCrossNeighbours(cellToIndex(neighbour));
      neighbour.road.shape = Road.findShape(n);
    });

    this.selectedCell.city.draw(this.context, this.cellSize);
    this.draw();
  }

  removeSelectedEntity() {
    if (!this.selectedEntity) {
      return;
    }

    const cell = this.selectedEntity.cell;
    const gridCell = this.grid()[cell.point.y][cell.point.x];

    if (this.selectedEntity instanceof Unit) {
      gridCell.unit = null;
    }

    const neighbours = this.selectedEntity.neighbours;
    if (this.selectedEntity instanceof Road) {
      //  For each neighbour do a connectivity check and update connectedness
      //  Update networks roads.
      Road.remove(gridCell, this.selectedEntity);
      //  Find network that the road is connected to and it's neighbours and remove
      
    }
    
    if (this.selectedEntity instanceof City) {
      City.remove(gridCell);
    }

    this.selectedEntity = null;
    this.update();
  }
}

export default Map;
