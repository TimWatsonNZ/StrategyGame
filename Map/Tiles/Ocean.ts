import Tile from './Tile';
import TileType from './TileType';
import Point from '../../MapEntities/Point';

class OceanTile extends Tile {
  constructor(point: Point) {
    super(point, TileType.Ocean);
  }
}

export default OceanTile;
