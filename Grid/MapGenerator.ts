import { gridService } from './GridService';
import Tile from '../Map/Tiles/Tile';
import Point from '../MapEntities/Point';
import TileType from '../Map/Tiles/TileType';
import TileService from '../Map/Tiles/TileService';

class MapGenerator {

  generate(gridSize: number) {
    let grid: Tile[][] = []
    for(let h=0;h<gridSize;h++) {
      const row = [];
      for(let w=0;w<gridSize;w++) {
        row.push(new Tile(new Point(w, h), TileType.None));
      }
      grid.push(row);
    }
    
    const seedTileCount = 80;
    for (let i=0;i < seedTileCount;i++) {
      const randomTile = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid.length)];
      randomTile.type = TileType.Grass;
    }
    
    grid[Math.round(grid.length/2)][Math.round(grid.length/2)].type = TileType.Grass;
      
    grid = this.dfa(gridSize, grid, this.growGrass);
    grid = this.dfa(gridSize, grid, this.growGrass);
    this.floodFill(grid, grid[Math.round(grid.length/2)][Math.round(grid.length/2)]);

    grid = this.dfa(gridSize, grid, this.smoothRule);
    grid = this.dfa(gridSize, grid, this.smoothRule);

    this.fillInHoles(grid);

    return grid;
  }

  floodFill(grid: Tile[][], start: Tile) {
    const stack = [start];

    while (stack.length > 0) {
      const tile = stack.pop();
      const neighbours = gridService.getNeighbours(tile, false, false, grid);
      const waterNeighbours = neighbours.filter(x => x.type === TileType.Ocean).length;
      const grassNeighbours = neighbours.filter(x => x.type === TileType.Grass).length;
      
      if (Math.round(Math.random() * (waterNeighbours + grassNeighbours)) > waterNeighbours) {
        tile.type = TileType.Grass;
      } else {
        tile.type = TileType.Ocean;
      }
      neighbours.filter(x => x.type === TileType.None).forEach(x => stack.push(x));
    }
  }

  dfa (gridSize: number, grid: Tile[][], rule: any) {
    const newGrid = [];

    for(let h=0;h < gridSize;h++) {
      const newRow = [];
      for(let w=0;w < gridSize;w++) {
        const tile = grid[h][w];
        const neighbours = gridService.getNeighbours(tile, false, false, grid);

        const waterNeighbours = neighbours.filter(x => x.type === TileType.Ocean).length;
        const grassNeighbours = neighbours.filter(x => x.type === TileType.Grass).length;

        const type = rule(tile, waterNeighbours, grassNeighbours);
        const copy = TileService.createTile(tile, type);
        
        newRow.push(copy);
      }
      newGrid.push(newRow);
    }
    return newGrid;
  }

  smoothRule (tile: Tile, waterNeighbours: number, grassNeighbours: number) {
    if (tile.type === TileType.Ocean && grassNeighbours > 3) {
      return TileType.Grass;
    }
    if (tile.type === TileType.Grass && waterNeighbours > 7) {
      return TileType.Ocean;
    }
    return tile.type;
  }

  growGrass (tile: Tile, waterNeighbours: number, grassNeighbours: number) {
    if (tile.type === TileType.Ocean && grassNeighbours > 0) {
      return TileType.Grass;
    }
    return tile.type;
  }

  fillInHoles(grid: Tile[][]) {
    for(let y = 0; y < grid.length; y++) {
      for (let h = 0; h < grid[y].length; h++) {
        if (grid[y][h].type === TileType.None) {
          grid[y][h].type = TileType.Ocean;
        }
      }
    }
  }
}

export default new MapGenerator();