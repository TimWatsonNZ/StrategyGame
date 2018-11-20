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
/* harmony import */ var _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MapEntities/Point */ "./MapEntities/Point.ts");
/* harmony import */ var _MapGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapGenerator */ "./Grid/MapGenerator.ts");


class GridService {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.grid = [];
    }
    createMap() {
        this.grid = _MapGenerator__WEBPACK_IMPORTED_MODULE_1__["default"].generate(this.gridSize);
    }
    //  todo - change these to points
    createClippedGrid(viewPortOrigin, viewPortEnd) {
        const newgrid = [];
        const startPoint = new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](viewPortOrigin.x, viewPortOrigin.y);
        const endPoint = new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](viewPortEnd.x, viewPortEnd.y);
        for (let y = startPoint.y; y <= endPoint.y; y++) {
            const newrow = [];
            const row = this.grid[y];
            if (row) {
                for (let x = startPoint.x; x <= endPoint.x; x++) {
                    const tile = row[x];
                    if (tile && tile.point) {
                        tile.drawingPoint = new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](tile.point.x, tile.point.y);
                        tile.drawingPoint.x = x - startPoint.x;
                        tile.drawingPoint.y = y - startPoint.y;
                        newrow.push(tile);
                    }
                }
            }
            newgrid.push(newrow);
        }
        return newgrid;
    }
    tileToIndex(tile) {
        return new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](tile.point.x, tile.point.y);
    }
    getRegion(index, radius) {
        const deltas = [];
        for (let x = 0; x < radius * 2 + 1; x++) {
            for (let y = 0; y < radius * 2 + 1; y++) {
                deltas.push({ x: x - 1, y: y - 1 });
            }
        }
        const neighbours = [];
        deltas.forEach(delta => {
            const indexX = index.x + delta.x;
            const indexY = index.y + delta.y;
            if (indexX < 0 || indexX > this.grid.length - 1 ||
                indexY < 0 || indexY > this.grid.length - 1) {
            }
            else {
                neighbours.push(this.grid[indexY][indexX]);
            }
        });
        return neighbours;
    }
    getNeighbours(index, preserveOrder = false, noDiagonals = false, inputGrid = null) {
        let grid = inputGrid ? inputGrid : this.grid;
        const tile = grid[index.y][index.x];
        const allDeltas = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: 0 }, , { x: 1, y: 0 },
            { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
        ];
        const noDiagonalsDeltas = [
            ,
            { x: 0, y: -1 },
            { x: -1, y: 0 }, , { x: 1, y: 0 },
            { x: 0, y: 1 },
        ];
        const neighbours = [];
        if (!tile) {
            return neighbours;
        }
        const deltas = noDiagonals ? noDiagonalsDeltas : allDeltas;
        deltas.forEach(delta => {
            const indexX = index.x + delta.x;
            const indexY = index.y + delta.y;
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
    }
    findSelectedTileCrossNeighbours(tile) {
        return this.findCrossNeighbours(tile);
    }
    findCrossNeighbours(tile) {
        return this.getNeighbours(this.tileToIndex(tile), false, true);
    }
}
let gridService = null;
function gridServiceInit(gridSize) {
    gridService = new GridService(gridSize);
}



/***/ }),

/***/ "./Grid/MapGenerator.ts":
/*!******************************!*\
  !*** ./Grid/MapGenerator.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GridService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GridService */ "./Grid/GridService.ts");
/* harmony import */ var _Map_Tiles_Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Map/Tiles/Tile */ "./Map/Tiles/Tile.ts");
/* harmony import */ var _MapEntities_Point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MapEntities/Point */ "./MapEntities/Point.ts");
/* harmony import */ var _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Map/Tiles/TileType */ "./Map/Tiles/TileType.ts");
/* harmony import */ var _Map_Tiles_TileService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Map/Tiles/TileService */ "./Map/Tiles/TileService.ts");





class MapGenerator {
    generate(gridSize) {
        let grid = [];
        for (let h = 0; h < gridSize; h++) {
            const row = [];
            for (let w = 0; w < gridSize; w++) {
                row.push(new _Map_Tiles_Tile__WEBPACK_IMPORTED_MODULE_1__["default"](new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_2__["default"](w, h), _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].None));
            }
            grid.push(row);
        }
        const seedTileCount = 80;
        for (let i = 0; i < seedTileCount; i++) {
            const randomTile = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid.length)];
            randomTile.type = _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Grass;
        }
        grid[Math.round(grid.length / 2)][Math.round(grid.length / 2)].type = _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Grass;
        grid = this.dfa(gridSize, grid, this.growGrass);
        grid = this.dfa(gridSize, grid, this.growGrass);
        this.floodFill(grid, grid[Math.round(grid.length / 2)][Math.round(grid.length / 2)]);
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
            const waterNeighbours = neighbours.filter(x => x.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Ocean).length;
            const grassNeighbours = neighbours.filter(x => x.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Grass).length;
            if (Math.round(Math.random() * (waterNeighbours + grassNeighbours)) > waterNeighbours) {
                tile.type = _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Grass;
            }
            else {
                tile.type = _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Ocean;
            }
            neighbours.filter(x => x.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].None).forEach(x => stack.push(x));
        }
    }
    dfa(gridSize, grid, rule) {
        const newGrid = [];
        for (let h = 0; h < gridSize; h++) {
            const newRow = [];
            for (let w = 0; w < gridSize; w++) {
                const tile = grid[h][w];
                const neighbours = _GridService__WEBPACK_IMPORTED_MODULE_0__["gridService"].getNeighbours(_GridService__WEBPACK_IMPORTED_MODULE_0__["gridService"].tileToIndex(tile), false, false, grid);
                const waterNeighbours = neighbours.filter(x => x.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Ocean).length;
                const grassNeighbours = neighbours.filter(x => x.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Grass).length;
                const type = rule(tile, waterNeighbours, grassNeighbours);
                const copy = _Map_Tiles_TileService__WEBPACK_IMPORTED_MODULE_4__["default"].createTile(tile, type);
                newRow.push(copy);
            }
            newGrid.push(newRow);
        }
        return newGrid;
    }
    smoothRule(tile, waterNeighbours, grassNeighbours) {
        if (tile.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Ocean && grassNeighbours > 3) {
            return _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Grass;
        }
        if (tile.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Grass && waterNeighbours > 7) {
            return _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Ocean;
        }
        return tile.type;
    }
    growGrass(tile, waterNeighbours, grassNeighbours) {
        if (tile.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Ocean && grassNeighbours > 0) {
            return _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Grass;
        }
        return tile.type;
    }
    fillInHoles(grid) {
        for (let y = 0; y < grid.length; y++) {
            for (let h = 0; h < grid[y].length; h++) {
                if (grid[y][h].type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].None) {
                    grid[y][h].type = _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_3__["default"].Ocean;
                }
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (new MapGenerator());


/***/ }),

/***/ "./Improvement/Improvements.ts":
/*!*************************************!*\
  !*** ./Improvement/Improvements.ts ***!
  \*************************************/
/*! exports provided: House */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "House", function() { return House; });
/* harmony import */ var _Resources_Resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Resources/Resources */ "./Resources/Resources.ts");

const House = {
    name: 'House',
    costs: [
        { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_0__["Wood"], amount: 10 },
    ],
    maintainence: [
        { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_0__["Wood"], amount: .25 },
    ],
    effects: {
        fertility: 1.1,
    }
};



/***/ }),

/***/ "./Map/Map.ts":
/*!********************!*\
  !*** ./Map/Map.ts ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MapEntities/Point */ "./MapEntities/Point.ts");
/* harmony import */ var _MapEntities_City__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MapEntities/City */ "./MapEntities/City.ts");
/* harmony import */ var _MapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MapEntities/Unit */ "./MapEntities/Unit.ts");
/* harmony import */ var _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Grid/GridService */ "./Grid/GridService.ts");
/* harmony import */ var _MapEntities_Road__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MapEntities/Road */ "./MapEntities/Road.ts");
/* harmony import */ var _Tiles_TileType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Tiles/TileType */ "./Map/Tiles/TileType.ts");
/* harmony import */ var _Pops_Gatherer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Pops/Gatherer */ "./Pops/Gatherer.ts");
/* harmony import */ var _Pops_Craftsperson__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Pops/Craftsperson */ "./Pops/Craftsperson.ts");








class Map {
    constructor(size, tileNumber, context) {
        //  Draw grid of squares
        this.context = context;
        this.size = size;
        this.tileNumber = tileNumber;
        this.viewPortOrigin = new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
        this.origin = new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
        this.selectedTile = null;
        this.selectedEntity = null;
        this.entities = {
            pops: []
        };
        Object(_Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridServiceInit"])(this.tileNumber);
        _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].createMap();
        this.clippedGrid = [];
        this.viewPortSize = size; //  how large the view port is
        this.zoomLevel = 40; //  how many Tiles are in view port
        this.viewPortEnd = new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](this.viewPortOrigin.x + this.zoomLevel, this.viewPortOrigin.y + this.zoomLevel);
        this.clippedGrid = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].createClippedGrid(this.viewPortOrigin, this.viewPortEnd);
        this.tileSize = this.viewPortSize / this.zoomLevel; //  should be view port size / view port content size
    }
    grid() {
        return _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].grid;
    }
    clickTile(point) {
        const tileX = Math.floor(point.x / this.tileSize);
        const tileY = Math.floor(point.y / this.tileSize);
        const tile = this.clippedGrid[tileY] && this.clippedGrid[tileY][tileX];
        if (tile) {
            if (this.selectedTile) {
                this.selectedTile.selected = false;
            }
            if (tile.unit || tile.road || tile.city) {
                this.selectedEntity = tile.unit || tile.road || tile.city;
            }
            else {
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
            }
            else {
                const sum = this.viewPortOrigin.x + Math.round(diffX);
                this.viewPortOrigin.x = Math.max(sum, 0);
                this.viewPortOrigin.x = this.viewPortOrigin.x + this.zoomLevel;
            }
            if (diffY > 0) {
                const sum = this.viewPortOrigin.y + Math.round(diffY);
                this.viewPortOrigin.y = Math.min(sum, this.tileNumber);
                this.viewPortOrigin.y = this.viewPortOrigin.y + this.zoomLevel;
            }
            else {
                const sum = this.viewPortOrigin.x + Math.round(diffY);
                this.viewPortOrigin.y = Math.max(sum, 0);
                this.viewPortOrigin.y = this.viewPortOrigin.y + this.zoomLevel;
            }
            this.updateView();
        }
    }
    //  move to unit
    moveUnit(unit, neighbour) {
        const originalTile = unit.tile;
        unit.tile = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].grid[neighbour.point.y][neighbour.point.x];
        _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].grid[neighbour.point.y][neighbour.point.x].unit = unit;
        originalTile.unit = null;
        this.draw();
    }
    leftKey() {
        if (this.selectedEntity && this.selectedEntity instanceof _MapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            this.entityLeft();
        }
        else {
            this.panLeft();
        }
    }
    rightKey() {
        if (this.selectedEntity && this.selectedEntity instanceof _MapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            this.entityRight();
        }
        else {
            this.panRight();
        }
    }
    upKey() {
        if (this.selectedEntity && this.selectedEntity instanceof _MapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            this.entityUp();
        }
        else {
            this.panUp();
        }
    }
    downKey() {
        if (this.selectedEntity && this.selectedEntity instanceof _MapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            this.entityDown();
        }
        else {
            this.panDown();
        }
    }
    entityLeft() {
        const neighbour = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(this.selectedEntity.tile)[1];
        if (neighbour && neighbour.type !== _Tiles_TileType__WEBPACK_IMPORTED_MODULE_5__["default"].Ocean) {
            this.moveUnit(this.selectedEntity, neighbour);
        }
    }
    entityRight() {
        const neighbour = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(this.selectedEntity.tile)[2];
        if (neighbour && neighbour.type !== _Tiles_TileType__WEBPACK_IMPORTED_MODULE_5__["default"].Ocean) {
            this.moveUnit(this.selectedEntity, neighbour);
        }
    }
    entityUp() {
        const neighbour = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(this.selectedEntity.tile)[0];
        if (neighbour && neighbour.type !== _Tiles_TileType__WEBPACK_IMPORTED_MODULE_5__["default"].Ocean) {
            this.moveUnit(this.selectedEntity, neighbour);
        }
    }
    entityDown() {
        const neighbour = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(this.selectedEntity.Tile)[3];
        if (neighbour && neighbour.type !== _Tiles_TileType__WEBPACK_IMPORTED_MODULE_5__["default"].Ocean) {
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
        this.viewPortEnd = new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](this.viewPortOrigin.x + this.zoomLevel, this.viewPortOrigin.y + this.zoomLevel);
        this.tileSize = this.viewPortSize / this.zoomLevel;
        this.updateView();
    }
    updateView(updateGrid = true) {
        if (updateGrid)
            this.clippedGrid = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].createClippedGrid(this.viewPortOrigin, this.viewPortEnd);
        this.draw();
    }
    endTurn() {
        this.update();
    }
    update() {
        this.entities.pops.forEach((pop) => {
            pop.update();
        });
    }
    draw() {
        this.context.fillStyle = '#FFFFFF';
        this.context.fillRect(0, 0, this.size, this.size);
        this.context.fillStyle = '#000000';
        for (let h = 0; h < this.clippedGrid.length; h++) {
            for (let w = 0; w < this.clippedGrid[h].length; w++) {
                const tile = this.clippedGrid[h][w];
                if (tile && (tile.drawingPoint.x) <= this.viewPortEnd.x && (tile.drawingPoint.x) >= 0 && (tile.drawingPoint.y) >= 0 && tile.drawingPoint.y <= this.viewPortEnd.y) {
                    tile.draw(this.context, this.tileSize);
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
                    if (tile.pop) {
                        tile.pop.draw(this.context, this.tileSize);
                    }
                }
            }
        }
    }
    addUnitToSelectedTile() {
        if (_MapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"].add(this.selectedTile)) {
            this.draw();
        }
    }
    addRoadToSelectedTile() {
        if (_MapEntities_Road__WEBPACK_IMPORTED_MODULE_4__["default"].add(this.selectedTile)) {
            this.draw();
        }
    }
    addCityToSelectedTile() {
        if (_MapEntities_City__WEBPACK_IMPORTED_MODULE_1__["default"].add(this.selectedTile)) {
            this.draw();
        }
    }
    addGatherer() {
        if (_Pops_Gatherer__WEBPACK_IMPORTED_MODULE_6__["default"].add(this.selectedTile, this.entities)) {
            this.draw();
        }
    }
    addCraftsperson() {
        if (_Pops_Craftsperson__WEBPACK_IMPORTED_MODULE_7__["default"].add(this.selectedTile, this.entities)) {
            this.draw();
        }
    }
    removeSelectedEntity() {
        if (!this.selectedEntity) {
            return;
        }
        const tile = this.selectedEntity.tile;
        const gridTile = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].grid[tile.point.y][tile.point.x];
        if (this.selectedEntity instanceof _MapEntities_Unit__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            gridTile.unit = null;
        }
        const neighbours = this.selectedEntity.neighbours;
        if (this.selectedEntity instanceof _MapEntities_Road__WEBPACK_IMPORTED_MODULE_4__["default"]) {
            //  For each neighbour do a connectivity check and update connectedness
            //  Update networks roads.
            _MapEntities_Road__WEBPACK_IMPORTED_MODULE_4__["default"].remove(gridTile, this.selectedEntity);
            //  Find network that the road is connected to and it's neighbours and remove
        }
        if (this.selectedEntity instanceof _MapEntities_City__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            _MapEntities_City__WEBPACK_IMPORTED_MODULE_1__["default"].remove(gridTile);
        }
        this.selectedEntity = null;
        this.draw();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Map);


/***/ }),

/***/ "./Map/Tiles/GrassTile.ts":
/*!********************************!*\
  !*** ./Map/Tiles/GrassTile.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ "./Map/Tiles/Tile.ts");
/* harmony import */ var _TileType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TileType */ "./Map/Tiles/TileType.ts");
/* harmony import */ var _Resources_Resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Resources/Resources */ "./Resources/Resources.ts");



class GrassTile extends _Tile__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(point) {
        super(point, _TileType__WEBPACK_IMPORTED_MODULE_1__["default"].Grass);
        this.resources = {};
        this.resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_2__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_2__["Food"], amount: 2 };
        this.resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_2__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_2__["Wood"], amount: 0.5 };
    }
    draw(context, tileSize) {
        context.fillStyle = '#00FF00';
        context.fillRect(this.drawingPoint.x * tileSize, this.drawingPoint.y * tileSize, tileSize, tileSize);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (GrassTile);


/***/ }),

/***/ "./Map/Tiles/OceanTile.ts":
/*!********************************!*\
  !*** ./Map/Tiles/OceanTile.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ "./Map/Tiles/Tile.ts");
/* harmony import */ var _TileType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TileType */ "./Map/Tiles/TileType.ts");


class OceanTile extends _Tile__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(point) {
        super(point, _TileType__WEBPACK_IMPORTED_MODULE_1__["default"].Ocean);
    }
    draw(context, tileSize) {
        context.fillStyle = '#0000FF';
        context.fillRect(this.drawingPoint.x * tileSize, this.drawingPoint.y * tileSize, tileSize, tileSize);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (OceanTile);


/***/ }),

/***/ "./Map/Tiles/Tile.ts":
/*!***************************!*\
  !*** ./Map/Tiles/Tile.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../MapEntities/Point */ "./MapEntities/Point.ts");

class Tile {
    constructor(point, type) {
        this.improvements = [];
        this.point = _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"].copy(point);
        this.selected = false;
        this.id = `${point.x}-${point.y}`;
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
            roadDetails = `${this.road.toString()}\n${this.road.roadNetwork.toString()}`;
        }
        let popDetails = this.pop ? this.pop.toString() : '';
        const unitDetails = this.unit ? this.unit.toString() : '';
        const improvementDetails = this.improvements.map((x) => x.name).join(',');
        return `${tileDetails} ${cityDetails} ${roadDetails} ${unitDetails} ${popDetails} ${improvementDetails}`;
    }
    draw(context, tileSize) {
        context.fillStyle = '#FFFFFF';
        context.fillRect(this.drawingPoint.x * tileSize, this.drawingPoint.y * tileSize, tileSize, tileSize);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Tile);


/***/ }),

/***/ "./Map/Tiles/TileService.ts":
/*!**********************************!*\
  !*** ./Map/Tiles/TileService.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ "./Map/Tiles/Tile.ts");
/* harmony import */ var _TileType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TileType */ "./Map/Tiles/TileType.ts");
/* harmony import */ var _GrassTile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GrassTile */ "./Map/Tiles/GrassTile.ts");
/* harmony import */ var _OceanTile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OceanTile */ "./Map/Tiles/OceanTile.ts");




