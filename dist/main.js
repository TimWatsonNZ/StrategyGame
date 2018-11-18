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

/***/ "./Grid/GridService.ts":
/*!*****************************!*\
  !*** ./Grid/GridService.ts ***!
  \*****************************/
/*! exports provided: gridService, gridServiceInit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gridService", function() { return gridService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gridServiceInit", function() { return gridServiceInit; });
/* harmony import */ var _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mapEntities/Point */ "./mapEntities/Point.js");
/* harmony import */ var _MapGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapGenerator */ "./Grid/MapGenerator.js");


var GridService = /** @class */ (function () {
    function GridService(gridSize) {
        this.gridSize = gridSize;
        this.grid = [];
    }
    GridService.prototype.createMap = function () {
        this.grid = _MapGenerator__WEBPACK_IMPORTED_MODULE_1__["default"].generate(this.gridSize);
    };
    //  todo - change these to points
    GridService.prototype.createClippedGrid = function (viewPortOrigin, viewPortEnd) {
        var newgrid = [];
        var startPoint = new _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](viewPortOrigin.x, viewPortOrigin.y);
        var endPoint = new _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](viewPortEnd.x, viewPortEnd.y);
        for (var y = startPoint.y; y <= endPoint.y; y++) {
            var newrow = [];
            var row = this.grid[y];
            if (row) {
                for (var x = startPoint.x; x <= endPoint.x; x++) {
                    var tile = row[x];
                    if (tile && tile.point) {
                        tile.drawingPoint = new _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](tile.point.x, tile.point.y);
                        tile.drawingPoint.x = x - startPoint.x;
                        tile.drawingPoint.y = y - startPoint.y;
                        newrow.push(tile);
                    }
                }
            }
            newgrid.push(newrow);
        }
        return newgrid;
    };
    GridService.prototype.tileToIndex = function (tile) {
        return new _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](tile.point.x, tile.point.y);
    };
    GridService.prototype.getRegion = function (index, radius) {
        var _this = this;
        var deltas = [];
        for (var x = 0; x < radius * 2 + 1; x++) {
            for (var y = 0; y < radius * 2 + 1; y++) {
                deltas.push({ x: x - 1, y: y - 1 });
            }
        }
        var neighbours = [];
        deltas.forEach(function (delta) {
            var indexX = index.x + delta.x;
            var indexY = index.y + delta.y;
            if (indexX < 0 || indexX > _this.grid.length - 1 ||
                indexY < 0 || indexY > _this.grid.length - 1) {
            }
            else {
                neighbours.push(_this.grid[indexY][indexX]);
            }
        });
        return neighbours;
    };
    GridService.prototype.getNeighbours = function (index, preserveOrder, noDiagonals, inputGrid) {
        if (preserveOrder === void 0) { preserveOrder = false; }
        if (noDiagonals === void 0) { noDiagonals = false; }
        if (inputGrid === void 0) { inputGrid = null; }
        var grid = inputGrid ? inputGrid : this.grid;
        var tile = grid[index.y][index.x];
        var allDeltas = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: 0 }, , { x: 1, y: 0 },
            { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
        ];
        var noDiagonalsDeltas = [
            ,
            { x: 0, y: -1 },
            { x: -1, y: 0 }, , { x: 1, y: 0 },
            { x: 0, y: 1 },
        ];
        var neighbours = [];
        if (!tile) {
            return neighbours;
        }
        var deltas = noDiagonals ? noDiagonalsDeltas : allDeltas;
        deltas.forEach(function (delta) {
            var indexX = index.x + delta.x;
            var indexY = index.y + delta.y;
            if (indexX < 0 || indexX > grid.length - 1 ||
                indexY < 0 || indexY > grid.length - 1) {
                if (preserveOrder)
                    neighbours.push(null);
            }
            else {
                neighbours.push(grid[indexY][indexX]);
            }
        });
        return neighbours;
    };
    GridService.prototype.findSelectedTileCrossNeighbours = function (tile) {
        return this.findCrossNeighbours(tile);
    };
    GridService.prototype.findCrossNeighbours = function (tile) {
        return this.getNeighbours(this.tileToIndex(tile), false, true);
    };
    return GridService;
}());
var gridService = null;
function gridServiceInit(gridSize) {
    gridService = new GridService(gridSize);
}



/***/ }),

/***/ "./Grid/MapGenerator.js":
/*!******************************!*\
  !*** ./Grid/MapGenerator.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GridService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GridService */ "./Grid/GridService.ts");
/* harmony import */ var _map_Tiles_Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../map/Tiles/Tile */ "./map/Tiles/Tile.js");



class MapGenerator {

  generate(gridSize) {
    let grid = []
    for(let h=0;h<gridSize;h++) {
      const row = [];
      for(let w=0;w<gridSize;w++) {
        row.push(new _map_Tiles_Tile__WEBPACK_IMPORTED_MODULE_1__["default"](w, h, 'blank'));
      }
      grid.push(row);
    }
    
    const seedTileCount = 80;
    for (let i=0;i < seedTileCount;i++) {
      const randomTile = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid.length)];
      randomTile.type = 'grass';
    }
    
    grid[Math.round(grid.length/2)][Math.round(grid.length/2)].type = 'grass';
      
    grid = this.dfa(gridSize, grid, this.growGrass);
    grid = this.dfa(gridSize, grid, this.growGrass);
    this.floodFill(grid, grid[Math.round(grid.length/2)][Math.round(grid.length/2)]);

    grid = this.dfa(gridSize, grid, this.smoothRule);
    grid = this.dfa(gridSize, grid, this.smoothRule);

    this.fillInHoles(grid);

    return grid;
  }

  floodFill(grid, start) {
    const stack = [start];

    while (stack.length > 0) {
      const tile = stack.pop();
      const neighbours = _GridService__WEBPACK_IMPORTED_MODULE_0__["gridService"].getNeighbours(_GridService__WEBPACK_IMPORTED_MODULE_0__["gridService"].tileToIndex(tile), false, false, grid);
      const waterNeighbours = neighbours.filter(x => x.type === 'water').length;
      const grassNeighbours = neighbours.filter(x => x.type === 'grass').length;
      
      if (Math.round(Math.random() * (waterNeighbours + grassNeighbours)) > waterNeighbours) {
        tile.type = 'grass';
      } else {
        tile.type = 'water';
      }
      neighbours.filter(x => x.type === 'blank').forEach(x => stack.push(x));
    }
  }

  dfa (gridSize, grid, rule) {
    const newGrid = [];

    for(let h=0;h < gridSize;h++) {
      const newRow = [];
      for(let w=0;w < gridSize;w++) {
        const tile = grid[h][w];
        const neighbours = _GridService__WEBPACK_IMPORTED_MODULE_0__["gridService"].getNeighbours(_GridService__WEBPACK_IMPORTED_MODULE_0__["gridService"].tileToIndex(tile), false, false, grid);

        const waterNeighbours = neighbours.filter(x => x.type === 'water').length;
        const grassNeighbours = neighbours.filter(x => x.type === 'grass').length;

        const copy = _map_Tiles_Tile__WEBPACK_IMPORTED_MODULE_1__["default"].copy(tile);
        copy.type = rule(copy, waterNeighbours, grassNeighbours);
        
        newRow.push(copy);
      }
      newGrid.push(newRow);
    }
    return newGrid;
  }

  smoothRule (tile, waterNeighbours, grassNeighbours) {
    if (tile.type === 'water' && grassNeighbours > 3) {
      return 'grass';
    }
    if (tile.type === 'grass' && waterNeighbours > 7) {
      return 'water';
    }
    return tile.type;
  }

  growGrass (tile, waterNeighbours, grassNeighbours) {
    if (tile.type === 'water' && grassNeighbours > 0) {
      return 'grass';
    }
    return tile.type;
  }

  fillInHoles(grid) {
    for(let y = 0; y < grid.length; y++) {
      for (let h = 0; h < grid[y].length; h++) {
        if (grid[y][h].type === 'blank') {
          grid[y][h].type = 'water';
        }
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (new MapGenerator());

/***/ }),

/***/ "./Map/Map.js":
/*!********************!*\
  !*** ./Map/Map.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mapEntities/Point */ "./mapEntities/Point.js");
/* harmony import */ var _mapEntities_City__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mapEntities/City */ "./mapEntities/City.ts");
/* harmony import */ var _mapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mapEntities/Unit */ "./mapEntities/Unit.ts");
/* harmony import */ var _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Grid/GridService */ "./Grid/GridService.ts");
/* harmony import */ var _mapEntities_Road__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mapEntities/Road */ "./mapEntities/Road.js");






class Map {
  
  constructor(size, tileNumber, context) {
    //  Draw grid of squares
    this.context = context;
    this.size = size;
    this.tileNumber = tileNumber;
    this.viewPortOrigin = new _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.origin = new _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.selectedTile = null;
    this.selectedEntity = null;

    Object(_Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridServiceInit"])(this.tileNumber);
    _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].createMap();

    this.clippedGrid = [];
    this.viewPortSize = size; //  how large the view port is
    this.zoomLevel = 40;  //  how many Tiles are in view port
    this.viewPortEnd = new _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](this.viewPortOrigin.x +  this.zoomLevel, this.viewPortOrigin.y +  this.zoomLevel);
     
    this.clippedGrid = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].createClippedGrid(this.viewPortOrigin, this.viewPortEnd);
    this.tileSize = this.viewPortSize / this.zoomLevel; //  should be view port size / view port content size
  }

  grid() {
    return _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].grid;
  }

  clickTile(x, y) {
    const tileX = Math.floor(x / this.tileSize);
    const tileY = Math.floor(y / this.tileSize);

    const tile = this.clippedGrid[tileY] && this.clippedGrid[tileY][tileX];

    if (tile) {  
      if (this.selectedTile) {
        this.selectedTile.selected = false;
      }
      if (tile.unit || tile.road || tile.city) {
        this.selectedEntity = tile.unit || tile.road || tile.city;
      } else {
        this.selectedEntity = null;
      }
      this.selectedTile = tile;
      tile.selected = true;
      this.draw();
    }

    return tile;
  }

  drag(diffX, diffY) {

    const minDrag = 1;
    if (Math.abs(diffX) > minDrag || Math.abs(diffY) > minDrag) {
      if (diffX > 0) {
        const sum = this.viewPortOrigin.x + Math.round(diffX);
        this.viewPortOrigin.x = Math.min(sum, this.tileNumber);
        this.viewPortEnd.x = this.viewPortOrigin.x + this.zoomLevel;
      } else {
        const sum = this.viewPortOrigin.x + Math.round(diffX);
        this.viewPortOrigin.x = Math.max(sum, 0);
        this.viewPortOrigin.x = this.viewPortOrigin.x + this.zoomLevel;
      }

      if (diffY > 0) {
        const sum = this.viewPortOrigin.y + Math.round(diffY);
        this.viewPortOrigin.y = Math.min(sum, this.tileNumber);
        this.viewPortOrigin.y = this.viewPortOrigin.y + this.zoomLevel;
      } else {
        const sum = this.viewPortOrigin.x + Math.round(diffY);
        this.viewPortOrigin.y = Math.max(sum, 0);
        this.viewPortOrigin.y = this.viewPortOrigin.y + this.zoomLevel;
      }
      
      this.updateView();
    }
  }

  moveUnit(unit, neighbour) {
    const originalTile = unit.tile;
    unit.tile = this.grid()[neighbour.point.y][neighbour.point.x];
    this.grid()[neighbour.point.y][neighbour.point.x].unit = unit;
    originalTile.unit = null;
    this.draw();
  }


  leftKey(){
    if (this.selectedEntity && this.selectedEntity instanceof _mapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      this.entityLeft();
    } else {
      this.panLeft();
    }
  }

  rightKey(){
    if (this.selectedEntity && this.selectedEntity instanceof _mapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      this.entityRight();
    } else {
      this.panRight();
    }
  }

  upKey(){
    if (this.selectedEntity && this.selectedEntity instanceof _mapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      this.entityUp();
    } else {
      this.panUp();
    }
  }

  downKey(){
    if (this.selectedEntity && this.selectedEntity instanceof _mapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      this.entityDown();
    } else {
      this.panDown();
    }
  }

  entityLeft() {
    const neighbour = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(this.selectedEntity.tile)[1];
    if (neighbour && neighbour.type !== 'water') {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }
  
  entityRight() {
    const neighbour = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(this.selectedEntity.tile)[2];
    if (neighbour && neighbour.type !== 'water') {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }
  
  entityUp() {
    const neighbour = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(this.selectedEntity.tile)[0];
    if (neighbour && neighbour.type !== 'water') {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }

  entityDown() {
    const neighbour = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(this.selectedEntity.Tile)[3];
    if (neighbour && neighbour.type !== 'water') {
      this.moveUnit(this.selectedEntity, neighbour);
    }
  }

  panLeft() {
    if (this.viewPortOrigin.x > 0) {
      this.viewPortOrigin.x--;
      this.viewPortEnd.x--;
      this.updateView();
    }
  }

  panRight() {
    if (this.viewPortOrigin.x + this.zoomLevel < this.tileNumber) {
      this.viewPortOrigin.x++;
      this.viewPortEnd.x++;
      this.updateView();
    }
  }

  panUp() {
    if (this.viewPortOrigin.y > 0) {
      this.viewPortOrigin.y--;
      this.viewPortEnd.y--;
      this.updateView();  
    }
  }

  panDown() {
    if (this.viewPortOrigin.y + this.zoomLevel < this.tileNumber) {
      this.viewPortOrigin.y++;
      this.viewPortEnd.y++;
      this.updateView();
    }
  }

  zoomOut() {
    if (this.zoomLevel < 100) {
      this.zoomLevel++;
      this.zoom();
    }
  }

  zoomIn() {
    if (this.zoomLevel > 1) {
      this.zoomLevel--;
      this.zoom();
    }
  }

  zoom() {
    this.viewPortEnd = new _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](this.viewPortOrigin.x +  this.zoomLevel, this.viewPortOrigin.y +  this.zoomLevel);
    this.tileSize = this.viewPortSize / this.zoomLevel;
    this.updateView();
  }

  updateView() {
    this.clippedGrid = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].createClippedGrid(this.viewPortOrigin, this.viewPortEnd);
    this.draw();
  }

  update() {
    console.log('update');
  }

  draw() {
    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, 0, this.size, this.size);
    this.context.fillStyle = '#000000';

    for(let h=0;h<this.clippedGrid.length;h++) {
      for(let w=0;w<this.clippedGrid[h].length;w++) {
        const tile = this.clippedGrid[h][w];
        if (tile && (tile.drawingPoint.x) <= this.viewPortEnd.x && (tile.drawingPoint.x) >= 0 && (tile.drawingPoint.y) >= 0 && tile.drawingPoint.y <= this.viewPortEnd.y) {
          if (tile.type === 'grass') {
            this.context.fillStyle = '#00FF00';
          }
          if (tile.type === 'water') {
            this.context.fillStyle = '#0000FF';
          }
          if (tile.type === 'blank') {
            this.context.fillStyle = '#FFFFFF';
          }
          this.context.fillRect(tile.drawingPoint.x * this.tileSize, tile.drawingPoint.y * this.tileSize, this.tileSize, this.tileSize);

          if (tile.selected) {
            this.context.strokeStyle = '#000000';
            this.context.strokeRect(tile.drawingPoint.x * this.tileSize, tile.drawingPoint.y * this.tileSize, this.tileSize, this.tileSize);
            this.context.strokeStyle = '#FFFFFF';
          }

          if (tile.city) {
            tile.city.draw(this.context, this.tileSize);
          }

          if (tile.road) {
            tile.road.draw(this.context, this.tileSize);
          }

          if (tile.unit) {
            tile.unit.draw(this.context, this.tileSize);
          }
        }
      }
    }
  }

  addUnitToSelectedTile() {
    if (_mapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"].add(this.selectedTile)) {
      this.draw();
    }
  }

  addRoadToSelectedTile() {
    if (_mapEntities_Road__WEBPACK_IMPORTED_MODULE_4__["default"].add(this.selectedTile)) {
      this.draw();
    }
  }

  addCityToSelectedTile() {
    if (_mapEntities_City__WEBPACK_IMPORTED_MODULE_1__["default"].add(this.selectedTile)) {
      this.draw();
    }
  }

  removeSelectedEntity() {
    if (!this.selectedEntity) {
      return;
    }

    const tile = this.selectedEntity.tile;
    const gridTile = this.grid()[tile.point.y][tile.point.x];

    if (this.selectedEntity instanceof _mapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      gridTile.unit = null;
    }

    const neighbours = this.selectedEntity.neighbours;
    if (this.selectedEntity instanceof _mapEntities_Road__WEBPACK_IMPORTED_MODULE_4__["default"]) {
      //  For each neighbour do a connectivity check and update connectedness
      //  Update networks roads.
      _mapEntities_Road__WEBPACK_IMPORTED_MODULE_4__["default"].remove(gridTile, this.selectedEntity);
      //  Find network that the road is connected to and it's neighbours and remove
      
    }
    
    if (this.selectedEntity instanceof _mapEntities_City__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      _mapEntities_City__WEBPACK_IMPORTED_MODULE_1__["default"].remove(gridTile);
    }

    this.selectedEntity = null;
    this.draw();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Map);


