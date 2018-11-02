import Tile from './Tile';
import TileTypes from ('./TileTypes');

class OceanTile extends Tile {
  constructor() {
    this.type = TileTypes.Ocean;
  }
}

export default OceanTile;
