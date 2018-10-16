import Point from './Point';

class Cell {
  constructor(x,y, type) {
    this.point = new Point(x,y);
    this.selected = false;
  
    this.type = type;
  }

  equals(otherCell) {
    return this.point.equals(otherCell.point);
  }
}

export default Cell;