/***/ }),

/***/ "./generateGuid.js":
/*!*************************!*\
  !*** ./generateGuid.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function generateGuid() {
  return `${generateNumber()}-${generateNumber()}`;
}

function generateNumber() {
  return Math.floor((1 + Math.random()) * 0x10000);
}

/* harmony default export */ __webpack_exports__["default"] = (generateGuid);


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Map_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map/Map */ "./Map/Map.js");
/* harmony import */ var _mapEntities_Point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mapEntities/Point */ "./mapEntities/Point.js");



const canvas = document.createElement('canvas');
const size = 500;
const bodyMargin = 8;

canvas.width=size;
canvas.height=size;

document.getElementById('root').appendChild(canvas);
const context = canvas.getContext('2d');

const map = new _Map_Map__WEBPACK_IMPORTED_MODULE_0__["default"](size, 50, context);
map.draw();

//  Color in clicked square
canvas.addEventListener('click', (e) => {
  let { clientX , clientY } = e;
  clientX -= bodyMargin;
  clientY -= bodyMargin;
  
  const tile = map.clickTile(clientX, clientY);

  if (tile) {
    document.querySelector('#selectedTile').innerHTML = tile.toString()
      .split('')
      .map(x => x === '\n' ? '<br />' : x).join('');
  } else {
    document.querySelector('#selectedTile').innerHTML = '';
  }
});

//  Zoom in and out and drag
let dragState = 0;
const startDrag = new _mapEntities_Point__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);

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

   // map.drag(diffX, diffY);
    startDrag.x = 0;
    startDrag.y = 0;
  }
  dragState = dragStates.ENDED;
}, false);


window.addEventListener('keydown', e => {
  console.log(e.keyCode);
  if (e.keyCode === 37) {
    map.leftKey();
  }

  if (e.keyCode === 38) {
    map.upKey();
  }

  if (e.keyCode === 39) {
    map.rightKey();
  }

  if (e.keyCode === 40) {
    map.downKey();
  }

  if (e.keyCode === 107) {
    map.zoomIn();
  }

  if (e.keyCode === 109) {
    map.zoomOut();
  }

  if (e.keyCode === 82) {
    map.addRoadToSelectedTile();
  }

  if (e.keyCode === 67) {
    map.addCityToSelectedTile();
  }

  if (e.keyCode === 85) {
    map.addUnitToSelectedTile();
  }

  if (e.keyCode === 8 || e.keyCode === 46) {
    map.removeSelectedEntity();
  }
  console.log(e.keyCode);
});

document.querySelector('#addCity').addEventListener('click', () => {
  map.addCityToSelectedTile();
});

document.querySelector('#addRoad').addEventListener('click', () => {
  map.addRoadToSelectedTile();
});


//  Given an array of squares and a view port, find the squares in the viewport
//  Zooming changes how large you want to draw the squares but also the viewport
//  Dragging changes the viewport start.

/***/ }),

/***/ "./map/Tiles/Tile.js":
/*!***************************!*\
  !*** ./map/Tiles/Tile.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mapEntities/Point */ "./mapEntities/Point.js");
/* harmony import */ var _TileTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TileTypes */ "./map/Tiles/TileTypes.js");



class Tile {
  constructor(x,y, type) {
    this.point = new _mapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](x,y);
    this.selected = false;
    this.id = `${x}-${y}`;
    this.type = type;
  }

  equals(otherTile) {
    return this.point.equals(otherTile.point);
  }

  toString() {
    const tileDetails = `${this.point.x}, ${this.point.y}, ${this.type}`;
    let cityDetails = '';
    if (this.city) {
      cityDetails = this.city.toString();
    }
    let roadDetails = '';
    if (this.road) {
      roadDetails = `${this.road.toString()}\n${this.road.roadNetwork.toString()}`
    }

    const unitDetails = this.unit ? this.unit.toString() : '';
    return `${tileDetails} ${cityDetails} ${roadDetails} ${unitDetails}`;
  }
}

Tile.copy = function (tile, type = null) {
  let copy;
  if (!type) {
    copy =  new Tile(tile.point.x, tile.point.y, tile.type);
    copy.selected = copy.selected;
  }

  if (type === _TileTypes__WEBPACK_IMPORTED_MODULE_1__["default"].Grass) {
    copy = new GrassTile(tile.point.x, tile.point.y, tile.type);
    copy.selected = copy.selected;
  }
  
  if (type === _TileTypes__WEBPACK_IMPORTED_MODULE_1__["default"].Forest) {
    copy = new ForestTile(tile.point.x, tile.point.y, tile.type);
    copy.selected = copy.selected;
  }

  if (type === _TileTypes__WEBPACK_IMPORTED_MODULE_1__["default"].Ocean) {
    copy = new OceanTile(tile.point.x, tile.point.y, tile.type);
    copy.selected = copy.selected;
  }
  return copy;
}

/* harmony default export */ __webpack_exports__["default"] = (Tile);


/***/ }),

/***/ "./map/Tiles/TileTypes.js":
/*!********************************!*\
  !*** ./map/Tiles/TileTypes.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const TileTypes = {
  Grass: 'Grass',
  Forest: 'Forest',
  Ocean: 'Ocean',
}

/* harmony default export */ __webpack_exports__["default"] = (TileTypes);


/***/ }),

/***/ "./mapEntities/City.ts":
/*!*****************************!*\
  !*** ./mapEntities/City.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generateGuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generateGuid */ "./generateGuid.js");
/* harmony import */ var _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Grid/GridService */ "./Grid/GridService.ts");


var City = /** @class */ (function () {
    function City(tile, name, population) {
        var _this = this;
        this.type = 'city';
        this.id = Object(_generateGuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.tile = tile;
        this.name = name;
        this.population = population;
        this.distances = [];
        var neighbours = _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__["gridService"].findCrossNeighbours(tile)
            .filter(function (neighbour) { return neighbour.city || neighbour.road; })
            .map(function (x) { return x.road || x.city; });
        this.roadNetworks = [];
        neighbours.forEach(function (neighbour) {
            if (neighbour.type === 'road') {
                _this.addNetwork(neighbour.roadNetwork);
            }
        });
        neighbours.filter(function (x) { return x && x.road; }).forEach(function (neighbour) {
            neighbour.road.updateShape();
        });
    }
    City.prototype.equals = function (otherCity) {
        return otherCity.id === this.id;
    };
    City.prototype.draw = function (context, tileSize) {
        context.fillStyle = '#000000';
        var baseX = this.tile.drawingPoint.x * tileSize;
        var baseY = this.tile.drawingPoint.y * tileSize;
        context.fillRect(baseX, baseY + tileSize / 2, tileSize / 4, tileSize / 2);
        context.fillRect(baseX + tileSize / 4, baseY + tileSize / 4, tileSize / 2, 3 * tileSize / 4);
        context.fillRect(baseX + 3 * tileSize / 4, baseY + tileSize / 2, tileSize / 4, tileSize / 2);
    };
    City.prototype.toString = function () {
        var distances = this.distances.map(function (x) { return "Id: " + x.city.id + " distance: " + x.distance + "\n"; });
        return this.id + ": " + this.population + "\n " + distances;
    };
    City.prototype.addNetwork = function (network) {
        if (!this.roadNetworks.some(function (x) { return x.id === network.id; })) {
            this.roadNetworks.push(network);
            network.cities.push(this);
            network.findDistancesForCities();
        }
    };
    return City;
}());
City.remove = function (gridTile) {
    gridTile.city = null;
    //  Remove from neighbouring roadnetworks and recalculate networks
};
City.add = function (tile) {
    if (!tile)
        return false;
    if (tile.city || tile.road)
        return false;
    if (tile.type === 'water')
        return false;
    var neighbours = _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__["gridService"].getRegion(tile.point, 2);
    if (neighbours.filter(function (x) { return x.city; }).length > 0)
        return false;
    tile.city = new City(tile, 'New City', 1);
    return true;
};
/* harmony default export */ __webpack_exports__["default"] = (City);


/***/ }),

/***/ "./mapEntities/Point.js":
/*!******************************!*\
  !*** ./mapEntities/Point.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(otherPoint) {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Point);

/***/ }),

/***/ "./mapEntities/Road.js":
/*!*****************************!*\
  !*** ./mapEntities/Road.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RoadNetwork__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RoadNetwork */ "./mapEntities/RoadNetwork.js");
/* harmony import */ var _City__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./City */ "./mapEntities/City.ts");
/* harmony import */ var _generateGuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../generateGuid */ "./generateGuid.js");
/* harmony import */ var _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Grid/GridService */ "./Grid/GridService.ts");






const Shapes = {
  isolated: 'isolated',
  top: 'top',
  left: 'left',
  bottom: 'bottom',
  right: 'right',
  vertical: 'vertical',
  horizontal: 'horizontal',
  topRight: 'topRight',
  topLeft: 'topLeft',
  bottomRight: 'bottomRight',
  bottomLeft: 'bottomLeft',
  horizontalBottom: 'horizontalBottom',
  horizontalTop: 'horizontalTop',
  verticalLeft: 'verticalLeft',
  verticalRight: 'verticalRight',
  cross: 'cross'
};


class Road {
  constructor(tile) {
    this.type = 'road';
    this.id = Object(_generateGuid__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.tile = tile;

    let neighbours = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(tile);

    this.shape = Road.findShape(neighbours);
    neighbours = neighbours.filter(neighbour => neighbour.city || neighbour.road)
      .map(x => x.road || x.city);

    const neighbouringRoads = neighbours.filter(x => x instanceof Road)
    const neighbouringRoadNetworks = neighbouringRoads.map(x => x.roadNetwork);

    if (neighbouringRoadNetworks.length > 0) {
        this.mergeNetworks(neighbouringRoadNetworks);
    } else {
      this.roadNetwork = new _RoadNetwork__WEBPACK_IMPORTED_MODULE_0__["default"](this);
      this.roadNetwork.addRoad(this);
    }

    const neighbouringCities = neighbours.filter(x => x instanceof _City__WEBPACK_IMPORTED_MODULE_1__["default"]);
    neighbouringCities.forEach(city => {
      city.addNetwork(this.roadNetwork);
    });

    neighbouringRoads.forEach(road => {
      road.neighbours.push(this);
      road.shape = Road.findShape(road.neighbours);
    });
  }

  equals(otherRoad) {
    return this.tile.equals(otherRoad.tile);
  }

  toString() {
    return `${this.type}: ${this.shape}`;
  }
  
  mergeNetworks(networks) {
    const first = networks.pop();
    if (!this.roadNetwork) {
      first.addRoad(this);
      this.roadNetwork = first;
    }
    first.merge(networks);
  }

  updateShape() {
    const n = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(_Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].tileToIndex(neighbour));
    this.shape = Road.findShape(n);
  }

