import Point from '../mapEntities/Point';
import mapGenerator from './MapGenerator';

class GridService {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.grid = [];
  }

  createMap() {
    this.grid = mapGenerator.generate(this.gridSize);
  }

  createClippedGrid(viewPortOrigin, viewPortEnd) {
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
  
  tileToIndex (tile) {
    return new Point(tile.point.x, tile.point.y);
  }

  getNeighbours(index, preserveOrder = false, noDiagonals = false, inputGrid = null) {
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

    const neighbours = [];
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

  findSelectedTileCrossNeighbours(tile) {
    return this.findCrossNeighbours(tile);
  }

  findCrossNeighbours(tile) {
    return this.getNeighbours(this.tileToIndex(tile), true, true);
  }
}

let gridService = null;
function gridServiceInit(gridSize) {
  gridService = new GridService(gridSize);
}

export { gridService, gridServiceInit };
