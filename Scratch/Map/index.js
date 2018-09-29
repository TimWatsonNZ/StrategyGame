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
const cellSize = 20;
const squareNumber = size / cellSize;
const viewPortOrigin = new Point(0, 40);
const origin = new Point(0, 0);

const waterType = {
  borders: {
    
  }
}
const grassType = {

  borders: {

  }
}

const grid = [];

for(let h=0;h<squareNumber;h++) {
  const row = [];
  for(let w=0;w<squareNumber;w++) {
    row.push(new Cell(w * cellSize, h * cellSize));
  }
  grid.push(row);
}

const viewPortRight = viewPortOrigin.x + size;
const viewPortBottom = viewPortOrigin.y + size;

let clippedGrid = createClippedGrid();

function createClippedGrid() {
  const newgrid = [];
  const startPoint = new Point(viewPortOrigin.x, viewPortOrigin.y);
  const endPoint = new Point(startPoint.x + size, startPoint.y + size);
  
  for (let y = startPoint.y;y < endPoint.y;y += cellSize) {
    const newrow = [];
    for (let x = startPoint.x; x < endPoint.x; x += cellSize) {
      const row = grid[Math.round(y/cellSize)];
      if (row) {
        const cell = {...row[Math.round(x/cellSize)]};

        if (cell && cell.point) {
          cell.point.x -= viewPortOrigin.x;
          cell.point.y -= viewPortOrigin.y;
          newrow.push(cell);
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
  for(let h=0;h<squareNumber;h++) {
    for(let w=0;w<squareNumber;w++) {
      const cell = clippedGrid[h][w];
      if (cell && cell.point.x >= origin.x && cell.point.x < viewPortRight && cell.point.y >= origin.y && cell.point.y < viewPortBottom) {
        if (cell.selected) {
          context.fillRect(cell.point.x, cell.point.y, cellSize, cellSize);
        } else {
          context.strokeRect(cell.point.x, cell.point.y, cellSize, cellSize);
        }
      }
    }
  }
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
  if(dragState === dragStates.STARTED){
    console.log("click");
  }
  else if(dragState === dragStates.DRAGGING){
    console.log("drag");
    let { clientX , clientY } = e;
    clientX -= bodyMargin;
    clientY -= bodyMargin;

    const diffX = startDrag.x - clientX;
    const diffY = startDrag.y - clientY;

    viewPortOrigin.x += Math.round(diffX);
    viewPortOrigin.y += Math.round(diffY);
    startDrag.x = 0;
    startDrag.y = 0;

    clippedGrid = createClippedGrid();
    draw();
  }
  dragState = dragStates.ENDED;
}, false);

//  Given an array of squares and a view port, find the squares in the viewport
//  Zooming changes how large you want to draw the squares but also the viewport
//  Dragging changes the viewport start.