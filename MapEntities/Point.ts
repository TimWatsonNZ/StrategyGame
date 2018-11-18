
class Point {
  x: number;
  y: number;
  static copy: (point: Point) => Point;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(otherPoint: Point) {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }
}

Point.copy = function(point: Point) {
  return new Point(point.x, point.y);
}

export default Point;