  drawHorizontal(context, tileSize) {
    context.fillRect(this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + 3*tileSize/8, tileSize, tileSize/4);
  }

  drawVertical(context, tileSize) {
    context.fillRect(this.tile.drawingPoint.x * tileSize + 3*tileSize/8, this.tile.drawingPoint.y * tileSize, tileSize/4, tileSize);
  }

  drawTop(context, tileSize) { 
    context.fillRect(this.tile.drawingPoint.x * tileSize + 3*tileSize/8, this.tile.drawingPoint.y * tileSize, tileSize/4, 5*tileSize/8);
  }
  
  drawBottom(context, tileSize) { 
    context.fillRect(this.tile.drawingPoint.x * tileSize + 3*tileSize/8, this.tile.drawingPoint.y * tileSize + 3*tileSize/8, tileSize/4, tileSize);
  }
  
  drawLeft(context, tileSize) { 
    context.fillRect(this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + 3*tileSize/8, 5*tileSize/8, tileSize/4);
  }
  
  drawRight(context, tileSize) { 
    context.fillRect(this.tile.drawingPoint.x * tileSize + tileSize/2, this.tile.drawingPoint.y * tileSize + 3*tileSize/8, 3*tileSize/4, tileSize/4);
  }

  draw(context, tileSize) {
    context.fillStyle = '#c48b23';

    switch (this.shape) {
      case Shapes.isolated:
        context.fillRect(this.tile.drawingPoint.x * tileSize + tileSize/2, this.tile.drawingPoint.y * tileSize + tileSize/2, tileSize/4, tileSize/4);
        break;
        
      case Shapes.vertical:
        this.drawVertical(context, tileSize);
        break;
      
      case Shapes.horizontal:
        this.drawHorizontal(context, tileSize);
        break;
        
      case Shapes.left:
        this.drawLeft(context, tileSize);
        break;

      case Shapes.right:
        this.drawRight(context, tileSize);
        break;

      case Shapes.top:
        this.drawTop(context, tileSize);
        break;

      case Shapes.bottom:
        this.drawBottom(context, tileSize);
        break;

      case Shapes.cross:
        this.drawVertical(context, tileSize);
        this.drawHorizontal(context, tileSize);
        break;

      case Shapes.topLeft:
        this.drawTop(context, tileSize);
        this.drawLeft(context, tileSize);
        break;

      case Shapes.topRight:
        this.drawTop(context, tileSize);
        this.drawRight(context, tileSize);
        break;

      case Shapes.bottomLeft:
        this.drawBottom(context, tileSize);
        this.drawLeft(context, tileSize);
        break;

      case Shapes.bottomRight:
        this.drawBottom(context, tileSize);
        this.drawRight(context, tileSize);
        break;

      case Shapes.verticalLeft:
        this.drawVertical(context, tileSize);
        this.drawLeft(context, tileSize);
        break;

      case Shapes.verticalRight:
        this.drawVertical(context, tileSize);
        this.drawRight(context, tileSize);
        break;

      case Shapes.horizontalTop:
        this.drawHorizontal(context, tileSize);
        this.drawTop(context, tileSize);
        break;

      case Shapes.horizontalBottom:
        this.drawHorizontal(context, tileSize);
        this.drawBottom(context, tileSize);
        break;
    }
  }
}

Road.remove = function (gridTile, road) {
  gridTile.road = null;

  //  Cases:
  //    single neighbouring road
  //      remove road from neighbour and from network
  //    multiple neighbouring roads
  //      remove road from neighbours 
  //      for each neighbouring network reprocess connectivity
  //    neighbouring city
  //      Remove road from neighbours
  //      process connectivity to check if the network should be removed
  road.neighbours.forEach(neighbour => {
    neighbour.neighbours = neighbour.neighbours.filter(x => x.id !== neighbour);
  })
}

Road.findConnectivity = function(roads) {
  // Idea is to perform a seperate bfs in step on each peace of road and check connectivity at each step
  // If two networks contain the same node then they are connected.

  const searches = roads.map(x => {
    const visited = {};
    visited[x.id] = true;
    return { isFinished: false, edgeSet: x.neighbours, visited, connected: [] };
  });

  while (searches.find(x => x.isFinished).length > 0) {
    console.log('Iteration 1');
    searches.forEach(x => x.finished = true);
  }
  //  Continue until all searches are complete.
  //  Test each iteration and stop search if necessary.
}

//  Save state 
Road.incrementalBfs = function() {

}


Road.findShape = function (neighbours) {
  const topNeighbour = (neighbours[0] && (neighbours[0].road || neighbours[0].city)) || null;
  const leftNeighbour = (neighbours[1] && (neighbours[1].road || neighbours[1].city)) || null;
  const rightNeighbour = (neighbours[2] && (neighbours[2].road || neighbours[2].city)) || null;
  const bottomNeighbour = (neighbours[3] && (neighbours[3].road || neighbours[3].city)) || null;

  let shape = Shapes.isolated;
  
  if (topNeighbour) {
    if (leftNeighbour) {
      if (rightNeighbour && bottomNeighbour) {
        shape = Shapes.cross;
        // [topNeighbour, leftNeighbour, rightNeighbour, bottomNeighbour].forEach(updateRoad);
      } else if (rightNeighbour) {
        shape = Shapes.horizontalTop;
      } else if (bottomNeighbour) {
        shape = Shapes.verticalLeft;
      } else {
        shape = Shapes.topLeft;
      }
    } else if (rightNeighbour) {
      if (bottomNeighbour) {
        shape = Shapes.verticalRight;
      } else {
        shape = Shapes.topRight;
      }
    } else {
      if (bottomNeighbour) {
        shape = Shapes.vertical;
      } else {
        shape = Shapes.top;
      }
    }
  } else if (bottomNeighbour) {
  if (leftNeighbour) {
    if (rightNeighbour) {
      shape = Shapes.horizontalBottom;
    } else {
      shape = Shapes.bottomLeft;
    }
  } else if (rightNeighbour) {
    shape = Shapes.bottomRight;
  } else {
    shape = Shapes.bottom;
  }
  } else if (leftNeighbour) {
    if (rightNeighbour) {
      shape = Shapes.horizontal;
    } else {
      shape = Shapes.left;
    }
  } else if (rightNeighbour) {
    shape = Shapes.right;
  }

  return shape;
}

Road.add = function (tile) {
  if (!tile) return false;

  if (tile.city || tile.road) return false;

  if (tile.type === 'water') return false;

  tile.road = new Road(tile);
  return true;
}

/* harmony default export */ __webpack_exports__["default"] = (Road);

/***/ }),

/***/ "./mapEntities/RoadNetwork.js":
/*!************************************!*\
  !*** ./mapEntities/RoadNetwork.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generateGuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generateGuid */ "./generateGuid.js");
/* harmony import */ var _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Grid/GridService */ "./Grid/GridService.ts");



class RoadNetwork {
  constructor(road = null, city = null) {
    this.id = Object(_generateGuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
    this.cities = [];
    this.roads = [];
  }

  addRoad(road) {
    this.roads.push(road);
    road.roadNetwork = this;
  }

  toString() {
    return `Id: ${this.id}, Cities: ${this.cities.length}, Roads: ${this.roads.length}`;
  }

  addCity(city) {
    this.cities.push(city);
    city.roadNetwork = this;
  }

  merge(networks) {
    networks.forEach(network => {
      network.cities.forEach(x => {
        if (!this.cities.find(city => city.equals(x))) {
          this.cities.push(x);
          x.roadNetwork = this;
        }
      });
  
      //  Should optimise - store roads as dictionary
      network.roads.forEach(x => {
        if (!this.roads.find(road => road.equals(x))) {
          this.roads.push(x);
          x.roadNetwork = this;
        }
      });
    });
    
   this.findDistancesForCities();
  }

  findDistancesForCities() {
    //  For each city to a bfs and find neighbours.
    this.cities.forEach(city => {
      this.findDistances(city);
    });
  }


  findDistances(city) {
    const distances = [];
    let neighbours = _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__["gridService"].findCrossNeighbours(city.tile).map(node => ({node, distance: 0 }));
    const visited = {};
    visited[city.id] = true;

    while(neighbours.length !== 0) {
      //  visit each neighbour
      const neighbour = neighbours.pop();
      if (neighbour.node.type === 'city') {
        distances.push({city, distance: neighbour.distance });
      } else {
        visited[neighbour.node.id] = true;
        const neighboursNeighbours = _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__["gridService"].findCrossNeighbours(neighbour.node)
            .filter(x => !visited[x.id])
          .map(x => ({ node: x, distance: neighbour.distance + 1 }));
        neighbours = neighbours.concat(neighboursNeighbours);
      }
    }
    city.distances = distances;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RoadNetwork);


/***/ }),

