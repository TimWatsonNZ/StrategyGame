const canvas = document.createElement('canvas');
const size = 500;
const bodyMargin = 8;

canvas.width=size;
canvas.height=size;

document.getElementById('root').appendChild(canvas);
const context = canvas.getContext('2d');

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Cell(x,y, type) {
  this.point = new Point(x,y);
  this.selected = false;

  this.type = type;
}
//  Draw grid of squares
const cellSize = 10;
const squareNumber = size / cellSize;
const viewPortOrigin = new Point(0, 40);
const origin = new Point(0, 0);

const waterType = {
  borders: {
    grass: 0.1,
    water: 0.9,
  }
}
const grassType = {
  borders: {
    grass: 0.9,
    water: 0.1,
  }
}

let grid = [];

for(let h=0;h<squareNumber;h++) {
  const row = [];
  for(let w=0;w<squareNumber;w++) {
    row.push(new Cell(w * cellSize, h * cellSize, 'blank'));
  }
  grid.push(row);
}

const seedTileCount = 80;
for (let i=0;i < seedTileCount;i++) {
  const randomCell = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid.length)];
  randomCell.type = 'grass';
}

function getNeigbours(index, grid) {
  const cell = grid[index.y][index.x];
  const deltas = [
    { x:-1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
    { x:-1, y: 0},               , {x: 1, y: 0},
    { x:-1, y: 1},  {x: 0, y: 1},  {x: 1, y: 1},
  ];

  const neighbours = [];
  if (!cell) {
    return neighbours;
  }

  deltas.forEach(delta => {
    const indexX = index.x + delta.x;
    const indexY = index.y + delta.y;

    if (indexX < 0 || indexX > grid.length-1 ||
        indexY < 0 || indexY > grid.length-1) {
        return;
    } else {
      neighbours.push(grid[indexY][indexX]);
    }
  });

  return neighbours;
}

const cellToIndex = (cell) => {
  return new Point(cell.point.x/cellSize, cell.point.y/cellSize);
}

function dfs(start) {
  const stack = [start];

  while (stack.length > 0) {
    const cell = stack.pop();
    const neighbours = getNeigbours(cellToIndex(cell), grid);
    const waterNeighbours = neighbours.filter(x => x.type === 'water').length;
    const grassNeighbours = neighbours.filter(x => x.type === 'grass').length;
    
    if (Math.round(Math.random() * (waterNeighbours + grassNeighbours)) > waterNeighbours) {
      cell.type = 'grass';
    } else {
      cell.type = 'water';
    }
    neighbours.filter(x => x.type === 'blank').forEach(x => stack.push(x));
  }
}

grid[Math.round(grid.length/2)][Math.round(grid.length/2)].type = 'grass';
const dfa = (grid, rule) => {
  const newGrid = [];

  for(let h=0;h<squareNumber;h++) {
    const newRow = [];
    for(let w=0;w<squareNumber;w++) {
      const cell = grid[h][w];
      const neighbours = getNeigbours(cellToIndex(cell), grid);

      const waterNeighbours = neighbours.filter(x => x.type === 'water').length;
      const grassNeighbours = neighbours.filter(x => x.type === 'grass').length;

      const copy = { ...cell };
      copy.type = rule(copy, waterNeighbours, grassNeighbours);
      
      newRow.push(copy);
    }
    newGrid.push(newRow);
  }
  return newGrid;
}

const smoothRule = (cell, waterNeighbours, grassNeighbours) => {
  if (cell.type === 'water' && grassNeighbours > 3) {
    return 'grass';
  }
  if (cell.type === 'grass' && waterNeighbours > 7) {
    return 'water';
  }
  return cell.type;
}
const growGrass = (cell, waterNeighbours, grassNeighbours) => {
  if (cell.type === 'water' && grassNeighbours > 0) {
    return 'grass';
  }
  return cell.type;
}

grid = dfa(grid, growGrass);
grid = dfa(grid, growGrass);
dfs(grid[Math.round(grid.length/2)][Math.round(grid.length/2)]);

grid = dfa(grid, smoothRule);
grid = dfa(grid, smoothRule);

console.log(grid.reduce((sum, row) => sum + row.filter(y => y.type === 'water').length, 0));

const viewPortRight = viewPortOrigin.x + size;
const viewPortBottom = viewPortOrigin.y + size;

let clippedGrid = createClippedGrid();

function createClippedGrid() {
  const newgrid = [];
  const startPoint = new Point(viewPortOrigin.x, viewPortOrigin.y);
  const endPoint = new Point(startPoint.x + size, startPoint.y + size);
  
  for (let y = startPoint.y;y <= endPoint.y;y += cellSize) {
    const newrow = [];
    const row = grid[Math.round(y/cellSize)];
    if (row) {
      for (let x = startPoint.x; x <= endPoint.x; x += cellSize) {
       const cell = row[Math.round(x/cellSize)];

        if (cell && cell.point) {
          const cellCopy = {...cell};
          cellCopy.point = new Point(cell.point.x, cell.point.y);
          cellCopy.point.x -= viewPortOrigin.x;
          cellCopy.point.y -= viewPortOrigin.y;
          newrow.push(cellCopy);
        }
      }
    }  
    newgrid.push(newrow);
  }
  return newgrid;
}


function draw() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, size, size);
  context.fillStyle = '#000000';
  for(let h=0;h<clippedGrid.length;h++) {
    for(let w=0;w<clippedGrid[h].length;w++) {
      const cell = clippedGrid[h][w];
      if (cell && (cell.point.x) <= viewPortRight && (cell.point.x + cellSize) > 0 && (cell.point.y + cellSize) >= 0 && cell.point.y < viewPortBottom) {
        if (cell.type === 'grass') {
          context.fillStyle = '#00FF00';
        }
        if (cell.type === 'water') {
          context.fillStyle = '#0000FF';
        }
        if (cell.type === 'blank') {
          context.fillStyle = '#FFFFFF';
        }
        context.fillRect(cell.point.x, cell.point.y, cellSize, cellSize);
      }
    }
  }//  
}
draw();

