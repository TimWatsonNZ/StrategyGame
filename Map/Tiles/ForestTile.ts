import Tile from './Tile';
import TileType from './TileType';
import Point from '../../MapEntities/Point';

class ForestTile extends Tile {
  constructor(point: Point) {
    super(point, TileType.Forest);
  }
}

export default ForestTile;
