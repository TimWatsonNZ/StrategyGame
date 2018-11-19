import Tile from "./Tile";
import TileType from "./TileType";
import GrassTile from "./GrassTile";
import OceanTile from "./OceanTile";

class TileService {

  copyTile = function (tile: Tile) {
    let copy;
    if (tile.type === TileType.None) {
      copy = new Tile(tile.point, tile.type);
      copy.selected = copy.selected;
    }
  
    if (tile.type === TileType.Grass) {
      copy = new GrassTile(tile.point);
      copy.selected = copy.selected;
    }
  
    if (tile.type === TileType.Ocean) {
      copy = new OceanTile(tile.point);
      copy.selected = copy.selected;
    }
  
    return copy;
  }

  createTile = function(tile: Tile, type: TileType) {
    switch(type) {
      case TileType.Grass:
        return new GrassTile(tile.point);
      case TileType.Ocean:
        return new OceanTile(tile.point);
      case TileType.None:
        return new Tile(tile.point, TileType.None);
    }
  }
}

const instance = new TileService();

export default instance;