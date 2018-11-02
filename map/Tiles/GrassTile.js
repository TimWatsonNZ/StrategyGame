import Tile from './Tile';
import TileTypes from ('./TileTypes');

class GrassTile extends Tile {
  constructor() {
    this.type = TileTypes.Grass;
  }
}

export default GrassTile;
