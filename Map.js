import Point from './Point';
import Cell from './Cell';

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
  
  constructor(size) {
    //  Draw grid of squares
    this.size = size;
    this.cellSize = 10;
    this.squareNumber = size / this.cellSize;
    this.viewPortOrigin = new Point(0, 0);
    this.origin = new Point(0, 0);
    this.selectedCell = null;
    this.grid = [];
    this.clippedGrid = [];
    this.viewPortRight = this.viewPortOrigin.x + size;
    this.viewPortBottom = this.viewPortOrigin.y + size;
    this.init();
  }

  init() {
    for(let h=0;h<this.squareNumber;h++) {
      const row = [];
      for(let w=0;w<this.squareNumber;w++) {
        row.push(new Cell(w, h, 'blank'));
      }
      this.grid.push(row);
    }
    
    const seedTileCount = 80;
    for (let i=0;i < seedTileCount;i++) {
      const randomCell = this.grid[Math.floor(Math.random() * this.grid.length)][Math.floor(Math.random() * this.grid.length)];
      randomCell.type = 'grass';
    }
    
    this.grid[Math.round(this.grid.length/2)][Math.round(this.grid.length/2)].type = 'grass';
      
    this.grid = this.dfa(this.grid, this.growGrass);
    this.grid = this.dfa(this.grid, this.growGrass);
    this.dfs(this.grid[Math.round(this.grid.length/2)][Math.round(this.grid.length/2)]);

    this.grid = this.dfa(this.grid, this.smoothRule);
    this.grid = this.dfa(this.grid, this.smoothRule);

    this.clippedGrid = this.createClippedGrid();
  }

  clickCell(x, y, context) {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);

    const cell = this.clippedGrid[cellY][cellX];

    if (cell) {  
      if (this.selectedCell) {
        this.selectedCell.selected = false;
      }
      this.selectedCell = cell;
      cell.selected = true;
      this.draw(context);
    }

    return cell;
  }

  drag(diffX, diffY, context) {

    const minDrag = 1;
    if (Math.abs(diffX) > minDrag || Math.abs(diffY) > minDrag) {
      this.viewPortOrigin.x += Math.round(diffX);
      this.viewPortOrigin.y += Math.round(diffY);
  
      this.update(context);
    }
  }

  getNeigbours(index, grid) {
    const cell = grid[index.y][index.x];
    const deltas = [
      { x:-1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
      { x:-1, y: 0},               , {x: 1, y: 0},
      { x:-1, y: 1},  {x: 0, y: 1},  {x: 1, y: 1},
    ];

    const neighbours = [];
    if (!cell) {
      return neighbours;
    }

    deltas.forEach(delta => {
      const indexX = index.x + delta.x;
      const indexY = index.y + delta.y;

      if (indexX < 0 || indexX > grid.length-1 ||
          indexY < 0 || indexY > grid.length-1) {
          return;
      } else {
        neighbours.push(grid[indexY][indexX]);
      }
    });

    return neighbours;
  }

  cellToIndex (cell) {
    return new Point(cell.point.x, cell.point.y);
  }

  dfs(start) {
    const stack = [start];

    while (stack.length > 0) {
      const cell = stack.pop();
      const neighbours = this.getNeigbours(this.cellToIndex(cell), this.grid);
      const waterNeighbours = neighbours.filter(x => x.type === 'water').length;
      const grassNeighbours = neighbours.filter(x => x.type === 'grass').length;
      
      if (Math.round(Math.random() * (waterNeighbours + grassNeighbours)) > waterNeighbours) {
        cell.type = 'grass';
      } else {
        cell.type = 'water';
      }
      neighbours.filter(x => x.type === 'blank').forEach(x => stack.push(x));
    }
  }

  dfa (grid, rule) {
    const newGrid = [];

    for(let h=0;h<this.squareNumber;h++) {
      const newRow = [];
      for(let w=0;w<this.squareNumber;w++) {
        const cell = grid[h][w];
        const neighbours = this.getNeigbours(this.cellToIndex(cell), grid);

        const waterNeighbours = neighbours.filter(x => x.type === 'water').length;
        const grassNeighbours = neighbours.filter(x => x.type === 'grass').length;

        const copy = { ...cell };
        copy.type = rule(copy, waterNeighbours, grassNeighbours);
        
        newRow.push(copy);
      }
      newGrid.push(newRow);
    }
    return newGrid;
  }

  smoothRule (cell, waterNeighbours, grassNeighbours) {
    if (cell.type === 'water' && grassNeighbours > 3) {
      return 'grass';
    }
    if (cell.type === 'grass' && waterNeighbours > 7) {
      return 'water';
    }
    return cell.type;
  }

  growGrass (cell, waterNeighbours, grassNeighbours) {
    if (cell.type === 'water' && grassNeighbours > 0) {
      return 'grass';
    }
    return cell.type;
  }

  createClippedGrid() {
    const newgrid = [];
    const startPoint = new Point(this.viewPortOrigin.x, this.viewPortOrigin.y);
    const endPoint = new Point(startPoint.x + this.size/this.cellSize, startPoint.y + this.size/this.cellSize);
    
    for (let y = startPoint.y;y <= endPoint.y;y++) {
      const newrow = [];
      const row = this.grid[y];
      if (row) {
        for (let x = startPoint.x; x <= endPoint.x; x++) {
        const cell = row[x];

          if (cell && cell.point) {
            const cellCopy = {...cell};
            cellCopy.point = new Point(cell.point.x, cell.point.y);
            cellCopy.point.x -= this.viewPortOrigin.x/this.cellSize;
            cellCopy.point.y -= this.viewPortOrigin.y/this.cellSize;
            newrow.push(cellCopy);
          }
        }
      }  
      newgrid.push(newrow);
    }
    return newgrid;
  }

  panUp(context) {
    this.viewPortOrigin.y--;
    this.update(context);
  }

  panDown(context) {
    this.viewPortOrigin.y++;
    this.update(context);
  }

  panLeft(context) {
    this.viewPortOrigin.x--;
    this.update(context);
  }

  panRight(context) {
    this.viewPortOrigin.x++;
    this.update(context);
  }

  update(context) {
    this.clippedGrid = this.createClippedGrid();
    this.draw(context);
  }

  draw(context) {
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, this.size, this.size);
    context.fillStyle = '#000000';
    for(let h=0;h<this.clippedGrid.length;h++) {
      for(let w=0;w<this.clippedGrid[h].length;w++) {
        const cell = this.clippedGrid[h][w];
        if (true || cell && (cell.point.x) <= this.viewPortRight && (cell.point.x) > 0 && (cell.point.y) >= 0 && cell.point.y < this.viewPortBottom) {
          if (cell.type === 'grass') {
            context.fillStyle = '#00FF00';
          }
          if (cell.type === 'water') {
            context.fillStyle = '#0000FF';
          }
          if (cell.type === 'blank') {
            context.fillStyle = '#FFFFFF';
          }
          context.fillRect(cell.point.x * this.cellSize, cell.point.y * this.cellSize, this.cellSize, this.cellSize);

          if (cell.selected) {
            context.strokeStyle = '#000000';
            context.strokeRect(cell.point.x * this.cellSize, cell.point.y * this.cellSize, this.cellSize, this.cellSize);
            context.strokeStyle = '#FFFFFF';
          }
        }
      }
    }//  
  }
}

export default Map;
