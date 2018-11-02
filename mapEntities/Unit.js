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

Unit.add = function(selectedCell) {  
  if (!selectedCell) return false;

  if (selectedCell.city || selectedCell.road || selectedCell.unit) return false;

  if (selectedCell.type === 'water') return false;
  selectedCell.unit = new Unit(selectedCell, 'New Unit');

  return true;
}
export default Unit