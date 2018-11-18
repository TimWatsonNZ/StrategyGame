import Tile from "../Map/Tiles/Tile";
import TileType from "../Map/Tiles/TileType";

class Unit {
  tile: Tile;
  name: string;
  static add: (selectedTile: Tile) => boolean;
  constructor(tile: any, name: string) {
    this.tile = tile;
    this.name = name;
  }

  draw(context: any, tileSize: number) {
    context.fillStyle = '#FF0000';
    context.fillRect(this.tile.drawingPoint.x * tileSize + tileSize/4, this.tile.drawingPoint.y * tileSize + tileSize/4, tileSize/2, 3*tileSize/4);
  }

  toString() {
    return `Unit: ${this.name}`;
  }
}

Unit.add = function(selectedTile: Tile) {  
  if (!selectedTile) return false;

  if (selectedTile.city || selectedTile.road || selectedTile.unit) return false;

  if (selectedTile.type === TileType.Ocean) return false;
  selectedTile.unit = new Unit(selectedTile, 'New Unit');

  return true;
}
export default Unit