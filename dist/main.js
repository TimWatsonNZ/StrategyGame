/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Cell.js":
/*!*****************!*\
  !*** ./Cell.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./Point.js\");\n\r\n\r\nclass Cell {\r\n  constructor(x,y, type) {\r\n    this.point = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x,y);\r\n    this.selected = false;\r\n  \r\n    this.type = type;\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cell);\r\n\n\n//# sourceURL=webpack:///./Cell.js?");

/***/ }),

/***/ "./City.js":
/*!*****************!*\
  !*** ./City.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ \"./Cell.js\");\n\r\n\r\nclass City {\r\n  constructor(cell, name, population) {\r\n    this.cell = cell;\r\n    this.name = name;\r\n    this.population = population;\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (City);\n\n//# sourceURL=webpack:///./City.js?");

/***/ }),

/***/ "./Map.js":
/*!****************!*\
  !*** ./Map.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./Point.js\");\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cell */ \"./Cell.js\");\n/* harmony import */ var _City__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./City */ \"./City.js\");\n\r\n\r\n\r\n\r\nconst waterType = {\r\n  borders: {\r\n    grass: 0.1,\r\n    water: 0.9,\r\n  }\r\n}\r\nconst grassType = {\r\n  borders: {\r\n    grass: 0.9,\r\n    water: 0.1,\r\n  }\r\n}\r\n\r\nclass Map {\r\n  \r\n  constructor(size, cellNumber, context) {\r\n    //  Draw grid of squares\r\n    this.context = context;\r\n    this.size = size;\r\n    this.cellNumber = cellNumber;\r\n    this.viewPortOrigin = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\r\n    this.origin = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\r\n    this.selectedCell = null;\r\n    this.grid = [];\r\n    this.clippedGrid = [];\r\n    this.viewPortSize = size; //  how large the view port is\r\n    this.zoomLevel = 40;  //  how many cells are in view port\r\n    this.viewPortEnd = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.viewPortOrigin.x +  this.zoomLevel, this.viewPortOrigin.y +  this.zoomLevel);\r\n     \r\n    this.cellSize = this.viewPortSize / this.zoomLevel; //  should be view port size / view port content size\r\n    this.init();\r\n  }\r\n\r\n  init() {\r\n    for(let h=0;h<this.cellNumber;h++) {\r\n      const row = [];\r\n      for(let w=0;w<this.cellNumber;w++) {\r\n        row.push(new _Cell__WEBPACK_IMPORTED_MODULE_1__[\"default\"](w, h, 'blank'));\r\n      }\r\n      this.grid.push(row);\r\n    }\r\n    \r\n    const seedTileCount = 80;\r\n    for (let i=0;i < seedTileCount;i++) {\r\n      const randomCell = this.grid[Math.floor(Math.random() * this.grid.length)][Math.floor(Math.random() * this.grid.length)];\r\n      randomCell.type = 'grass';\r\n    }\r\n    \r\n    this.grid[Math.round(this.grid.length/2)][Math.round(this.grid.length/2)].type = 'grass';\r\n      \r\n    this.grid = this.dfa(this.grid, this.growGrass);\r\n    this.grid = this.dfa(this.grid, this.growGrass);\r\n    this.dfs(this.grid[Math.round(this.grid.length/2)][Math.round(this.grid.length/2)]);\r\n\r\n    this.grid = this.dfa(this.grid, this.smoothRule);\r\n    this.grid = this.dfa(this.grid, this.smoothRule);\r\n\r\n    this.fillInHoles(this.grid);\r\n\r\n    this.clippedGrid = this.createClippedGrid();\r\n  }\r\n\r\n  getNeigbours(index, grid) {\r\n    const cell = grid[index.y][index.x];\r\n    const deltas = [\r\n      { x:-1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},\r\n      { x:-1, y: 0},               , {x: 1, y: 0},\r\n      { x:-1, y: 1},  {x: 0, y: 1},  {x: 1, y: 1},\r\n    ];\r\n\r\n    const neighbours = [];\r\n    if (!cell) {\r\n      return neighbours;\r\n    }\r\n\r\n    deltas.forEach(delta => {\r\n      const indexX = index.x + delta.x;\r\n      const indexY = index.y + delta.y;\r\n\r\n      if (indexX < 0 || indexX > grid.length-1 ||\r\n          indexY < 0 || indexY > grid.length-1) {\r\n          return;\r\n      } else {\r\n        neighbours.push(grid[indexY][indexX]);\r\n      }\r\n    });\r\n\r\n    return neighbours;\r\n  }\r\n\r\n  cellToIndex (cell) {\r\n    return new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](cell.point.x, cell.point.y);\r\n  }\r\n\r\n  dfs(start) {\r\n    const stack = [start];\r\n\r\n    while (stack.length > 0) {\r\n      const cell = stack.pop();\r\n      const neighbours = this.getNeigbours(this.cellToIndex(cell), this.grid);\r\n      const waterNeighbours = neighbours.filter(x => x.type === 'water').length;\r\n      const grassNeighbours = neighbours.filter(x => x.type === 'grass').length;\r\n      \r\n      if (Math.round(Math.random() * (waterNeighbours + grassNeighbours)) > waterNeighbours) {\r\n        cell.type = 'grass';\r\n      } else {\r\n        cell.type = 'water';\r\n      }\r\n      neighbours.filter(x => x.type === 'blank').forEach(x => stack.push(x));\r\n    }\r\n  }\r\n\r\n  dfa (grid, rule) {\r\n    const newGrid = [];\r\n\r\n    for(let h=0;h<this.cellNumber;h++) {\r\n      const newRow = [];\r\n      for(let w=0;w<this.cellNumber;w++) {\r\n        const cell = grid[h][w];\r\n        const neighbours = this.getNeigbours(this.cellToIndex(cell), grid);\r\n\r\n        const waterNeighbours = neighbours.filter(x => x.type === 'water').length;\r\n        const grassNeighbours = neighbours.filter(x => x.type === 'grass').length;\r\n\r\n        const copy = { ...cell };\r\n        copy.type = rule(copy, waterNeighbours, grassNeighbours);\r\n        \r\n        newRow.push(copy);\r\n      }\r\n      newGrid.push(newRow);\r\n    }\r\n    return newGrid;\r\n  }\r\n\r\n  smoothRule (cell, waterNeighbours, grassNeighbours) {\r\n    if (cell.type === 'water' && grassNeighbours > 3) {\r\n      return 'grass';\r\n    }\r\n    if (cell.type === 'grass' && waterNeighbours > 7) {\r\n      return 'water';\r\n    }\r\n    return cell.type;\r\n  }\r\n\r\n  growGrass (cell, waterNeighbours, grassNeighbours) {\r\n    if (cell.type === 'water' && grassNeighbours > 0) {\r\n      return 'grass';\r\n    }\r\n    return cell.type;\r\n  }\r\n\r\n  fillInHoles(grid) {\r\n    for(let y = 0; y < grid.length; y++) {\r\n      for (let h = 0; h < grid[y].length; h++) {\r\n        if (grid[y][h].type === 'blank') {\r\n          grid[y][h].type = 'water';\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  createClippedGrid() {\r\n    const newgrid = [];\r\n    const startPoint = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.viewPortOrigin.x, this.viewPortOrigin.y);\r\n    const endPoint = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.viewPortEnd.x, this.viewPortEnd.y);\r\n    \r\n    for (let y = startPoint.y;y <= endPoint.y;y++) {\r\n      const newrow = [];\r\n      const row = this.grid[y];\r\n      if (row) {\r\n        for (let x = startPoint.x; x <= endPoint.x; x++) {\r\n        const cell = row[x];\r\n\r\n          if (cell && cell.point) {\r\n            cell.drawingPoint = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](cell.point.x, cell.point.y);\r\n            cell.drawingPoint.x = x - startPoint.x;\r\n            cell.drawingPoint.y = y - startPoint.y;\r\n            newrow.push(cell);\r\n          }\r\n        }\r\n      }  \r\n      newgrid.push(newrow);\r\n    }\r\n    return newgrid;\r\n  }\r\n\r\n  clickCell(x, y) {\r\n    const cellX = Math.floor(x / this.cellSize);\r\n    const cellY = Math.floor(y / this.cellSize);\r\n\r\n    const cell = this.clippedGrid[cellY] && this.clippedGrid[cellY][cellX];\r\n\r\n    if (cell) {  \r\n      if (this.selectedCell) {\r\n        this.selectedCell.selected = false;\r\n      }\r\n      this.selectedCell = cell;\r\n      cell.selected = true;\r\n      this.draw();\r\n    }\r\n\r\n    return cell;\r\n  }\r\n\r\n  drag(diffX, diffY) {\r\n\r\n    const minDrag = 1;\r\n    if (Math.abs(diffX) > minDrag || Math.abs(diffY) > minDrag) {\r\n      if (diffX > 0) {\r\n        const sum = this.viewPortOrigin.x + Math.round(diffX);\r\n        this.viewPortOrigin.x = Math.min(sum, this.cellNumber);\r\n        this.viewPortEnd.x = this.viewPortOrigin.x + this.zoomLevel;\r\n      } else {\r\n        const sum = this.viewPortOrigin.x + Math.round(diffX);\r\n        this.viewPortOrigin.x = Math.max(sum, 0);\r\n        this.viewPortOrigin.x = this.viewPortOrigin.x + this.zoomLevel;\r\n      }\r\n\r\n      if (diffY > 0) {\r\n        const sum = this.viewPortOrigin.y + Math.round(diffY);\r\n        this.viewPortOrigin.y = Math.min(sum, this.cellNumber);\r\n        this.viewPortOrigin.y = this.viewPortOrigin.y + this.zoomLevel;\r\n      } else {\r\n        const sum = this.viewPortOrigin.x + Math.round(diffY);\r\n        this.viewPortOrigin.y = Math.max(sum, 0);\r\n        this.viewPortOrigin.y = this.viewPortOrigin.y + this.zoomLevel;\r\n      }\r\n      \r\n      this.update();\r\n    }\r\n  }\r\n\r\n  panUp() {\r\n    if (this.viewPortOrigin.y > 0) {\r\n      this.viewPortOrigin.y--;\r\n      this.viewPortEnd.y--;\r\n      this.update();  \r\n    }\r\n  }\r\n\r\n  panDown() {\r\n    if (this.viewPortOrigin.y + this.zoomLevel < this.cellNumber) {\r\n      this.viewPortOrigin.y++;\r\n      this.viewPortEnd.y++;\r\n      this.update();\r\n    }\r\n  }\r\n\r\n  panLeft() {\r\n    if (this.viewPortOrigin.x > 0) {\r\n      this.viewPortOrigin.x--;\r\n      this.viewPortEnd.x--;\r\n      this.update();\r\n    }\r\n  }\r\n\r\n  panRight() {\r\n    if (this.viewPortOrigin.x + this.zoomLevel < this.cellNumber) {\r\n      this.viewPortOrigin.x++;\r\n      this.viewPortEnd.x++;\r\n      this.update();\r\n    }\r\n  }\r\n\r\n  zoomOut() {\r\n    if (this.zoomLevel < 100) {\r\n      this.zoomLevel++;\r\n      this.zoom();\r\n    }\r\n  }\r\n\r\n  zoomIn() {\r\n    if (this.zoomLevel > 1) {\r\n      this.zoomLevel--;\r\n      this.zoom();\r\n    }\r\n  }\r\n\r\n  zoom() {\r\n    this.viewPortEnd = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.viewPortOrigin.x +  this.zoomLevel, this.viewPortOrigin.y +  this.zoomLevel);\r\n    this.cellSize = this.viewPortSize / this.zoomLevel;\r\n    this.update();\r\n  }\r\n\r\n  update() {\r\n    this.clippedGrid = this.createClippedGrid();\r\n    this.draw();\r\n  }\r\n\r\n  draw() {\r\n    this.context.fillStyle = '#FFFFFF';\r\n    this.context.fillRect(0, 0, this.size, this.size);\r\n    this.context.fillStyle = '#000000';\r\n    for(let h=0;h<this.clippedGrid.length;h++) {\r\n      for(let w=0;w<this.clippedGrid[h].length;w++) {\r\n        const cell = this.clippedGrid[h][w];\r\n        if (cell && (cell.drawingPoint.x) <= this.viewPortEnd.x && (cell.drawingPoint.x) >= 0 && (cell.drawingPoint.y) >= 0 && cell.drawingPoint.y <= this.viewPortEnd.y) {\r\n          if (cell.type === 'grass') {\r\n            this.context.fillStyle = '#00FF00';\r\n          }\r\n          if (cell.type === 'water') {\r\n            this.context.fillStyle = '#0000FF';\r\n          }\r\n          if (cell.type === 'blank') {\r\n            this.context.fillStyle = '#FFFFFF';\r\n          }\r\n          this.context.fillRect(cell.drawingPoint.x * this.cellSize, cell.drawingPoint.y * this.cellSize, this.cellSize, this.cellSize);\r\n\r\n          if (cell.selected) {\r\n            this.context.strokeStyle = '#000000';\r\n            this.context.strokeRect(cell.drawingPoint.x * this.cellSize, cell.drawingPoint.y * this.cellSize, this.cellSize, this.cellSize);\r\n            this.context.strokeStyle = '#FFFFFF';\r\n          }\r\n\r\n          if (cell.city) {\r\n            this.context.fillStyle = '#000000';\r\n            this.context.fillRect(cell.drawingPoint.x * this.cellSize + this.cellSize/4, cell.drawingPoint.y * this.cellSize + this.cellSize/4, this.cellSize/2, this.cellSize/2);\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  addCityToSelectedTile() {\r\n    if (!this.selectedCell) return;\r\n\r\n    if (this.selectedCell.city) return;\r\n\r\n    if (this.selectedCell.type === 'water') return;\r\n    this.selectedCell.city = new _City__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.selectedCell, 'New City', 1);\r\n\r\n    this.draw();\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Map);\r\n\n\n//# sourceURL=webpack:///./Map.js?");