class TileService {
    constructor() {
        this.copyTile = function (tile) {
            let copy;
            if (tile.type === _TileType__WEBPACK_IMPORTED_MODULE_1__["default"].None) {
                copy = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](tile.point, tile.type);
                copy.selected = copy.selected;
            }
            if (tile.type === _TileType__WEBPACK_IMPORTED_MODULE_1__["default"].Grass) {
                copy = new _GrassTile__WEBPACK_IMPORTED_MODULE_2__["default"](tile.point);
                copy.selected = copy.selected;
            }
            if (tile.type === _TileType__WEBPACK_IMPORTED_MODULE_1__["default"].Ocean) {
                copy = new _OceanTile__WEBPACK_IMPORTED_MODULE_3__["default"](tile.point);
                copy.selected = copy.selected;
            }
            return copy;
        };
        this.createTile = function (tile, type) {
            switch (type) {
                case _TileType__WEBPACK_IMPORTED_MODULE_1__["default"].Grass:
                    return new _GrassTile__WEBPACK_IMPORTED_MODULE_2__["default"](tile.point);
                case _TileType__WEBPACK_IMPORTED_MODULE_1__["default"].Ocean:
                    return new _OceanTile__WEBPACK_IMPORTED_MODULE_3__["default"](tile.point);
                case _TileType__WEBPACK_IMPORTED_MODULE_1__["default"].None:
                    return new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](tile.point, _TileType__WEBPACK_IMPORTED_MODULE_1__["default"].None);
            }
        };
    }
}
const instance = new TileService();
/* harmony default export */ __webpack_exports__["default"] = (instance);


/***/ }),

/***/ "./Map/Tiles/TileType.ts":
/*!*******************************!*\
  !*** ./Map/Tiles/TileType.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var TileType;
(function (TileType) {
    TileType["None"] = "None";
    TileType["Grass"] = "Grass";
    TileType["Forest"] = "Forest";
    TileType["Ocean"] = "Ocean";
})(TileType || (TileType = {}));
/* harmony default export */ __webpack_exports__["default"] = (TileType);


/***/ }),

/***/ "./MapEntities/City.ts":
/*!*****************************!*\
  !*** ./MapEntities/City.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generateGuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generateGuid */ "./generateGuid.js");
/* harmony import */ var _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Grid/GridService */ "./Grid/GridService.ts");
/* harmony import */ var _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Map/Tiles/TileType */ "./Map/Tiles/TileType.ts");



class City {
    constructor(tile, name, population) {
        this.type = 'city';
        this.id = Object(_generateGuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.tile = tile;
        this.name = name;
        this.population = population;
        this.distances = [];
        let neighbours = _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__["gridService"].findCrossNeighbours(tile)
            .filter((neighbour) => neighbour.city || neighbour.road)
            .map(x => x.road || x.city);
        this.roadNetworks = [];
        neighbours.forEach((neighbour) => {
            if (neighbour.type === 'road') {
                this.addNetwork(neighbour.roadNetwork);
            }
        });
        neighbours.filter((x) => x && x.road).forEach((neighbour) => {
            neighbour.road.updateShape();
        });
    }
    equals(otherCity) {
        return otherCity.id === this.id;
    }
    draw(context, tileSize) {
        context.fillStyle = '#000000';
        const baseX = this.tile.drawingPoint.x * tileSize;
        const baseY = this.tile.drawingPoint.y * tileSize;
        context.fillRect(baseX, baseY + tileSize / 2, tileSize / 4, tileSize / 2);
        context.fillRect(baseX + tileSize / 4, baseY + tileSize / 4, tileSize / 2, 3 * tileSize / 4);
        context.fillRect(baseX + 3 * tileSize / 4, baseY + tileSize / 2, tileSize / 4, tileSize / 2);
        //const neighbours = gridService.getNeighbours(this.tile.point);
        context.strokeStyle = '#000000';
        context.strokeRect((this.tile.drawingPoint.x - 1) * tileSize, (this.tile.drawingPoint.y - 1) * tileSize, tileSize * 3, tileSize * 3);
        context.strokeStyle = '#FFFFFF';
    }
    toString() {
        const distances = this.distances.map(x => `Id: ${x.city.id} distance: ${x.distance}\n`);
        return `${this.id}: ${this.population}\n ${distances}`;
    }
    addNetwork(network) {
        if (!this.roadNetworks.some((x) => x.id === network.id)) {
            this.roadNetworks.push(network);
            network.cities.push(this);
            network.findDistancesForCities();
        }
    }
}
City.remove = function (gridTile) {
    gridTile.city = null;
    //  Remove from neighbouring roadnetworks and recalculate networks
};
City.add = function (tile) {
    if (!tile)
        return false;
    if (tile.city || tile.road)
        return false;
    if (tile.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_2__["default"].Ocean)
        return false;
    const neighbours = _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__["gridService"].getRegion(tile.point, 2);
    if (neighbours.filter((x) => x.city).length > 0)
        return false;
    tile.city = new City(tile, 'New City', 1);
    return true;
};
/* harmony default export */ __webpack_exports__["default"] = (City);


/***/ }),

/***/ "./MapEntities/Point.ts":
/*!******************************!*\
  !*** ./MapEntities/Point.ts ***!
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
Point.copy = function (point) {
    return new Point(point.x, point.y);
};
/* harmony default export */ __webpack_exports__["default"] = (Point);


/***/ }),

/***/ "./MapEntities/Road.ts":
/*!*****************************!*\
  !*** ./MapEntities/Road.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RoadNetwork__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RoadNetwork */ "./MapEntities/RoadNetwork.ts");
/* harmony import */ var _City__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./City */ "./MapEntities/City.ts");
/* harmony import */ var _generateGuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../generateGuid */ "./generateGuid.js");
/* harmony import */ var _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Grid/GridService */ "./Grid/GridService.ts");
/* harmony import */ var _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Map/Tiles/TileType */ "./Map/Tiles/TileType.ts");





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
        const neighbouringRoads = neighbours.filter(x => x instanceof Road);
        const neighbouringRoadNetworks = neighbouringRoads.map(x => x.roadNetwork);
        if (neighbouringRoadNetworks.length > 0) {
            this.mergeNetworks(neighbouringRoadNetworks);
        }
        else {
            this.roadNetwork = new _RoadNetwork__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
        const n = _Grid_GridService__WEBPACK_IMPORTED_MODULE_3__["gridService"].findCrossNeighbours(this.tile);
        this.shape = Road.findShape(n);
    }
    drawHorizontal(context, tileSize) {
        context.fillRect(this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + 3 * tileSize / 8, tileSize, tileSize / 4);
    }
    drawVertical(context, tileSize) {
        context.fillRect(this.tile.drawingPoint.x * tileSize + 3 * tileSize / 8, this.tile.drawingPoint.y * tileSize, tileSize / 4, tileSize);
    }
    drawTop(context, tileSize) {
        context.fillRect(this.tile.drawingPoint.x * tileSize + 3 * tileSize / 8, this.tile.drawingPoint.y * tileSize, tileSize / 4, 5 * tileSize / 8);
    }
    drawBottom(context, tileSize) {
        context.fillRect(this.tile.drawingPoint.x * tileSize + 3 * tileSize / 8, this.tile.drawingPoint.y * tileSize + 3 * tileSize / 8, tileSize / 4, tileSize);
    }
    drawLeft(context, tileSize) {
        context.fillRect(this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + 3 * tileSize / 8, 5 * tileSize / 8, tileSize / 4);
    }
    drawRight(context, tileSize) {
        context.fillRect(this.tile.drawingPoint.x * tileSize + tileSize / 2, this.tile.drawingPoint.y * tileSize + 3 * tileSize / 8, 3 * tileSize / 4, tileSize / 4);
    }
    draw(context, tileSize) {
        context.fillStyle = '#c48b23';
        switch (this.shape) {
            case Shapes.isolated:
                context.fillRect(this.tile.drawingPoint.x * tileSize + tileSize / 2, this.tile.drawingPoint.y * tileSize + tileSize / 2, tileSize / 4, tileSize / 4);
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
    // road.neighbours.forEach(neighbour => {
    //   neighbour.neighbours = neighbour.neighbours.filter(x => x.id !== neighbour);
    // })
};
Road.findConnectivity = function (roads) {
    // Idea is to perform a seperate bfs in step on each peace of road and check connectivity at each step
    // If two networks contain the same node then they are connected.
    // const searches = roads.map(x => {
    //   const visited = {};
    //   visited[x.id] = true;
    //   return { isFinished: false, edgeSet: x.neighbours, visited, connected: [] };
    // });
    // while (searches.find(x => x.isFinished).length > 0) {
    //   console.log('Iteration 1');
    //   searches.forEach(x => x.finished = true);
    // }
    //  Continue until all searches are complete.
    //  Test each iteration and stop search if necessary.
};
//  Save state 
// Road.incrementalBfs = function() {
// }
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
            }
            else if (rightNeighbour) {
                shape = Shapes.horizontalTop;
            }
            else if (bottomNeighbour) {
                shape = Shapes.verticalLeft;
            }
            else {
                shape = Shapes.topLeft;
            }
        }
        else if (rightNeighbour) {
            if (bottomNeighbour) {
                shape = Shapes.verticalRight;
            }
            else {
                shape = Shapes.topRight;
            }
        }
        else {
            if (bottomNeighbour) {
                shape = Shapes.vertical;
            }
            else {
                shape = Shapes.top;
            }
        }
    }
    else if (bottomNeighbour) {
        if (leftNeighbour) {
            if (rightNeighbour) {
                shape = Shapes.horizontalBottom;
            }
            else {
                shape = Shapes.bottomLeft;
            }
        }
        else if (rightNeighbour) {
            shape = Shapes.bottomRight;
        }
        else {
            shape = Shapes.bottom;
        }
    }
    else if (leftNeighbour) {
        if (rightNeighbour) {
            shape = Shapes.horizontal;
        }
        else {
            shape = Shapes.left;
        }
    }
    else if (rightNeighbour) {
        shape = Shapes.right;
    }
    return shape;
};
Road.add = function (tile) {
    if (!tile)
        return false;
    if (tile.city || tile.road)
        return false;
    if (tile.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_4__["default"].Ocean)
        return false;
    tile.road = new Road(tile);
    return true;
};
/* harmony default export */ __webpack_exports__["default"] = (Road);


/***/ }),

/***/ "./MapEntities/RoadNetwork.ts":
/*!************************************!*\
  !*** ./MapEntities/RoadNetwork.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generateGuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generateGuid */ "./generateGuid.js");
/* harmony import */ var _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Grid/GridService */ "./Grid/GridService.ts");


class RoadNetwork {
    constructor() {
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
        city.roadNetworks = this;
    }
    merge(networks) {
        networks.forEach(network => {
            network.cities.forEach(x => {
                if (!this.cities.find((city) => city.equals(x))) {
                    this.cities.push(x);
                    x.roadNetwork = this;
                }
            });
            //  Should optimise - store roads as dictionary
            network.roads.forEach(x => {
                if (!this.roads.find((road) => road.equals(x))) {
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
        let neighbours = _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__["gridService"].findCrossNeighbours(city.tile).map(node => ({ node, distance: 0 }));
        const visited = {};
        visited[city.id] = true;
        while (neighbours.length !== 0) {
            //  visit each neighbour
            const neighbour = neighbours.pop();
            if (neighbour.node.type === 'city') {
                distances.push({ city, distance: neighbour.distance });
            }
            else {
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

/***/ "./MapEntities/Unit.ts":
/*!*****************************!*\
  !*** ./MapEntities/Unit.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Map/Tiles/TileType */ "./Map/Tiles/TileType.ts");

class Unit {
    constructor(tile, name) {
        this.tile = tile;
        this.name = name;
    }
    draw(context, tileSize) {
        context.fillStyle = '#FF0000';
        context.fillRect(this.tile.drawingPoint.x * tileSize + tileSize / 4, this.tile.drawingPoint.y * tileSize + tileSize / 4, tileSize / 2, 3 * tileSize / 4);
    }
    toString() {
        return `Unit: ${this.name}`;
    }
}
Unit.add = function (selectedTile) {
    if (!selectedTile)
        return false;
    if (selectedTile.city || selectedTile.road || selectedTile.unit)
        return false;
    if (selectedTile.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_0__["default"].Ocean)
        return false;
    selectedTile.unit = new Unit(selectedTile, 'New Unit');
    return true;
};
/* harmony default export */ __webpack_exports__["default"] = (Unit);


/***/ }),

/***/ "./Pops/Craftsperson.ts":
/*!******************************!*\
  !*** ./Pops/Craftsperson.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pop */ "./Pops/Pop.ts");
/* harmony import */ var _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Resources/Resources */ "./Resources/Resources.ts");
/* harmony import */ var _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Map/Tiles/TileType */ "./Map/Tiles/TileType.ts");
/* harmony import */ var _Improvement_Improvements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Improvement/Improvements */ "./Improvement/Improvements.ts");




const resources = {};
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"] };
const needs = {};
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 1 };
const wants = {};
wants[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], amount: 0.1 };
const produces = [];
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = {
    type: 'craft',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"],
    productionEfficiency: 1,
    requires: {
        [_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name]: 1,
        [_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name]: 1,
    },
    output: 1,
};
const growRequirement = {};
growRequirement[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 5 };
const improvements = [
    { improvement: _Improvement_Improvements__WEBPACK_IMPORTED_MODULE_3__["House"], weight: 1 },
];
class Craftsperson extends _Pop__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(tile, number) {
        super(tile, number, resources, needs, produces, improvements);
        this.growRequirement = growRequirement;
    }
    draw(context, tileSize) {
        context.strokeStyle = '#FF0000';
        context.strokeText('C', this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + tileSize, tileSize);
    }
    toString() {
        return `Craftsperson: Food: ${this.resources['food'].amount}, Wood: ${this.resources['wood'].amount} Number: ${this.number}`;
    }
}
Craftsperson.add = function (tile, entities) {
    if (!tile)
        return false;
    if (tile.city || tile.road)
        return false;
    if (tile.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_2__["default"].Ocean)
        return false;
    const pop = new Craftsperson(tile, 1);
    tile.pop = pop;
    entities.pops.push(pop);
    return true;
};
/* harmony default export */ __webpack_exports__["default"] = (Craftsperson);


/***/ }),

/***/ "./Pops/Gatherer.ts":
/*!**************************!*\
  !*** ./Pops/Gatherer.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pop */ "./Pops/Pop.ts");
/* harmony import */ var _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Resources/Resources */ "./Resources/Resources.ts");
/* harmony import */ var _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Map/Tiles/TileType */ "./Map/Tiles/TileType.ts");
/* harmony import */ var _Improvement_Improvements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Improvement/Improvements */ "./Improvement/Improvements.ts");




const resources = {};
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"] };
const needs = {};
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 1 };
const wants = {};
wants[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], amount: 0.1 };
const produces = [];
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = {
    type: 'gather',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"],
    gatherEfficiency: 1
};
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = {
    type: 'gather',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"],
    gatherEfficiency: 0.25
};
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = {
    type: 'gather',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"],
    gatherEfficiency: 0.25
};
const growRequirement = {};
growRequirement[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 5 };
const improvements = [
    { improvement: _Improvement_Improvements__WEBPACK_IMPORTED_MODULE_3__["House"], weight: 1 },
];
class Gatherer extends _Pop__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(tile, number) {
        super(tile, number, resources, needs, produces, improvements);
        this.growRequirement = growRequirement;
    }
    draw(context, tileSize) {
        context.strokeStyle = '#FFFFFF';
        context.strokeText('G', this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + tileSize, tileSize);
    }
    toString() {
        return `Gatherer: Food: ${this.resources['food'].amount}, Wood: ${this.resources['wood'].amount} Number: ${this.number}`;
    }
}
Gatherer.add = function (tile, entities) {
    if (!tile)
        return false;
    if (tile.city || tile.road)
        return false;
    if (tile.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_2__["default"].Ocean)
        return false;
    const pop = new Gatherer(tile, 1);
    tile.pop = pop;
    entities.pops.push(pop);
    return true;
};
/* harmony default export */ __webpack_exports__["default"] = (Gatherer);


/***/ }),

/***/ "./Pops/Pop.ts":
/*!*********************!*\
  !*** ./Pops/Pop.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Pop {
    constructor(tile, number, resouces, needs, produces, improvements) {
        this.tile = tile;
        this.number = number;
        this.resources = resouces;
        this.needs = needs;
        this.produces = produces;
        this.fertility = 1;
        this.improvements = improvements;
    }
    update() {
        const maintainence = this.tile.improvements.reduce((current, i) => current.concat(i.maintainence), [])
            .reduce((collection, current) => {
            if (collection[current.resource.name]) {
                collection[current.resource.name].amount += current.amount;
            }
            else {
                collection[current.resource.name] = { amount: current.amount };
            }
            return collection;
        }, {});
        Object.keys(this.produces).forEach((key) => {
            const resource = this.resources[key];
            const produces = this.produces[key] || { amount: 0 };
            const carryingPop = 1 + this.number / 25;
            let gatheredAmount = (produces.gatherEfficiency * this.tile.resources[key].amount * this.number);
            gatheredAmount = gatheredAmount / carryingPop;
            resource.amount += gatheredAmount;
            if (resource.amount >= (this.growRequirement[key] && this.growRequirement[key].amount)) {
                this.number += Math.round(this.fertility * resource.amount / this.growRequirement[key].amount);
                resource.amount -= this.growRequirement[key].amount;
            }
            if (resource.amount <= 0 && this.growRequirement[key]) {
                this.number--;
            }
            this.improveTile();
            console.log(`Number: ${this.number} Food: ${this.resources['food'].amount} Wood: ${this.resources['wood'].amount}`);
        });
        Object.keys(this.needs).forEach((key) => {
            const resource = this.resources[key];
            const needs = this.needs[key];
            resource.amount -= needs.amount * this.number;
            resource.amount += resource.amount * (1 - resource.resource.decay);
            resource.amount -= maintainence[key] ? maintainence[key].amount : 0;
        });
    }
    improveTile() {
        this.improvements.forEach((i) => {
            const costs = i.improvement.costs;
            let afforable = costs.reduce((isAffordable, current) => {
                const key = current.resource.name;
                if (this.resources[key].amount >= current.amount * 1.5) {
                    return true;
                }
                return false;
            }, true);
            if (afforable) {
                if (!this.tile.improvements.find((x) => x.name === i.improvement.name)) {
                    this.tile.improvements.push(i.improvement);
                    this.fertility *= i.improvement.effects.fertility;
                }
            }
        });
    }
    draw(context, tileSize) {
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Pop);


/***/ }),

