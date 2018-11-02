import { gridService } from './GridService';

import Cell from '../mapEntities/Cell';
class MapGenerator {

  generate(gridSize) {
    let grid = []
    for(let h=0;h<gridSize;h++) {
      const row = [];
      for(let w=0;w<gridSize;w++) {
        row.push(new Cell(w, h, 'blank'));
      }
      grid.push(row);
    }
    
    const seedTileCount = 80;
    for (let i=0;i < seedTileCount;i++) {
      const randomCell = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid.length)];
      randomCell.type = 'grass';
    }
    
    grid[Math.round(grid.length/2)][Math.round(grid.length/2)].type = 'grass';
      
    grid = this.dfa(gridSize, grid, this.growGrass);
    grid = this.dfa(gridSize, grid, this.growGrass);
    this.floodFill(grid, grid[Math.round(grid.length/2)][Math.round(grid.length/2)]);

    grid = this.dfa(gridSize, grid, this.smoothRule);
    grid = this.dfa(gridSize, grid, this.smoothRule);

    this.fillInHoles(grid);

    return grid;
  }

  floodFill(grid, start) {
    const stack = [start];

    while (stack.length > 0) {
      const cell = stack.pop();
      const neighbours = gridService.getNeighbours(gridService.cellToIndex(cell), false, false, grid);
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

  dfa (gridSize, grid, rule) {
    const newGrid = [];

    for(let h=0;h < gridSize;h++) {
      const newRow = [];
      for(let w=0;w < gridSize;w++) {
        const cell = grid[h][w];
        const neighbours = gridService.getNeighbours(gridService.cellToIndex(cell), false, false, grid);

        const waterNeighbours = neighbours.filter(x => x.type === 'water').length;
        const grassNeighbours = neighbours.filter(x => x.type === 'grass').length;

        const copy = Cell.copy(cell);
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

  fillInHoles(grid) {
    for(let y = 0; y < grid.length; y++) {
      for (let h = 0; h < grid[y].length; h++) {
        if (grid[y][h].type === 'blank') {
          grid[y][h].type = 'water';
        }
      }
    }
  }
}

export default new MapGenerator();