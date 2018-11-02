import Tile from './Tile';
import TileTypes from ('./TileTypes');

class ForestTile extends Tile {
  constructor() {
    this.type = TileTypes.Forest;
  }
}

export default ForestTile;
