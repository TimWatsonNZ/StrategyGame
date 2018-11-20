import Point from '../../MapEntities/Point';
import TileType from './TileType';
import Unit from '../../MapEntities/Unit';
import City from '../../MapEntities/City';
import Pop from '../../Pops/Pop';
import OceanTile from './OceanTile';
import GrassTile from './GrassTile';
import IPrintable from '../../interfaces/IPrintable';

class Tile implements IPrintable{
  point: Point;
  selected: boolean;
  type: TileType;
  id: string;
  city: City;
  road: any;
  unit: Unit;
  drawingPoint: Point;
  resources: any;
  pop: Pop;
  improvements: any = [];
  static copy: (tile: Tile, type?: any) => Tile;

  constructor(point: Point, type: TileType) {
    this.point = Point.copy(point);
    this.selected = false;
    this.id = `${point.x}-${point.y}`;
    this.type = type;
  }

  equals(otherTile: Tile) {
    return this.point.equals(otherTile.point);
  }

  toString() {
    const tileDetails = `${this.point.x}, ${this.point.y}, ${this.type}`;
    let cityDetails = '';
    if (this.city) {
      cityDetails = this.city.toString();
    }

    let roadDetails = '';
    if (this.road) {
      roadDetails = `${this.road.toString()}\n${this.road.roadNetwork.toString()}`
    }

    let popDetails = this.pop ? this.pop.toString() : '';

    const unitDetails = this.unit ? this.unit.toString() : '';

    const improvementDetails = this.improvements.map((x: any) => x.name).join(',');
    return `${tileDetails} ${cityDetails} ${roadDetails} ${unitDetails} ${popDetails} ${improvementDetails}`;
  }

  draw(context: any, tileSize: number) {
    context.fillStyle = '#FFFFFF';
    context.fillRect(this.drawingPoint.x * tileSize, this.drawingPoint.y * tileSize, tileSize, tileSize);
  }
}



export default Tile;
