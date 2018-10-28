import Cell from './Cell';

class Unit {
  constructor(cell, name) {
    this.cell = cell;
    this.name = name;
  }

  draw(context, cellSize) {
    context.fillStyle = '#FF0000';
    context.fillRect(this.cell.drawingPoint.x * cellSize + cellSize/4, this.cell.drawingPoint.y * cellSize + cellSize/4, cellSize/2, 3*cellSize/4);
  }

  toString() {
    return `Unit: ${this.name}`;
  }
}

export default Unit