/***/ }),

/***/ "./Point.js":
/*!******************!*\
  !*** ./Point.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\nclass Point {\r\n  constructor(x, y) {\r\n    this.x = x;\r\n    this.y = y;\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Point);\n\n//# sourceURL=webpack:///./Point.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map */ \"./Map.js\");\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Point */ \"./Point.js\");\n\r\n\r\n\r\nconst canvas = document.createElement('canvas');\r\nconst size = 500;\r\nconst bodyMargin = 8;\r\n\r\ncanvas.width=size;\r\ncanvas.height=size;\r\n\r\ndocument.getElementById('root').appendChild(canvas);\r\nconst context = canvas.getContext('2d');\r\n\r\nconst map = new _Map__WEBPACK_IMPORTED_MODULE_0__[\"default\"](size, 40, context);\r\nmap.draw();\r\n\r\n//  Color in clicked square\r\ncanvas.addEventListener('click', (e) => {\r\n  let { clientX , clientY } = e;\r\n  clientX -= bodyMargin;\r\n  clientY -= bodyMargin;\r\n  \r\n  const cell = map.clickCell(clientX, clientY);\r\n\r\n  if (cell) {\r\n    const cellDetails = `${cell.point.x}, ${cell.point.y}, ${cell.type}`;\r\n    let cityDetails = '';\r\n    if (cell.city) {\r\n      cityDetails = `${cell.city.name}: ${cell.city.population}`;\r\n    }\r\n    document.querySelector('#selectedTile').textContent = `${cellDetails} - ${cityDetails}`;\r\n  } else {\r\n    document.querySelector('#selectedTile').textContent = '';\r\n  }\r\n});\r\n\r\n//  Zoom in and out and drag\r\nlet dragState = 0;\r\nconst startDrag = new _Point__WEBPACK_IMPORTED_MODULE_1__[\"default\"](0, 0);\r\n\r\nconst dragStates = { STARTED: 0, DRAGGING: 1, ENDED: 2}\r\n\r\ncanvas.addEventListener(\"mousedown\", (e) => {\r\n  dragState = dragStates.STARTED;\r\n  let { clientX , clientY } = e;\r\n  clientX -= bodyMargin;\r\n  clientY -= bodyMargin;\r\n\r\n  startDrag.x = clientX;\r\n  startDrag.y = clientY;\r\n}, false);\r\n\r\ncanvas.addEventListener(\"mousemove\", () => {\r\n  if (dragState === dragStates.STARTED) dragState = dragStates.DRAGGING;\r\n}, false);\r\n\r\ncanvas.addEventListener(\"mouseup\", (e) => {\r\n  if(dragState === dragStates.STARTED){\r\n  }\r\n  else if(dragState === dragStates.DRAGGING) {\r\n    let { clientX , clientY } = e;\r\n    clientX -= bodyMargin;\r\n    clientY -= bodyMargin;\r\n\r\n    const diffX = startDrag.x - clientX;\r\n    const diffY = startDrag.y - clientY;\r\n\r\n   // map.drag(diffX, diffY);\r\n    startDrag.x = 0;\r\n    startDrag.y = 0;\r\n  }\r\n  dragState = dragStates.ENDED;\r\n}, false);\r\n\r\n\r\nwindow.addEventListener('keydown', e => {\r\n  if (e.keyCode === 37) {\r\n    map.panLeft();\r\n  }\r\n\r\n  if (e.keyCode === 38) {\r\n    map.panUp();\r\n  }\r\n\r\n  if (e.keyCode === 39) {\r\n    map.panRight();\r\n  }\r\n\r\n  if (e.keyCode === 40) {\r\n    map.panDown();\r\n  }\r\n\r\n  if (e.keyCode === 107) {\r\n    map.zoomIn();\r\n  }\r\n\r\n  if (e.keyCode === 109) {\r\n    map.zoomOut();\r\n  }\r\n});\r\n\r\ndocument.querySelector('#addCity').addEventListener('click', () => {\r\n  map.addCityToSelectedTile();\r\n})\r\n\r\n//  Given an array of squares and a view port, find the squares in the viewport\r\n//  Zooming changes how large you want to draw the squares but also the viewport\r\n//  Dragging changes the viewport start.\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });