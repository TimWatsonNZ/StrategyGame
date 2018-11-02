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
  
  cellToIndex (cell) {
    return new Point(cell.point.x, cell.point.y);
  }

  getNeighbours(index, preserveOrder = false, noDiagonals = false, inputGrid = null) {
    let grid = inputGrid ? inputGrid : this.grid;
    const cell = grid[index.y][index.x];
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
    if (!cell) {
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

  findSelectedCellCrossNeighbours(cell) {
    return this.findCrossNeighbours(cell);
  }

  findCrossNeighbours(cell) {
    return this.getNeighbours(this.cellToIndex(cell), true, true);
  }
}

let gridService = null;
function gridServiceInit(gridSize) {
  gridService = new GridService(gridSize);
}

export { gridService, gridServiceInit };
