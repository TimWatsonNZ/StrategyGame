import Map from './Map';
import Point from './Point';

const canvas = document.createElement('canvas');
const size = 500;
const bodyMargin = 8;

canvas.width=size;
canvas.height=size;

document.getElementById('root').appendChild(canvas);
const context = canvas.getContext('2d');

const map = new Map(size);
map.draw(context);

//  Color in clicked square
canvas.addEventListener('click', (e) => {
  let { clientX , clientY } = e;
  clientX -= bodyMargin;
  clientY -= bodyMargin;
  
  const cell = map.clickCell(clientX, clientY, context);

  if (cell) {
    document.querySelector('#selectedTile').textContent = `${cell.point.x}, ${cell.point.y}, ${cell.type}`;
  } else {
    document.querySelector('#selectedTile').textContent = '';
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
  }
  else if(dragState === dragStates.DRAGGING) {
    let { clientX , clientY } = e;
    clientX -= bodyMargin;
    clientY -= bodyMargin;

    const diffX = startDrag.x - clientX;
    const diffY = startDrag.y - clientY;

    map.drag(diffX, diffY, context);
    startDrag.x = 0;
    startDrag.y = 0;
  }
  dragState = dragStates.ENDED;
}, false);

window.addEventListener('keyup', e => {
  if (e.keyCode === 37) {
    map.panLeft(context);
  }
  if (e.keyCode === 38) {
    map.panUp(context);
  }

  if (e.keyCode === 39) {
    map.panRight(context);
  }

  if (e.keyCode === 40) {
    map.panDown(context);
  }

  if (e.keyCode === 107) {

  }
  if (e.keyCode === 107) {
    
  }
  console.log(e.keyCode);
});


//  Given an array of squares and a view port, find the squares in the viewport
//  Zooming changes how large you want to draw the squares but also the viewport
//  Dragging changes the viewport start.