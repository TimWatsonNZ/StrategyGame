import Tile from './Tile';
import TileType from './TileType';
import Point from '../../MapEntities/Point';
import * as Resources from '../../Resources/Resources';

class GrassTile extends Tile {
  constructor(point: Point) {
    super(point, TileType.Grass);
    this.resources = { };
    this.resources[Resources.Food.name] = { resource: Resources.Food, amount: 2 };
    this.resources[Resources.Wood.name] = { resource: Resources.Wood, amount: 0.5 };
  }

  draw(context: any, tileSize: number) {
    context.fillStyle = '#00FF00';
    context.fillRect(this.drawingPoint.x * tileSize, this.drawingPoint.y * tileSize, tileSize, tileSize);
  }
}

export default GrassTile;
