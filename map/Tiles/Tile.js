import Point from '../../mapEntities/Point';
import TileTypes from './TileTypes';

class Tile {
  constructor(x,y, type) {
    this.point = new Point(x,y);
    this.selected = false;
    this.id = `${x}-${y}`;
    this.type = type;
  }

  equals(otherTile) {
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

Tile.copy = function (tile, type = null) {
  let copy;
  if (!type) {
    copy =  new Tile(tile.point.x, tile.point.y, tile.type);
    copy.selected = copy.selected;
  }

  if (type === TileTypes.Grass) {
    copy = new GrassTile(tile.point.x, tile.point.y, tile.type);
    copy.selected = copy.selected;
  }
  
  if (type === TileTypes.Forest) {
    copy = new ForestTile(tile.point.x, tile.point.y, tile.type);
    copy.selected = copy.selected;
  }

  if (type === TileTypes.Ocean) {
    copy = new OceanTile(tile.point.x, tile.point.y, tile.type);
    copy.selected = copy.selected;
  }
  return copy;
}

export default Tile;
