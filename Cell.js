import Point from './Point';

class Cell {
  constructor(x,y, type) {
    this.point = new Point(x,y);
    this.selected = false;
    this.id = `${x}-${y}`;
    this.type = type;
  }

  equals(otherCell) {
    return this.point.equals(otherCell.point);
  }

  toString() {
    const cellDetails = `${this.point.x}, ${this.point.y}, ${this.type}`;
    let cityDetails = '';
    if (this.city) {
      cityDetails = this.city.toString();
    }
    let roadDetails = '';
    if (this.road) {
      roadDetails = `${this.road.toString()}\n${this.road.roadNetwork.toString()}`
    }

    const unitDetails = this.unit ? this.unit.toString() : '';
    return `${cellDetails} ${cityDetails} ${roadDetails} ${unitDetails}`;
  }
}

Cell.copy = function (cell) {
  const copy =  new Cell(cell.point.x, cell.point.y, cell.type);
  copy.selected = copy.selected;
  return copy;
}

export default Cell;
