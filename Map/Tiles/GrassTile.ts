import Tile from './Tile';
import TileType from './TileType';
import Point from '../../MapEntities/Point';
import * as Resources from '../../Resources/Resources';

class GrassTile extends Tile {
  constructor(point: Point) {
    super(point, TileType.Grass);
    this.resources = { };
    this.resources['food'] = { resource: Resources.Food, amount: 2 };
  }
}

export default GrassTile;
