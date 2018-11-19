import Point from '../MapEntities/Point';
import City from '../MapEntities/City';
import Unit from '../MapEntities/Unit';
import { gridService, gridServiceInit } from '../Grid/GridService';
import Road from '../MapEntities/Road';
import TileType from './Tiles/TileType';
import Tile from './Tiles/Tile';
import Gatherer from '../Pops/Gatherer';
import Pop from '../Pops/Pop';

class Map {
  context: any;
  size: number;
  tileNumber: number;
  viewPortOrigin: Point;
  selectedTile: Tile;
  selectedEntity: any;
  zoomLevel: number;
  origin: Point;
  viewPortEnd: Point;
  tileSize: number;
  clippedGrid: any[];
  viewPortSize: number;
  entities: any;
  
  constructor(size: number, tileNumber: number, context: any) {
    //  Draw grid of squares
    this.context = context;
    this.size = size;
    this.tileNumber = tileNumber;
    this.viewPortOrigin = new Point(0, 0);
    this.origin = new Point(0, 0);
    this.selectedTile = null;
    this.selectedEntity = null;
    this.entities = {
      pops: []
    };

    gridServiceInit(this.tileNumber);
    gridService.createMap();

    this.clippedGrid = [];
    this.viewPortSize = size; //  how large the view port is
    this.zoomLevel = 40;  //  how many Tiles are in view port
    this.viewPortEnd = new Point(this.viewPortOrigin.x +  this.zoomLevel, this.viewPortOrigin.y +  this.zoomLevel);
     
    this.clippedGrid = gridService.createClippedGrid(this.viewPortOrigin, this.viewPortEnd);
    this.tileSize = this.viewPortSize / this.zoomLevel; //  should be view port size / view port content size
  }

  grid() {
    return gridService.grid;
  }

  clickTile(point: Point) {
    const tileX = Math.floor(point.x / this.tileSize);
    const tileY = Math.floor(point.y / this.tileSize);

    const tile = this.clippedGrid[tileY] && this.clippedGrid[tileY][tileX];

    if (tile) {  
      if (this.selectedTile) {
        this.selectedTile.selected = false;
      }
      if (tile.unit || tile.road || tile.city) {
        this.selectedEntity = tile.unit || tile.road || tile.city;
      } else {
        this.selectedEntity = null;
      }
      this.selectedTile = tile;
      tile.selected = true;
      this.draw();
    }

    return tile;
  }

  drag(diffX: number, diffY: number) {

    const minDrag = 1;
    if (Math.abs(diffX) > minDrag || Math.abs(diffY) > minDrag) {
      if (diffX > 0) {
        const sum = this.viewPortOrigin.x + Math.round(diffX);
        this.viewPortOrigin.x = Math.min(sum, this.tileNumber);
        this.viewPortEnd.x = this.viewPortOrigin.x + this.zoomLevel;
      } else {
        const sum = this.viewPortOrigin.x + Math.round(diffX);
        this.viewPortOrigin.x = Math.max(sum, 0);
        this.viewPortOrigin.x = this.viewPortOrigin.x + this.zoomLevel;
      }

      if (diffY > 0) {
        const sum = this.viewPortOrigin.y + Math.round(diffY);
        this.viewPortOrigin.y = Math.min(sum, this.tileNumber);
        this.viewPortOrigin.y = this.viewPortOrigin.y + this.zoomLevel;
      } else {
        const sum = this.viewPortOrigin.x + Math.round(diffY);
        this.viewPortOrigin.y = Math.max(sum, 0);
        this.viewPortOrigin.y = this.viewPortOrigin.y + this.zoomLevel;
      }
      
      this.updateView();
    }
  }