/***/ "./Resources/BasicTools.ts":
/*!*********************************!*\
  !*** ./Resources/BasicTools.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resource */ "./Resources/Resource.ts");

class BasicTools extends _Resource__WEBPACK_IMPORTED_MODULE_0__["default"] {
}
/* harmony default export */ __webpack_exports__["default"] = (BasicTools);


/***/ }),

/***/ "./Resources/Fibre.ts":
/*!****************************!*\
  !*** ./Resources/Fibre.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resource */ "./Resources/Resource.ts");

class Fibre extends _Resource__WEBPACK_IMPORTED_MODULE_0__["default"] {
}
/* harmony default export */ __webpack_exports__["default"] = (Fibre);


/***/ }),

/***/ "./Resources/Food.ts":
/*!***************************!*\
  !*** ./Resources/Food.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resource */ "./Resources/Resource.ts");
/* harmony import */ var _ResourceType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResourceType */ "./Resources/ResourceType.ts");


const Food = new _Resource__WEBPACK_IMPORTED_MODULE_0__["default"]('food', [_ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].Food], 1.1);
/* harmony default export */ __webpack_exports__["default"] = (Food);


/***/ }),

/***/ "./Resources/Resource.ts":
/*!*******************************!*\
  !*** ./Resources/Resource.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Resource {
    constructor(name, types, decay) {
        this.name = name;
        this.types = types;
        this.decay = decay;
    }
    update(produced, used) {
        const number = (produced - used);
        return number;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Resource);


/***/ }),

/***/ "./Resources/ResourceType.ts":
/*!***********************************!*\
  !*** ./Resources/ResourceType.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ResourceTypes;
(function (ResourceTypes) {
    ResourceTypes["Food"] = "Food";
    ResourceTypes["Fuel"] = "Fuel";
    ResourceTypes["Ingredient"] = "Ingredient";
    ResourceTypes["Tool"] = "Tool";
    ResourceTypes["Shelter"] = "Shelter";
    ResourceTypes["BuildingMaterial"] = "BuildingMaterial";
})(ResourceTypes || (ResourceTypes = {}));
/* harmony default export */ __webpack_exports__["default"] = (ResourceTypes);


/***/ }),

/***/ "./Resources/Resources.ts":
/*!********************************!*\
  !*** ./Resources/Resources.ts ***!
  \********************************/
/*! exports provided: Fibre, BasicTools, Food, Wood */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Fibre__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fibre */ "./Resources/Fibre.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fibre", function() { return _Fibre__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _BasicTools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasicTools */ "./Resources/BasicTools.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BasicTools", function() { return _BasicTools__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Food__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Food */ "./Resources/Food.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Food", function() { return _Food__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Wood__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Wood */ "./Resources/Wood.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Wood", function() { return _Wood__WEBPACK_IMPORTED_MODULE_3__["default"]; });








/***/ }),

/***/ "./Resources/Wood.ts":
/*!***************************!*\
  !*** ./Resources/Wood.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resource */ "./Resources/Resource.ts");
/* harmony import */ var _ResourceType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResourceType */ "./Resources/ResourceType.ts");


