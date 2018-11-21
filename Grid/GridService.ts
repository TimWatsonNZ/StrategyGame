import Point from '../MapEntities/Point';
import mapGenerator from './MapGenerator';
import Tile from '../Map/Tiles/Tile';

class GridService {
  gridSize: number;
  grid: any[];
  constructor(gridSize: number) {
    this.gridSize = gridSize;
    this.grid = [];
  }

  createMap() {
    this.grid = mapGenerator.generate(this.gridSize);
  }

  //  todo - change these to points
  createClippedGrid(viewPortOrigin: any, viewPortEnd: any) {
    const newgrid = [];
    const startPoint = new Point(viewPortOrigin.x, viewPortOrigin.y);
    const endPoint = new Point(viewPortEnd.x, viewPortEnd.y);
    
    for (let y = startPoint.y;y <= endPoint.y;y++) {
      const newrow = [];
      const row = this.grid[y];
      if (row) {
        for (let x = startPoint.x; x <= endPoint.x; x++) {
        const tile = row[x];

          if (tile && tile.point) {
            tile.drawingPoint = new Point(tile.point.x, tile.point.y);
            tile.drawingPoint.x = x - startPoint.x;
            tile.drawingPoint.y = y - startPoint.y;
            newrow.push(tile);
          }
        }
      }  
      newgrid.push(newrow);
    }
    return newgrid;
  }
  
  tileToIndex (tile: Tile) {
    return new Point(tile.point.x, tile.point.y);
  }

  getRegion(index: any, radius: number) {
    const deltas = [];

    for (let x=0;x<radius*2+1;x++) {
      for (let y=0;y < radius*2+1; y++) {
        deltas.push({ x: x - 1, y: y -1 });
      }
    }

    const neighbours: any[] = [];
    deltas.forEach(delta => {
      const indexX = index.x + delta.x;
      const indexY = index.y + delta.y;

      if (indexX < 0 || indexX > this.grid.length-1 ||
          indexY < 0 || indexY > this.grid.length-1) {
      } else {
        neighbours.push(this.grid[indexY][indexX]);
      }
    });

    return neighbours;
  }

  getNeighbours(inCominingTile: Tile, preserveOrder = false, noDiagonals = false, inputGrid: any = null) {
    const index = this.tileToIndex(inCominingTile);
    let grid = inputGrid ? inputGrid : this.grid;
    const tile = grid[index.y][index.x];
    const allDeltas = [
      { x:-1, y: -1 }, {x: 0, y: -1},  { x: 1, y: -1},
      { x:-1, y:  0 },              ,  { x: 1, y:  0},
      { x:-1, y:  1 }, {x: 0, y:  1 }, { x: 1, y:  1},
    ];

    const noDiagonalsDeltas = [
                     , { x: 0, y: -1 },  
      { x:-1, y:  0 },              ,  { x: 1, y:  0},
                       { x: 0, y:  1 },
    ];

    const neighbours: any[] = [];
    if (!tile) {
      return neighbours;
    }

    const deltas = noDiagonals ? noDiagonalsDeltas : allDeltas;
    deltas.forEach(delta => {
      const indexX = index.x + delta.x;
      const indexY = index.y + delta.y;

      if (indexX < 0 || indexX > grid.length-1 ||
          indexY < 0 || indexY > grid.length-1) {
          if (preserveOrder) neighbours.push(null);
      } else {
        neighbours.push(grid[indexY][indexX]);
      }
    });

    return neighbours;
  }

  findSelectedTileCrossNeighbours(tile: Tile) {
    return this.findCrossNeighbours(tile);
  }

  findCrossNeighbours(tile: Tile) {
    return this.getNeighbours(tile, false, true);
  }
}

let gridService: GridService = null;
function gridServiceInit(gridSize: number) {
  gridService = new GridService(gridSize);
}

export { gridService, gridServiceInit };
