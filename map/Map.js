import Point from '../mapEntities/Point';
import Cell from '../mapEntities/Cell';
import City from '../mapEntities/City';
import Unit from '../mapEntities/Unit';

import { Road, findShape } from '../mapEntities/Road';
import mapGenerator from './MapGenerator';
import { cellToIndex, getNeighbours } from './gridUtils';


const waterType = {
  borders: {
    grass: 0.1,
    water: 0.9,
  }
}
const grassType = {
  borders: {
    grass: 0.9,
    water: 0.1,
  }
}

class Map {
  
  constructor(size, cellNumber, context) {
    //  Draw grid of squares
    this.context = context;
    this.size = size;
    this.cellNumber = cellNumber;
    this.viewPortOrigin = new Point(0, 0);
    this.origin = new Point(0, 0);
    this.selectedCell = null;
    this.selectedUnit = null;
    this.grid = [];
    this.clippedGrid = [];
    this.viewPortSize = size; //  how large the view port is
    this.zoomLevel = 40;  //  how many cells are in view port
    this.viewPortEnd = new Point(this.viewPortOrigin.x +  this.zoomLevel, this.viewPortOrigin.y +  this.zoomLevel);
     
    this.cellSize = this.viewPortSize / this.zoomLevel; //  should be view port size / view port content size
    this.init();
  }

  init() {
    this.grid = mapGenerator.generate(this.cellNumber);
    this.clippedGrid = this.createClippedGrid();
  }

  createClippedGrid() {
    const newgrid = [];
    const startPoint = new Point(this.viewPortOrigin.x, this.viewPortOrigin.y);
    const endPoint = new Point(this.viewPortEnd.x, this.viewPortEnd.y);
    
    for (let y = startPoint.y;y <= endPoint.y;y++) {
      const newrow = [];
      const row = this.grid[y];
      if (row) {
        for (let x = startPoint.x; x <= endPoint.x; x++) {
        const cell = row[x];

          if (cell && cell.point) {
            cell.drawingPoint = new Point(cell.point.x, cell.point.y);
            cell.drawingPoint.x = x - startPoint.x;
            cell.drawingPoint.y = y - startPoint.y;
            newrow.push(cell);
          }
        }
      }  
      newgrid.push(newrow);
    }
    return newgrid;
  }

  clickCell(x, y) {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);

    const cell = this.clippedGrid[cellY] && this.clippedGrid[cellY][cellX];

    if (cell) {  
      if (this.selectedCell) {
        this.selectedCell.selected = false;
      }
      if (cell.unit) {
        this.selectedUnit = cell.unit;
      } else {
        this.selectedUnit = null;
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
    unit.cell = this.grid[neighbour.point.y][neighbour.point.x];
    this.grid[neighbour.point.y][neighbour.point.x].unit = unit;
    originalCell.unit = null;
    this.update(); 
  }

  panUp() {
    if (this.selectedUnit) {
      const neighbour = getNeighbours(this.grid, cellToIndex(this.selectedUnit.cell), true, true)[0];
      if (neighbour && neighbour.type !== 'water') {
        this.moveUnit(this.selectedUnit, neighbour);
      }
    } else {
      if (this.viewPortOrigin.y > 0) {
        this.viewPortOrigin.y--;
        this.viewPortEnd.y--;
        this.update();  
      }
    }
  }

  panDown() {
    if (this.selectedUnit) {
      const neighbour = getNeighbours(this.grid, cellToIndex(this.selectedUnit.cell), true, true)[3];
      if (neighbour && neighbour.type !== 'water') {
        this.moveUnit(this.selectedUnit, neighbour);
      }
    } else {
      if (this.viewPortOrigin.y + this.zoomLevel < this.cellNumber) {
        this.viewPortOrigin.y++;
        this.viewPortEnd.y++;
        this.update();
      }
    }
  }

  panLeft() {
    if (this.selectedUnit) {
      const neighbour = getNeighbours(this.grid, cellToIndex(this.selectedUnit.cell), true, true)[1];
      if (neighbour && neighbour.type !== 'water') {
        this.moveUnit(this.selectedUnit, neighbour);
      }
    } else {
      if (this.viewPortOrigin.x > 0) {
        this.viewPortOrigin.x--;
        this.viewPortEnd.x--;
        this.update();
      }
    }
  }

  panRight() {
    if (this.selectedUnit) {
      const neighbour = getNeighbours(this.grid, cellToIndex(this.selectedUnit.cell), true, true)[2];
      if (neighbour && neighbour.type !== 'water') {
        this.moveUnit(this.selectedUnit, neighbour); 
      }
    } else {
      if (this.viewPortOrigin.x + this.zoomLevel < this.cellNumber) {
        this.viewPortOrigin.x++;
        this.viewPortEnd.x++;
        this.update();
      }
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
    this.clippedGrid = this.createClippedGrid();
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

  addRoadToSelectedTile() {
    if (!this.selectedCell) return;

    if (this.selectedCell.city || this.selectedCell.road) return;

    if (this.selectedCell.type === 'water') return;

    const neighbours = getNeighbours(this.grid, cellToIndex(this.selectedCell), true, true);

    this.selectedCell.road = new Road(this.selectedCell, neighbours);
    
    neighbours.filter(x => x && x.road).forEach(neighbour => {
      const n = getNeighbours(this.grid, cellToIndex(neighbour), true, true);
      neighbour.road.shape = findShape(n);
    })

    this.draw();
  }

  addCityToSelectedTile() {
    if (!this.selectedCell) return;

    if (this.selectedCell.city || this.selectedCell.road) return;

    if (this.selectedCell.type === 'water') return;
    const neighbours = getNeighbours(this.grid, cellToIndex(this.selectedCell), true, true);
    this.selectedCell.city = new City(this.selectedCell, 'New City', 1, neighbours);

    neighbours.filter(x => x && x.road).forEach(neighbour => {
      const n = getNeighbours(this.grid, cellToIndex(neighbour), true, true);
      neighbour.road.shape = findShape(n);
    })

    this.selectedCell.city.draw(this.context, this.cellSize);
    this.draw();
  }

  removeEntityAtSelectedCell() {

  }
}

export default Map;