/***/ "./mapEntities/Unit.ts":
/*!*****************************!*\
  !*** ./mapEntities/Unit.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Unit = /** @class */ (function () {
    function Unit(tile, name) {
        this.tile = tile;
        this.name = name;
    }
    Unit.prototype.draw = function (context, tileSize) {
        context.fillStyle = '#FF0000';
        context.fillRect(this.tile.drawingPoint.x * tileSize + tileSize / 4, this.tile.drawingPoint.y * tileSize + tileSize / 4, tileSize / 2, 3 * tileSize / 4);
    };
    Unit.prototype.toString = function () {
        return "Unit: " + this.name;
    };
    return Unit;
}());
Unit.add = function (selectedTile) {
    if (!selectedTile)
        return false;
    if (selectedTile.city || selectedTile.road || selectedTile.unit)
        return false;
    if (selectedTile.type === 'water')
        return false;
    selectedTile.unit = new Unit(selectedTile, 'New Unit');
    return true;
};
/* harmony default export */ __webpack_exports__["default"] = (Unit);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vR3JpZC9HcmlkU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9HcmlkL01hcEdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9NYXAvTWFwLmpzIiwid2VicGFjazovLy8uL2dlbmVyYXRlR3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9tYXAvVGlsZXMvVGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9tYXAvVGlsZXMvVGlsZVR5cGVzLmpzIiwid2VicGFjazovLy8uL21hcEVudGl0aWVzL0NpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vbWFwRW50aXRpZXMvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbWFwRW50aXRpZXMvUm9hZC5qcyIsIndlYnBhY2s6Ly8vLi9tYXBFbnRpdGllcy9Sb2FkTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9tYXBFbnRpdGllcy9Vbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FB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O0lBRWhDLElBQUksWUFBWSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFOUUsSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLE9BQU87UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNoRCxZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUV2RCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFDYyxtRUFBSSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBQb2ludCBmcm9tICcuLi9tYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCBtYXBHZW5lcmF0b3IgZnJvbSAnLi9NYXBHZW5lcmF0b3InO1xyXG5cclxuY2xhc3MgR3JpZFNlcnZpY2Uge1xyXG4gIGdyaWRTaXplOiBudW1iZXI7XHJcbiAgZ3JpZDogYW55W107XHJcbiAgY29uc3RydWN0b3IoZ3JpZFNpemU6IG51bWJlcikge1xyXG4gICAgdGhpcy5ncmlkU2l6ZSA9IGdyaWRTaXplO1xyXG4gICAgdGhpcy5ncmlkID0gW107XHJcbiAgfVxyXG5cclxuICBjcmVhdGVNYXAoKSB7XHJcbiAgICB0aGlzLmdyaWQgPSBtYXBHZW5lcmF0b3IuZ2VuZXJhdGUodGhpcy5ncmlkU2l6ZSk7XHJcbiAgfVxyXG5cclxuICAvLyAgdG9kbyAtIGNoYW5nZSB0aGVzZSB0byBwb2ludHNcclxuICBjcmVhdGVDbGlwcGVkR3JpZCh2aWV3UG9ydE9yaWdpbjogYW55LCB2aWV3UG9ydEVuZDogYW55KSB7XHJcbiAgICBjb25zdCBuZXdncmlkID0gW107XHJcbiAgICBjb25zdCBzdGFydFBvaW50ID0gbmV3IFBvaW50KHZpZXdQb3J0T3JpZ2luLngsIHZpZXdQb3J0T3JpZ2luLnkpO1xyXG4gICAgY29uc3QgZW5kUG9pbnQgPSBuZXcgUG9pbnQodmlld1BvcnRFbmQueCwgdmlld1BvcnRFbmQueSk7XHJcbiAgICBcclxuICAgIGZvciAobGV0IHkgPSBzdGFydFBvaW50Lnk7eSA8PSBlbmRQb2ludC55O3krKykge1xyXG4gICAgICBjb25zdCBuZXdyb3cgPSBbXTtcclxuICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkW3ldO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IHN0YXJ0UG9pbnQueDsgeCA8PSBlbmRQb2ludC54OyB4KyspIHtcclxuICAgICAgICBjb25zdCB0aWxlID0gcm93W3hdO1xyXG5cclxuICAgICAgICAgIGlmICh0aWxlICYmIHRpbGUucG9pbnQpIHtcclxuICAgICAgICAgICAgdGlsZS5kcmF3aW5nUG9pbnQgPSBuZXcgUG9pbnQodGlsZS5wb2ludC54LCB0aWxlLnBvaW50LnkpO1xyXG4gICAgICAgICAgICB0aWxlLmRyYXdpbmdQb2ludC54ID0geCAtIHN0YXJ0UG9pbnQueDtcclxuICAgICAgICAgICAgdGlsZS5kcmF3aW5nUG9pbnQueSA9IHkgLSBzdGFydFBvaW50Lnk7XHJcbiAgICAgICAgICAgIG5ld3Jvdy5wdXNoKHRpbGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSAgXHJcbiAgICAgIG5ld2dyaWQucHVzaChuZXdyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld2dyaWQ7XHJcbiAgfVxyXG4gIFxyXG4gIHRpbGVUb0luZGV4ICh0aWxlOiBhbnkpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGlsZS5wb2ludC54LCB0aWxlLnBvaW50LnkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVnaW9uKGluZGV4OiBhbnksIHJhZGl1czogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkZWx0YXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCB4PTA7eDxyYWRpdXMqMisxO3grKykge1xyXG4gICAgICBmb3IgKGxldCB5PTA7eSA8IHJhZGl1cyoyKzE7IHkrKykge1xyXG4gICAgICAgIGRlbHRhcy5wdXNoKHsgeDogeCAtIDEsIHk6IHkgLTEgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJzOiBhbnlbXSA9IFtdO1xyXG4gICAgZGVsdGFzLmZvckVhY2goZGVsdGEgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleFggPSBpbmRleC54ICsgZGVsdGEueDtcclxuICAgICAgY29uc3QgaW5kZXhZID0gaW5kZXgueSArIGRlbHRhLnk7XHJcblxyXG4gICAgICBpZiAoaW5kZXhYIDwgMCB8fCBpbmRleFggPiB0aGlzLmdyaWQubGVuZ3RoLTEgfHxcclxuICAgICAgICAgIGluZGV4WSA8IDAgfHwgaW5kZXhZID4gdGhpcy5ncmlkLmxlbmd0aC0xKSB7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmVpZ2hib3Vycy5wdXNoKHRoaXMuZ3JpZFtpbmRleFldW2luZGV4WF0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3VycztcclxuICB9XHJcblxyXG4gIGdldE5laWdoYm91cnMoaW5kZXg6IFBvaW50LCBwcmVzZXJ2ZU9yZGVyID0gZmFsc2UsIG5vRGlhZ29uYWxzID0gZmFsc2UsIGlucHV0R3JpZDogYW55ID0gbnVsbCkge1xyXG4gICAgbGV0IGdyaWQgPSBpbnB1dEdyaWQgPyBpbnB1dEdyaWQgOiB0aGlzLmdyaWQ7XHJcbiAgICBjb25zdCB0aWxlID0gZ3JpZFtpbmRleC55XVtpbmRleC54XTtcclxuICAgIGNvbnN0IGFsbERlbHRhcyA9IFtcclxuICAgICAgeyB4Oi0xLCB5OiAtMSB9LCB7eDogMCwgeTogLTF9LCAgeyB4OiAxLCB5OiAtMX0sXHJcbiAgICAgIHsgeDotMSwgeTogIDAgfSwgICAgICAgICAgICAgICwgIHsgeDogMSwgeTogIDB9LFxyXG4gICAgICB7IHg6LTEsIHk6ICAxIH0sIHt4OiAwLCB5OiAgMSB9LCB7IHg6IDEsIHk6ICAxfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qgbm9EaWFnb25hbHNEZWx0YXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICwgeyB4OiAwLCB5OiAtMSB9LCAgXHJcbiAgICAgIHsgeDotMSwgeTogIDAgfSwgICAgICAgICAgICAgICwgIHsgeDogMSwgeTogIDB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgeTogIDEgfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgbmVpZ2hib3VyczogYW55W10gPSBbXTtcclxuICAgIGlmICghdGlsZSkge1xyXG4gICAgICByZXR1cm4gbmVpZ2hib3VycztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWx0YXMgPSBub0RpYWdvbmFscyA/IG5vRGlhZ29uYWxzRGVsdGFzIDogYWxsRGVsdGFzO1xyXG4gICAgZGVsdGFzLmZvckVhY2goZGVsdGEgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleFggPSBpbmRleC54ICsgZGVsdGEueDtcclxuICAgICAgY29uc3QgaW5kZXhZID0gaW5kZXgueSArIGRlbHRhLnk7XHJcblxyXG4gICAgICBpZiAoaW5kZXhYIDwgMCB8fCBpbmRleFggPiBncmlkLmxlbmd0aC0xIHx8XHJcbiAgICAgICAgICBpbmRleFkgPCAwIHx8IGluZGV4WSA+IGdyaWQubGVuZ3RoLTEpIHtcclxuICAgICAgICAgIGlmIChwcmVzZXJ2ZU9yZGVyKSBuZWlnaGJvdXJzLnB1c2gobnVsbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmVpZ2hib3Vycy5wdXNoKGdyaWRbaW5kZXhZXVtpbmRleFhdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5laWdoYm91cnM7XHJcbiAgfVxyXG5cclxuICBmaW5kU2VsZWN0ZWRUaWxlQ3Jvc3NOZWlnaGJvdXJzKHRpbGU6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZENyb3NzTmVpZ2hib3Vycyh0aWxlKTtcclxuICB9XHJcblxyXG4gIGZpbmRDcm9zc05laWdoYm91cnModGlsZTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXROZWlnaGJvdXJzKHRoaXMudGlsZVRvSW5kZXgodGlsZSksIGZhbHNlLCB0cnVlKTtcclxuICB9XHJcbn1cclxuXHJcbmxldCBncmlkU2VydmljZTogR3JpZFNlcnZpY2UgPSBudWxsO1xyXG5mdW5jdGlvbiBncmlkU2VydmljZUluaXQoZ3JpZFNpemU6IG51bWJlcikge1xyXG4gIGdyaWRTZXJ2aWNlID0gbmV3IEdyaWRTZXJ2aWNlKGdyaWRTaXplKTtcclxufVxyXG5cclxuZXhwb3J0IHsgZ3JpZFNlcnZpY2UsIGdyaWRTZXJ2aWNlSW5pdCB9O1xyXG4iLCJpbXBvcnQgeyBncmlkU2VydmljZSB9IGZyb20gJy4vR3JpZFNlcnZpY2UnO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuLi9tYXAvVGlsZXMvVGlsZSc7XHJcblxyXG5jbGFzcyBNYXBHZW5lcmF0b3Ige1xyXG5cclxuICBnZW5lcmF0ZShncmlkU2l6ZSkge1xyXG4gICAgbGV0IGdyaWQgPSBbXVxyXG4gICAgZm9yKGxldCBoPTA7aDxncmlkU2l6ZTtoKyspIHtcclxuICAgICAgY29uc3Qgcm93ID0gW107XHJcbiAgICAgIGZvcihsZXQgdz0wO3c8Z3JpZFNpemU7dysrKSB7XHJcbiAgICAgICAgcm93LnB1c2gobmV3IFRpbGUodywgaCwgJ2JsYW5rJykpO1xyXG4gICAgICB9XHJcbiAgICAgIGdyaWQucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBzZWVkVGlsZUNvdW50ID0gODA7XHJcbiAgICBmb3IgKGxldCBpPTA7aSA8IHNlZWRUaWxlQ291bnQ7aSsrKSB7XHJcbiAgICAgIGNvbnN0IHJhbmRvbVRpbGUgPSBncmlkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdyaWQubGVuZ3RoKV1bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JpZC5sZW5ndGgpXTtcclxuICAgICAgcmFuZG9tVGlsZS50eXBlID0gJ2dyYXNzJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ3JpZFtNYXRoLnJvdW5kKGdyaWQubGVuZ3RoLzIpXVtNYXRoLnJvdW5kKGdyaWQubGVuZ3RoLzIpXS50eXBlID0gJ2dyYXNzJztcclxuICAgICAgXHJcbiAgICBncmlkID0gdGhpcy5kZmEoZ3JpZFNpemUsIGdyaWQsIHRoaXMuZ3Jvd0dyYXNzKTtcclxuICAgIGdyaWQgPSB0aGlzLmRmYShncmlkU2l6ZSwgZ3JpZCwgdGhpcy5ncm93R3Jhc3MpO1xyXG4gICAgdGhpcy5mbG9vZEZpbGwoZ3JpZCwgZ3JpZFtNYXRoLnJvdW5kKGdyaWQubGVuZ3RoLzIpXVtNYXRoLnJvdW5kKGdyaWQubGVuZ3RoLzIpXSk7XHJcblxyXG4gICAgZ3JpZCA9IHRoaXMuZGZhKGdyaWRTaXplLCBncmlkLCB0aGlzLnNtb290aFJ1bGUpO1xyXG4gICAgZ3JpZCA9IHRoaXMuZGZhKGdyaWRTaXplLCBncmlkLCB0aGlzLnNtb290aFJ1bGUpO1xyXG5cclxuICAgIHRoaXMuZmlsbEluSG9sZXMoZ3JpZCk7XHJcblxyXG4gICAgcmV0dXJuIGdyaWQ7XHJcbiAgfVxyXG5cclxuICBmbG9vZEZpbGwoZ3JpZCwgc3RhcnQpIHtcclxuICAgIGNvbnN0IHN0YWNrID0gW3N0YXJ0XTtcclxuXHJcbiAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCB0aWxlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgIGNvbnN0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5nZXROZWlnaGJvdXJzKGdyaWRTZXJ2aWNlLnRpbGVUb0luZGV4KHRpbGUpLCBmYWxzZSwgZmFsc2UsIGdyaWQpO1xyXG4gICAgICBjb25zdCB3YXRlck5laWdoYm91cnMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHgudHlwZSA9PT0gJ3dhdGVyJykubGVuZ3RoO1xyXG4gICAgICBjb25zdCBncmFzc05laWdoYm91cnMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHgudHlwZSA9PT0gJ2dyYXNzJykubGVuZ3RoO1xyXG4gICAgICBcclxuICAgICAgaWYgKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh3YXRlck5laWdoYm91cnMgKyBncmFzc05laWdoYm91cnMpKSA+IHdhdGVyTmVpZ2hib3Vycykge1xyXG4gICAgICAgIHRpbGUudHlwZSA9ICdncmFzcyc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGlsZS50eXBlID0gJ3dhdGVyJztcclxuICAgICAgfVxyXG4gICAgICBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHgudHlwZSA9PT0gJ2JsYW5rJykuZm9yRWFjaCh4ID0+IHN0YWNrLnB1c2goeCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGZhIChncmlkU2l6ZSwgZ3JpZCwgcnVsZSkge1xyXG4gICAgY29uc3QgbmV3R3JpZCA9IFtdO1xyXG5cclxuICAgIGZvcihsZXQgaD0wO2ggPCBncmlkU2l6ZTtoKyspIHtcclxuICAgICAgY29uc3QgbmV3Um93ID0gW107XHJcbiAgICAgIGZvcihsZXQgdz0wO3cgPCBncmlkU2l6ZTt3KyspIHtcclxuICAgICAgICBjb25zdCB0aWxlID0gZ3JpZFtoXVt3XTtcclxuICAgICAgICBjb25zdCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZ2V0TmVpZ2hib3VycyhncmlkU2VydmljZS50aWxlVG9JbmRleCh0aWxlKSwgZmFsc2UsIGZhbHNlLCBncmlkKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd2F0ZXJOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09ICd3YXRlcicpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBncmFzc05laWdoYm91cnMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHgudHlwZSA9PT0gJ2dyYXNzJykubGVuZ3RoO1xyXG5cclxuICAgICAgICBjb25zdCBjb3B5ID0gVGlsZS5jb3B5KHRpbGUpO1xyXG4gICAgICAgIGNvcHkudHlwZSA9IHJ1bGUoY29weSwgd2F0ZXJOZWlnaGJvdXJzLCBncmFzc05laWdoYm91cnMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5ld1Jvdy5wdXNoKGNvcHkpO1xyXG4gICAgICB9XHJcbiAgICAgIG5ld0dyaWQucHVzaChuZXdSb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0dyaWQ7XHJcbiAgfVxyXG5cclxuICBzbW9vdGhSdWxlICh0aWxlLCB3YXRlck5laWdoYm91cnMsIGdyYXNzTmVpZ2hib3Vycykge1xyXG4gICAgaWYgKHRpbGUudHlwZSA9PT0gJ3dhdGVyJyAmJiBncmFzc05laWdoYm91cnMgPiAzKSB7XHJcbiAgICAgIHJldHVybiAnZ3Jhc3MnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRpbGUudHlwZSA9PT0gJ2dyYXNzJyAmJiB3YXRlck5laWdoYm91cnMgPiA3KSB7XHJcbiAgICAgIHJldHVybiAnd2F0ZXInO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRpbGUudHlwZTtcclxuICB9XHJcblxyXG4gIGdyb3dHcmFzcyAodGlsZSwgd2F0ZXJOZWlnaGJvdXJzLCBncmFzc05laWdoYm91cnMpIHtcclxuICAgIGlmICh0aWxlLnR5cGUgPT09ICd3YXRlcicgJiYgZ3Jhc3NOZWlnaGJvdXJzID4gMCkge1xyXG4gICAgICByZXR1cm4gJ2dyYXNzJztcclxuICAgIH1cclxuICAgIHJldHVybiB0aWxlLnR5cGU7XHJcbiAgfVxyXG5cclxuICBmaWxsSW5Ib2xlcyhncmlkKSB7XHJcbiAgICBmb3IobGV0IHkgPSAwOyB5IDwgZ3JpZC5sZW5ndGg7IHkrKykge1xyXG4gICAgICBmb3IgKGxldCBoID0gMDsgaCA8IGdyaWRbeV0ubGVuZ3RoOyBoKyspIHtcclxuICAgICAgICBpZiAoZ3JpZFt5XVtoXS50eXBlID09PSAnYmxhbmsnKSB7XHJcbiAgICAgICAgICBncmlkW3ldW2hdLnR5cGUgPSAnd2F0ZXInO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IE1hcEdlbmVyYXRvcigpOyIsImltcG9ydCBQb2ludCBmcm9tICcuLi9tYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCBDaXR5IGZyb20gJy4uL21hcEVudGl0aWVzL0NpdHknO1xyXG5pbXBvcnQgVW5pdCBmcm9tICcuLi9tYXBFbnRpdGllcy9Vbml0JztcclxuaW1wb3J0IHsgZ3JpZFNlcnZpY2UsIGdyaWRTZXJ2aWNlSW5pdCB9IGZyb20gJy4uL0dyaWQvR3JpZFNlcnZpY2UnO1xyXG5pbXBvcnQgUm9hZCBmcm9tICcuLi9tYXBFbnRpdGllcy9Sb2FkJztcclxuXHJcbmNsYXNzIE1hcCB7XHJcbiAgXHJcbiAgY29uc3RydWN0b3Ioc2l6ZSwgdGlsZU51bWJlciwgY29udGV4dCkge1xyXG4gICAgLy8gIERyYXcgZ3JpZCBvZiBzcXVhcmVzXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIHRoaXMudGlsZU51bWJlciA9IHRpbGVOdW1iZXI7XHJcbiAgICB0aGlzLnZpZXdQb3J0T3JpZ2luID0gbmV3IFBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5vcmlnaW4gPSBuZXcgUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGlsZSA9IG51bGw7XHJcbiAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcclxuXHJcbiAgICBncmlkU2VydmljZUluaXQodGhpcy50aWxlTnVtYmVyKTtcclxuICAgIGdyaWRTZXJ2aWNlLmNyZWF0ZU1hcCgpO1xyXG5cclxuICAgIHRoaXMuY2xpcHBlZEdyaWQgPSBbXTtcclxuICAgIHRoaXMudmlld1BvcnRTaXplID0gc2l6ZTsgLy8gIGhvdyBsYXJnZSB0aGUgdmlldyBwb3J0IGlzXHJcbiAgICB0aGlzLnpvb21MZXZlbCA9IDQwOyAgLy8gIGhvdyBtYW55IFRpbGVzIGFyZSBpbiB2aWV3IHBvcnRcclxuICAgIHRoaXMudmlld1BvcnRFbmQgPSBuZXcgUG9pbnQodGhpcy52aWV3UG9ydE9yaWdpbi54ICsgIHRoaXMuem9vbUxldmVsLCB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyAgdGhpcy56b29tTGV2ZWwpO1xyXG4gICAgIFxyXG4gICAgdGhpcy5jbGlwcGVkR3JpZCA9IGdyaWRTZXJ2aWNlLmNyZWF0ZUNsaXBwZWRHcmlkKHRoaXMudmlld1BvcnRPcmlnaW4sIHRoaXMudmlld1BvcnRFbmQpO1xyXG4gICAgdGhpcy50aWxlU2l6ZSA9IHRoaXMudmlld1BvcnRTaXplIC8gdGhpcy56b29tTGV2ZWw7IC8vICBzaG91bGQgYmUgdmlldyBwb3J0IHNpemUgLyB2aWV3IHBvcnQgY29udGVudCBzaXplXHJcbiAgfVxyXG5cclxuICBncmlkKCkge1xyXG4gICAgcmV0dXJuIGdyaWRTZXJ2aWNlLmdyaWQ7XHJcbiAgfVxyXG5cclxuICBjbGlja1RpbGUoeCwgeSkge1xyXG4gICAgY29uc3QgdGlsZVggPSBNYXRoLmZsb29yKHggLyB0aGlzLnRpbGVTaXplKTtcclxuICAgIGNvbnN0IHRpbGVZID0gTWF0aC5mbG9vcih5IC8gdGhpcy50aWxlU2l6ZSk7XHJcblxyXG4gICAgY29uc3QgdGlsZSA9IHRoaXMuY2xpcHBlZEdyaWRbdGlsZVldICYmIHRoaXMuY2xpcHBlZEdyaWRbdGlsZVldW3RpbGVYXTtcclxuXHJcbiAgICBpZiAodGlsZSkgeyAgXHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGlsZSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaWxlLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRpbGUudW5pdCB8fCB0aWxlLnJvYWQgfHwgdGlsZS5jaXR5KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEVudGl0eSA9IHRpbGUudW5pdCB8fCB0aWxlLnJvYWQgfHwgdGlsZS5jaXR5O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUaWxlID0gdGlsZTtcclxuICAgICAgdGlsZS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aWxlO1xyXG4gIH1cclxuXHJcbiAgZHJhZyhkaWZmWCwgZGlmZlkpIHtcclxuXHJcbiAgICBjb25zdCBtaW5EcmFnID0gMTtcclxuICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPiBtaW5EcmFnIHx8IE1hdGguYWJzKGRpZmZZKSA+IG1pbkRyYWcpIHtcclxuICAgICAgaWYgKGRpZmZYID4gMCkge1xyXG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIE1hdGgucm91bmQoZGlmZlgpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCA9IE1hdGgubWluKHN1bSwgdGhpcy50aWxlTnVtYmVyKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0RW5kLnggPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyB0aGlzLnpvb21MZXZlbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBzdW0gPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyBNYXRoLnJvdW5kKGRpZmZYKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnggPSBNYXRoLm1heChzdW0sIDApO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIHRoaXMuem9vbUxldmVsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGlmZlkgPiAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy52aWV3UG9ydE9yaWdpbi55ICsgTWF0aC5yb3VuZChkaWZmWSk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55ID0gTWF0aC5taW4oc3VtLCB0aGlzLnRpbGVOdW1iZXIpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueSArIHRoaXMuem9vbUxldmVsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIE1hdGgucm91bmQoZGlmZlkpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueSA9IE1hdGgubWF4KHN1bSwgMCk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55ID0gdGhpcy52aWV3UG9ydE9yaWdpbi55ICsgdGhpcy56b29tTGV2ZWw7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZVVuaXQodW5pdCwgbmVpZ2hib3VyKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbFRpbGUgPSB1bml0LnRpbGU7XHJcbiAgICB1bml0LnRpbGUgPSB0aGlzLmdyaWQoKVtuZWlnaGJvdXIucG9pbnQueV1bbmVpZ2hib3VyLnBvaW50LnhdO1xyXG4gICAgdGhpcy5ncmlkKClbbmVpZ2hib3VyLnBvaW50LnldW25laWdoYm91ci5wb2ludC54XS51bml0ID0gdW5pdDtcclxuICAgIG9yaWdpbmFsVGlsZS51bml0ID0gbnVsbDtcclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxuXHJcblxyXG4gIGxlZnRLZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5TGVmdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5MZWZ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByaWdodEtleSgpe1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgJiYgdGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIFVuaXQpIHtcclxuICAgICAgdGhpcy5lbnRpdHlSaWdodCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5SaWdodCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBLZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5VXAoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuVXAoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvd25LZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5RG93bigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5Eb3duKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbnRpdHlMZWZ0KCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGUpWzFdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gJ3dhdGVyJykge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGVudGl0eVJpZ2h0KCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGUpWzJdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gJ3dhdGVyJykge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGVudGl0eVVwKCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGUpWzBdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gJ3dhdGVyJykge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbnRpdHlEb3duKCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LlRpbGUpWzNdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gJ3dhdGVyJykge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYW5MZWZ0KCkge1xyXG4gICAgaWYgKHRoaXMudmlld1BvcnRPcmlnaW4ueCA+IDApIHtcclxuICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi54LS07XHJcbiAgICAgIHRoaXMudmlld1BvcnRFbmQueC0tO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhblJpZ2h0KCkge1xyXG4gICAgaWYgKHRoaXMudmlld1BvcnRPcmlnaW4ueCArIHRoaXMuem9vbUxldmVsIDwgdGhpcy50aWxlTnVtYmVyKSB7XHJcbiAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCsrO1xyXG4gICAgICB0aGlzLnZpZXdQb3J0RW5kLngrKztcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYW5VcCgpIHtcclxuICAgIGlmICh0aGlzLnZpZXdQb3J0T3JpZ2luLnkgPiAwKSB7XHJcbiAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueS0tO1xyXG4gICAgICB0aGlzLnZpZXdQb3J0RW5kLnktLTtcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7ICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhbkRvd24oKSB7XHJcbiAgICBpZiAodGhpcy52aWV3UG9ydE9yaWdpbi55ICsgdGhpcy56b29tTGV2ZWwgPCB0aGlzLnRpbGVOdW1iZXIpIHtcclxuICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55Kys7XHJcbiAgICAgIHRoaXMudmlld1BvcnRFbmQueSsrO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHpvb21PdXQoKSB7XHJcbiAgICBpZiAodGhpcy56b29tTGV2ZWwgPCAxMDApIHtcclxuICAgICAgdGhpcy56b29tTGV2ZWwrKztcclxuICAgICAgdGhpcy56b29tKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB6b29tSW4oKSB7XHJcbiAgICBpZiAodGhpcy56b29tTGV2ZWwgPiAxKSB7XHJcbiAgICAgIHRoaXMuem9vbUxldmVsLS07XHJcbiAgICAgIHRoaXMuem9vbSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgem9vbSgpIHtcclxuICAgIHRoaXMudmlld1BvcnRFbmQgPSBuZXcgUG9pbnQodGhpcy52aWV3UG9ydE9yaWdpbi54ICsgIHRoaXMuem9vbUxldmVsLCB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyAgdGhpcy56b29tTGV2ZWwpO1xyXG4gICAgdGhpcy50aWxlU2l6ZSA9IHRoaXMudmlld1BvcnRTaXplIC8gdGhpcy56b29tTGV2ZWw7XHJcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVZpZXcoKSB7XHJcbiAgICB0aGlzLmNsaXBwZWRHcmlkID0gZ3JpZFNlcnZpY2UuY3JlYXRlQ2xpcHBlZEdyaWQodGhpcy52aWV3UG9ydE9yaWdpbiwgdGhpcy52aWV3UG9ydEVuZCk7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCd1cGRhdGUnKTtcclxuICB9XHJcblxyXG4gIGRyYXcoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XHJcblxyXG4gICAgZm9yKGxldCBoPTA7aDx0aGlzLmNsaXBwZWRHcmlkLmxlbmd0aDtoKyspIHtcclxuICAgICAgZm9yKGxldCB3PTA7dzx0aGlzLmNsaXBwZWRHcmlkW2hdLmxlbmd0aDt3KyspIHtcclxuICAgICAgICBjb25zdCB0aWxlID0gdGhpcy5jbGlwcGVkR3JpZFtoXVt3XTtcclxuICAgICAgICBpZiAodGlsZSAmJiAodGlsZS5kcmF3aW5nUG9pbnQueCkgPD0gdGhpcy52aWV3UG9ydEVuZC54ICYmICh0aWxlLmRyYXdpbmdQb2ludC54KSA+PSAwICYmICh0aWxlLmRyYXdpbmdQb2ludC55KSA+PSAwICYmIHRpbGUuZHJhd2luZ1BvaW50LnkgPD0gdGhpcy52aWV3UG9ydEVuZC55KSB7XHJcbiAgICAgICAgICBpZiAodGlsZS50eXBlID09PSAnZ3Jhc3MnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzAwRkYwMCc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGlsZS50eXBlID09PSAnd2F0ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDBGRic7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGlsZS50eXBlID09PSAnYmxhbmsnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnI0ZGRkZGRic7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGlsZS5kcmF3aW5nUG9pbnQueCAqIHRoaXMudGlsZVNpemUsIHRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuXHJcbiAgICAgICAgICBpZiAodGlsZS5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VSZWN0KHRpbGUuZHJhd2luZ1BvaW50LnggKiB0aGlzLnRpbGVTaXplLCB0aWxlLmRyYXdpbmdQb2ludC55ICogdGhpcy50aWxlU2l6ZSwgdGhpcy50aWxlU2l6ZSwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9ICcjRkZGRkZGJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGlsZS5jaXR5KSB7XHJcbiAgICAgICAgICAgIHRpbGUuY2l0eS5kcmF3KHRoaXMuY29udGV4dCwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRpbGUucm9hZCkge1xyXG4gICAgICAgICAgICB0aWxlLnJvYWQuZHJhdyh0aGlzLmNvbnRleHQsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aWxlLnVuaXQpIHtcclxuICAgICAgICAgICAgdGlsZS51bml0LmRyYXcodGhpcy5jb250ZXh0LCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFVuaXRUb1NlbGVjdGVkVGlsZSgpIHtcclxuICAgIGlmIChVbml0LmFkZCh0aGlzLnNlbGVjdGVkVGlsZSkpIHtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRSb2FkVG9TZWxlY3RlZFRpbGUoKSB7XHJcbiAgICBpZiAoUm9hZC5hZGQodGhpcy5zZWxlY3RlZFRpbGUpKSB7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkQ2l0eVRvU2VsZWN0ZWRUaWxlKCkge1xyXG4gICAgaWYgKENpdHkuYWRkKHRoaXMuc2VsZWN0ZWRUaWxlKSkge1xyXG4gICAgICB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZVNlbGVjdGVkRW50aXR5KCkge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkRW50aXR5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0aWxlID0gdGhpcy5zZWxlY3RlZEVudGl0eS50aWxlO1xyXG4gICAgY29uc3QgZ3JpZFRpbGUgPSB0aGlzLmdyaWQoKVt0aWxlLnBvaW50LnldW3RpbGUucG9pbnQueF07XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIGdyaWRUaWxlLnVuaXQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5laWdoYm91cnMgPSB0aGlzLnNlbGVjdGVkRW50aXR5Lm5laWdoYm91cnM7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIFJvYWQpIHtcclxuICAgICAgLy8gIEZvciBlYWNoIG5laWdoYm91ciBkbyBhIGNvbm5lY3Rpdml0eSBjaGVjayBhbmQgdXBkYXRlIGNvbm5lY3RlZG5lc3NcclxuICAgICAgLy8gIFVwZGF0ZSBuZXR3b3JrcyByb2Fkcy5cclxuICAgICAgUm9hZC5yZW1vdmUoZ3JpZFRpbGUsIHRoaXMuc2VsZWN0ZWRFbnRpdHkpO1xyXG4gICAgICAvLyAgRmluZCBuZXR3b3JrIHRoYXQgdGhlIHJvYWQgaXMgY29ubmVjdGVkIHRvIGFuZCBpdCdzIG5laWdoYm91cnMgYW5kIHJlbW92ZVxyXG4gICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBDaXR5KSB7XHJcbiAgICAgIENpdHkucmVtb3ZlKGdyaWRUaWxlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwO1xyXG4iLCJmdW5jdGlvbiBnZW5lcmF0ZUd1aWQoKSB7XHJcbiAgcmV0dXJuIGAke2dlbmVyYXRlTnVtYmVyKCl9LSR7Z2VuZXJhdGVOdW1iZXIoKX1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZU51bWJlcigpIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlR3VpZDtcclxuIiwiaW1wb3J0IE1hcCBmcm9tICcuL01hcC9NYXAnO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi9tYXBFbnRpdGllcy9Qb2ludCc7XHJcblxyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuY29uc3Qgc2l6ZSA9IDUwMDtcclxuY29uc3QgYm9keU1hcmdpbiA9IDg7XHJcblxyXG5jYW52YXMud2lkdGg9c2l6ZTtcclxuY2FudmFzLmhlaWdodD1zaXplO1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG5jb25zdCBtYXAgPSBuZXcgTWFwKHNpemUsIDUwLCBjb250ZXh0KTtcclxubWFwLmRyYXcoKTtcclxuXHJcbi8vICBDb2xvciBpbiBjbGlja2VkIHNxdWFyZVxyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gIGxldCB7IGNsaWVudFggLCBjbGllbnRZIH0gPSBlO1xyXG4gIGNsaWVudFggLT0gYm9keU1hcmdpbjtcclxuICBjbGllbnRZIC09IGJvZHlNYXJnaW47XHJcbiAgXHJcbiAgY29uc3QgdGlsZSA9IG1hcC5jbGlja1RpbGUoY2xpZW50WCwgY2xpZW50WSk7XHJcblxyXG4gIGlmICh0aWxlKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0ZWRUaWxlJykuaW5uZXJIVE1MID0gdGlsZS50b1N0cmluZygpXHJcbiAgICAgIC5zcGxpdCgnJylcclxuICAgICAgLm1hcCh4ID0+IHggPT09ICdcXG4nID8gJzxiciAvPicgOiB4KS5qb2luKCcnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbGVjdGVkVGlsZScpLmlubmVySFRNTCA9ICcnO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyAgWm9vbSBpbiBhbmQgb3V0IGFuZCBkcmFnXHJcbmxldCBkcmFnU3RhdGUgPSAwO1xyXG5jb25zdCBzdGFydERyYWcgPSBuZXcgUG9pbnQoMCwgMCk7XHJcblxyXG5jb25zdCBkcmFnU3RhdGVzID0geyBTVEFSVEVEOiAwLCBEUkFHR0lORzogMSwgRU5ERUQ6IDJ9XHJcblxyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xyXG4gIGRyYWdTdGF0ZSA9IGRyYWdTdGF0ZXMuU1RBUlRFRDtcclxuICBsZXQgeyBjbGllbnRYICwgY2xpZW50WSB9ID0gZTtcclxuICBjbGllbnRYIC09IGJvZHlNYXJnaW47XHJcbiAgY2xpZW50WSAtPSBib2R5TWFyZ2luO1xyXG5cclxuICBzdGFydERyYWcueCA9IGNsaWVudFg7XHJcbiAgc3RhcnREcmFnLnkgPSBjbGllbnRZO1xyXG59LCBmYWxzZSk7XHJcblxyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoKSA9PiB7XHJcbiAgaWYgKGRyYWdTdGF0ZSA9PT0gZHJhZ1N0YXRlcy5TVEFSVEVEKSBkcmFnU3RhdGUgPSBkcmFnU3RhdGVzLkRSQUdHSU5HO1xyXG59LCBmYWxzZSk7XHJcblxyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKGUpID0+IHtcclxuICBpZihkcmFnU3RhdGUgPT09IGRyYWdTdGF0ZXMuU1RBUlRFRCl7XHJcbiAgfVxyXG4gIGVsc2UgaWYoZHJhZ1N0YXRlID09PSBkcmFnU3RhdGVzLkRSQUdHSU5HKSB7XHJcbiAgICBsZXQgeyBjbGllbnRYICwgY2xpZW50WSB9ID0gZTtcclxuICAgIGNsaWVudFggLT0gYm9keU1hcmdpbjtcclxuICAgIGNsaWVudFkgLT0gYm9keU1hcmdpbjtcclxuXHJcbiAgICBjb25zdCBkaWZmWCA9IHN0YXJ0RHJhZy54IC0gY2xpZW50WDtcclxuICAgIGNvbnN0IGRpZmZZID0gc3RhcnREcmFnLnkgLSBjbGllbnRZO1xyXG5cclxuICAgLy8gbWFwLmRyYWcoZGlmZlgsIGRpZmZZKTtcclxuICAgIHN0YXJ0RHJhZy54ID0gMDtcclxuICAgIHN0YXJ0RHJhZy55ID0gMDtcclxuICB9XHJcbiAgZHJhZ1N0YXRlID0gZHJhZ1N0YXRlcy5FTkRFRDtcclxufSwgZmFsc2UpO1xyXG5cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XHJcbiAgY29uc29sZS5sb2coZS5rZXlDb2RlKTtcclxuICBpZiAoZS5rZXlDb2RlID09PSAzNykge1xyXG4gICAgbWFwLmxlZnRLZXkoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDM4KSB7XHJcbiAgICBtYXAudXBLZXkoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDM5KSB7XHJcbiAgICBtYXAucmlnaHRLZXkoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDQwKSB7XHJcbiAgICBtYXAuZG93bktleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTA3KSB7XHJcbiAgICBtYXAuem9vbUluKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSAxMDkpIHtcclxuICAgIG1hcC56b29tT3V0KCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA4Mikge1xyXG4gICAgbWFwLmFkZFJvYWRUb1NlbGVjdGVkVGlsZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gNjcpIHtcclxuICAgIG1hcC5hZGRDaXR5VG9TZWxlY3RlZFRpbGUoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDg1KSB7XHJcbiAgICBtYXAuYWRkVW5pdFRvU2VsZWN0ZWRUaWxlKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA4IHx8IGUua2V5Q29kZSA9PT0gNDYpIHtcclxuICAgIG1hcC5yZW1vdmVTZWxlY3RlZEVudGl0eSgpO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZyhlLmtleUNvZGUpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRDaXR5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbWFwLmFkZENpdHlUb1NlbGVjdGVkVGlsZSgpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRSb2FkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbWFwLmFkZFJvYWRUb1NlbGVjdGVkVGlsZSgpO1xyXG59KTtcclxuXHJcblxyXG4vLyAgR2l2ZW4gYW4gYXJyYXkgb2Ygc3F1YXJlcyBhbmQgYSB2aWV3IHBvcnQsIGZpbmQgdGhlIHNxdWFyZXMgaW4gdGhlIHZpZXdwb3J0XHJcbi8vICBab29taW5nIGNoYW5nZXMgaG93IGxhcmdlIHlvdSB3YW50IHRvIGRyYXcgdGhlIHNxdWFyZXMgYnV0IGFsc28gdGhlIHZpZXdwb3J0XHJcbi8vICBEcmFnZ2luZyBjaGFuZ2VzIHRoZSB2aWV3cG9ydCBzdGFydC4iLCJpbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vbWFwRW50aXRpZXMvUG9pbnQnO1xyXG5pbXBvcnQgVGlsZVR5cGVzIGZyb20gJy4vVGlsZVR5cGVzJztcclxuXHJcbmNsYXNzIFRpbGUge1xyXG4gIGNvbnN0cnVjdG9yKHgseSwgdHlwZSkge1xyXG4gICAgdGhpcy5wb2ludCA9IG5ldyBQb2ludCh4LHkpO1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pZCA9IGAke3h9LSR7eX1gO1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICB9XHJcblxyXG4gIGVxdWFscyhvdGhlclRpbGUpIHtcclxuICAgIHJldHVybiB0aGlzLnBvaW50LmVxdWFscyhvdGhlclRpbGUucG9pbnQpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICBjb25zdCB0aWxlRGV0YWlscyA9IGAke3RoaXMucG9pbnQueH0sICR7dGhpcy5wb2ludC55fSwgJHt0aGlzLnR5cGV9YDtcclxuICAgIGxldCBjaXR5RGV0YWlscyA9ICcnO1xyXG4gICAgaWYgKHRoaXMuY2l0eSkge1xyXG4gICAgICBjaXR5RGV0YWlscyA9IHRoaXMuY2l0eS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgbGV0IHJvYWREZXRhaWxzID0gJyc7XHJcbiAgICBpZiAodGhpcy5yb2FkKSB7XHJcbiAgICAgIHJvYWREZXRhaWxzID0gYCR7dGhpcy5yb2FkLnRvU3RyaW5nKCl9XFxuJHt0aGlzLnJvYWQucm9hZE5ldHdvcmsudG9TdHJpbmcoKX1gXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdW5pdERldGFpbHMgPSB0aGlzLnVuaXQgPyB0aGlzLnVuaXQudG9TdHJpbmcoKSA6ICcnO1xyXG4gICAgcmV0dXJuIGAke3RpbGVEZXRhaWxzfSAke2NpdHlEZXRhaWxzfSAke3JvYWREZXRhaWxzfSAke3VuaXREZXRhaWxzfWA7XHJcbiAgfVxyXG59XHJcblxyXG5UaWxlLmNvcHkgPSBmdW5jdGlvbiAodGlsZSwgdHlwZSA9IG51bGwpIHtcclxuICBsZXQgY29weTtcclxuICBpZiAoIXR5cGUpIHtcclxuICAgIGNvcHkgPSAgbmV3IFRpbGUodGlsZS5wb2ludC54LCB0aWxlLnBvaW50LnksIHRpbGUudHlwZSk7XHJcbiAgICBjb3B5LnNlbGVjdGVkID0gY29weS5zZWxlY3RlZDtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlID09PSBUaWxlVHlwZXMuR3Jhc3MpIHtcclxuICAgIGNvcHkgPSBuZXcgR3Jhc3NUaWxlKHRpbGUucG9pbnQueCwgdGlsZS5wb2ludC55LCB0aWxlLnR5cGUpO1xyXG4gICAgY29weS5zZWxlY3RlZCA9IGNvcHkuc2VsZWN0ZWQ7XHJcbiAgfVxyXG4gIFxyXG4gIGlmICh0eXBlID09PSBUaWxlVHlwZXMuRm9yZXN0KSB7XHJcbiAgICBjb3B5ID0gbmV3IEZvcmVzdFRpbGUodGlsZS5wb2ludC54LCB0aWxlLnBvaW50LnksIHRpbGUudHlwZSk7XHJcbiAgICBjb3B5LnNlbGVjdGVkID0gY29weS5zZWxlY3RlZDtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlID09PSBUaWxlVHlwZXMuT2NlYW4pIHtcclxuICAgIGNvcHkgPSBuZXcgT2NlYW5UaWxlKHRpbGUucG9pbnQueCwgdGlsZS5wb2ludC55LCB0aWxlLnR5cGUpO1xyXG4gICAgY29weS5zZWxlY3RlZCA9IGNvcHkuc2VsZWN0ZWQ7XHJcbiAgfVxyXG4gIHJldHVybiBjb3B5O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaWxlO1xyXG4iLCJjb25zdCBUaWxlVHlwZXMgPSB7XHJcbiAgR3Jhc3M6ICdHcmFzcycsXHJcbiAgRm9yZXN0OiAnRm9yZXN0JyxcclxuICBPY2VhbjogJ09jZWFuJyxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlsZVR5cGVzO1xyXG4iLCJcclxuaW1wb3J0IGdlbmVyYXRlR3VpZCBmcm9tICcuLi9nZW5lcmF0ZUd1aWQnO1xyXG5pbXBvcnQgeyBncmlkU2VydmljZSB9IGZyb20gJy4uL0dyaWQvR3JpZFNlcnZpY2UnO1xyXG5cclxuY2xhc3MgQ2l0eSB7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgdGlsZTogYW55O1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBwb3B1bGF0aW9uOiBudW1iZXI7XHJcbiAgZGlzdGFuY2VzOiBhbnlbXTtcclxuICBzdGF0aWMgYWRkOiAodGlsZTogYW55KSA9PiBib29sZWFuO1xyXG4gIHJvYWROZXR3b3JrczogYW55O1xyXG4gIHN0YXRpYyByZW1vdmU6IChncmlkVGlsZTogYW55KSA9PiB2b2lkO1xyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IGFueSwgbmFtZTogc3RyaW5nLCBwb3B1bGF0aW9uOiBudW1iZXIpIHtcclxuICAgIHRoaXMudHlwZSA9ICdjaXR5JztcclxuICAgIHRoaXMuaWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuICAgIHRoaXMudGlsZSA9IHRpbGU7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5wb3B1bGF0aW9uID0gcG9wdWxhdGlvbjtcclxuXHJcbiAgICB0aGlzLmRpc3RhbmNlcyA9IFtdO1xyXG5cclxuICAgIGxldCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aWxlKVxyXG4gICAgICAuZmlsdGVyKChuZWlnaGJvdXI6IGFueSkgPT4gbmVpZ2hib3VyLmNpdHkgfHwgbmVpZ2hib3VyLnJvYWQpXHJcbiAgICAgIC5tYXAoeCA9PiB4LnJvYWQgfHwgeC5jaXR5KTtcclxuXHJcbiAgICB0aGlzLnJvYWROZXR3b3JrcyA9IFtdO1xyXG4gICAgXHJcbiAgICBuZWlnaGJvdXJzLmZvckVhY2goKG5laWdoYm91cjogYW55KSA9PiB7XHJcbiAgICAgIGlmIChuZWlnaGJvdXIudHlwZSA9PT0gJ3JvYWQnKSB7XHJcbiAgICAgICAgdGhpcy5hZGROZXR3b3JrKG5laWdoYm91ci5yb2FkTmV0d29yayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIG5laWdoYm91cnMuZmlsdGVyKCh4OiBhbnkpID0+IHggJiYgeC5yb2FkKS5mb3JFYWNoKChuZWlnaGJvdXI6IGFueSkgPT4ge1xyXG4gICAgICBuZWlnaGJvdXIucm9hZC51cGRhdGVTaGFwZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBlcXVhbHMob3RoZXJDaXR5OiBhbnkpIHtcclxuICAgIHJldHVybiBvdGhlckNpdHkuaWQgPT09IHRoaXMuaWQ7XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XHJcbiAgICBjb25zdCBiYXNlWCA9IHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplO1xyXG4gICAgY29uc3QgYmFzZVkgPSB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZTtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoYmFzZVgsICBiYXNlWSArIHRpbGVTaXplLzIsIHRpbGVTaXplLzQsIHRpbGVTaXplLzIpO1xyXG4gICAgY29udGV4dC5maWxsUmVjdChiYXNlWCArIHRpbGVTaXplLzQsICBiYXNlWSArIHRpbGVTaXplLzQsIHRpbGVTaXplLzIsIDMqdGlsZVNpemUvNCk7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KGJhc2VYICsgMyp0aWxlU2l6ZS80LCAgYmFzZVkgKyB0aWxlU2l6ZS8yLCB0aWxlU2l6ZS80LCB0aWxlU2l6ZS8yKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgY29uc3QgZGlzdGFuY2VzID0gdGhpcy5kaXN0YW5jZXMubWFwKHggPT4gYElkOiAke3guY2l0eS5pZH0gZGlzdGFuY2U6ICR7eC5kaXN0YW5jZX1cXG5gKTtcclxuICAgIHJldHVybiBgJHt0aGlzLmlkfTogJHt0aGlzLnBvcHVsYXRpb259XFxuICR7ZGlzdGFuY2VzfWA7XHJcbiAgfVxyXG5cclxuICBhZGROZXR3b3JrKG5ldHdvcms6IGFueSkge1xyXG4gICAgaWYgKCF0aGlzLnJvYWROZXR3b3Jrcy5zb21lKCh4OiBhbnkpID0+IHguaWQgPT09IG5ldHdvcmsuaWQpKSB7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmtzLnB1c2gobmV0d29yayk7XHJcbiAgICAgIG5ldHdvcmsuY2l0aWVzLnB1c2godGhpcyk7XHJcbiAgICAgIG5ldHdvcmsuZmluZERpc3RhbmNlc0ZvckNpdGllcygpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuQ2l0eS5yZW1vdmUgPSBmdW5jdGlvbihncmlkVGlsZTogYW55KSB7XHJcbiAgXHJcbiAgZ3JpZFRpbGUuY2l0eSA9IG51bGw7XHJcbiAgLy8gIFJlbW92ZSBmcm9tIG5laWdoYm91cmluZyByb2FkbmV0d29ya3MgYW5kIHJlY2FsY3VsYXRlIG5ldHdvcmtzXHJcbn1cclxuXHJcbkNpdHkuYWRkID0gZnVuY3Rpb24odGlsZTogYW55KSB7XHJcbiAgaWYgKCF0aWxlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0aWxlLmNpdHkgfHwgdGlsZS5yb2FkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0aWxlLnR5cGUgPT09ICd3YXRlcicpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3QgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmdldFJlZ2lvbih0aWxlLnBvaW50LCAyKTtcclxuXHJcbiAgaWYgKG5laWdoYm91cnMuZmlsdGVyKCh4OiBhbnkpID0+IHguY2l0eSkubGVuZ3RoID4gMCkgcmV0dXJuIGZhbHNlO1xyXG4gIHRpbGUuY2l0eSA9IG5ldyBDaXR5KHRpbGUsICdOZXcgQ2l0eScsIDEpO1xyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2l0eSIsIlxyXG5jbGFzcyBQb2ludCB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICBlcXVhbHMob3RoZXJQb2ludCkge1xyXG4gICAgcmV0dXJuIHRoaXMueCA9PT0gb3RoZXJQb2ludC54ICYmIHRoaXMueSA9PT0gb3RoZXJQb2ludC55O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9pbnQ7IiwiXHJcbmltcG9ydCBSb2FkTmV0d29yayBmcm9tICcuL1JvYWROZXR3b3JrJztcclxuaW1wb3J0IENpdHkgZnJvbSAnLi9DaXR5JztcclxuaW1wb3J0IGdlbmVyYXRlR3VpZCBmcm9tICcuLi9nZW5lcmF0ZUd1aWQnO1xyXG5pbXBvcnQgeyBncmlkU2VydmljZSB9IGZyb20gJy4uL0dyaWQvR3JpZFNlcnZpY2UnO1xyXG5cclxuY29uc3QgU2hhcGVzID0ge1xyXG4gIGlzb2xhdGVkOiAnaXNvbGF0ZWQnLFxyXG4gIHRvcDogJ3RvcCcsXHJcbiAgbGVmdDogJ2xlZnQnLFxyXG4gIGJvdHRvbTogJ2JvdHRvbScsXHJcbiAgcmlnaHQ6ICdyaWdodCcsXHJcbiAgdmVydGljYWw6ICd2ZXJ0aWNhbCcsXHJcbiAgaG9yaXpvbnRhbDogJ2hvcml6b250YWwnLFxyXG4gIHRvcFJpZ2h0OiAndG9wUmlnaHQnLFxyXG4gIHRvcExlZnQ6ICd0b3BMZWZ0JyxcclxuICBib3R0b21SaWdodDogJ2JvdHRvbVJpZ2h0JyxcclxuICBib3R0b21MZWZ0OiAnYm90dG9tTGVmdCcsXHJcbiAgaG9yaXpvbnRhbEJvdHRvbTogJ2hvcml6b250YWxCb3R0b20nLFxyXG4gIGhvcml6b250YWxUb3A6ICdob3Jpem9udGFsVG9wJyxcclxuICB2ZXJ0aWNhbExlZnQ6ICd2ZXJ0aWNhbExlZnQnLFxyXG4gIHZlcnRpY2FsUmlnaHQ6ICd2ZXJ0aWNhbFJpZ2h0JyxcclxuICBjcm9zczogJ2Nyb3NzJ1xyXG59O1xyXG5cclxuXHJcbmNsYXNzIFJvYWQge1xyXG4gIGNvbnN0cnVjdG9yKHRpbGUpIHtcclxuICAgIHRoaXMudHlwZSA9ICdyb2FkJztcclxuICAgIHRoaXMuaWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuICAgIHRoaXMudGlsZSA9IHRpbGU7XHJcblxyXG4gICAgbGV0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRpbGUpO1xyXG5cclxuICAgIHRoaXMuc2hhcGUgPSBSb2FkLmZpbmRTaGFwZShuZWlnaGJvdXJzKTtcclxuICAgIG5laWdoYm91cnMgPSBuZWlnaGJvdXJzLmZpbHRlcihuZWlnaGJvdXIgPT4gbmVpZ2hib3VyLmNpdHkgfHwgbmVpZ2hib3VyLnJvYWQpXHJcbiAgICAgIC5tYXAoeCA9PiB4LnJvYWQgfHwgeC5jaXR5KTtcclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJpbmdSb2FkcyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geCBpbnN0YW5jZW9mIFJvYWQpXHJcbiAgICBjb25zdCBuZWlnaGJvdXJpbmdSb2FkTmV0d29ya3MgPSBuZWlnaGJvdXJpbmdSb2Fkcy5tYXAoeCA9PiB4LnJvYWROZXR3b3JrKTtcclxuXHJcbiAgICBpZiAobmVpZ2hib3VyaW5nUm9hZE5ldHdvcmtzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLm1lcmdlTmV0d29ya3MobmVpZ2hib3VyaW5nUm9hZE5ldHdvcmtzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmsgPSBuZXcgUm9hZE5ldHdvcmsodGhpcyk7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmsuYWRkUm9hZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJpbmdDaXRpZXMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHggaW5zdGFuY2VvZiBDaXR5KTtcclxuICAgIG5laWdoYm91cmluZ0NpdGllcy5mb3JFYWNoKGNpdHkgPT4ge1xyXG4gICAgICBjaXR5LmFkZE5ldHdvcmsodGhpcy5yb2FkTmV0d29yayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBuZWlnaGJvdXJpbmdSb2Fkcy5mb3JFYWNoKHJvYWQgPT4ge1xyXG4gICAgICByb2FkLm5laWdoYm91cnMucHVzaCh0aGlzKTtcclxuICAgICAgcm9hZC5zaGFwZSA9IFJvYWQuZmluZFNoYXBlKHJvYWQubmVpZ2hib3Vycyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGVxdWFscyhvdGhlclJvYWQpIHtcclxuICAgIHJldHVybiB0aGlzLnRpbGUuZXF1YWxzKG90aGVyUm9hZC50aWxlKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGAke3RoaXMudHlwZX06ICR7dGhpcy5zaGFwZX1gO1xyXG4gIH1cclxuICBcclxuICBtZXJnZU5ldHdvcmtzKG5ldHdvcmtzKSB7XHJcbiAgICBjb25zdCBmaXJzdCA9IG5ldHdvcmtzLnBvcCgpO1xyXG4gICAgaWYgKCF0aGlzLnJvYWROZXR3b3JrKSB7XHJcbiAgICAgIGZpcnN0LmFkZFJvYWQodGhpcyk7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmsgPSBmaXJzdDtcclxuICAgIH1cclxuICAgIGZpcnN0Lm1lcmdlKG5ldHdvcmtzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNoYXBlKCkge1xyXG4gICAgY29uc3QgbiA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnMoZ3JpZFNlcnZpY2UudGlsZVRvSW5kZXgobmVpZ2hib3VyKSk7XHJcbiAgICB0aGlzLnNoYXBlID0gUm9hZC5maW5kU2hhcGUobik7XHJcbiAgfVxyXG5cclxuICBkcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSkge1xyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRpbGVTaXplLCB0aWxlU2l6ZS80KTtcclxuICB9XHJcblxyXG4gIGRyYXdWZXJ0aWNhbChjb250ZXh0LCB0aWxlU2l6ZSkge1xyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUsIHRpbGVTaXplLzQsIHRpbGVTaXplKTtcclxuICB9XHJcblxyXG4gIGRyYXdUb3AoY29udGV4dCwgdGlsZVNpemUpIHsgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSwgdGlsZVNpemUvNCwgNSp0aWxlU2l6ZS84KTtcclxuICB9XHJcbiAgXHJcbiAgZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSkgeyBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aWxlU2l6ZS80LCB0aWxlU2l6ZSk7XHJcbiAgfVxyXG4gIFxyXG4gIGRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKSB7IFxyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIDUqdGlsZVNpemUvOCwgdGlsZVNpemUvNCk7XHJcbiAgfVxyXG4gIFxyXG4gIGRyYXdSaWdodChjb250ZXh0LCB0aWxlU2l6ZSkgeyBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyB0aWxlU2l6ZS8yLCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgMyp0aWxlU2l6ZS80LCB0aWxlU2l6ZS80KTtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dCwgdGlsZVNpemUpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNjNDhiMjMnO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5zaGFwZSkge1xyXG4gICAgICBjYXNlIFNoYXBlcy5pc29sYXRlZDpcclxuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgdGlsZVNpemUvMiwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyB0aWxlU2l6ZS8yLCB0aWxlU2l6ZS80LCB0aWxlU2l6ZS80KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBcclxuICAgICAgY2FzZSBTaGFwZXMudmVydGljYWw6XHJcbiAgICAgICAgdGhpcy5kcmF3VmVydGljYWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBcclxuICAgICAgY2FzZSBTaGFwZXMuaG9yaXpvbnRhbDpcclxuICAgICAgICB0aGlzLmRyYXdIb3Jpem9udGFsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBcclxuICAgICAgY2FzZSBTaGFwZXMubGVmdDpcclxuICAgICAgICB0aGlzLmRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnJpZ2h0OlxyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnRvcDpcclxuICAgICAgICB0aGlzLmRyYXdUb3AoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMuYm90dG9tOlxyXG4gICAgICAgIHRoaXMuZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5jcm9zczpcclxuICAgICAgICB0aGlzLmRyYXdWZXJ0aWNhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy50b3BMZWZ0OlxyXG4gICAgICAgIHRoaXMuZHJhd1RvcChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3TGVmdChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy50b3BSaWdodDpcclxuICAgICAgICB0aGlzLmRyYXdUb3AoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmJvdHRvbUxlZnQ6XHJcbiAgICAgICAgdGhpcy5kcmF3Qm90dG9tKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmJvdHRvbVJpZ2h0OlxyXG4gICAgICAgIHRoaXMuZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3UmlnaHQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMudmVydGljYWxMZWZ0OlxyXG4gICAgICAgIHRoaXMuZHJhd1ZlcnRpY2FsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnZlcnRpY2FsUmlnaHQ6XHJcbiAgICAgICAgdGhpcy5kcmF3VmVydGljYWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmhvcml6b250YWxUb3A6XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3VG9wKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmhvcml6b250YWxCb3R0b206XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3Qm90dG9tKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblJvYWQucmVtb3ZlID0gZnVuY3Rpb24gKGdyaWRUaWxlLCByb2FkKSB7XHJcbiAgZ3JpZFRpbGUucm9hZCA9IG51bGw7XHJcblxyXG4gIC8vICBDYXNlczpcclxuICAvLyAgICBzaW5nbGUgbmVpZ2hib3VyaW5nIHJvYWRcclxuICAvLyAgICAgIHJlbW92ZSByb2FkIGZyb20gbmVpZ2hib3VyIGFuZCBmcm9tIG5ldHdvcmtcclxuICAvLyAgICBtdWx0aXBsZSBuZWlnaGJvdXJpbmcgcm9hZHNcclxuICAvLyAgICAgIHJlbW92ZSByb2FkIGZyb20gbmVpZ2hib3VycyBcclxuICAvLyAgICAgIGZvciBlYWNoIG5laWdoYm91cmluZyBuZXR3b3JrIHJlcHJvY2VzcyBjb25uZWN0aXZpdHlcclxuICAvLyAgICBuZWlnaGJvdXJpbmcgY2l0eVxyXG4gIC8vICAgICAgUmVtb3ZlIHJvYWQgZnJvbSBuZWlnaGJvdXJzXHJcbiAgLy8gICAgICBwcm9jZXNzIGNvbm5lY3Rpdml0eSB0byBjaGVjayBpZiB0aGUgbmV0d29yayBzaG91bGQgYmUgcmVtb3ZlZFxyXG4gIHJvYWQubmVpZ2hib3Vycy5mb3JFYWNoKG5laWdoYm91ciA9PiB7XHJcbiAgICBuZWlnaGJvdXIubmVpZ2hib3VycyA9IG5laWdoYm91ci5uZWlnaGJvdXJzLmZpbHRlcih4ID0+IHguaWQgIT09IG5laWdoYm91cik7XHJcbiAgfSlcclxufVxyXG5cclxuUm9hZC5maW5kQ29ubmVjdGl2aXR5ID0gZnVuY3Rpb24ocm9hZHMpIHtcclxuICAvLyBJZGVhIGlzIHRvIHBlcmZvcm0gYSBzZXBlcmF0ZSBiZnMgaW4gc3RlcCBvbiBlYWNoIHBlYWNlIG9mIHJvYWQgYW5kIGNoZWNrIGNvbm5lY3Rpdml0eSBhdCBlYWNoIHN0ZXBcclxuICAvLyBJZiB0d28gbmV0d29ya3MgY29udGFpbiB0aGUgc2FtZSBub2RlIHRoZW4gdGhleSBhcmUgY29ubmVjdGVkLlxyXG5cclxuICBjb25zdCBzZWFyY2hlcyA9IHJvYWRzLm1hcCh4ID0+IHtcclxuICAgIGNvbnN0IHZpc2l0ZWQgPSB7fTtcclxuICAgIHZpc2l0ZWRbeC5pZF0gPSB0cnVlO1xyXG4gICAgcmV0dXJuIHsgaXNGaW5pc2hlZDogZmFsc2UsIGVkZ2VTZXQ6IHgubmVpZ2hib3VycywgdmlzaXRlZCwgY29ubmVjdGVkOiBbXSB9O1xyXG4gIH0pO1xyXG5cclxuICB3aGlsZSAoc2VhcmNoZXMuZmluZCh4ID0+IHguaXNGaW5pc2hlZCkubGVuZ3RoID4gMCkge1xyXG4gICAgY29uc29sZS5sb2coJ0l0ZXJhdGlvbiAxJyk7XHJcbiAgICBzZWFyY2hlcy5mb3JFYWNoKHggPT4geC5maW5pc2hlZCA9IHRydWUpO1xyXG4gIH1cclxuICAvLyAgQ29udGludWUgdW50aWwgYWxsIHNlYXJjaGVzIGFyZSBjb21wbGV0ZS5cclxuICAvLyAgVGVzdCBlYWNoIGl0ZXJhdGlvbiBhbmQgc3RvcCBzZWFyY2ggaWYgbmVjZXNzYXJ5LlxyXG59XHJcblxyXG4vLyAgU2F2ZSBzdGF0ZSBcclxuUm9hZC5pbmNyZW1lbnRhbEJmcyA9IGZ1bmN0aW9uKCkge1xyXG5cclxufVxyXG5cclxuXHJcblJvYWQuZmluZFNoYXBlID0gZnVuY3Rpb24gKG5laWdoYm91cnMpIHtcclxuICBjb25zdCB0b3BOZWlnaGJvdXIgPSAobmVpZ2hib3Vyc1swXSAmJiAobmVpZ2hib3Vyc1swXS5yb2FkIHx8IG5laWdoYm91cnNbMF0uY2l0eSkpIHx8IG51bGw7XHJcbiAgY29uc3QgbGVmdE5laWdoYm91ciA9IChuZWlnaGJvdXJzWzFdICYmIChuZWlnaGJvdXJzWzFdLnJvYWQgfHwgbmVpZ2hib3Vyc1sxXS5jaXR5KSkgfHwgbnVsbDtcclxuICBjb25zdCByaWdodE5laWdoYm91ciA9IChuZWlnaGJvdXJzWzJdICYmIChuZWlnaGJvdXJzWzJdLnJvYWQgfHwgbmVpZ2hib3Vyc1syXS5jaXR5KSkgfHwgbnVsbDtcclxuICBjb25zdCBib3R0b21OZWlnaGJvdXIgPSAobmVpZ2hib3Vyc1szXSAmJiAobmVpZ2hib3Vyc1szXS5yb2FkIHx8IG5laWdoYm91cnNbM10uY2l0eSkpIHx8IG51bGw7XHJcblxyXG4gIGxldCBzaGFwZSA9IFNoYXBlcy5pc29sYXRlZDtcclxuICBcclxuICBpZiAodG9wTmVpZ2hib3VyKSB7XHJcbiAgICBpZiAobGVmdE5laWdoYm91cikge1xyXG4gICAgICBpZiAocmlnaHROZWlnaGJvdXIgJiYgYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMuY3Jvc3M7XHJcbiAgICAgICAgLy8gW3RvcE5laWdoYm91ciwgbGVmdE5laWdoYm91ciwgcmlnaHROZWlnaGJvdXIsIGJvdHRvbU5laWdoYm91cl0uZm9yRWFjaCh1cGRhdGVSb2FkKTtcclxuICAgICAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLmhvcml6b250YWxUb3A7XHJcbiAgICAgIH0gZWxzZSBpZiAoYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudmVydGljYWxMZWZ0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnRvcExlZnQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgICAgaWYgKGJvdHRvbU5laWdoYm91cikge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnZlcnRpY2FsUmlnaHQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudG9wUmlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChib3R0b21OZWlnaGJvdXIpIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy52ZXJ0aWNhbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy50b3A7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGJvdHRvbU5laWdoYm91cikge1xyXG4gIGlmIChsZWZ0TmVpZ2hib3VyKSB7XHJcbiAgICBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgICAgc2hhcGUgPSBTaGFwZXMuaG9yaXpvbnRhbEJvdHRvbTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoYXBlID0gU2hhcGVzLmJvdHRvbUxlZnQ7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgc2hhcGUgPSBTaGFwZXMuYm90dG9tUmlnaHQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNoYXBlID0gU2hhcGVzLmJvdHRvbTtcclxuICB9XHJcbiAgfSBlbHNlIGlmIChsZWZ0TmVpZ2hib3VyKSB7XHJcbiAgICBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgICAgc2hhcGUgPSBTaGFwZXMuaG9yaXpvbnRhbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoYXBlID0gU2hhcGVzLmxlZnQ7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgc2hhcGUgPSBTaGFwZXMucmlnaHQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2hhcGU7XHJcbn1cclxuXHJcblJvYWQuYWRkID0gZnVuY3Rpb24gKHRpbGUpIHtcclxuICBpZiAoIXRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUuY2l0eSB8fCB0aWxlLnJvYWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUudHlwZSA9PT0gJ3dhdGVyJykgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB0aWxlLnJvYWQgPSBuZXcgUm9hZCh0aWxlKTtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm9hZDsiLCJpbXBvcnQgZ2VuZXJhdGVHdWlkIGZyb20gJy4uL2dlbmVyYXRlR3VpZCc7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vR3JpZC9HcmlkU2VydmljZSc7XHJcblxyXG5jbGFzcyBSb2FkTmV0d29yayB7XHJcbiAgY29uc3RydWN0b3Iocm9hZCA9IG51bGwsIGNpdHkgPSBudWxsKSB7XHJcbiAgICB0aGlzLmlkID0gZ2VuZXJhdGVHdWlkKCk7XHJcbiAgICB0aGlzLmNpdGllcyA9IFtdO1xyXG4gICAgdGhpcy5yb2FkcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgYWRkUm9hZChyb2FkKSB7XHJcbiAgICB0aGlzLnJvYWRzLnB1c2gocm9hZCk7XHJcbiAgICByb2FkLnJvYWROZXR3b3JrID0gdGhpcztcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBJZDogJHt0aGlzLmlkfSwgQ2l0aWVzOiAke3RoaXMuY2l0aWVzLmxlbmd0aH0sIFJvYWRzOiAke3RoaXMucm9hZHMubGVuZ3RofWA7XHJcbiAgfVxyXG5cclxuICBhZGRDaXR5KGNpdHkpIHtcclxuICAgIHRoaXMuY2l0aWVzLnB1c2goY2l0eSk7XHJcbiAgICBjaXR5LnJvYWROZXR3b3JrID0gdGhpcztcclxuICB9XHJcblxyXG4gIG1lcmdlKG5ldHdvcmtzKSB7XHJcbiAgICBuZXR3b3Jrcy5mb3JFYWNoKG5ldHdvcmsgPT4ge1xyXG4gICAgICBuZXR3b3JrLmNpdGllcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5jaXRpZXMuZmluZChjaXR5ID0+IGNpdHkuZXF1YWxzKHgpKSkge1xyXG4gICAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh4KTtcclxuICAgICAgICAgIHgucm9hZE5ldHdvcmsgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgXHJcbiAgICAgIC8vICBTaG91bGQgb3B0aW1pc2UgLSBzdG9yZSByb2FkcyBhcyBkaWN0aW9uYXJ5XHJcbiAgICAgIG5ldHdvcmsucm9hZHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMucm9hZHMuZmluZChyb2FkID0+IHJvYWQuZXF1YWxzKHgpKSkge1xyXG4gICAgICAgICAgdGhpcy5yb2Fkcy5wdXNoKHgpO1xyXG4gICAgICAgICAgeC5yb2FkTmV0d29yayA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgIHRoaXMuZmluZERpc3RhbmNlc0ZvckNpdGllcygpO1xyXG4gIH1cclxuXHJcbiAgZmluZERpc3RhbmNlc0ZvckNpdGllcygpIHtcclxuICAgIC8vICBGb3IgZWFjaCBjaXR5IHRvIGEgYmZzIGFuZCBmaW5kIG5laWdoYm91cnMuXHJcbiAgICB0aGlzLmNpdGllcy5mb3JFYWNoKGNpdHkgPT4ge1xyXG4gICAgICB0aGlzLmZpbmREaXN0YW5jZXMoY2l0eSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBmaW5kRGlzdGFuY2VzKGNpdHkpIHtcclxuICAgIGNvbnN0IGRpc3RhbmNlcyA9IFtdO1xyXG4gICAgbGV0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKGNpdHkudGlsZSkubWFwKG5vZGUgPT4gKHtub2RlLCBkaXN0YW5jZTogMCB9KSk7XHJcbiAgICBjb25zdCB2aXNpdGVkID0ge307XHJcbiAgICB2aXNpdGVkW2NpdHkuaWRdID0gdHJ1ZTtcclxuXHJcbiAgICB3aGlsZShuZWlnaGJvdXJzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAvLyAgdmlzaXQgZWFjaCBuZWlnaGJvdXJcclxuICAgICAgY29uc3QgbmVpZ2hib3VyID0gbmVpZ2hib3Vycy5wb3AoKTtcclxuICAgICAgaWYgKG5laWdoYm91ci5ub2RlLnR5cGUgPT09ICdjaXR5Jykge1xyXG4gICAgICAgIGRpc3RhbmNlcy5wdXNoKHtjaXR5LCBkaXN0YW5jZTogbmVpZ2hib3VyLmRpc3RhbmNlIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZpc2l0ZWRbbmVpZ2hib3VyLm5vZGUuaWRdID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBuZWlnaGJvdXJzTmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnMobmVpZ2hib3VyLm5vZGUpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiAhdmlzaXRlZFt4LmlkXSlcclxuICAgICAgICAgIC5tYXAoeCA9PiAoeyBub2RlOiB4LCBkaXN0YW5jZTogbmVpZ2hib3VyLmRpc3RhbmNlICsgMSB9KSk7XHJcbiAgICAgICAgbmVpZ2hib3VycyA9IG5laWdoYm91cnMuY29uY2F0KG5laWdoYm91cnNOZWlnaGJvdXJzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2l0eS5kaXN0YW5jZXMgPSBkaXN0YW5jZXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb2FkTmV0d29yaztcclxuIiwiXHJcbmNsYXNzIFVuaXQge1xyXG4gIHRpbGU6IGFueTtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgc3RhdGljIGFkZDogKHNlbGVjdGVkVGlsZTogYW55KSA9PiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IGFueSwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjRkYwMDAwJztcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyB0aWxlU2l6ZS80LCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIHRpbGVTaXplLzQsIHRpbGVTaXplLzIsIDMqdGlsZVNpemUvNCk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBgVW5pdDogJHt0aGlzLm5hbWV9YDtcclxuICB9XHJcbn1cclxuXHJcblVuaXQuYWRkID0gZnVuY3Rpb24oc2VsZWN0ZWRUaWxlOiBhbnkpIHsgIFxyXG4gIGlmICghc2VsZWN0ZWRUaWxlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChzZWxlY3RlZFRpbGUuY2l0eSB8fCBzZWxlY3RlZFRpbGUucm9hZCB8fCBzZWxlY3RlZFRpbGUudW5pdCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAoc2VsZWN0ZWRUaWxlLnR5cGUgPT09ICd3YXRlcicpIHJldHVybiBmYWxzZTtcclxuICBzZWxlY3RlZFRpbGUudW5pdCA9IG5ldyBVbml0KHNlbGVjdGVkVGlsZSwgJ05ldyBVbml0Jyk7XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFVuaXQiXSwic291cmNlUm9vdCI6IiJ9