  //  move to unit
  moveUnit(unit: Unit, neighbour: Tile) {
    const originalTile = unit.tile;
    unit.tile = gridService.grid[neighbour.point.y][neighbour.point.x];
    gridService.grid[neighbour.point.y][neighbour.point.x].unit = unit;
    originalTile.unit = null;
    this.draw();
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
    const neighbour = gridService.findCrossNeighbours(this.selectedEntity.tile)[1];
    if (neighbour && neighbour.type !== TileType.Ocean) {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }
  
  entityRight() {
    const neighbour = gridService.findCrossNeighbours(this.selectedEntity.tile)[2];
    if (neighbour && neighbour.type !== TileType.Ocean) {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }
  
  entityUp() {
    const neighbour = gridService.findCrossNeighbours(this.selectedEntity.tile)[0];
    if (neighbour && neighbour.type !== TileType.Ocean) {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }

  entityDown() {
    const neighbour = gridService.findCrossNeighbours(this.selectedEntity.Tile)[3];
    if (neighbour && neighbour.type !== TileType.Ocean) {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }

  panLeft() {
    if (this.viewPortOrigin.x > 0) {
      this.viewPortOrigin.x--;
      this.viewPortEnd.x--;
      this.updateView();
    }
  }

  panRight() {
    if (this.viewPortOrigin.x + this.zoomLevel < this.tileNumber) {
      this.viewPortOrigin.x++;
      this.viewPortEnd.x++;
      this.updateView();
    }
  }

  panUp() {
    if (this.viewPortOrigin.y > 0) {
      this.viewPortOrigin.y--;
      this.viewPortEnd.y--;
      this.updateView();  
    }
  }

  panDown() {
    if (this.viewPortOrigin.y + this.zoomLevel < this.tileNumber) {
      this.viewPortOrigin.y++;
      this.viewPortEnd.y++;
      this.updateView();
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
    this.tileSize = this.viewPortSize / this.zoomLevel;
    this.updateView();
  }

  updateView(updateGrid = true) {
    if (updateGrid)this.clippedGrid = gridService.createClippedGrid(this.viewPortOrigin, this.viewPortEnd);
    this.draw();
  }

  endTurn() {
    this.update();
  }

  update() {
    this.entities.pops.forEach((pop: Pop) => {
      pop.update();
    });
  }

  draw() {
    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, 0, this.size, this.size);
    this.context.fillStyle = '#000000';

    for(let h=0;h<this.clippedGrid.length;h++) {
      for(let w=0;w<this.clippedGrid[h].length;w++) {
        const tile = this.clippedGrid[h][w];
        if (tile && (tile.drawingPoint.x) <= this.viewPortEnd.x && (tile.drawingPoint.x) >= 0 && (tile.drawingPoint.y) >= 0 && tile.drawingPoint.y <= this.viewPortEnd.y) {
          if (tile.type === TileType.Grass) {
            this.context.fillStyle = '#00FF00';
          }
          if (tile.type === TileType.Ocean) {
            this.context.fillStyle = '#0000FF';
          }
          if (tile.type === TileType.None) {
            this.context.fillStyle = '#FFFFFF';
          }
          this.context.fillRect(tile.drawingPoint.x * this.tileSize, tile.drawingPoint.y * this.tileSize, this.tileSize, this.tileSize);

          if (tile.selected) {
            this.context.strokeStyle = '#000000';
            this.context.strokeRect(tile.drawingPoint.x * this.tileSize, tile.drawingPoint.y * this.tileSize, this.tileSize, this.tileSize);
            this.context.strokeStyle = '#FFFFFF';
          }

          if (tile.city) {
            tile.city.draw(this.context, this.tileSize);
          }

          if (tile.road) {
            tile.road.draw(this.context, this.tileSize);
          }

          if (tile.unit) {
            tile.unit.draw(this.context, this.tileSize);
          }

          if (tile.pop) {
            tile.pop.draw(this.context, this.tileSize);
          }
        }
      }
    }
  }

  addUnitToSelectedTile() {
    if (Unit.add(this.selectedTile)) {
      this.draw();
    }
  }

  addRoadToSelectedTile() {
    if (Road.add(this.selectedTile)) {
      this.draw();
    }
  }

  addCityToSelectedTile() {
    if (City.add(this.selectedTile)) {
      this.draw();
    }
  }

  addGatherer() {
    if (Gatherer.add(this.selectedTile, this.entities)) {
      this.draw();
    }
  }

  removeSelectedEntity() {
    if (!this.selectedEntity) {
      return;
    }

    const tile = this.selectedEntity.tile;
    const gridTile = gridService.grid[tile.point.y][tile.point.x];

    if (this.selectedEntity instanceof Unit) {
      gridTile.unit = null;
    }

    const neighbours = this.selectedEntity.neighbours;
    if (this.selectedEntity instanceof Road) {
      //  For each neighbour do a connectivity check and update connectedness
      //  Update networks roads.
      Road.remove(gridTile, this.selectedEntity);
      //  Find network that the road is connected to and it's neighbours and remove
      
    }
    
    if (this.selectedEntity instanceof City) {
      City.remove(gridTile);
    }

    this.selectedEntity = null;
    this.draw();
  }
}

export default Map;
