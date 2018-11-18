import Point from '../../MapEntities/Point';
import TileType from './TileType';
import Unit from '../../MapEntities/Unit';
import City from '../../MapEntities/City';

class Tile {
  point: Point;
  selected: boolean;
  type: TileType;
  id: string;
  city: City;
  road: any;
  unit: Unit;
  drawingPoint: Point;
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

    const unitDetails = this.unit ? this.unit.toString() : '';
    return `${tileDetails} ${cityDetails} ${roadDetails} ${unitDetails}`;
  }
}

Tile.copy = function (tile: Tile, type = null) {
  let copy;
  if (!type) {
    copy = new Tile(tile.point, tile.type);
    copy.selected = copy.selected;
  }

  return copy;
}

export default Tile;
