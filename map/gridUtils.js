import Point from '../mapEntities/Point';

  function cellToIndex (cell) {
    return new Point(cell.point.x, cell.point.y);
  }


  function getNeighbours(grid, index, preserveOrder = false, noDiagonals = false) {
    const cell = grid[index.y][index.x];
    const allDeltas = [
      { x:-1, y: -1 }, {x: 0, y: -1},  { x: 1, y: -1},
      { x:-1, y:  0 },              ,  { x: 1, y:  0},
      { x:-1, y:  1 }, {x: 0, y:  1 }, { x: 1, y:  1},
    ];

    const noDiagonalsDeltas = [
                     , { x: 0, y: -1 },  
      { x:-1, y:  0 },              ,  { x: 1, y:  0},
                       { x: 0, y:  1 },
    ];

    const neighbours = [];
    if (!cell) {
      return neighbours;
    }

    const deltas = noDiagonals ? noDiagonalsDeltas : allDeltas;
    deltas.forEach(delta => {
      const indexX = index.x + delta.x;
      const indexY = index.y + delta.y;

      if (indexX < 0 || indexX > grid.length-1 ||
          indexY < 0 || indexY > grid.length-1) {
          if (preserveOrder) neighbours.push(null);
      } else {
        neighbours.push(grid[indexY][indexX]);
      }
    });

    return neighbours;
  }

  export {
    cellToIndex,
    getNeighbours,
  }