const Wood = new _Resource__WEBPACK_IMPORTED_MODULE_0__["default"]('wood', [_ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].BuildingMaterial, _ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].Fuel, _ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].Ingredient], 1.01);
/* harmony default export */ __webpack_exports__["default"] = (Wood);


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
/* harmony import */ var _Map_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map/Map */ "./Map/Map.ts");
/* harmony import */ var _MapEntities_Point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapEntities/Point */ "./MapEntities/Point.ts");



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
  
  const tile = map.clickTile(new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_1__["default"](clientX, clientY));

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
const startDrag = new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);

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

  if (e.keyCode === 13) {
    map.endTurn();
  }

  if (e.keyCode === 71) {
    map.addGatherer();
  }

  if (e.keyCode === 70) {
    map.addCraftsperson();
  }
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vR3JpZC9HcmlkU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9HcmlkL01hcEdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly8vLi9JbXByb3ZlbWVudC9JbXByb3ZlbWVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwL01hcC50cyIsIndlYnBhY2s6Ly8vLi9NYXAvVGlsZXMvR3Jhc3NUaWxlLnRzIiwid2VicGFjazovLy8uL01hcC9UaWxlcy9PY2VhblRpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwL1RpbGVzL1RpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwL1RpbGVzL1RpbGVTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL01hcC9UaWxlcy9UaWxlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9NYXBFbnRpdGllcy9DaXR5LnRzIiwid2VicGFjazovLy8uL01hcEVudGl0aWVzL1BvaW50LnRzIiwid2VicGFjazovLy8uL01hcEVudGl0aWVzL1JvYWQudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwRW50aXRpZXMvUm9hZE5ldHdvcmsudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwRW50aXRpZXMvVW5pdC50cyIsIndlYnBhY2s6Ly8vLi9Qb3BzL0NyYWZ0c3BlcnNvbi50cyIsIndlYnBhY2s6Ly8vLi9Qb3BzL0dhdGhlcmVyLnRzIiwid2VicGFjazovLy8uL1BvcHMvUG9wLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9CYXNpY1Rvb2xzLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9GaWJyZS50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvRm9vZC50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvUmVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL1Jlc291cmNlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvUmVzb3VyY2VzLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9Xb29kLnRzIiwid2VicGFjazovLy8uL2dlbmVyYXRlR3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUM7QUFDQztBQUcxQyxNQUFNLFdBQVc7SUFHZixZQUFZLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxxREFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGlDQUFpQztJQUNqQyxpQkFBaUIsQ0FBQyxjQUFtQixFQUFFLFdBQWdCO1FBQ3JELE1BQU0sT0FBTyxHQUFHLEVBQUUs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QUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUcsVUFBVSxDQUFDLElBQUksR0FBRywyREFBUSxDQUFDLEtBQUssQ0FBQztTQUNsQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsMkRBQVEsQ0FBQyxLQUFLLENBQUM7UUFFakYsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakYsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxTQUFTLENBQUMs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LENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEksQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFZLEVBQUUsUUFBZ0I7UUFDcEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBQyxRQUFRLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUUsUUFBUSxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RJLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBWSxFQUFFLFFBQWdCO1FBQ3ZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBQyxRQUFRLEdBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakosQ0FBQztJQUVELFFBQVEsQ0FBQyxPQUFZLEVBQUUsUUFBZ0I7UUFDckMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxHQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFDLENBQUMs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T0FBTyxvQkFBb0I7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQSx3QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBQb2ludCBmcm9tICcuLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCBtYXBHZW5lcmF0b3IgZnJvbSAnLi9NYXBHZW5lcmF0b3InO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZSc7XHJcblxyXG5jbGFzcyBHcmlkU2VydmljZSB7XHJcbiAgZ3JpZFNpemU6IG51bWJlcjtcclxuICBncmlkOiBhbnlbXTtcclxuICBjb25zdHJ1Y3RvcihncmlkU2l6ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmdyaWRTaXplID0gZ3JpZFNpemU7XHJcbiAgICB0aGlzLmdyaWQgPSBbXTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1hcCgpIHtcclxuICAgIHRoaXMuZ3JpZCA9IG1hcEdlbmVyYXRvci5nZW5lcmF0ZSh0aGlzLmdyaWRTaXplKTtcclxuICB9XHJcblxyXG4gIC8vICB0b2RvIC0gY2hhbmdlIHRoZXNlIHRvIHBvaW50c1xyXG4gIGNyZWF0ZUNsaXBwZWRHcmlkKHZpZXdQb3J0T3JpZ2luOiBhbnksIHZpZXdQb3J0RW5kOiBhbnkpIHtcclxuICAgIGNvbnN0IG5ld2dyaWQgPSBbXTtcclxuICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSBuZXcgUG9pbnQodmlld1BvcnRPcmlnaW4ueCwgdmlld1BvcnRPcmlnaW4ueSk7XHJcbiAgICBjb25zdCBlbmRQb2ludCA9IG5ldyBQb2ludCh2aWV3UG9ydEVuZC54LCB2aWV3UG9ydEVuZC55KTtcclxuICAgIFxyXG4gICAgZm9yIChsZXQgeSA9IHN0YXJ0UG9pbnQueTt5IDw9IGVuZFBvaW50Lnk7eSsrKSB7XHJcbiAgICAgIGNvbnN0IG5ld3JvdyA9IFtdO1xyXG4gICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRbeV07XHJcbiAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gc3RhcnRQb2ludC54OyB4IDw9IGVuZFBvaW50Lng7IHgrKykge1xyXG4gICAgICAgIGNvbnN0IHRpbGUgPSByb3dbeF07XHJcblxyXG4gICAgICAgICAgaWYgKHRpbGUgJiYgdGlsZS5wb2ludCkge1xyXG4gICAgICAgICAgICB0aWxlLmRyYXdpbmdQb2ludCA9IG5ldyBQb2ludCh0aWxlLnBvaW50LngsIHRpbGUucG9pbnQueSk7XHJcbiAgICAgICAgICAgIHRpbGUuZHJhd2luZ1BvaW50LnggPSB4IC0gc3RhcnRQb2ludC54O1xyXG4gICAgICAgICAgICB0aWxlLmRyYXdpbmdQb2ludC55ID0geSAtIHN0YXJ0UG9pbnQueTtcclxuICAgICAgICAgICAgbmV3cm93LnB1c2godGlsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICBcclxuICAgICAgbmV3Z3JpZC5wdXNoKG5ld3Jvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3Z3JpZDtcclxuICB9XHJcbiAgXHJcbiAgdGlsZVRvSW5kZXggKHRpbGU6IFRpbGUpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGlsZS5wb2ludC54LCB0aWxlLnBvaW50LnkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVnaW9uKGluZGV4OiBhbnksIHJhZGl1czogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkZWx0YXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCB4PTA7eDxyYWRpdXMqMisxO3grKykge1xyXG4gICAgICBmb3IgKGxldCB5PTA7eSA8IHJhZGl1cyoyKzE7IHkrKykge1xyXG4gICAgICAgIGRlbHRhcy5wdXNoKHsgeDogeCAtIDEsIHk6IHkgLTEgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJzOiBhbnlbXSA9IFtdO1xyXG4gICAgZGVsdGFzLmZvckVhY2goZGVsdGEgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleFggPSBpbmRleC54ICsgZGVsdGEueDtcclxuICAgICAgY29uc3QgaW5kZXhZID0gaW5kZXgueSArIGRlbHRhLnk7XHJcblxyXG4gICAgICBpZiAoaW5kZXhYIDwgMCB8fCBpbmRleFggPiB0aGlzLmdyaWQubGVuZ3RoLTEgfHxcclxuICAgICAgICAgIGluZGV4WSA8IDAgfHwgaW5kZXhZID4gdGhpcy5ncmlkLmxlbmd0aC0xKSB7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmVpZ2hib3Vycy5wdXNoKHRoaXMuZ3JpZFtpbmRleFldW2luZGV4WF0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3VycztcclxuICB9XHJcblxyXG4gIGdldE5laWdoYm91cnMoaW5kZXg6IFBvaW50LCBwcmVzZXJ2ZU9yZGVyID0gZmFsc2UsIG5vRGlhZ29uYWxzID0gZmFsc2UsIGlucHV0R3JpZDogYW55ID0gbnVsbCkge1xyXG4gICAgbGV0IGdyaWQgPSBpbnB1dEdyaWQgPyBpbnB1dEdyaWQgOiB0aGlzLmdyaWQ7XHJcbiAgICBjb25zdCB0aWxlID0gZ3JpZFtpbmRleC55XVtpbmRleC54XTtcclxuICAgIGNvbnN0IGFsbERlbHRhcyA9IFtcclxuICAgICAgeyB4Oi0xLCB5OiAtMSB9LCB7eDogMCwgeTogLTF9LCAgeyB4OiAxLCB5OiAtMX0sXHJcbiAgICAgIHsgeDotMSwgeTogIDAgfSwgICAgICAgICAgICAgICwgIHsgeDogMSwgeTogIDB9LFxyXG4gICAgICB7IHg6LTEsIHk6ICAxIH0sIHt4OiAwLCB5OiAgMSB9LCB7IHg6IDEsIHk6ICAxfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qgbm9EaWFnb25hbHNEZWx0YXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICwgeyB4OiAwLCB5OiAtMSB9LCAgXHJcbiAgICAgIHsgeDotMSwgeTogIDAgfSwgICAgICAgICAgICAgICwgIHsgeDogMSwgeTogIDB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgeTogIDEgfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgbmVpZ2hib3VyczogYW55W10gPSBbXTtcclxuICAgIGlmICghdGlsZSkge1xyXG4gICAgICByZXR1cm4gbmVpZ2hib3VycztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWx0YXMgPSBub0RpYWdvbmFscyA/IG5vRGlhZ29uYWxzRGVsdGFzIDogYWxsRGVsdGFzO1xyXG4gICAgZGVsdGFzLmZvckVhY2goZGVsdGEgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleFggPSBpbmRleC54ICsgZGVsdGEueDtcclxuICAgICAgY29uc3QgaW5kZXhZID0gaW5kZXgueSArIGRlbHRhLnk7XHJcblxyXG4gICAgICBpZiAoaW5kZXhYIDwgMCB8fCBpbmRleFggPiBncmlkLmxlbmd0aC0xIHx8XHJcbiAgICAgICAgICBpbmRleFkgPCAwIHx8IGluZGV4WSA+IGdyaWQubGVuZ3RoLTEpIHtcclxuICAgICAgICAgIGlmIChwcmVzZXJ2ZU9yZGVyKSBuZWlnaGJvdXJzLnB1c2gobnVsbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmVpZ2hib3Vycy5wdXNoKGdyaWRbaW5kZXhZXVtpbmRleFhdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5laWdoYm91cnM7XHJcbiAgfVxyXG5cclxuICBmaW5kU2VsZWN0ZWRUaWxlQ3Jvc3NOZWlnaGJvdXJzKHRpbGU6IFRpbGUpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRDcm9zc05laWdoYm91cnModGlsZSk7XHJcbiAgfVxyXG5cclxuICBmaW5kQ3Jvc3NOZWlnaGJvdXJzKHRpbGU6IFRpbGUpIHtcclxuICAgIHJldHVybiB0aGlzLmdldE5laWdoYm91cnModGhpcy50aWxlVG9JbmRleCh0aWxlKSwgZmFsc2UsIHRydWUpO1xyXG4gIH1cclxufVxyXG5cclxubGV0IGdyaWRTZXJ2aWNlOiBHcmlkU2VydmljZSA9IG51bGw7XHJcbmZ1bmN0aW9uIGdyaWRTZXJ2aWNlSW5pdChncmlkU2l6ZTogbnVtYmVyKSB7XHJcbiAgZ3JpZFNlcnZpY2UgPSBuZXcgR3JpZFNlcnZpY2UoZ3JpZFNpemUpO1xyXG59XHJcblxyXG5leHBvcnQgeyBncmlkU2VydmljZSwgZ3JpZFNlcnZpY2VJbml0IH07XHJcbiIsImltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSAnLi9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuaW1wb3J0IFBvaW50IGZyb20gJy4uL01hcEVudGl0aWVzL1BvaW50JztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlVHlwZSc7XHJcbmltcG9ydCBUaWxlU2VydmljZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZVNlcnZpY2UnO1xyXG5cclxuY2xhc3MgTWFwR2VuZXJhdG9yIHtcclxuXHJcbiAgZ2VuZXJhdGUoZ3JpZFNpemU6IG51bWJlcikge1xyXG4gICAgbGV0IGdyaWQ6IFRpbGVbXVtdID0gW11cclxuICAgIGZvcihsZXQgaD0wO2g8Z3JpZFNpemU7aCsrKSB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xyXG4gICAgICBmb3IobGV0IHc9MDt3PGdyaWRTaXplO3crKykge1xyXG4gICAgICAgIHJvdy5wdXNoKG5ldyBUaWxlKG5ldyBQb2ludCh3LCBoKSwgVGlsZVR5cGUuTm9uZSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGdyaWQucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBzZWVkVGlsZUNvdW50ID0gODA7XHJcbiAgICBmb3IgKGxldCBpPTA7aSA8IHNlZWRUaWxlQ291bnQ7aSsrKSB7XHJcbiAgICAgIGNvbnN0IHJhbmRvbVRpbGUgPSBncmlkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdyaWQubGVuZ3RoKV1bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JpZC5sZW5ndGgpXTtcclxuICAgICAgcmFuZG9tVGlsZS50eXBlID0gVGlsZVR5cGUuR3Jhc3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdyaWRbTWF0aC5yb3VuZChncmlkLmxlbmd0aC8yKV1bTWF0aC5yb3VuZChncmlkLmxlbmd0aC8yKV0udHlwZSA9IFRpbGVUeXBlLkdyYXNzO1xyXG4gICAgICBcclxuICAgIGdyaWQgPSB0aGlzLmRmYShncmlkU2l6ZSwgZ3JpZCwgdGhpcy5ncm93R3Jhc3MpO1xyXG4gICAgZ3JpZCA9IHRoaXMuZGZhKGdyaWRTaXplLCBncmlkLCB0aGlzLmdyb3dHcmFzcyk7XHJcbiAgICB0aGlzLmZsb29kRmlsbChncmlkLCBncmlkW01hdGgucm91bmQoZ3JpZC5sZW5ndGgvMildW01hdGgucm91bmQoZ3JpZC5sZW5ndGgvMildKTtcclxuXHJcbiAgICBncmlkID0gdGhpcy5kZmEoZ3JpZFNpemUsIGdyaWQsIHRoaXMuc21vb3RoUnVsZSk7XHJcbiAgICBncmlkID0gdGhpcy5kZmEoZ3JpZFNpemUsIGdyaWQsIHRoaXMuc21vb3RoUnVsZSk7XHJcblxyXG4gICAgdGhpcy5maWxsSW5Ib2xlcyhncmlkKTtcclxuXHJcbiAgICByZXR1cm4gZ3JpZDtcclxuICB9XHJcblxyXG4gIGZsb29kRmlsbChncmlkOiBUaWxlW11bXSwgc3RhcnQ6IFRpbGUpIHtcclxuICAgIGNvbnN0IHN0YWNrID0gW3N0YXJ0XTtcclxuXHJcbiAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCB0aWxlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgIGNvbnN0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5nZXROZWlnaGJvdXJzKGdyaWRTZXJ2aWNlLnRpbGVUb0luZGV4KHRpbGUpLCBmYWxzZSwgZmFsc2UsIGdyaWQpO1xyXG4gICAgICBjb25zdCB3YXRlck5laWdoYm91cnMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHgudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pLmxlbmd0aDtcclxuICAgICAgY29uc3QgZ3Jhc3NOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLkdyYXNzKS5sZW5ndGg7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKHdhdGVyTmVpZ2hib3VycyArIGdyYXNzTmVpZ2hib3VycykpID4gd2F0ZXJOZWlnaGJvdXJzKSB7XHJcbiAgICAgICAgdGlsZS50eXBlID0gVGlsZVR5cGUuR3Jhc3M7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGlsZS50eXBlID0gVGlsZVR5cGUuT2NlYW47XHJcbiAgICAgIH1cclxuICAgICAgbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLk5vbmUpLmZvckVhY2goeCA9PiBzdGFjay5wdXNoKHgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRmYSAoZ3JpZFNpemU6IG51bWJlciwgZ3JpZDogVGlsZVtdW10sIHJ1bGU6IGFueSkge1xyXG4gICAgY29uc3QgbmV3R3JpZCA9IFtdO1xyXG5cclxuICAgIGZvcihsZXQgaD0wO2ggPCBncmlkU2l6ZTtoKyspIHtcclxuICAgICAgY29uc3QgbmV3Um93ID0gW107XHJcbiAgICAgIGZvcihsZXQgdz0wO3cgPCBncmlkU2l6ZTt3KyspIHtcclxuICAgICAgICBjb25zdCB0aWxlID0gZ3JpZFtoXVt3XTtcclxuICAgICAgICBjb25zdCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZ2V0TmVpZ2hib3VycyhncmlkU2VydmljZS50aWxlVG9JbmRleCh0aWxlKSwgZmFsc2UsIGZhbHNlLCBncmlkKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd2F0ZXJOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgZ3Jhc3NOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLkdyYXNzKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBydWxlKHRpbGUsIHdhdGVyTmVpZ2hib3VycywgZ3Jhc3NOZWlnaGJvdXJzKTtcclxuICAgICAgICBjb25zdCBjb3B5ID0gVGlsZVNlcnZpY2UuY3JlYXRlVGlsZSh0aWxlLCB0eXBlKTtcclxuICAgICAgICBcclxuICAgICAgICBuZXdSb3cucHVzaChjb3B5KTtcclxuICAgICAgfVxyXG4gICAgICBuZXdHcmlkLnB1c2gobmV3Um93KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdHcmlkO1xyXG4gIH1cclxuXHJcbiAgc21vb3RoUnVsZSAodGlsZTogVGlsZSwgd2F0ZXJOZWlnaGJvdXJzOiBudW1iZXIsIGdyYXNzTmVpZ2hib3VyczogbnVtYmVyKSB7XHJcbiAgICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5PY2VhbiAmJiBncmFzc05laWdoYm91cnMgPiAzKSB7XHJcbiAgICAgIHJldHVybiBUaWxlVHlwZS5HcmFzcztcclxuICAgIH1cclxuICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLkdyYXNzICYmIHdhdGVyTmVpZ2hib3VycyA+IDcpIHtcclxuICAgICAgcmV0dXJuIFRpbGVUeXBlLk9jZWFuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRpbGUudHlwZTtcclxuICB9XHJcblxyXG4gIGdyb3dHcmFzcyAodGlsZTogVGlsZSwgd2F0ZXJOZWlnaGJvdXJzOiBudW1iZXIsIGdyYXNzTmVpZ2hib3VyczogbnVtYmVyKSB7XHJcbiAgICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5PY2VhbiAmJiBncmFzc05laWdoYm91cnMgPiAwKSB7XHJcbiAgICAgIHJldHVybiBUaWxlVHlwZS5HcmFzcztcclxuICAgIH1cclxuICAgIHJldHVybiB0aWxlLnR5cGU7XHJcbiAgfVxyXG5cclxuICBmaWxsSW5Ib2xlcyhncmlkOiBUaWxlW11bXSkge1xyXG4gICAgZm9yKGxldCB5ID0gMDsgeSA8IGdyaWQubGVuZ3RoOyB5KyspIHtcclxuICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCBncmlkW3ldLmxlbmd0aDsgaCsrKSB7XHJcbiAgICAgICAgaWYgKGdyaWRbeV1baF0udHlwZSA9PT0gVGlsZVR5cGUuTm9uZSkge1xyXG4gICAgICAgICAgZ3JpZFt5XVtoXS50eXBlID0gVGlsZVR5cGUuT2NlYW47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgTWFwR2VuZXJhdG9yKCk7IiwiaW1wb3J0ICogYXMgUmVzb3VyY2VzIGZyb20gXCIuLi9SZXNvdXJjZXMvUmVzb3VyY2VzXCI7XHJcblxyXG5jb25zdCBIb3VzZSA9IHtcclxuICBuYW1lOiAnSG91c2UnLFxyXG4gIGNvc3RzOiBbXHJcbiAgICB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAxMCB9LFxyXG4gIF0sXHJcbiAgbWFpbnRhaW5lbmNlOiBbXHJcbiAgICB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAuMjUgfSxcclxuICBdLFxyXG4gIGVmZmVjdHM6IHtcclxuICAgIGZlcnRpbGl0eTogMS4xLFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgSG91c2UgfTtcclxuIiwiaW1wb3J0IFBvaW50IGZyb20gJy4uL01hcEVudGl0aWVzL1BvaW50JztcclxuaW1wb3J0IENpdHkgZnJvbSAnLi4vTWFwRW50aXRpZXMvQ2l0eSc7XHJcbmltcG9ydCBVbml0IGZyb20gJy4uL01hcEVudGl0aWVzL1VuaXQnO1xyXG5pbXBvcnQgeyBncmlkU2VydmljZSwgZ3JpZFNlcnZpY2VJbml0IH0gZnJvbSAnLi4vR3JpZC9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBSb2FkIGZyb20gJy4uL01hcEVudGl0aWVzL1JvYWQnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi9UaWxlcy9UaWxlVHlwZSc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4vVGlsZXMvVGlsZSc7XHJcbmltcG9ydCBHYXRoZXJlciBmcm9tICcuLi9Qb3BzL0dhdGhlcmVyJztcclxuaW1wb3J0IFBvcCBmcm9tICcuLi9Qb3BzL1BvcCc7XHJcbmltcG9ydCBDcmFmdHNwZXJzb24gZnJvbSAnLi4vUG9wcy9DcmFmdHNwZXJzb24nO1xyXG5cclxuY2xhc3MgTWFwIHtcclxuICBjb250ZXh0OiBhbnk7XHJcbiAgc2l6ZTogbnVtYmVyO1xyXG4gIHRpbGVOdW1iZXI6IG51bWJlcjtcclxuICB2aWV3UG9ydE9yaWdpbjogUG9pbnQ7XHJcbiAgc2VsZWN0ZWRUaWxlOiBUaWxlO1xyXG4gIHNlbGVjdGVkRW50aXR5OiBhbnk7XHJcbiAgem9vbUxldmVsOiBudW1iZXI7XHJcbiAgb3JpZ2luOiBQb2ludDtcclxuICB2aWV3UG9ydEVuZDogUG9pbnQ7XHJcbiAgdGlsZVNpemU6IG51bWJlcjtcclxuICBjbGlwcGVkR3JpZDogYW55W107XHJcbiAgdmlld1BvcnRTaXplOiBudW1iZXI7XHJcbiAgZW50aXRpZXM6IGFueTtcclxuICBcclxuICBjb25zdHJ1Y3RvcihzaXplOiBudW1iZXIsIHRpbGVOdW1iZXI6IG51bWJlciwgY29udGV4dDogYW55KSB7XHJcbiAgICAvLyAgRHJhdyBncmlkIG9mIHNxdWFyZXNcclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgdGhpcy50aWxlTnVtYmVyID0gdGlsZU51bWJlcjtcclxuICAgIHRoaXMudmlld1BvcnRPcmlnaW4gPSBuZXcgUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLm9yaWdpbiA9IG5ldyBQb2ludCgwLCAwKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUaWxlID0gbnVsbDtcclxuICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSBudWxsO1xyXG4gICAgdGhpcy5lbnRpdGllcyA9IHtcclxuICAgICAgcG9wczogW11cclxuICAgIH07XHJcblxyXG4gICAgZ3JpZFNlcnZpY2VJbml0KHRoaXMudGlsZU51bWJlcik7XHJcbiAgICBncmlkU2VydmljZS5jcmVhdGVNYXAoKTtcclxuXHJcbiAgICB0aGlzLmNsaXBwZWRHcmlkID0gW107XHJcbiAgICB0aGlzLnZpZXdQb3J0U2l6ZSA9IHNpemU7IC8vICBob3cgbGFyZ2UgdGhlIHZpZXcgcG9ydCBpc1xyXG4gICAgdGhpcy56b29tTGV2ZWwgPSA0MDsgIC8vICBob3cgbWFueSBUaWxlcyBhcmUgaW4gdmlldyBwb3J0XHJcbiAgICB0aGlzLnZpZXdQb3J0RW5kID0gbmV3IFBvaW50KHRoaXMudmlld1BvcnRPcmlnaW4ueCArICB0aGlzLnpvb21MZXZlbCwgdGhpcy52aWV3UG9ydE9yaWdpbi55ICsgIHRoaXMuem9vbUxldmVsKTtcclxuICAgICBcclxuICAgIHRoaXMuY2xpcHBlZEdyaWQgPSBncmlkU2VydmljZS5jcmVhdGVDbGlwcGVkR3JpZCh0aGlzLnZpZXdQb3J0T3JpZ2luLCB0aGlzLnZpZXdQb3J0RW5kKTtcclxuICAgIHRoaXMudGlsZVNpemUgPSB0aGlzLnZpZXdQb3J0U2l6ZSAvIHRoaXMuem9vbUxldmVsOyAvLyAgc2hvdWxkIGJlIHZpZXcgcG9ydCBzaXplIC8gdmlldyBwb3J0IGNvbnRlbnQgc2l6ZVxyXG4gIH1cclxuXHJcbiAgZ3JpZCgpIHtcclxuICAgIHJldHVybiBncmlkU2VydmljZS5ncmlkO1xyXG4gIH1cclxuXHJcbiAgY2xpY2tUaWxlKHBvaW50OiBQb2ludCkge1xyXG4gICAgY29uc3QgdGlsZVggPSBNYXRoLmZsb29yKHBvaW50LnggLyB0aGlzLnRpbGVTaXplKTtcclxuICAgIGNvbnN0IHRpbGVZID0gTWF0aC5mbG9vcihwb2ludC55IC8gdGhpcy50aWxlU2l6ZSk7XHJcblxyXG4gICAgY29uc3QgdGlsZSA9IHRoaXMuY2xpcHBlZEdyaWRbdGlsZVldICYmIHRoaXMuY2xpcHBlZEdyaWRbdGlsZVldW3RpbGVYXTtcclxuXHJcbiAgICBpZiAodGlsZSkgeyAgXHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGlsZSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaWxlLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRpbGUudW5pdCB8fCB0aWxlLnJvYWQgfHwgdGlsZS5jaXR5KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEVudGl0eSA9IHRpbGUudW5pdCB8fCB0aWxlLnJvYWQgfHwgdGlsZS5jaXR5O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUaWxlID0gdGlsZTtcclxuICAgICAgdGlsZS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aWxlO1xyXG4gIH1cclxuXHJcbiAgZHJhZyhkaWZmWDogbnVtYmVyLCBkaWZmWTogbnVtYmVyKSB7XHJcblxyXG4gICAgY29uc3QgbWluRHJhZyA9IDE7XHJcbiAgICBpZiAoTWF0aC5hYnMoZGlmZlgpID4gbWluRHJhZyB8fCBNYXRoLmFicyhkaWZmWSkgPiBtaW5EcmFnKSB7XHJcbiAgICAgIGlmIChkaWZmWCA+IDApIHtcclxuICAgICAgICBjb25zdCBzdW0gPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyBNYXRoLnJvdW5kKGRpZmZYKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnggPSBNYXRoLm1pbihzdW0sIHRoaXMudGlsZU51bWJlcik7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydEVuZC54ID0gdGhpcy52aWV3UG9ydE9yaWdpbi54ICsgdGhpcy56b29tTGV2ZWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy52aWV3UG9ydE9yaWdpbi54ICsgTWF0aC5yb3VuZChkaWZmWCk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi54ID0gTWF0aC5tYXgoc3VtLCAwKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnggPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyB0aGlzLnpvb21MZXZlbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRpZmZZID4gMCkge1xyXG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueSArIE1hdGgucm91bmQoZGlmZlkpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueSA9IE1hdGgubWluKHN1bSwgdGhpcy50aWxlTnVtYmVyKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyB0aGlzLnpvb21MZXZlbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBzdW0gPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyBNYXRoLnJvdW5kKGRpZmZZKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgPSBNYXRoLm1heChzdW0sIDApO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueSArIHRoaXMuem9vbUxldmVsO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vICBtb3ZlIHRvIHVuaXRcclxuICBtb3ZlVW5pdCh1bml0OiBVbml0LCBuZWlnaGJvdXI6IFRpbGUpIHtcclxuICAgIGNvbnN0IG9yaWdpbmFsVGlsZSA9IHVuaXQudGlsZTtcclxuICAgIHVuaXQudGlsZSA9IGdyaWRTZXJ2aWNlLmdyaWRbbmVpZ2hib3VyLnBvaW50LnldW25laWdoYm91ci5wb2ludC54XTtcclxuICAgIGdyaWRTZXJ2aWNlLmdyaWRbbmVpZ2hib3VyLnBvaW50LnldW25laWdoYm91ci5wb2ludC54XS51bml0ID0gdW5pdDtcclxuICAgIG9yaWdpbmFsVGlsZS51bml0ID0gbnVsbDtcclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxuXHJcblxyXG4gIGxlZnRLZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5TGVmdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5MZWZ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByaWdodEtleSgpe1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgJiYgdGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIFVuaXQpIHtcclxuICAgICAgdGhpcy5lbnRpdHlSaWdodCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5SaWdodCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBLZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5VXAoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuVXAoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvd25LZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5RG93bigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5Eb3duKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbnRpdHlMZWZ0KCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGUpWzFdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gVGlsZVR5cGUuT2NlYW4pIHtcclxuICAgICAgdGhpcy5tb3ZlVW5pdCh0aGlzLnNlbGVjdGVkRW50aXR5LCBuZWlnaGJvdXIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBlbnRpdHlSaWdodCgpIHtcclxuICAgIGNvbnN0IG5laWdoYm91ciA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnModGhpcy5zZWxlY3RlZEVudGl0eS50aWxlKVsyXTtcclxuICAgIGlmIChuZWlnaGJvdXIgJiYgbmVpZ2hib3VyLnR5cGUgIT09IFRpbGVUeXBlLk9jZWFuKSB7XHJcbiAgICAgIHRoaXMubW92ZVVuaXQodGhpcy5zZWxlY3RlZEVudGl0eSwgbmVpZ2hib3VyKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZW50aXR5VXAoKSB7XHJcbiAgICBjb25zdCBuZWlnaGJvdXIgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRoaXMuc2VsZWN0ZWRFbnRpdHkudGlsZSlbMF07XHJcbiAgICBpZiAobmVpZ2hib3VyICYmIG5laWdoYm91ci50eXBlICE9PSBUaWxlVHlwZS5PY2Vhbikge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbnRpdHlEb3duKCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LlRpbGUpWzNdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gVGlsZVR5cGUuT2NlYW4pIHtcclxuICAgICAgdGhpcy5tb3ZlVW5pdCh0aGlzLnNlbGVjdGVkRW50aXR5LCBuZWlnaGJvdXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFuTGVmdCgpIHtcclxuICAgIGlmICh0aGlzLnZpZXdQb3J0T3JpZ2luLnggPiAwKSB7XHJcbiAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueC0tO1xyXG4gICAgICB0aGlzLnZpZXdQb3J0RW5kLngtLTtcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYW5SaWdodCgpIHtcclxuICAgIGlmICh0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyB0aGlzLnpvb21MZXZlbCA8IHRoaXMudGlsZU51bWJlcikge1xyXG4gICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLngrKztcclxuICAgICAgdGhpcy52aWV3UG9ydEVuZC54Kys7XHJcbiAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFuVXAoKSB7XHJcbiAgICBpZiAodGhpcy52aWV3UG9ydE9yaWdpbi55ID4gMCkge1xyXG4gICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnktLTtcclxuICAgICAgdGhpcy52aWV3UG9ydEVuZC55LS07XHJcbiAgICAgIHRoaXMudXBkYXRlVmlldygpOyAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYW5Eb3duKCkge1xyXG4gICAgaWYgKHRoaXMudmlld1BvcnRPcmlnaW4ueSArIHRoaXMuem9vbUxldmVsIDwgdGhpcy50aWxlTnVtYmVyKSB7XHJcbiAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueSsrO1xyXG4gICAgICB0aGlzLnZpZXdQb3J0RW5kLnkrKztcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB6b29tT3V0KCkge1xyXG4gICAgaWYgKHRoaXMuem9vbUxldmVsIDwgMTAwKSB7XHJcbiAgICAgIHRoaXMuem9vbUxldmVsKys7XHJcbiAgICAgIHRoaXMuem9vbSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgem9vbUluKCkge1xyXG4gICAgaWYgKHRoaXMuem9vbUxldmVsID4gMSkge1xyXG4gICAgICB0aGlzLnpvb21MZXZlbC0tO1xyXG4gICAgICB0aGlzLnpvb20oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHpvb20oKSB7XHJcbiAgICB0aGlzLnZpZXdQb3J0RW5kID0gbmV3IFBvaW50KHRoaXMudmlld1BvcnRPcmlnaW4ueCArICB0aGlzLnpvb21MZXZlbCwgdGhpcy52aWV3UG9ydE9yaWdpbi55ICsgIHRoaXMuem9vbUxldmVsKTtcclxuICAgIHRoaXMudGlsZVNpemUgPSB0aGlzLnZpZXdQb3J0U2l6ZSAvIHRoaXMuem9vbUxldmVsO1xyXG4gICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVWaWV3KHVwZGF0ZUdyaWQgPSB0cnVlKSB7XHJcbiAgICBpZiAodXBkYXRlR3JpZCl0aGlzLmNsaXBwZWRHcmlkID0gZ3JpZFNlcnZpY2UuY3JlYXRlQ2xpcHBlZEdyaWQodGhpcy52aWV3UG9ydE9yaWdpbiwgdGhpcy52aWV3UG9ydEVuZCk7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG4gIGVuZFR1cm4oKSB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgdGhpcy5lbnRpdGllcy5wb3BzLmZvckVhY2goKHBvcDogUG9wKSA9PiB7XHJcbiAgICAgIHBvcC51cGRhdGUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZHJhdygpIHtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnI0ZGRkZGRic7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcclxuXHJcbiAgICBmb3IobGV0IGg9MDtoPHRoaXMuY2xpcHBlZEdyaWQubGVuZ3RoO2grKykge1xyXG4gICAgICBmb3IobGV0IHc9MDt3PHRoaXMuY2xpcHBlZEdyaWRbaF0ubGVuZ3RoO3crKykge1xyXG4gICAgICAgIGNvbnN0IHRpbGUgPSB0aGlzLmNsaXBwZWRHcmlkW2hdW3ddO1xyXG4gICAgICAgIGlmICh0aWxlICYmICh0aWxlLmRyYXdpbmdQb2ludC54KSA8PSB0aGlzLnZpZXdQb3J0RW5kLnggJiYgKHRpbGUuZHJhd2luZ1BvaW50LngpID49IDAgJiYgKHRpbGUuZHJhd2luZ1BvaW50LnkpID49IDAgJiYgdGlsZS5kcmF3aW5nUG9pbnQueSA8PSB0aGlzLnZpZXdQb3J0RW5kLnkpIHtcclxuICAgICAgICAgIHRpbGUuZHJhdyh0aGlzLmNvbnRleHQsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgaWYgKHRpbGUuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdCh0aWxlLmRyYXdpbmdQb2ludC54ICogdGhpcy50aWxlU2l6ZSwgdGlsZS5kcmF3aW5nUG9pbnQueSAqIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnI0ZGRkZGRic7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRpbGUuY2l0eSkge1xyXG4gICAgICAgICAgICB0aWxlLmNpdHkuZHJhdyh0aGlzLmNvbnRleHQsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aWxlLnJvYWQpIHtcclxuICAgICAgICAgICAgdGlsZS5yb2FkLmRyYXcodGhpcy5jb250ZXh0LCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGlsZS51bml0KSB7XHJcbiAgICAgICAgICAgIHRpbGUudW5pdC5kcmF3KHRoaXMuY29udGV4dCwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRpbGUucG9wKSB7XHJcbiAgICAgICAgICAgIHRpbGUucG9wLmRyYXcodGhpcy5jb250ZXh0LCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFVuaXRUb1NlbGVjdGVkVGlsZSgpIHtcclxuICAgIGlmIChVbml0LmFkZCh0aGlzLnNlbGVjdGVkVGlsZSkpIHtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRSb2FkVG9TZWxlY3RlZFRpbGUoKSB7XHJcbiAgICBpZiAoUm9hZC5hZGQodGhpcy5zZWxlY3RlZFRpbGUpKSB7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkQ2l0eVRvU2VsZWN0ZWRUaWxlKCkge1xyXG4gICAgaWYgKENpdHkuYWRkKHRoaXMuc2VsZWN0ZWRUaWxlKSkge1xyXG4gICAgICB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZEdhdGhlcmVyKCkge1xyXG4gICAgaWYgKEdhdGhlcmVyLmFkZCh0aGlzLnNlbGVjdGVkVGlsZSwgdGhpcy5lbnRpdGllcykpIHtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRDcmFmdHNwZXJzb24oKSB7XHJcbiAgICBpZiAoQ3JhZnRzcGVyc29uLmFkZCh0aGlzLnNlbGVjdGVkVGlsZSwgdGhpcy5lbnRpdGllcykpIHtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVTZWxlY3RlZEVudGl0eSgpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RlZEVudGl0eSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGlsZSA9IHRoaXMuc2VsZWN0ZWRFbnRpdHkudGlsZTtcclxuICAgIGNvbnN0IGdyaWRUaWxlID0gZ3JpZFNlcnZpY2UuZ3JpZFt0aWxlLnBvaW50LnldW3RpbGUucG9pbnQueF07XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIGdyaWRUaWxlLnVuaXQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5laWdoYm91cnMgPSB0aGlzLnNlbGVjdGVkRW50aXR5Lm5laWdoYm91cnM7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIFJvYWQpIHtcclxuICAgICAgLy8gIEZvciBlYWNoIG5laWdoYm91ciBkbyBhIGNvbm5lY3Rpdml0eSBjaGVjayBhbmQgdXBkYXRlIGNvbm5lY3RlZG5lc3NcclxuICAgICAgLy8gIFVwZGF0ZSBuZXR3b3JrcyByb2Fkcy5cclxuICAgICAgUm9hZC5yZW1vdmUoZ3JpZFRpbGUsIHRoaXMuc2VsZWN0ZWRFbnRpdHkpO1xyXG4gICAgICAvLyAgRmluZCBuZXR3b3JrIHRoYXQgdGhlIHJvYWQgaXMgY29ubmVjdGVkIHRvIGFuZCBpdCdzIG5laWdoYm91cnMgYW5kIHJlbW92ZVxyXG4gICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBDaXR5KSB7XHJcbiAgICAgIENpdHkucmVtb3ZlKGdyaWRUaWxlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwO1xyXG4iLCJpbXBvcnQgVGlsZSBmcm9tICcuL1RpbGUnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi9UaWxlVHlwZSc7XHJcbmltcG9ydCBQb2ludCBmcm9tICcuLi8uLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCAqIGFzIFJlc291cmNlcyBmcm9tICcuLi8uLi9SZXNvdXJjZXMvUmVzb3VyY2VzJztcclxuXHJcbmNsYXNzIEdyYXNzVGlsZSBleHRlbmRzIFRpbGUge1xyXG4gIGNvbnN0cnVjdG9yKHBvaW50OiBQb2ludCkge1xyXG4gICAgc3VwZXIocG9pbnQsIFRpbGVUeXBlLkdyYXNzKTtcclxuICAgIHRoaXMucmVzb3VyY2VzID0geyB9O1xyXG4gICAgdGhpcy5yZXNvdXJjZXNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuRm9vZCwgYW1vdW50OiAyIH07XHJcbiAgICB0aGlzLnJlc291cmNlc1tSZXNvdXJjZXMuV29vZC5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5Xb29kLCBhbW91bnQ6IDAuNSB9O1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMEZGMDAnO1xyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSwgdGlsZVNpemUsIHRpbGVTaXplKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyYXNzVGlsZTtcclxuIiwiaW1wb3J0IFRpbGUgZnJvbSAnLi9UaWxlJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4vVGlsZVR5cGUnO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vTWFwRW50aXRpZXMvUG9pbnQnO1xyXG5cclxuY2xhc3MgT2NlYW5UaWxlIGV4dGVuZHMgVGlsZSB7XHJcbiAgY29uc3RydWN0b3IocG9pbnQ6IFBvaW50KSB7XHJcbiAgICBzdXBlcihwb2ludCwgVGlsZVR5cGUuT2NlYW4pO1xyXG4gIH1cclxuICBkcmF3KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDBGRic7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplLCB0aWxlU2l6ZSwgdGlsZVNpemUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2NlYW5UaWxlO1xyXG4iLCJpbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vTWFwRW50aXRpZXMvUG9pbnQnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi9UaWxlVHlwZSc7XHJcbmltcG9ydCBVbml0IGZyb20gJy4uLy4uL01hcEVudGl0aWVzL1VuaXQnO1xyXG5pbXBvcnQgQ2l0eSBmcm9tICcuLi8uLi9NYXBFbnRpdGllcy9DaXR5JztcclxuaW1wb3J0IFBvcCBmcm9tICcuLi8uLi9Qb3BzL1BvcCc7XHJcbmltcG9ydCBPY2VhblRpbGUgZnJvbSAnLi9PY2VhblRpbGUnO1xyXG5pbXBvcnQgR3Jhc3NUaWxlIGZyb20gJy4vR3Jhc3NUaWxlJztcclxuaW1wb3J0IElQcmludGFibGUgZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUHJpbnRhYmxlJztcclxuXHJcbmNsYXNzIFRpbGUgaW1wbGVtZW50cyBJUHJpbnRhYmxle1xyXG4gIHBvaW50OiBQb2ludDtcclxuICBzZWxlY3RlZDogYm9vbGVhbjtcclxuICB0eXBlOiBUaWxlVHlwZTtcclxuICBpZDogc3RyaW5nO1xyXG4gIGNpdHk6IENpdHk7XHJcbiAgcm9hZDogYW55O1xyXG4gIHVuaXQ6IFVuaXQ7XHJcbiAgZHJhd2luZ1BvaW50OiBQb2ludDtcclxuICByZXNvdXJjZXM6IGFueTtcclxuICBwb3A6IFBvcDtcclxuICBpbXByb3ZlbWVudHM6IGFueSA9IFtdO1xyXG4gIHN0YXRpYyBjb3B5OiAodGlsZTogVGlsZSwgdHlwZT86IGFueSkgPT4gVGlsZTtcclxuXHJcbiAgY29uc3RydWN0b3IocG9pbnQ6IFBvaW50LCB0eXBlOiBUaWxlVHlwZSkge1xyXG4gICAgdGhpcy5wb2ludCA9IFBvaW50LmNvcHkocG9pbnQpO1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pZCA9IGAke3BvaW50Lnh9LSR7cG9pbnQueX1gO1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICB9XHJcblxyXG4gIGVxdWFscyhvdGhlclRpbGU6IFRpbGUpIHtcclxuICAgIHJldHVybiB0aGlzLnBvaW50LmVxdWFscyhvdGhlclRpbGUucG9pbnQpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICBjb25zdCB0aWxlRGV0YWlscyA9IGAke3RoaXMucG9pbnQueH0sICR7dGhpcy5wb2ludC55fSwgJHt0aGlzLnR5cGV9YDtcclxuICAgIGxldCBjaXR5RGV0YWlscyA9ICcnO1xyXG4gICAgaWYgKHRoaXMuY2l0eSkge1xyXG4gICAgICBjaXR5RGV0YWlscyA9IHRoaXMuY2l0eS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByb2FkRGV0YWlscyA9ICcnO1xyXG4gICAgaWYgKHRoaXMucm9hZCkge1xyXG4gICAgICByb2FkRGV0YWlscyA9IGAke3RoaXMucm9hZC50b1N0cmluZygpfVxcbiR7dGhpcy5yb2FkLnJvYWROZXR3b3JrLnRvU3RyaW5nKCl9YFxyXG4gICAgfVxyXG5cclxuICAgIGxldCBwb3BEZXRhaWxzID0gdGhpcy5wb3AgPyB0aGlzLnBvcC50b1N0cmluZygpIDogJyc7XHJcblxyXG4gICAgY29uc3QgdW5pdERldGFpbHMgPSB0aGlzLnVuaXQgPyB0aGlzLnVuaXQudG9TdHJpbmcoKSA6ICcnO1xyXG5cclxuICAgIGNvbnN0IGltcHJvdmVtZW50RGV0YWlscyA9IHRoaXMuaW1wcm92ZW1lbnRzLm1hcCgoeDogYW55KSA9PiB4Lm5hbWUpLmpvaW4oJywnKTtcclxuICAgIHJldHVybiBgJHt0aWxlRGV0YWlsc30gJHtjaXR5RGV0YWlsc30gJHtyb2FkRGV0YWlsc30gJHt1bml0RGV0YWlsc30gJHtwb3BEZXRhaWxzfSAke2ltcHJvdmVtZW50RGV0YWlsc31gO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSwgdGlsZVNpemUsIHRpbGVTaXplKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlsZTtcclxuIiwiaW1wb3J0IFRpbGUgZnJvbSBcIi4vVGlsZVwiO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSBcIi4vVGlsZVR5cGVcIjtcclxuaW1wb3J0IEdyYXNzVGlsZSBmcm9tIFwiLi9HcmFzc1RpbGVcIjtcclxuaW1wb3J0IE9jZWFuVGlsZSBmcm9tIFwiLi9PY2VhblRpbGVcIjtcclxuXHJcbmNsYXNzIFRpbGVTZXJ2aWNlIHtcclxuXHJcbiAgY29weVRpbGUgPSBmdW5jdGlvbiAodGlsZTogVGlsZSkge1xyXG4gICAgbGV0IGNvcHk7XHJcbiAgICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5Ob25lKSB7XHJcbiAgICAgIGNvcHkgPSBuZXcgVGlsZSh0aWxlLnBvaW50LCB0aWxlLnR5cGUpO1xyXG4gICAgICBjb3B5LnNlbGVjdGVkID0gY29weS5zZWxlY3RlZDtcclxuICAgIH1cclxuICBcclxuICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLkdyYXNzKSB7XHJcbiAgICAgIGNvcHkgPSBuZXcgR3Jhc3NUaWxlKHRpbGUucG9pbnQpO1xyXG4gICAgICBjb3B5LnNlbGVjdGVkID0gY29weS5zZWxlY3RlZDtcclxuICAgIH1cclxuICBcclxuICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKSB7XHJcbiAgICAgIGNvcHkgPSBuZXcgT2NlYW5UaWxlKHRpbGUucG9pbnQpO1xyXG4gICAgICBjb3B5LnNlbGVjdGVkID0gY29weS5zZWxlY3RlZDtcclxuICAgIH1cclxuICBcclxuICAgIHJldHVybiBjb3B5O1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVGlsZSA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIHR5cGU6IFRpbGVUeXBlKSB7XHJcbiAgICBzd2l0Y2godHlwZSkge1xyXG4gICAgICBjYXNlIFRpbGVUeXBlLkdyYXNzOlxyXG4gICAgICAgIHJldHVybiBuZXcgR3Jhc3NUaWxlKHRpbGUucG9pbnQpO1xyXG4gICAgICBjYXNlIFRpbGVUeXBlLk9jZWFuOlxyXG4gICAgICAgIHJldHVybiBuZXcgT2NlYW5UaWxlKHRpbGUucG9pbnQpO1xyXG4gICAgICBjYXNlIFRpbGVUeXBlLk5vbmU6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaWxlKHRpbGUucG9pbnQsIFRpbGVUeXBlLk5vbmUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgaW5zdGFuY2UgPSBuZXcgVGlsZVNlcnZpY2UoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImVudW0gVGlsZVR5cGUge1xyXG4gIE5vbmUgPSAnTm9uZScsXHJcbiAgR3Jhc3MgPSAnR3Jhc3MnLFxyXG4gIEZvcmVzdCA9ICdGb3Jlc3QnLFxyXG4gIE9jZWFuID0gJ09jZWFuJyxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlsZVR5cGU7XHJcbiIsIlxyXG5pbXBvcnQgZ2VuZXJhdGVHdWlkIGZyb20gJy4uL2dlbmVyYXRlR3VpZCc7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vR3JpZC9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlVHlwZSc7XHJcblxyXG5jbGFzcyBDaXR5IHtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgaWQ6IHN0cmluZztcclxuICB0aWxlOiBUaWxlO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBwb3B1bGF0aW9uOiBudW1iZXI7XHJcbiAgZGlzdGFuY2VzOiBhbnlbXTtcclxuICBzdGF0aWMgYWRkOiAodGlsZTogVGlsZSkgPT4gYm9vbGVhbjtcclxuICByb2FkTmV0d29ya3M6IGFueTtcclxuICBzdGF0aWMgcmVtb3ZlOiAoZ3JpZFRpbGU6IFRpbGUpID0+IHZvaWQ7XHJcbiAgY29uc3RydWN0b3IodGlsZTogVGlsZSwgbmFtZTogc3RyaW5nLCBwb3B1bGF0aW9uOiBudW1iZXIpIHtcclxuICAgIHRoaXMudHlwZSA9ICdjaXR5JztcclxuICAgIHRoaXMuaWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuICAgIHRoaXMudGlsZSA9IHRpbGU7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5wb3B1bGF0aW9uID0gcG9wdWxhdGlvbjtcclxuXHJcbiAgICB0aGlzLmRpc3RhbmNlcyA9IFtdO1xyXG5cclxuICAgIGxldCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aWxlKVxyXG4gICAgICAuZmlsdGVyKChuZWlnaGJvdXI6IGFueSkgPT4gbmVpZ2hib3VyLmNpdHkgfHwgbmVpZ2hib3VyLnJvYWQpXHJcbiAgICAgIC5tYXAoeCA9PiB4LnJvYWQgfHwgeC5jaXR5KTtcclxuXHJcbiAgICB0aGlzLnJvYWROZXR3b3JrcyA9IFtdO1xyXG4gICAgXHJcbiAgICBuZWlnaGJvdXJzLmZvckVhY2goKG5laWdoYm91cjogYW55KSA9PiB7XHJcbiAgICAgIGlmIChuZWlnaGJvdXIudHlwZSA9PT0gJ3JvYWQnKSB7XHJcbiAgICAgICAgdGhpcy5hZGROZXR3b3JrKG5laWdoYm91ci5yb2FkTmV0d29yayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIG5laWdoYm91cnMuZmlsdGVyKCh4OiBhbnkpID0+IHggJiYgeC5yb2FkKS5mb3JFYWNoKChuZWlnaGJvdXI6IGFueSkgPT4ge1xyXG4gICAgICBuZWlnaGJvdXIucm9hZC51cGRhdGVTaGFwZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBlcXVhbHMob3RoZXJDaXR5OiBhbnkpIHtcclxuICAgIHJldHVybiBvdGhlckNpdHkuaWQgPT09IHRoaXMuaWQ7XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XHJcbiAgICBjb25zdCBiYXNlWCA9IHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplO1xyXG4gICAgY29uc3QgYmFzZVkgPSB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZTtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoYmFzZVgsICBiYXNlWSArIHRpbGVTaXplLzIsIHRpbGVTaXplLzQsIHRpbGVTaXplLzIpO1xyXG4gICAgY29udGV4dC5maWxsUmVjdChiYXNlWCArIHRpbGVTaXplLzQsICBiYXNlWSArIHRpbGVTaXplLzQsIHRpbGVTaXplLzIsIDMqdGlsZVNpemUvNCk7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KGJhc2VYICsgMyp0aWxlU2l6ZS80LCAgYmFzZVkgKyB0aWxlU2l6ZS8yLCB0aWxlU2l6ZS80LCB0aWxlU2l6ZS8yKTtcclxuXHJcbiAgICAvL2NvbnN0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5nZXROZWlnaGJvdXJzKHRoaXMudGlsZS5wb2ludCk7XHJcbiAgICBcclxuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XHJcbiAgICBjb250ZXh0LnN0cm9rZVJlY3QoKHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAtIDEpICogdGlsZVNpemUsICh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgLSAxKSAqIHRpbGVTaXplLCB0aWxlU2l6ZSozLCB0aWxlU2l6ZSozKTtcclxuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnI0ZGRkZGRic7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIGNvbnN0IGRpc3RhbmNlcyA9IHRoaXMuZGlzdGFuY2VzLm1hcCh4ID0+IGBJZDogJHt4LmNpdHkuaWR9IGRpc3RhbmNlOiAke3guZGlzdGFuY2V9XFxuYCk7XHJcbiAgICByZXR1cm4gYCR7dGhpcy5pZH06ICR7dGhpcy5wb3B1bGF0aW9ufVxcbiAke2Rpc3RhbmNlc31gO1xyXG4gIH1cclxuXHJcbiAgYWRkTmV0d29yayhuZXR3b3JrOiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5yb2FkTmV0d29ya3Muc29tZSgoeDogYW55KSA9PiB4LmlkID09PSBuZXR3b3JrLmlkKSkge1xyXG4gICAgICB0aGlzLnJvYWROZXR3b3Jrcy5wdXNoKG5ldHdvcmspO1xyXG4gICAgICBuZXR3b3JrLmNpdGllcy5wdXNoKHRoaXMpO1xyXG4gICAgICBuZXR3b3JrLmZpbmREaXN0YW5jZXNGb3JDaXRpZXMoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkNpdHkucmVtb3ZlID0gZnVuY3Rpb24oZ3JpZFRpbGU6IFRpbGUpIHtcclxuICBcclxuICBncmlkVGlsZS5jaXR5ID0gbnVsbDtcclxuICAvLyAgUmVtb3ZlIGZyb20gbmVpZ2hib3VyaW5nIHJvYWRuZXR3b3JrcyBhbmQgcmVjYWxjdWxhdGUgbmV0d29ya3NcclxufVxyXG5cclxuQ2l0eS5hZGQgPSBmdW5jdGlvbih0aWxlOiBUaWxlKSB7XHJcbiAgaWYgKCF0aWxlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0aWxlLmNpdHkgfHwgdGlsZS5yb2FkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGNvbnN0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5nZXRSZWdpb24odGlsZS5wb2ludCwgMik7XHJcblxyXG4gIGlmIChuZWlnaGJvdXJzLmZpbHRlcigoeDogYW55KSA9PiB4LmNpdHkpLmxlbmd0aCA+IDApIHJldHVybiBmYWxzZTtcclxuICB0aWxlLmNpdHkgPSBuZXcgQ2l0eSh0aWxlLCAnTmV3IENpdHknLCAxKTtcclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENpdHkiLCJcclxuY2xhc3MgUG9pbnQge1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgc3RhdGljIGNvcHk6IChwb2ludDogUG9pbnQpID0+IFBvaW50O1xyXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICB9XHJcblxyXG4gIGVxdWFscyhvdGhlclBvaW50OiBQb2ludCkge1xyXG4gICAgcmV0dXJuIHRoaXMueCA9PT0gb3RoZXJQb2ludC54ICYmIHRoaXMueSA9PT0gb3RoZXJQb2ludC55O1xyXG4gIH1cclxufVxyXG5cclxuUG9pbnQuY29weSA9IGZ1bmN0aW9uKHBvaW50OiBQb2ludCkge1xyXG4gIHJldHVybiBuZXcgUG9pbnQocG9pbnQueCwgcG9pbnQueSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBvaW50OyIsIlxyXG5pbXBvcnQgUm9hZE5ldHdvcmsgZnJvbSAnLi9Sb2FkTmV0d29yayc7XHJcbmltcG9ydCBDaXR5IGZyb20gJy4vQ2l0eSc7XHJcbmltcG9ydCBnZW5lcmF0ZUd1aWQgZnJvbSAnLi4vZ2VuZXJhdGVHdWlkJztcclxuaW1wb3J0IHsgZ3JpZFNlcnZpY2UgfSBmcm9tICcuLi9HcmlkL0dyaWRTZXJ2aWNlJztcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGUnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGVUeXBlJztcclxuXHJcbmNvbnN0IFNoYXBlcyA9IHtcclxuICBpc29sYXRlZDogJ2lzb2xhdGVkJyxcclxuICB0b3A6ICd0b3AnLFxyXG4gIGxlZnQ6ICdsZWZ0JyxcclxuICBib3R0b206ICdib3R0b20nLFxyXG4gIHJpZ2h0OiAncmlnaHQnLFxyXG4gIHZlcnRpY2FsOiAndmVydGljYWwnLFxyXG4gIGhvcml6b250YWw6ICdob3Jpem9udGFsJyxcclxuICB0b3BSaWdodDogJ3RvcFJpZ2h0JyxcclxuICB0b3BMZWZ0OiAndG9wTGVmdCcsXHJcbiAgYm90dG9tUmlnaHQ6ICdib3R0b21SaWdodCcsXHJcbiAgYm90dG9tTGVmdDogJ2JvdHRvbUxlZnQnLFxyXG4gIGhvcml6b250YWxCb3R0b206ICdob3Jpem9udGFsQm90dG9tJyxcclxuICBob3Jpem9udGFsVG9wOiAnaG9yaXpvbnRhbFRvcCcsXHJcbiAgdmVydGljYWxMZWZ0OiAndmVydGljYWxMZWZ0JyxcclxuICB2ZXJ0aWNhbFJpZ2h0OiAndmVydGljYWxSaWdodCcsXHJcbiAgY3Jvc3M6ICdjcm9zcydcclxufTtcclxuXHJcblxyXG5jbGFzcyBSb2FkIHtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgaWQ6IHN0cmluZztcclxuICB0aWxlOiBUaWxlO1xyXG4gIHNoYXBlOiBhbnk7XHJcbiAgc3RhdGljIGFkZDogKHRpbGU6IFRpbGUpID0+IGJvb2xlYW47XHJcbiAgc3RhdGljIGZpbmRTaGFwZTogYW55O1xyXG4gIHJvYWROZXR3b3JrOiBSb2FkTmV0d29yaztcclxuICBzdGF0aWMgcmVtb3ZlOiAoZ3JpZFRpbGU6IFRpbGUsIHJvYWQ6IFJvYWQpID0+IHZvaWQ7XHJcbiAgc3RhdGljIGZpbmRDb25uZWN0aXZpdHk6IChyb2FkczogYW55KSA9PiB2b2lkO1xyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IFRpbGUpIHtcclxuICAgIHRoaXMudHlwZSA9ICdyb2FkJztcclxuICAgIHRoaXMuaWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuICAgIHRoaXMudGlsZSA9IHRpbGU7XHJcblxyXG4gICAgbGV0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRpbGUpO1xyXG5cclxuICAgIHRoaXMuc2hhcGUgPSBSb2FkLmZpbmRTaGFwZShuZWlnaGJvdXJzKTtcclxuICAgIG5laWdoYm91cnMgPSBuZWlnaGJvdXJzLmZpbHRlcihuZWlnaGJvdXIgPT4gbmVpZ2hib3VyLmNpdHkgfHwgbmVpZ2hib3VyLnJvYWQpXHJcbiAgICAgIC5tYXAoeCA9PiB4LnJvYWQgfHwgeC5jaXR5KTtcclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJpbmdSb2FkcyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geCBpbnN0YW5jZW9mIFJvYWQpXHJcbiAgICBjb25zdCBuZWlnaGJvdXJpbmdSb2FkTmV0d29ya3MgPSBuZWlnaGJvdXJpbmdSb2Fkcy5tYXAoeCA9PiB4LnJvYWROZXR3b3JrKTtcclxuXHJcbiAgICBpZiAobmVpZ2hib3VyaW5nUm9hZE5ldHdvcmtzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLm1lcmdlTmV0d29ya3MobmVpZ2hib3VyaW5nUm9hZE5ldHdvcmtzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmsgPSBuZXcgUm9hZE5ldHdvcmsoKTtcclxuICAgICAgdGhpcy5yb2FkTmV0d29yay5hZGRSb2FkKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5laWdoYm91cmluZ0NpdGllcyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geCBpbnN0YW5jZW9mIENpdHkpO1xyXG4gICAgbmVpZ2hib3VyaW5nQ2l0aWVzLmZvckVhY2goY2l0eSA9PiB7XHJcbiAgICAgIGNpdHkuYWRkTmV0d29yayh0aGlzLnJvYWROZXR3b3JrKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG5laWdoYm91cmluZ1JvYWRzLmZvckVhY2gocm9hZCA9PiB7XHJcbiAgICAgIHJvYWQubmVpZ2hib3Vycy5wdXNoKHRoaXMpO1xyXG4gICAgICByb2FkLnNoYXBlID0gUm9hZC5maW5kU2hhcGUocm9hZC5uZWlnaGJvdXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXF1YWxzKG90aGVyUm9hZDogUm9hZCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGlsZS5lcXVhbHMob3RoZXJSb2FkLnRpbGUpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYCR7dGhpcy50eXBlfTogJHt0aGlzLnNoYXBlfWA7XHJcbiAgfVxyXG4gIFxyXG4gIG1lcmdlTmV0d29ya3MobmV0d29ya3M6IGFueVtdKSB7XHJcbiAgICBjb25zdCBmaXJzdCA9IG5ldHdvcmtzLnBvcCgpO1xyXG4gICAgaWYgKCF0aGlzLnJvYWROZXR3b3JrKSB7XHJcbiAgICAgIGZpcnN0LmFkZFJvYWQodGhpcyk7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmsgPSBmaXJzdDtcclxuICAgIH1cclxuICAgIGZpcnN0Lm1lcmdlKG5ldHdvcmtzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNoYXBlKCkge1xyXG4gICAgY29uc3QgbiA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnModGhpcy50aWxlKTtcclxuICAgIHRoaXMuc2hhcGUgPSBSb2FkLmZpbmRTaGFwZShuKTtcclxuICB9XHJcblxyXG4gIGRyYXdIb3Jpem9udGFsKGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRpbGVTaXplLCB0aWxlU2l6ZS80KTtcclxuICB9XHJcblxyXG4gIGRyYXdWZXJ0aWNhbChjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplLCB0aWxlU2l6ZS80LCB0aWxlU2l6ZSk7XHJcbiAgfVxyXG5cclxuICBkcmF3VG9wKGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikgeyBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplLCB0aWxlU2l6ZS80LCA1KnRpbGVTaXplLzgpO1xyXG4gIH1cclxuICBcclxuICBkcmF3Qm90dG9tKGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikgeyBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aWxlU2l6ZS80LCB0aWxlU2l6ZSk7XHJcbiAgfVxyXG4gIFxyXG4gIGRyYXdMZWZ0KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikgeyBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCA1KnRpbGVTaXplLzgsIHRpbGVTaXplLzQpO1xyXG4gIH1cclxuICBcclxuICBkcmF3UmlnaHQoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7IFxyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSArIHRpbGVTaXplLzIsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCAzKnRpbGVTaXplLzQsIHRpbGVTaXplLzQpO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNjNDhiMjMnO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5zaGFwZSkge1xyXG4gICAgICBjYXNlIFNoYXBlcy5pc29sYXRlZDpcclxuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgdGlsZVNpemUvMiwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyB0aWxlU2l6ZS8yLCB0aWxlU2l6ZS80LCB0aWxlU2l6ZS80KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBcclxuICAgICAgY2FzZSBTaGFwZXMudmVydGljYWw6XHJcbiAgICAgICAgdGhpcy5kcmF3VmVydGljYWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBcclxuICAgICAgY2FzZSBTaGFwZXMuaG9yaXpvbnRhbDpcclxuICAgICAgICB0aGlzLmRyYXdIb3Jpem9udGFsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBcclxuICAgICAgY2FzZSBTaGFwZXMubGVmdDpcclxuICAgICAgICB0aGlzLmRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnJpZ2h0OlxyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnRvcDpcclxuICAgICAgICB0aGlzLmRyYXdUb3AoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMuYm90dG9tOlxyXG4gICAgICAgIHRoaXMuZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5jcm9zczpcclxuICAgICAgICB0aGlzLmRyYXdWZXJ0aWNhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy50b3BMZWZ0OlxyXG4gICAgICAgIHRoaXMuZHJhd1RvcChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3TGVmdChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy50b3BSaWdodDpcclxuICAgICAgICB0aGlzLmRyYXdUb3AoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmJvdHRvbUxlZnQ6XHJcbiAgICAgICAgdGhpcy5kcmF3Qm90dG9tKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmJvdHRvbVJpZ2h0OlxyXG4gICAgICAgIHRoaXMuZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3UmlnaHQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMudmVydGljYWxMZWZ0OlxyXG4gICAgICAgIHRoaXMuZHJhd1ZlcnRpY2FsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnZlcnRpY2FsUmlnaHQ6XHJcbiAgICAgICAgdGhpcy5kcmF3VmVydGljYWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmhvcml6b250YWxUb3A6XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3VG9wKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmhvcml6b250YWxCb3R0b206XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3Qm90dG9tKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblJvYWQucmVtb3ZlID0gZnVuY3Rpb24gKGdyaWRUaWxlOiBUaWxlLCByb2FkOiBSb2FkKSB7XHJcbiAgZ3JpZFRpbGUucm9hZCA9IG51bGw7XHJcblxyXG4gIC8vICBDYXNlczpcclxuICAvLyAgICBzaW5nbGUgbmVpZ2hib3VyaW5nIHJvYWRcclxuICAvLyAgICAgIHJlbW92ZSByb2FkIGZyb20gbmVpZ2hib3VyIGFuZCBmcm9tIG5ldHdvcmtcclxuICAvLyAgICBtdWx0aXBsZSBuZWlnaGJvdXJpbmcgcm9hZHNcclxuICAvLyAgICAgIHJlbW92ZSByb2FkIGZyb20gbmVpZ2hib3VycyBcclxuICAvLyAgICAgIGZvciBlYWNoIG5laWdoYm91cmluZyBuZXR3b3JrIHJlcHJvY2VzcyBjb25uZWN0aXZpdHlcclxuICAvLyAgICBuZWlnaGJvdXJpbmcgY2l0eVxyXG4gIC8vICAgICAgUmVtb3ZlIHJvYWQgZnJvbSBuZWlnaGJvdXJzXHJcbiAgLy8gICAgICBwcm9jZXNzIGNvbm5lY3Rpdml0eSB0byBjaGVjayBpZiB0aGUgbmV0d29yayBzaG91bGQgYmUgcmVtb3ZlZFxyXG4gIC8vIHJvYWQubmVpZ2hib3Vycy5mb3JFYWNoKG5laWdoYm91ciA9PiB7XHJcbiAgLy8gICBuZWlnaGJvdXIubmVpZ2hib3VycyA9IG5laWdoYm91ci5uZWlnaGJvdXJzLmZpbHRlcih4ID0+IHguaWQgIT09IG5laWdoYm91cik7XHJcbiAgLy8gfSlcclxufVxyXG5cclxuUm9hZC5maW5kQ29ubmVjdGl2aXR5ID0gZnVuY3Rpb24ocm9hZHMpIHtcclxuICAvLyBJZGVhIGlzIHRvIHBlcmZvcm0gYSBzZXBlcmF0ZSBiZnMgaW4gc3RlcCBvbiBlYWNoIHBlYWNlIG9mIHJvYWQgYW5kIGNoZWNrIGNvbm5lY3Rpdml0eSBhdCBlYWNoIHN0ZXBcclxuICAvLyBJZiB0d28gbmV0d29ya3MgY29udGFpbiB0aGUgc2FtZSBub2RlIHRoZW4gdGhleSBhcmUgY29ubmVjdGVkLlxyXG5cclxuICAvLyBjb25zdCBzZWFyY2hlcyA9IHJvYWRzLm1hcCh4ID0+IHtcclxuICAvLyAgIGNvbnN0IHZpc2l0ZWQgPSB7fTtcclxuICAvLyAgIHZpc2l0ZWRbeC5pZF0gPSB0cnVlO1xyXG4gIC8vICAgcmV0dXJuIHsgaXNGaW5pc2hlZDogZmFsc2UsIGVkZ2VTZXQ6IHgubmVpZ2hib3VycywgdmlzaXRlZCwgY29ubmVjdGVkOiBbXSB9O1xyXG4gIC8vIH0pO1xyXG5cclxuICAvLyB3aGlsZSAoc2VhcmNoZXMuZmluZCh4ID0+IHguaXNGaW5pc2hlZCkubGVuZ3RoID4gMCkge1xyXG4gIC8vICAgY29uc29sZS5sb2coJ0l0ZXJhdGlvbiAxJyk7XHJcbiAgLy8gICBzZWFyY2hlcy5mb3JFYWNoKHggPT4geC5maW5pc2hlZCA9IHRydWUpO1xyXG4gIC8vIH1cclxuICAvLyAgQ29udGludWUgdW50aWwgYWxsIHNlYXJjaGVzIGFyZSBjb21wbGV0ZS5cclxuICAvLyAgVGVzdCBlYWNoIGl0ZXJhdGlvbiBhbmQgc3RvcCBzZWFyY2ggaWYgbmVjZXNzYXJ5LlxyXG59XHJcblxyXG4vLyAgU2F2ZSBzdGF0ZSBcclxuLy8gUm9hZC5pbmNyZW1lbnRhbEJmcyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gfVxyXG5cclxuXHJcblJvYWQuZmluZFNoYXBlID0gZnVuY3Rpb24gKG5laWdoYm91cnM6IFRpbGVbXSkge1xyXG4gIGNvbnN0IHRvcE5laWdoYm91ciA9IChuZWlnaGJvdXJzWzBdICYmIChuZWlnaGJvdXJzWzBdLnJvYWQgfHwgbmVpZ2hib3Vyc1swXS5jaXR5KSkgfHwgbnVsbDtcclxuICBjb25zdCBsZWZ0TmVpZ2hib3VyID0gKG5laWdoYm91cnNbMV0gJiYgKG5laWdoYm91cnNbMV0ucm9hZCB8fCBuZWlnaGJvdXJzWzFdLmNpdHkpKSB8fCBudWxsO1xyXG4gIGNvbnN0IHJpZ2h0TmVpZ2hib3VyID0gKG5laWdoYm91cnNbMl0gJiYgKG5laWdoYm91cnNbMl0ucm9hZCB8fCBuZWlnaGJvdXJzWzJdLmNpdHkpKSB8fCBudWxsO1xyXG4gIGNvbnN0IGJvdHRvbU5laWdoYm91ciA9IChuZWlnaGJvdXJzWzNdICYmIChuZWlnaGJvdXJzWzNdLnJvYWQgfHwgbmVpZ2hib3Vyc1szXS5jaXR5KSkgfHwgbnVsbDtcclxuXHJcbiAgbGV0IHNoYXBlID0gU2hhcGVzLmlzb2xhdGVkO1xyXG4gIFxyXG4gIGlmICh0b3BOZWlnaGJvdXIpIHtcclxuICAgIGlmIChsZWZ0TmVpZ2hib3VyKSB7XHJcbiAgICAgIGlmIChyaWdodE5laWdoYm91ciAmJiBib3R0b21OZWlnaGJvdXIpIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy5jcm9zcztcclxuICAgICAgICAvLyBbdG9wTmVpZ2hib3VyLCBsZWZ0TmVpZ2hib3VyLCByaWdodE5laWdoYm91ciwgYm90dG9tTmVpZ2hib3VyXS5mb3JFYWNoKHVwZGF0ZVJvYWQpO1xyXG4gICAgICB9IGVsc2UgaWYgKHJpZ2h0TmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMuaG9yaXpvbnRhbFRvcDtcclxuICAgICAgfSBlbHNlIGlmIChib3R0b21OZWlnaGJvdXIpIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy52ZXJ0aWNhbExlZnQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudG9wTGVmdDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgICBpZiAoYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudmVydGljYWxSaWdodDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy50b3BSaWdodDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGJvdHRvbU5laWdoYm91cikge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnZlcnRpY2FsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnRvcDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgaWYgKGxlZnROZWlnaGJvdXIpIHtcclxuICAgIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgICBzaGFwZSA9IFNoYXBlcy5ob3Jpem9udGFsQm90dG9tO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hhcGUgPSBTaGFwZXMuYm90dG9tTGVmdDtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJpZ2h0TmVpZ2hib3VyKSB7XHJcbiAgICBzaGFwZSA9IFNoYXBlcy5ib3R0b21SaWdodDtcclxuICB9IGVsc2Uge1xyXG4gICAgc2hhcGUgPSBTaGFwZXMuYm90dG9tO1xyXG4gIH1cclxuICB9IGVsc2UgaWYgKGxlZnROZWlnaGJvdXIpIHtcclxuICAgIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgICBzaGFwZSA9IFNoYXBlcy5ob3Jpem9udGFsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hhcGUgPSBTaGFwZXMubGVmdDtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJpZ2h0TmVpZ2hib3VyKSB7XHJcbiAgICBzaGFwZSA9IFNoYXBlcy5yaWdodDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzaGFwZTtcclxufVxyXG5cclxuUm9hZC5hZGQgPSBmdW5jdGlvbiAodGlsZTogVGlsZSkge1xyXG4gIGlmICghdGlsZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAodGlsZS5jaXR5IHx8IHRpbGUucm9hZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5PY2VhbikgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB0aWxlLnJvYWQgPSBuZXcgUm9hZCh0aWxlKTtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm9hZDsiLCJpbXBvcnQgZ2VuZXJhdGVHdWlkIGZyb20gJy4uL2dlbmVyYXRlR3VpZCc7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vR3JpZC9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBSb2FkIGZyb20gJy4vUm9hZCc7XHJcbmltcG9ydCBDaXR5IGZyb20gJy4vQ2l0eSc7XHJcblxyXG5jbGFzcyBSb2FkTmV0d29yayB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjaXRpZXM6IGFueVtdO1xyXG4gIHJvYWRzOiBhbnlbXTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuICAgIHRoaXMuY2l0aWVzID0gW107XHJcbiAgICB0aGlzLnJvYWRzID0gW107XHJcbiAgfVxyXG5cclxuICBhZGRSb2FkKHJvYWQ6IFJvYWQpIHtcclxuICAgIHRoaXMucm9hZHMucHVzaChyb2FkKTtcclxuICAgIHJvYWQucm9hZE5ldHdvcmsgPSB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYElkOiAke3RoaXMuaWR9LCBDaXRpZXM6ICR7dGhpcy5jaXRpZXMubGVuZ3RofSwgUm9hZHM6ICR7dGhpcy5yb2Fkcy5sZW5ndGh9YDtcclxuICB9XHJcblxyXG4gIGFkZENpdHkoY2l0eTogQ2l0eSkge1xyXG4gICAgdGhpcy5jaXRpZXMucHVzaChjaXR5KTtcclxuICAgIGNpdHkucm9hZE5ldHdvcmtzID0gdGhpcztcclxuICB9XHJcblxyXG4gIG1lcmdlKG5ldHdvcmtzOiBSb2FkTmV0d29ya1tdKSB7XHJcbiAgICBuZXR3b3Jrcy5mb3JFYWNoKG5ldHdvcmsgPT4ge1xyXG4gICAgICBuZXR3b3JrLmNpdGllcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5jaXRpZXMuZmluZCgoY2l0eTogQ2l0eSkgPT4gY2l0eS5lcXVhbHMoeCkpKSB7XHJcbiAgICAgICAgICB0aGlzLmNpdGllcy5wdXNoKHgpO1xyXG4gICAgICAgICAgeC5yb2FkTmV0d29yayA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICBcclxuICAgICAgLy8gIFNob3VsZCBvcHRpbWlzZSAtIHN0b3JlIHJvYWRzIGFzIGRpY3Rpb25hcnlcclxuICAgICAgbmV0d29yay5yb2Fkcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5yb2Fkcy5maW5kKChyb2FkOiBSb2FkKSA9PiByb2FkLmVxdWFscyh4KSkpIHtcclxuICAgICAgICAgIHRoaXMucm9hZHMucHVzaCh4KTtcclxuICAgICAgICAgIHgucm9hZE5ldHdvcmsgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICB0aGlzLmZpbmREaXN0YW5jZXNGb3JDaXRpZXMoKTtcclxuICB9XHJcblxyXG4gIGZpbmREaXN0YW5jZXNGb3JDaXRpZXMoKSB7XHJcbiAgICAvLyAgRm9yIGVhY2ggY2l0eSB0byBhIGJmcyBhbmQgZmluZCBuZWlnaGJvdXJzLlxyXG4gICAgdGhpcy5jaXRpZXMuZm9yRWFjaChjaXR5ID0+IHtcclxuICAgICAgdGhpcy5maW5kRGlzdGFuY2VzKGNpdHkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZmluZERpc3RhbmNlcyhjaXR5OiBDaXR5KSB7XHJcbiAgICBjb25zdCBkaXN0YW5jZXMgPSBbXTtcclxuICAgIGxldCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3VycyhjaXR5LnRpbGUpLm1hcChub2RlID0+ICh7bm9kZSwgZGlzdGFuY2U6IDAgfSkpO1xyXG4gICAgY29uc3QgdmlzaXRlZDogYW55ID0ge307XHJcbiAgICB2aXNpdGVkW2NpdHkuaWRdID0gdHJ1ZTtcclxuXHJcbiAgICB3aGlsZShuZWlnaGJvdXJzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAvLyAgdmlzaXQgZWFjaCBuZWlnaGJvdXJcclxuICAgICAgY29uc3QgbmVpZ2hib3VyID0gbmVpZ2hib3Vycy5wb3AoKTtcclxuICAgICAgaWYgKG5laWdoYm91ci5ub2RlLnR5cGUgPT09ICdjaXR5Jykge1xyXG4gICAgICAgIGRpc3RhbmNlcy5wdXNoKHtjaXR5LCBkaXN0YW5jZTogbmVpZ2hib3VyLmRpc3RhbmNlIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZpc2l0ZWRbbmVpZ2hib3VyLm5vZGUuaWRdID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBuZWlnaGJvdXJzTmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnMobmVpZ2hib3VyLm5vZGUpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiAhdmlzaXRlZFt4LmlkXSlcclxuICAgICAgICAgIC5tYXAoeCA9PiAoeyBub2RlOiB4LCBkaXN0YW5jZTogbmVpZ2hib3VyLmRpc3RhbmNlICsgMSB9KSk7XHJcbiAgICAgICAgbmVpZ2hib3VycyA9IG5laWdoYm91cnMuY29uY2F0KG5laWdoYm91cnNOZWlnaGJvdXJzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2l0eS5kaXN0YW5jZXMgPSBkaXN0YW5jZXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb2FkTmV0d29yaztcclxuIiwiaW1wb3J0IFRpbGUgZnJvbSBcIi4uL01hcC9UaWxlcy9UaWxlXCI7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tIFwiLi4vTWFwL1RpbGVzL1RpbGVUeXBlXCI7XHJcblxyXG5jbGFzcyBVbml0IHtcclxuICB0aWxlOiBUaWxlO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBzdGF0aWMgYWRkOiAoc2VsZWN0ZWRUaWxlOiBUaWxlKSA9PiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IGFueSwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjRkYwMDAwJztcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyB0aWxlU2l6ZS80LCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIHRpbGVTaXplLzQsIHRpbGVTaXplLzIsIDMqdGlsZVNpemUvNCk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBgVW5pdDogJHt0aGlzLm5hbWV9YDtcclxuICB9XHJcbn1cclxuXHJcblVuaXQuYWRkID0gZnVuY3Rpb24oc2VsZWN0ZWRUaWxlOiBUaWxlKSB7ICBcclxuICBpZiAoIXNlbGVjdGVkVGlsZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAoc2VsZWN0ZWRUaWxlLmNpdHkgfHwgc2VsZWN0ZWRUaWxlLnJvYWQgfHwgc2VsZWN0ZWRUaWxlLnVuaXQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHNlbGVjdGVkVGlsZS50eXBlID09PSBUaWxlVHlwZS5PY2VhbikgcmV0dXJuIGZhbHNlO1xyXG4gIHNlbGVjdGVkVGlsZS51bml0ID0gbmV3IFVuaXQoc2VsZWN0ZWRUaWxlLCAnTmV3IFVuaXQnKTtcclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVW5pdCIsImltcG9ydCBQb3AgZnJvbSAnLi9Qb3AnO1xyXG5pbXBvcnQgKiBhcyBSZXNvdXJjZXMgZnJvbSAnLi4vUmVzb3VyY2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlVHlwZSc7XHJcbmltcG9ydCB7IEhvdXNlIH0gZnJvbSAnLi4vSW1wcm92ZW1lbnQvSW1wcm92ZW1lbnRzJztcclxuXHJcbmNvbnN0IHJlc291cmNlczogYW55ID0ge307XHJcbnJlc291cmNlc1tSZXNvdXJjZXMuRm9vZC5uYW1lXSA9IHsgYW1vdW50OiAxLCByZXNvdXJjZTogUmVzb3VyY2VzLkZvb2QgfTtcclxucmVzb3VyY2VzW1Jlc291cmNlcy5Xb29kLm5hbWVdID0geyBhbW91bnQ6IDEsIHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCB9O1xyXG5cclxuY29uc3QgbmVlZHM6ICBhbnkgPSB7fTtcclxubmVlZHNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuRm9vZCwgYW1vdW50OiAxIH07XHJcblxyXG5jb25zdCB3YW50czogYW55ID0ge307XHJcbndhbnRzW1Jlc291cmNlcy5Xb29kLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLldvb2QsIGFtb3VudDogMC4xIH07XHJcblxyXG5jb25zdCBwcm9kdWNlczogYW55ID0gW107XHJcblxyXG5wcm9kdWNlc1tSZXNvdXJjZXMuQmFzaWNUb29scy5uYW1lXSA9IHsgXHJcbiAgdHlwZTogJ2NyYWZ0JyxcclxuICByZXNvdXJjZTogUmVzb3VyY2VzLkJhc2ljVG9vbHMsXHJcbiAgcHJvZHVjdGlvbkVmZmljaWVuY3k6IDEsXHJcbiAgcmVxdWlyZXM6XHJcbiAgICB7XHJcbiAgICAgIFtSZXNvdXJjZXMuV29vZC5uYW1lXTogMSxcclxuICAgICAgW1Jlc291cmNlcy5GaWJyZS5uYW1lXTogMSxcclxuICAgIH0sXHJcbiAgb3V0cHV0OiAxLFxyXG59O1xyXG5cclxuY29uc3QgZ3Jvd1JlcXVpcmVtZW50OiBhbnkgPSB7IH07XHJcbmdyb3dSZXF1aXJlbWVudFtSZXNvdXJjZXMuRm9vZC5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kLCBhbW91bnQ6IDUgfTtcclxuXHJcbmNvbnN0IGltcHJvdmVtZW50cyA9IFtcclxuICB7IGltcHJvdmVtZW50OiBIb3VzZSwgd2VpZ2h0OiAxIH0sXHJcbl07XHJcblxyXG5jbGFzcyBDcmFmdHNwZXJzb24gZXh0ZW5kcyBQb3Age1xyXG4gIHN0YXRpYyBhZGQ6ICh0aWxlOiBUaWxlLCBlbnRpdGllczogYW55KSA9PiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IFRpbGUsIG51bWJlcjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcih0aWxlLCBudW1iZXIsIHJlc291cmNlcywgbmVlZHMsIHByb2R1Y2VzLCBpbXByb3ZlbWVudHMpO1xyXG4gICAgdGhpcy5ncm93UmVxdWlyZW1lbnQgPSBncm93UmVxdWlyZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICcjRkYwMDAwJztcclxuICAgIGNvbnRleHQuc3Ryb2tlVGV4dCgnQycsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplLCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIHRpbGVTaXplLCB0aWxlU2l6ZSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBgQ3JhZnRzcGVyc29uOiBGb29kOiAke3RoaXMucmVzb3VyY2VzWydmb29kJ10uYW1vdW50IH0sIFdvb2Q6ICR7dGhpcy5yZXNvdXJjZXNbJ3dvb2QnXS5hbW91bnR9IE51bWJlcjogJHt0aGlzLm51bWJlcn1gO1xyXG4gIH1cclxufVxyXG5cclxuQ3JhZnRzcGVyc29uLmFkZCA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnkpOiBib29sZWFuIHtcclxuICBpZiAoIXRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUuY2l0eSB8fCB0aWxlLnJvYWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3QgcG9wID0gbmV3IENyYWZ0c3BlcnNvbih0aWxlLCAxKTtcclxuICB0aWxlLnBvcCA9IHBvcDtcclxuICBlbnRpdGllcy5wb3BzLnB1c2gocG9wKTtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyYWZ0c3BlcnNvbjtcclxuIiwiaW1wb3J0IFBvcCBmcm9tICcuL1BvcCc7XHJcbmltcG9ydCAqIGFzIFJlc291cmNlcyBmcm9tICcuLi9SZXNvdXJjZXMvUmVzb3VyY2VzJztcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGUnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGVUeXBlJztcclxuaW1wb3J0IHsgSG91c2UgfSBmcm9tICcuLi9JbXByb3ZlbWVudC9JbXByb3ZlbWVudHMnO1xyXG5cclxuY29uc3QgcmVzb3VyY2VzOiBhbnkgPSB7fTtcclxucmVzb3VyY2VzW1Jlc291cmNlcy5Gb29kLm5hbWVdID0geyBhbW91bnQ6IDEsIHJlc291cmNlOiBSZXNvdXJjZXMuRm9vZCB9O1xyXG5yZXNvdXJjZXNbUmVzb3VyY2VzLldvb2QubmFtZV0gPSB7IGFtb3VudDogMSwgcmVzb3VyY2U6IFJlc291cmNlcy5Xb29kIH07XHJcblxyXG5jb25zdCBuZWVkczogIGFueSA9IHt9O1xyXG5uZWVkc1tSZXNvdXJjZXMuRm9vZC5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kLCBhbW91bnQ6IDEgfTtcclxuXHJcbmNvbnN0IHdhbnRzOiBhbnkgPSB7fTtcclxud2FudHNbUmVzb3VyY2VzLldvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAwLjEgfTtcclxuXHJcbmNvbnN0IHByb2R1Y2VzOiBhbnkgPSBbXTtcclxucHJvZHVjZXNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7XHJcbiAgdHlwZTogJ2dhdGhlcicsXHJcbiAgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kLFxyXG4gIGdhdGhlckVmZmljaWVuY3k6IDFcclxufTtcclxucHJvZHVjZXNbUmVzb3VyY2VzLldvb2QubmFtZV0gPSB7XHJcbiAgdHlwZTogJ2dhdGhlcicsXHJcbiAgcmVzb3VyY2U6IFJlc291cmNlcy5Xb29kLFxyXG4gIGdhdGhlckVmZmljaWVuY3k6IDAuMjVcclxufTtcclxuXHJcbnByb2R1Y2VzW1Jlc291cmNlcy5Xb29kLm5hbWVdID0ge1xyXG4gIHR5cGU6ICdnYXRoZXInLFxyXG4gIHJlc291cmNlOiBSZXNvdXJjZXMuRmlicmUsXHJcbiAgZ2F0aGVyRWZmaWNpZW5jeTogMC4yNVxyXG59O1xyXG5cclxuY29uc3QgZ3Jvd1JlcXVpcmVtZW50OiBhbnkgPSB7IH07XHJcbmdyb3dSZXF1aXJlbWVudFtSZXNvdXJjZXMuRm9vZC5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kLCBhbW91bnQ6IDUgfTtcclxuXHJcbmNvbnN0IGltcHJvdmVtZW50cyA9IFtcclxuICB7IGltcHJvdmVtZW50OiBIb3VzZSwgd2VpZ2h0OiAxIH0sXHJcbl07XHJcblxyXG5jbGFzcyBHYXRoZXJlciBleHRlbmRzIFBvcCB7XHJcbiAgc3RhdGljIGFkZDogKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnkpID0+IGJvb2xlYW47XHJcbiAgY29uc3RydWN0b3IodGlsZTogVGlsZSwgbnVtYmVyOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKHRpbGUsIG51bWJlciwgcmVzb3VyY2VzLCBuZWVkcywgcHJvZHVjZXMsIGltcHJvdmVtZW50cyk7XHJcbiAgICB0aGlzLmdyb3dSZXF1aXJlbWVudCA9IGdyb3dSZXF1aXJlbWVudDtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgY29udGV4dC5zdHJva2VUZXh0KCdHJywgdGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgdGlsZVNpemUsIHRpbGVTaXplKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBHYXRoZXJlcjogRm9vZDogJHt0aGlzLnJlc291cmNlc1snZm9vZCddLmFtb3VudCB9LCBXb29kOiAke3RoaXMucmVzb3VyY2VzWyd3b29kJ10uYW1vdW50fSBOdW1iZXI6ICR7dGhpcy5udW1iZXJ9YDtcclxuICB9XHJcbn1cclxuXHJcbkdhdGhlcmVyLmFkZCA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnkpOiBib29sZWFuIHtcclxuICBpZiAoIXRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUuY2l0eSB8fCB0aWxlLnJvYWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3QgcG9wID0gbmV3IEdhdGhlcmVyKHRpbGUsIDEpO1xyXG4gIHRpbGUucG9wID0gcG9wO1xyXG4gIGVudGl0aWVzLnBvcHMucHVzaChwb3ApO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2F0aGVyZXI7XHJcbiIsImltcG9ydCBSZXNvdXJjZSBmcm9tIFwiLi4vUmVzb3VyY2VzL1Jlc291cmNlXCI7XHJcbmltcG9ydCBOZWVkcyBmcm9tIFwiLi4vUmVzb3VyY2VzL05lZWRzXCI7XHJcbmltcG9ydCBUaWxlIGZyb20gXCIuLi9NYXAvVGlsZXMvVGlsZVwiO1xyXG5pbXBvcnQgSURyYXdhYmxlIGZyb20gXCIuLi9pbnRlcmZhY2VzL0lEcmF3YWJsZVwiO1xyXG5pbXBvcnQgSVByaW50YWJsZSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JUHJpbnRhYmxlXCI7XHJcblxyXG5jbGFzcyBQb3AgaW1wbGVtZW50cyBJRHJhd2FibGUsIElQcmludGFibGV7XHJcbiAgbnVtYmVyOiBudW1iZXI7XHJcbiAgcmVzb3VyY2VzOiBhbnk7XHJcbiAgbmVlZHM6IGFueTtcclxuICBwcm9kdWNlczogYW55O1xyXG4gIHRpbGU6IFRpbGU7XHJcbiAgZ3Jvd1JlcXVpcmVtZW50OiBhbnk7XHJcbiAgZmVydGlsaXR5OiBudW1iZXI7XHJcbiAgaW1wcm92ZW1lbnRzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IFRpbGUsIG51bWJlcjogbnVtYmVyLCByZXNvdWNlczogUmVzb3VyY2VbXSwgbmVlZHM6IE5lZWRzLCBwcm9kdWNlczogYW55LCBpbXByb3ZlbWVudHM6IGFueSkge1xyXG4gICAgdGhpcy50aWxlID0gdGlsZTtcclxuICAgIHRoaXMubnVtYmVyID0gbnVtYmVyO1xyXG4gICAgdGhpcy5yZXNvdXJjZXMgPSByZXNvdWNlcztcclxuICAgIHRoaXMubmVlZHMgPSBuZWVkcztcclxuICAgIHRoaXMucHJvZHVjZXMgPSBwcm9kdWNlcztcclxuICAgIHRoaXMuZmVydGlsaXR5ID0gMTtcclxuICAgIHRoaXMuaW1wcm92ZW1lbnRzID0gaW1wcm92ZW1lbnRzO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgXHJcbiAgICBjb25zdCBtYWludGFpbmVuY2UgPSB0aGlzLnRpbGUuaW1wcm92ZW1lbnRzLnJlZHVjZSgoY3VycmVudDogYW55LCBpOiBhbnkpID0+IGN1cnJlbnQuY29uY2F0KGkubWFpbnRhaW5lbmNlKSwgW10pXHJcbiAgICAgIC5yZWR1Y2UoKGNvbGxlY3Rpb246IGFueSwgY3VycmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbGxlY3Rpb25bY3VycmVudC5yZXNvdXJjZS5uYW1lXSkge1xyXG4gICAgICAgICAgY29sbGVjdGlvbltjdXJyZW50LnJlc291cmNlLm5hbWVdLmFtb3VudCArPSBjdXJyZW50LmFtb3VudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29sbGVjdGlvbltjdXJyZW50LnJlc291cmNlLm5hbWVdID0geyBhbW91bnQ6IGN1cnJlbnQuYW1vdW50IH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG4gICAgICB9LCB7fSk7XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy5wcm9kdWNlcykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgcmVzb3VyY2UgPSB0aGlzLnJlc291cmNlc1trZXldO1xyXG4gICAgICBjb25zdCBwcm9kdWNlcyA9IHRoaXMucHJvZHVjZXNba2V5XSB8fCB7IGFtb3VudDogMCB9O1xyXG4gICAgICBjb25zdCBjYXJyeWluZ1BvcCA9IDEgKyB0aGlzLm51bWJlci8yNVxyXG5cclxuICAgICAgbGV0IGdhdGhlcmVkQW1vdW50ID0gKHByb2R1Y2VzLmdhdGhlckVmZmljaWVuY3kgKiB0aGlzLnRpbGUucmVzb3VyY2VzW2tleV0uYW1vdW50ICogdGhpcy5udW1iZXIpO1xyXG4gICAgICBnYXRoZXJlZEFtb3VudCA9IGdhdGhlcmVkQW1vdW50L2NhcnJ5aW5nUG9wO1xyXG5cclxuICAgICAgcmVzb3VyY2UuYW1vdW50ICs9IGdhdGhlcmVkQW1vdW50O1xyXG5cclxuICAgICAgaWYgKHJlc291cmNlLmFtb3VudCA+PSAodGhpcy5ncm93UmVxdWlyZW1lbnRba2V5XSAmJiB0aGlzLmdyb3dSZXF1aXJlbWVudFtrZXldLmFtb3VudCkpIHtcclxuICAgICAgICB0aGlzLm51bWJlciArPSBNYXRoLnJvdW5kKHRoaXMuZmVydGlsaXR5ICogcmVzb3VyY2UuYW1vdW50L3RoaXMuZ3Jvd1JlcXVpcmVtZW50W2tleV0uYW1vdW50KTtcclxuICAgICAgICByZXNvdXJjZS5hbW91bnQgLT0gdGhpcy5ncm93UmVxdWlyZW1lbnRba2V5XS5hbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXNvdXJjZS5hbW91bnQgPD0gMCAmJiB0aGlzLmdyb3dSZXF1aXJlbWVudFtrZXldKSB7XHJcbiAgICAgICAgdGhpcy5udW1iZXItLTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5pbXByb3ZlVGlsZSgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgTnVtYmVyOiAke3RoaXMubnVtYmVyfSBGb29kOiAke3RoaXMucmVzb3VyY2VzWydmb29kJ10uYW1vdW50fSBXb29kOiAke3RoaXMucmVzb3VyY2VzWyd3b29kJ10uYW1vdW50fWApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy5uZWVkcykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgcmVzb3VyY2UgPSB0aGlzLnJlc291cmNlc1trZXldO1xyXG4gICAgICBjb25zdCBuZWVkcyA9IHRoaXMubmVlZHNba2V5XTtcclxuXHJcbiAgICAgIHJlc291cmNlLmFtb3VudCAtPSBuZWVkcy5hbW91bnQgKiB0aGlzLm51bWJlcjtcclxuICAgICAgcmVzb3VyY2UuYW1vdW50ICs9IHJlc291cmNlLmFtb3VudCAqICgxIC0gcmVzb3VyY2UucmVzb3VyY2UuZGVjYXkpO1xyXG4gICAgICByZXNvdXJjZS5hbW91bnQgLT0gbWFpbnRhaW5lbmNlW2tleV0gPyBtYWludGFpbmVuY2Vba2V5XS5hbW91bnQgOiAwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbXByb3ZlVGlsZSgpIHtcclxuICAgIHRoaXMuaW1wcm92ZW1lbnRzLmZvckVhY2goKGk6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBjb3N0cyA9IGkuaW1wcm92ZW1lbnQuY29zdHM7XHJcbiAgICAgIFxyXG4gICAgICBsZXQgYWZmb3JhYmxlID0gY29zdHMucmVkdWNlKChpc0FmZm9yZGFibGU6IGJvb2xlYW4sIGN1cnJlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGN1cnJlbnQucmVzb3VyY2UubmFtZTtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZXNba2V5XS5hbW91bnQgPj0gY3VycmVudC5hbW91bnQgKiAxLjUpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0sIHRydWUpO1xyXG5cclxuICAgICAgaWYgKGFmZm9yYWJsZSkge1xyXG4gICAgICAgIGlmICghdGhpcy50aWxlLmltcHJvdmVtZW50cy5maW5kKCh4OiBhbnkpID0+IHgubmFtZSA9PT0gaS5pbXByb3ZlbWVudC5uYW1lKSkge1xyXG4gICAgICAgICAgdGhpcy50aWxlLmltcHJvdmVtZW50cy5wdXNoKGkuaW1wcm92ZW1lbnQpO1xyXG4gICAgICAgICAgdGhpcy5mZXJ0aWxpdHkgKj0gaS5pbXByb3ZlbWVudC5lZmZlY3RzLmZlcnRpbGl0eTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHRpbGVTaXplOiBudW1iZXIpe1xyXG4gICAgXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQb3A7XHJcbiIsImltcG9ydCBSZXNvdXJjZSBmcm9tIFwiLi9SZXNvdXJjZVwiO1xyXG5cclxuY2xhc3MgQmFzaWNUb29scyBleHRlbmRzIFJlc291cmNlIHtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2ljVG9vbHM7XHJcbiIsImltcG9ydCBSZXNvdXJjZSBmcm9tIFwiLi9SZXNvdXJjZVwiO1xyXG5cclxuY2xhc3MgRmlicmUgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWJyZTtcclxuIiwiaW1wb3J0IFJlc291cmNlIGZyb20gXCIuL1Jlc291cmNlXCI7XHJcbmltcG9ydCBSZXNvdXJjZVR5cGVzIGZyb20gXCIuL1Jlc291cmNlVHlwZVwiO1xyXG5cclxuY29uc3QgRm9vZCA9IG5ldyBSZXNvdXJjZSgnZm9vZCcsIFtSZXNvdXJjZVR5cGVzLkZvb2RdLCAxLjEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9vZDtcclxuIiwiY2xhc3MgUmVzb3VyY2Uge1xyXG4gIHR5cGVzOiBhbnk7XHJcbiAgZGVjYXk6IG51bWJlcjtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB0eXBlczogYW55LCBkZWNheTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy50eXBlcyA9IHR5cGVzO1xyXG4gICAgdGhpcy5kZWNheSA9IGRlY2F5O1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHByb2R1Y2VkOiBudW1iZXIsIHVzZWQ6IG51bWJlcikge1xyXG4gICAgY29uc3QgbnVtYmVyID0gKHByb2R1Y2VkIC0gdXNlZCk7XHJcbiAgICByZXR1cm4gbnVtYmVyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVzb3VyY2U7IiwiXHJcbmVudW0gUmVzb3VyY2VUeXBlcyB7XHJcbiAgJ0Zvb2QnID0gJ0Zvb2QnLFxyXG4gICdGdWVsJyA9ICdGdWVsJyxcclxuICAnSW5ncmVkaWVudCcgPSAnSW5ncmVkaWVudCcsXHJcbiAgJ1Rvb2wnID0gJ1Rvb2wnLFxyXG4gICdTaGVsdGVyJyA9ICdTaGVsdGVyJyxcclxuICAnQnVpbGRpbmdNYXRlcmlhbCcgPSAnQnVpbGRpbmdNYXRlcmlhbCdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVzb3VyY2VUeXBlcztcclxuIiwiaW1wb3J0IEZpYnJlIGZyb20gJy4vRmlicmUnO1xyXG5pbXBvcnQgQmFzaWNUb29scyBmcm9tICcuL0Jhc2ljVG9vbHMnO1xyXG5pbXBvcnQgRm9vZCBmcm9tICcuL0Zvb2QnO1xyXG5pbXBvcnQgV29vZCBmcm9tICcuL1dvb2QnO1xyXG5cclxuZXhwb3J0IHsgRmlicmUsIEJhc2ljVG9vbHMsIEZvb2QsIFdvb2QsIH1cclxuIiwiaW1wb3J0IFJlc291cmNlIGZyb20gXCIuL1Jlc291cmNlXCI7XHJcbmltcG9ydCBSZXNvdXJjZVR5cGVzIGZyb20gXCIuL1Jlc291cmNlVHlwZVwiO1xyXG5cclxuY29uc3QgV29vZCA9IG5ldyBSZXNvdXJjZSgnd29vZCcsIFtSZXNvdXJjZVR5cGVzLkJ1aWxkaW5nTWF0ZXJpYWwsIFJlc291cmNlVHlwZXMuRnVlbCwgUmVzb3VyY2VUeXBlcy5JbmdyZWRpZW50XSwgMS4wMSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXb29kO1xyXG4iLCJmdW5jdGlvbiBnZW5lcmF0ZUd1aWQoKSB7XHJcbiAgcmV0dXJuIGAke2dlbmVyYXRlTnVtYmVyKCl9LSR7Z2VuZXJhdGVOdW1iZXIoKX1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZU51bWJlcigpIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlR3VpZDtcclxuIiwiaW1wb3J0IE1hcCBmcm9tICcuL01hcC9NYXAnO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcblxyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuY29uc3Qgc2l6ZSA9IDUwMDtcclxuY29uc3QgYm9keU1hcmdpbiA9IDg7XHJcblxyXG5jYW52YXMud2lkdGg9c2l6ZTtcclxuY2FudmFzLmhlaWdodD1zaXplO1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG5jb25zdCBtYXAgPSBuZXcgTWFwKHNpemUsIDUwLCBjb250ZXh0KTtcclxubWFwLmRyYXcoKTtcclxuXHJcbi8vICBDb2xvciBpbiBjbGlja2VkIHNxdWFyZVxyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gIGxldCB7IGNsaWVudFggLCBjbGllbnRZIH0gPSBlO1xyXG4gIGNsaWVudFggLT0gYm9keU1hcmdpbjtcclxuICBjbGllbnRZIC09IGJvZHlNYXJnaW47XHJcbiAgXHJcbiAgY29uc3QgdGlsZSA9IG1hcC5jbGlja1RpbGUobmV3IFBvaW50KGNsaWVudFgsIGNsaWVudFkpKTtcclxuXHJcbiAgaWYgKHRpbGUpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3RlZFRpbGUnKS5pbm5lckhUTUwgPSB0aWxlLnRvU3RyaW5nKClcclxuICAgICAgLnNwbGl0KCcnKVxyXG4gICAgICAubWFwKHggPT4geCA9PT0gJ1xcbicgPyAnPGJyIC8+JyA6IHgpLmpvaW4oJycpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0ZWRUaWxlJykuaW5uZXJIVE1MID0gJyc7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vICBab29tIGluIGFuZCBvdXQgYW5kIGRyYWdcclxubGV0IGRyYWdTdGF0ZSA9IDA7XHJcbmNvbnN0IHN0YXJ0RHJhZyA9IG5ldyBQb2ludCgwLCAwKTtcclxuXHJcbmNvbnN0IGRyYWdTdGF0ZXMgPSB7IFNUQVJURUQ6IDAsIERSQUdHSU5HOiAxLCBFTkRFRDogMn1cclxuXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XHJcbiAgZHJhZ1N0YXRlID0gZHJhZ1N0YXRlcy5TVEFSVEVEO1xyXG4gIGxldCB7IGNsaWVudFggLCBjbGllbnRZIH0gPSBlO1xyXG4gIGNsaWVudFggLT0gYm9keU1hcmdpbjtcclxuICBjbGllbnRZIC09IGJvZHlNYXJnaW47XHJcblxyXG4gIHN0YXJ0RHJhZy54ID0gY2xpZW50WDtcclxuICBzdGFydERyYWcueSA9IGNsaWVudFk7XHJcbn0sIGZhbHNlKTtcclxuXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsICgpID0+IHtcclxuICBpZiAoZHJhZ1N0YXRlID09PSBkcmFnU3RhdGVzLlNUQVJURUQpIGRyYWdTdGF0ZSA9IGRyYWdTdGF0ZXMuRFJBR0dJTkc7XHJcbn0sIGZhbHNlKTtcclxuXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZSkgPT4ge1xyXG4gIGlmKGRyYWdTdGF0ZSA9PT0gZHJhZ1N0YXRlcy5TVEFSVEVEKXtcclxuICB9XHJcbiAgZWxzZSBpZihkcmFnU3RhdGUgPT09IGRyYWdTdGF0ZXMuRFJBR0dJTkcpIHtcclxuICAgIGxldCB7IGNsaWVudFggLCBjbGllbnRZIH0gPSBlO1xyXG4gICAgY2xpZW50WCAtPSBib2R5TWFyZ2luO1xyXG4gICAgY2xpZW50WSAtPSBib2R5TWFyZ2luO1xyXG5cclxuICAgIGNvbnN0IGRpZmZYID0gc3RhcnREcmFnLnggLSBjbGllbnRYO1xyXG4gICAgY29uc3QgZGlmZlkgPSBzdGFydERyYWcueSAtIGNsaWVudFk7XHJcblxyXG4gICAvLyBtYXAuZHJhZyhkaWZmWCwgZGlmZlkpO1xyXG4gICAgc3RhcnREcmFnLnggPSAwO1xyXG4gICAgc3RhcnREcmFnLnkgPSAwO1xyXG4gIH1cclxuICBkcmFnU3RhdGUgPSBkcmFnU3RhdGVzLkVOREVEO1xyXG59LCBmYWxzZSk7XHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICBjb25zb2xlLmxvZyhlLmtleUNvZGUpO1xyXG4gIGlmIChlLmtleUNvZGUgPT09IDM3KSB7XHJcbiAgICBtYXAubGVmdEtleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMzgpIHtcclxuICAgIG1hcC51cEtleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgIG1hcC5yaWdodEtleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gNDApIHtcclxuICAgIG1hcC5kb3duS2V5KCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSAxMDcpIHtcclxuICAgIG1hcC56b29tSW4oKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDEwOSkge1xyXG4gICAgbWFwLnpvb21PdXQoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDgyKSB7XHJcbiAgICBtYXAuYWRkUm9hZFRvU2VsZWN0ZWRUaWxlKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA2Nykge1xyXG4gICAgbWFwLmFkZENpdHlUb1NlbGVjdGVkVGlsZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gODUpIHtcclxuICAgIG1hcC5hZGRVbml0VG9TZWxlY3RlZFRpbGUoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDggfHwgZS5rZXlDb2RlID09PSA0Nikge1xyXG4gICAgbWFwLnJlbW92ZVNlbGVjdGVkRW50aXR5KCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgbWFwLmVuZFR1cm4oKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDcxKSB7XHJcbiAgICBtYXAuYWRkR2F0aGVyZXIoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDcwKSB7XHJcbiAgICBtYXAuYWRkQ3JhZnRzcGVyc29uKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRDaXR5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbWFwLmFkZENpdHlUb1NlbGVjdGVkVGlsZSgpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRSb2FkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbWFwLmFkZFJvYWRUb1NlbGVjdGVkVGlsZSgpO1xyXG59KTtcclxuXHJcblxyXG4vLyAgR2l2ZW4gYW4gYXJyYXkgb2Ygc3F1YXJlcyBhbmQgYSB2aWV3IHBvcnQsIGZpbmQgdGhlIHNxdWFyZXMgaW4gdGhlIHZpZXdwb3J0XHJcbi8vICBab29taW5nIGNoYW5nZXMgaG93IGxhcmdlIHlvdSB3YW50IHRvIGRyYXcgdGhlIHNxdWFyZXMgYnV0IGFsc28gdGhlIHZpZXdwb3J0XHJcbi8vICBEcmFnZ2luZyBjaGFuZ2VzIHRoZSB2aWV3cG9ydCBzdGFydC4iXSwic291cmNlUm9vdCI6IiJ9