//  Color in clicked square
canvas.addEventListener('click', (e) => {
  let { clientX , clientY } = e;
  clientX -= bodyMargin;
  clientY -= bodyMargin;
  const cellX = Math.floor(clientX / cellSize);
  const cellY = Math.floor(clientY / cellSize);

  const cell = clippedGrid[cellY][cellX];

  if (cell) {  cell.selected = !cell.selected;
    draw();
  }
});

//  Zoom in and out and drag
let dragState = 0;
const startDrag = new Point(0, 0);

const dragStates = { STARTED: 0, DRAGGING: 1, ENDED: 2}

canvas.addEventListener("mousedown", (e) => {
  dragState = dragStates.STARTED;
  let { clientX , clientY } = e;
  clientX -= bodyMargin;
  clientY -= bodyMargin;

  startDrag.x = clientX;
  startDrag.y = clientY;
}, false);

canvas.addEventListener("mousemove", () => {
  if (dragState === dragStates.STARTED) dragState = dragStates.DRAGGING;
}, false);

canvas.addEventListener("mouseup", (e) => {
  const minDrag = 5;
  if(dragState === dragStates.STARTED){
    console.log("click");
  }
  else if(dragState === dragStates.DRAGGING) {
    let { clientX , clientY } = e;
    clientX -= bodyMargin;
    clientY -= bodyMargin;

    const diffX = startDrag.x - clientX;
    const diffY = startDrag.y - clientY;

    if (diffX > minDrag || diffY > minDrag) {
      viewPortOrigin.x += Math.round(diffX);
      viewPortOrigin.y += Math.round(diffY);
      startDrag.x = 0;
      startDrag.y = 0;
  
      clippedGrid = createClippedGrid();
      draw();
    }

  }
  dragState = dragStates.ENDED;
}, false);

window.addEventListener('keyup', e => {
  if (e.keyCode === 37) {
    viewPortOrigin.x++;
  }
  if (e.keyCode === 38) {
    viewPortOrigin.y++;
  }

  if (e.keyCode === 39) {
    viewPortOrigin.x--;
  }

  if (e.keyCode === 40) {
    viewPortOrigin.y--;
  }
  console.log(e.keyCode);
  clippedGrid = createClippedGrid();
  draw();
});

//  Given an array of squares and a view port, find the squares in the viewport
//  Zooming changes how large you want to draw the squares but also the viewport
//  Dragging changes the viewport start.