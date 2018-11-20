import Tile from './Tile';
import TileType from './TileType';
import Point from '../../MapEntities/Point';

class OceanTile extends Tile {
  constructor(point: Point) {
    super(point, TileType.Ocean);
  }
  draw(context: any, tileSize: number) {
    context.fillStyle = '#0000FF';
    context.fillRect(this.drawingPoint.x * tileSize, this.drawingPoint.y * tileSize, tileSize, tileSize);
  }
}

export default OceanTile;
