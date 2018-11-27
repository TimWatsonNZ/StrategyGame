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
    getNeighbours(inCominingTile, preserveOrder = false, noDiagonals = false, inputGrid = null) {
        const index = this.tileToIndex(inCominingTile);
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
        return this.getNeighbours(tile, false, true);
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
            const neighbours = _GridService__WEBPACK_IMPORTED_MODULE_0__["gridService"].getNeighbours(tile, false, false, grid);
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
                const neighbours = _GridService__WEBPACK_IMPORTED_MODULE_0__["gridService"].getNeighbours(tile, false, false, grid);
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
            pops: [],
            cities: [],
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
        this.entities.cities.forEach((city) => city.update());
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
        if (_MapEntities_City__WEBPACK_IMPORTED_MODULE_1__["default"].add(this.selectedTile, this.entities)) {
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
        this.resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_2__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_2__["Food"], amount: 1.5 };
        this.resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_2__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_2__["Wood"], amount: 0.5 };
        this.resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_2__["Fibre"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_2__["Fibre"], amount: 0.5 };
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
        this.supplyAndDemand = {};
        this.type = 'city';
        this.id = Object(_generateGuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.tile = tile;
        this.name = name;
        this.population = population;
        this.pops = [];
        this.distances = [];
        this.resources = {};
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
        context.strokeStyle = '#000000';
        context.strokeRect((this.tile.drawingPoint.x - 1) * tileSize, (this.tile.drawingPoint.y - 1) * tileSize, tileSize * 3, tileSize * 3);
        context.strokeStyle = '#FFFFFF';
    }
    toString() {
        const distances = this.distances.map(x => `Id: ${x.city.id} distance: ${x.distance}\n`);
        const pops = this.pops.map(x => `${x.type}, ${x.number}`).join(', ');
        const resources = JSON.stringify(this.resources);
        return `${this.id}: ${this.population}\n ${distances} ${pops} ${resources}`;
    }
    addNetwork(network) {
        if (!this.roadNetworks.some((x) => x.id === network.id)) {
            this.roadNetworks.push(network);
            network.cities.push(this);
            network.findDistancesForCities();
        }
    }
    update() {
        Object.keys(this.resources).forEach((key) => {
            Object.keys(this.resources[key]).forEach((k2) => {
                this.resources[key][k2].desire = 0;
                this.resources[key][k2].amount = 0;
            });
        });
        this.pops.forEach(pop => {
            const type = pop.type;
            //  gather resources
            pop.update(this.resources[type]);
        });
        Object.keys(this.supplyAndDemand).forEach((x) => {
            this.supplyAndDemand[x].supply = 0;
            this.supplyAndDemand[x].demand = 0;
        });
        //  work out supply and demand
        Object.keys(this.resources).forEach((popKey) => {
            Object.keys(this.resources[popKey]).forEach((resourceKey) => {
                const resource = this.resources[popKey][resourceKey];
                if (!this.supplyAndDemand[resourceKey]) {
                    this.supplyAndDemand[resourceKey] = { supply: 0, demand: 0, value: resource.value, maxValue: this.resources[popKey][resourceKey].maxValue };
                }
                this.supplyAndDemand[resourceKey].demand += resource.amount < 0 ? Math.abs(resource.amount) : 0;
                this.supplyAndDemand[resourceKey].supply += resource.amount > 0 ? Math.abs(resource.amount) : 0;
            });
        });
        Object.keys(this.supplyAndDemand).forEach((x) => {
            if (this.supplyAndDemand[x].supply > this.supplyAndDemand[x].demand) {
                this.supplyAndDemand[x].value *= 0.9;
            }
            else if (this.supplyAndDemand[x].supply < this.supplyAndDemand[x].demand) {
                this.supplyAndDemand[x].value *= 1.1;
                this.supplyAndDemand[x].value = this.supplyAndDemand[x].value > this.supplyAndDemand[x].maxValue ?
                    this.supplyAndDemand[x].maxValue : this.supplyAndDemand[x].value;
            }
        });
        console.log(JSON.stringify(this.supplyAndDemand));
        const buying = {}; //  keys of resource types;
        const selling = {};
        Object.keys(this.resources).forEach((popKey) => {
            const pop = this.resources[popKey];
            Object.keys(pop)
                .filter((resourceKey) => pop[resourceKey].amount < 0)
                .forEach((resourceKey) => {
                if (!buying[resourceKey]) {
                    buying[resourceKey] = [];
                }
                buying[resourceKey].push({ popKey, amount: Math.abs(pop[resourceKey].amount), needType: pop[resourceKey].needType });
            });
            Object.keys(pop)
                .filter((resourceKey) => pop[resourceKey].amount > 0)
                .forEach((resourceKey) => {
                if (!selling[resourceKey]) {
                    selling[resourceKey] = [];
                }
                selling[resourceKey].push({ popKey, amount: Math.abs(pop[resourceKey].amount) });
            });
        });
        // Object.keys(transactions).forEach((resourceKey: any) => {
        //   //  match with 
        // });
        console.log(`Buying: ${JSON.stringify(buying)}`);
        console.log();
        console.log(`Selling: ${JSON.stringify(selling)}`);
        //  each popgroup work out how much value they can sell
        //  adjust values
        //  do trades
        //  work out desires
        //  work out trades
        //  redistribute resources
        //   Object.keys(pop.resources).forEach((resourceKey: string) => {
        //     if (this.resources[resourceKey]) {
        //       this.resources[resourceKey].amount += pop.resources[resourceKey].amount;
        //       pop.resources[resourceKey].amount = 0;
        //     } else {
        //       this.resources[resourceKey] = { amount: pop.resources[resourceKey].amount };
        //       pop.resources[resourceKey].amount = 0;
        //     }
        //   });
    }
}
City.remove = function (gridTile) {
    gridTile.city = null;
    //  Remove from neighbouring roadnetworks and recalculate networks
};
City.add = function (tile, entities) {
    if (!tile)
        return false;
    if (tile.city || tile.road)
        return false;
    if (tile.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_2__["default"].Ocean)
        return false;
    const neighbours = _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__["gridService"].getRegion(tile.point, 2);
    if (neighbours.filter((x) => x.city).length > 0)
        return false;
    const city = new City(tile, 'New City', 1);
    tile.city = city;
    entities.cities.push(city);
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
/* harmony import */ var _Improvement_Improvements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Improvement/Improvements */ "./Improvement/Improvements.ts");



const resources = {};
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { amount: 2, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"] };
const needs = {};
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 1, type: 'critical' };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], amount: 0.1, type: 'working' };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"], amount: 0.1, type: 'working' };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], amount: 0.1, type: 'want' };
const desires = {};
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 5 };
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], amount: 1.5 };
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], amount: 1.5 };
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"], amount: 1.5 };
//  multiply
const produces = {};
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = {
    type: 'craft',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"],
    efficiency: 1,
    requires: {
        [_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name]: 1,
        [_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name]: 1,
    },
    output: 1,
};
const growRequirement = {};
growRequirement[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 5 };
const improvements = [
    { improvement: _Improvement_Improvements__WEBPACK_IMPORTED_MODULE_2__["House"], weight: 1 },
];
class Craftsperson extends _Pop__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(tile, number) {
        super('Craftsperson', tile, number, resources, needs, produces, improvements, desires);
        this.growRequirement = growRequirement;
    }
    draw(context, tileSize) {
        context.strokeStyle = '#FF0000';
        context.strokeText('C', this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + tileSize, tileSize);
    }
    toString() {
        return `Craftsperson: Food: ${this.resources['food'].amount}, Wood: ${this.resources['wood'].amount} Tools ${this.resources['basicTools'].amount} Number: ${this.number}`;
    }
}
Craftsperson.add = function (tile, entities) {
    const pop = new Craftsperson(tile, 10);
    return _Pop__WEBPACK_IMPORTED_MODULE_0__["default"].add(tile, entities, pop);
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
/* harmony import */ var _Improvement_Improvements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Improvement/Improvements */ "./Improvement/Improvements.ts");



const resources = {};
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { amount: 0, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { amount: 0, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { amount: 0, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"] };
const needs = {};
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 1, type: 'critical' };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], amount: 0, type: 'want' };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], amount: 0.1, type: 'want' };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"], amount: 0, type: 'none' };
const desires = {};
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 2.5, };
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], amount: 0 };
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], amount: 1 };
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"], amount: 0 };
const produces = [];
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = {
    type: 'gather',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"],
    efficiency: 0.8
};
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = {
    type: 'gather',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"],
    efficiency: 0.25
};
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = {
    type: 'gather',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"],
    efficiency: 0.25
};
const growRequirement = {};
growRequirement[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 3 };
const improvements = [
    { improvement: _Improvement_Improvements__WEBPACK_IMPORTED_MODULE_2__["House"], weight: 1 },
];
class Gatherer extends _Pop__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(tile, number) {
        super('Gatherer', tile, number, resources, needs, produces, improvements, desires);
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
    const pop = new Gatherer(tile, 1);
    return _Pop__WEBPACK_IMPORTED_MODULE_0__["default"].add(tile, entities, pop);
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
/* harmony import */ var _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Map/Tiles/TileType */ "./Map/Tiles/TileType.ts");
/* harmony import */ var _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Grid/GridService */ "./Grid/GridService.ts");


class Pop {
    constructor(type, tile, number, resouces, needs, produces, improvements, desires) {
        this.type = type;
        this.tile = tile;
        this.number = number;
        this.resources = resouces;
        this.needs = needs;
        this.produces = produces;
        this.fertility = 1;
        this.improvements = improvements;
        this.production = {};
        this.popNeeds = {};
        this.desires = desires;
    }
    //  Work out how much each pop produces
    //  Work out how much they are willing to give up.
    //  Pool this amount.
    //  Redistribute among types.
    grow() {
        if (this.resources['food'].amount >= (this.growRequirement['food'] && this.growRequirement['food'].amount) * this.number) {
            const increase = Math.round(this.fertility * this.resources['food'].amount / this.growRequirement['food'].amount);
            this.number += increase;
            this.resources['food'].amount -= increase;
        }
        if (this.resources['food'].amount <= 0 && this.growRequirement['food']) {
            this.number--;
        }
    }
    update(resources) {
        Object.keys(this.resources).forEach((key) => {
            const resource = this.resources[key];
            const produces = this.produces[key] || { amount: 0 };
            const carryingPop = 1 + this.number / 25;
            let gatheredAmount = 0;
            if (produces.type === 'gather') {
                gatheredAmount = produces.efficiency * this.number * this.tile.resources[key].amount;
            }
            if (produces.type === 'craft') {
                const maxProduced = Object.keys(this.produces[key].requires)
                    .map((k) => {
                    return this.number > 0 ? Math.floor(this.resources[k].amount / (this.produces[key].requires[k] * this.number)) : 0;
                });
                gatheredAmount = maxProduced.reduce((min, current) => {
                    return current < min ? current : min;
                }, Number.MAX_SAFE_INTEGER);
                gatheredAmount = gatheredAmount > 0 ? gatheredAmount : 0;
            }
            const produced = gatheredAmount ? gatheredAmount / carryingPop : 0;
            const needs = this.needs[key] ? this.needs[key].amount * this.number : 0;
            resource.amount += produced - needs;
            if (!resources[key]) {
                resources[key] = {
                    amount: 0,
                    desire: 0,
                    value: this.resources[key].resource.baseValue,
                    type: key,
                    maxValue: this.resources[key].resource.maxValue,
                    needType: this.needs[key].type
                };
            }
            const diff = Math.floor(resource.amount - this.desires[key].amount);
            resources[key].amount += diff;
        });
        this.grow();
    }
    updateDesires() {
        Object.keys(this.desires).forEach((key) => {
            //  if resource they have minus what they need 
        });
    }
    produce() {
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
                    i.maintainence.forEach((maintain) => {
                        if (this.maintainence[maintain.resource.name]) {
                            this.maintainence[maintain.resource.name] += maintain.amount;
                        }
                        else {
                            this.maintainence[maintain.resource.name] = maintain.amount;
                        }
                    });
                }
            }
        });
    }
    draw(context, tileSize) {
    }
}
Pop.add = function (tile, entities, pop) {
    if (!tile)
        return false;
    if (tile.city || tile.road)
        return false;
    if (tile.type === _Map_Tiles_TileType__WEBPACK_IMPORTED_MODULE_0__["default"].Ocean)
        return false;
    const neighbours = _Grid_GridService__WEBPACK_IMPORTED_MODULE_1__["gridService"].getNeighbours(tile, false, false)
        .filter(x => x.city).map(x => x.city);
    Object.keys(pop.resources).forEach((key) => {
        pop.resources[key].amount = pop.resources[key].amount * pop.number;
    });
    if (neighbours.length === 0)
        return false;
    const city = neighbours[0];
    city.pops.push(pop);
    tile.pop = pop;
    entities.pops.push(pop);
    if (!city.resources[pop.type]) {
        city.resources[pop.type] = {};
    }
    return true;
};
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
/* harmony import */ var _ResourceType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResourceType */ "./Resources/ResourceType.ts");


const BasicTools = new _Resource__WEBPACK_IMPORTED_MODULE_0__["default"]('basicTools', [_ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].Tool], 0.1, 10, 1, 1);
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
/* harmony import */ var _ResourceType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResourceType */ "./Resources/ResourceType.ts");


const Fibre = new _Resource__WEBPACK_IMPORTED_MODULE_0__["default"]('fibre', [_ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].Ingredient], 0.1, 1, 0.1, 0.1);
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


const Food = new _Resource__WEBPACK_IMPORTED_MODULE_0__["default"]('food', [_ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].Food], 1.1, 5, 1, 1);
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
    constructor(name, types, decay, maxValue, minValue, baseValue) {
        this.name = name;
        this.types = types;
        this.decay = decay;
        this.maxValue = maxValue;
        this.minValue = minValue;
        this.baseValue = baseValue;
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


const Wood = new _Resource__WEBPACK_IMPORTED_MODULE_0__["default"]('wood', [_ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].BuildingMaterial, _ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].Fuel, _ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].Ingredient], 1.01, 5, 0.1, 0.1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vR3JpZC9HcmlkU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9HcmlkL01hcEdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly8vLi9JbXByb3ZlbWVudC9JbXByb3ZlbWVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwL01hcC50cyIsIndlYnBhY2s6Ly8vLi9NYXAvVGlsZXMvR3Jhc3NUaWxlLnRzIiwid2VicGFjazovLy8uL01hcC9UaWxlcy9PY2VhblRpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwL1RpbGVzL1RpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwL1RpbGVzL1RpbGVTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL01hcC9UaWxlcy9UaWxlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9NYXBFbnRpdGllcy9DaXR5LnRzIiwid2VicGFjazovLy8uL01hcEVudGl0aWVzL1BvaW50LnRzIiwid2VicGFjazovLy8uL01hcEVudGl0aWVzL1JvYWQudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwRW50aXRpZXMvUm9hZE5ldHdvcmsudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwRW50aXRpZXMvVW5pdC50cyIsIndlYnBhY2s6Ly8vLi9Qb3BzL0NyYWZ0c3BlcnNvbi50cyIsIndlYnBhY2s6Ly8vLi9Qb3BzL0dhdGhlcmVyLnRzIiwid2VicGFjazovLy8uL1BvcHMvUG9wLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9CYXNpY1Rvb2xzLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9GaWJyZS50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvRm9vZC50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvUmVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL1Jlc291cmNlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvUmVzb3VyY2VzLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9Xb29kLnRzIiwid2VicGFjazovLy8uL2dlbmVyYXRlR3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUM7QUFDQztBQUcxQyxNQUFNLFdBQVc7SUFHZixZQUFZLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxxREFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGlDQUFpQztJQUNqQyxpQkFBaUIsQ0FBQyxjQUFtQixFQUFFLFdBQWdCO1FBQ3JELE1BQU0sT0FBTyxHQUFHLEVBQUUs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LElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMxRyxVQUFVLENBQUMsSUFBSSxHQUFHLDJEQUFRLENBQUMsS0FBSyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRywyREFBUSxDQUFDLEtBQUssQ0FBQztRQUVqRixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqRixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLE9BQU8sSUFB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LENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEksQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFZLEVBQUUsUUFBZ0I7UUFDcEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBQyxRQUFRLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUUsUUFBUSxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RJLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBWSxFQUFFLFFBQWdCO1FBQ3ZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBQyxRQUFRLEdBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakosQ0FBQztJQUVELFFBQVEsQ0FBQyxPQUFZLEVBQUUsUUFBZ0I7UUFDckMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxHQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RJLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBWSxFQUFFLFFBQWdCO1FBQ3RDLE9B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O0FBQUE7QUFBNEI7QUFDWTs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0IsZ0RBQUc7QUFDbkI7O0FBRUE7QUFDQTtBQUNBLE9BQU8sb0JBQW9CO0FBQzNCO0FBQ0E7O0FBRUEsaUNBQWlDLDBEQUFLOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0Esc0JBQXNCLDBEQUFLOztBQUUzQixvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQSxPQUFPLG9CQUFvQjtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBLHdDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFBvaW50IGZyb20gJy4uL01hcEVudGl0aWVzL1BvaW50JztcclxuaW1wb3J0IG1hcEdlbmVyYXRvciBmcm9tICcuL01hcEdlbmVyYXRvcic7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuXHJcbmNsYXNzIEdyaWRTZXJ2aWNlIHtcclxuICBncmlkU2l6ZTogbnVtYmVyO1xyXG4gIGdyaWQ6IGFueVtdO1xyXG4gIGNvbnN0cnVjdG9yKGdyaWRTaXplOiBudW1iZXIpIHtcclxuICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcclxuICAgIHRoaXMuZ3JpZCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTWFwKCkge1xyXG4gICAgdGhpcy5ncmlkID0gbWFwR2VuZXJhdG9yLmdlbmVyYXRlKHRoaXMuZ3JpZFNpemUpO1xyXG4gIH1cclxuXHJcbiAgLy8gIHRvZG8gLSBjaGFuZ2UgdGhlc2UgdG8gcG9pbnRzXHJcbiAgY3JlYXRlQ2xpcHBlZEdyaWQodmlld1BvcnRPcmlnaW46IGFueSwgdmlld1BvcnRFbmQ6IGFueSkge1xyXG4gICAgY29uc3QgbmV3Z3JpZCA9IFtdO1xyXG4gICAgY29uc3Qgc3RhcnRQb2ludCA9IG5ldyBQb2ludCh2aWV3UG9ydE9yaWdpbi54LCB2aWV3UG9ydE9yaWdpbi55KTtcclxuICAgIGNvbnN0IGVuZFBvaW50ID0gbmV3IFBvaW50KHZpZXdQb3J0RW5kLngsIHZpZXdQb3J0RW5kLnkpO1xyXG4gICAgXHJcbiAgICBmb3IgKGxldCB5ID0gc3RhcnRQb2ludC55O3kgPD0gZW5kUG9pbnQueTt5KyspIHtcclxuICAgICAgY29uc3QgbmV3cm93ID0gW107XHJcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZFt5XTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIGZvciAobGV0IHggPSBzdGFydFBvaW50Lng7IHggPD0gZW5kUG9pbnQueDsgeCsrKSB7XHJcbiAgICAgICAgY29uc3QgdGlsZSA9IHJvd1t4XTtcclxuXHJcbiAgICAgICAgICBpZiAodGlsZSAmJiB0aWxlLnBvaW50KSB7XHJcbiAgICAgICAgICAgIHRpbGUuZHJhd2luZ1BvaW50ID0gbmV3IFBvaW50KHRpbGUucG9pbnQueCwgdGlsZS5wb2ludC55KTtcclxuICAgICAgICAgICAgdGlsZS5kcmF3aW5nUG9pbnQueCA9IHggLSBzdGFydFBvaW50Lng7XHJcbiAgICAgICAgICAgIHRpbGUuZHJhd2luZ1BvaW50LnkgPSB5IC0gc3RhcnRQb2ludC55O1xyXG4gICAgICAgICAgICBuZXdyb3cucHVzaCh0aWxlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gIFxyXG4gICAgICBuZXdncmlkLnB1c2gobmV3cm93KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdncmlkO1xyXG4gIH1cclxuICBcclxuICB0aWxlVG9JbmRleCAodGlsZTogVGlsZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aWxlLnBvaW50LngsIHRpbGUucG9pbnQueSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZWdpb24oaW5kZXg6IGFueSwgcmFkaXVzOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGRlbHRhcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IHg9MDt4PHJhZGl1cyoyKzE7eCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHk9MDt5IDwgcmFkaXVzKjIrMTsgeSsrKSB7XHJcbiAgICAgICAgZGVsdGFzLnB1c2goeyB4OiB4IC0gMSwgeTogeSAtMSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5laWdoYm91cnM6IGFueVtdID0gW107XHJcbiAgICBkZWx0YXMuZm9yRWFjaChkZWx0YSA9PiB7XHJcbiAgICAgIGNvbnN0IGluZGV4WCA9IGluZGV4LnggKyBkZWx0YS54O1xyXG4gICAgICBjb25zdCBpbmRleFkgPSBpbmRleC55ICsgZGVsdGEueTtcclxuXHJcbiAgICAgIGlmIChpbmRleFggPCAwIHx8IGluZGV4WCA+IHRoaXMuZ3JpZC5sZW5ndGgtMSB8fFxyXG4gICAgICAgICAgaW5kZXhZIDwgMCB8fCBpbmRleFkgPiB0aGlzLmdyaWQubGVuZ3RoLTEpIHtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZWlnaGJvdXJzLnB1c2godGhpcy5ncmlkW2luZGV4WV1baW5kZXhYXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBuZWlnaGJvdXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmVpZ2hib3VycyhpbkNvbWluaW5nVGlsZTogVGlsZSwgcHJlc2VydmVPcmRlciA9IGZhbHNlLCBub0RpYWdvbmFscyA9IGZhbHNlLCBpbnB1dEdyaWQ6IGFueSA9IG51bGwpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy50aWxlVG9JbmRleChpbkNvbWluaW5nVGlsZSk7XHJcbiAgICBsZXQgZ3JpZCA9IGlucHV0R3JpZCA/IGlucHV0R3JpZCA6IHRoaXMuZ3JpZDtcclxuICAgIGNvbnN0IHRpbGUgPSBncmlkW2luZGV4LnldW2luZGV4LnhdO1xyXG4gICAgY29uc3QgYWxsRGVsdGFzID0gW1xyXG4gICAgICB7IHg6LTEsIHk6IC0xIH0sIHt4OiAwLCB5OiAtMX0sICB7IHg6IDEsIHk6IC0xfSxcclxuICAgICAgeyB4Oi0xLCB5OiAgMCB9LCAgICAgICAgICAgICAgLCAgeyB4OiAxLCB5OiAgMH0sXHJcbiAgICAgIHsgeDotMSwgeTogIDEgfSwge3g6IDAsIHk6ICAxIH0sIHsgeDogMSwgeTogIDF9LFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBub0RpYWdvbmFsc0RlbHRhcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgLCB7IHg6IDAsIHk6IC0xIH0sICBcclxuICAgICAgeyB4Oi0xLCB5OiAgMCB9LCAgICAgICAgICAgICAgLCAgeyB4OiAxLCB5OiAgMH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCB5OiAgMSB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJzOiBhbnlbXSA9IFtdO1xyXG4gICAgaWYgKCF0aWxlKSB7XHJcbiAgICAgIHJldHVybiBuZWlnaGJvdXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlbHRhcyA9IG5vRGlhZ29uYWxzID8gbm9EaWFnb25hbHNEZWx0YXMgOiBhbGxEZWx0YXM7XHJcbiAgICBkZWx0YXMuZm9yRWFjaChkZWx0YSA9PiB7XHJcbiAgICAgIGNvbnN0IGluZGV4WCA9IGluZGV4LnggKyBkZWx0YS54O1xyXG4gICAgICBjb25zdCBpbmRleFkgPSBpbmRleC55ICsgZGVsdGEueTtcclxuXHJcbiAgICAgIGlmIChpbmRleFggPCAwIHx8IGluZGV4WCA+IGdyaWQubGVuZ3RoLTEgfHxcclxuICAgICAgICAgIGluZGV4WSA8IDAgfHwgaW5kZXhZID4gZ3JpZC5sZW5ndGgtMSkge1xyXG4gICAgICAgICAgaWYgKHByZXNlcnZlT3JkZXIpIG5laWdoYm91cnMucHVzaChudWxsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZWlnaGJvdXJzLnB1c2goZ3JpZFtpbmRleFldW2luZGV4WF0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3VycztcclxuICB9XHJcblxyXG4gIGZpbmRTZWxlY3RlZFRpbGVDcm9zc05laWdoYm91cnModGlsZTogVGlsZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZENyb3NzTmVpZ2hib3Vycyh0aWxlKTtcclxuICB9XHJcblxyXG4gIGZpbmRDcm9zc05laWdoYm91cnModGlsZTogVGlsZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0TmVpZ2hib3Vycyh0aWxlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgZ3JpZFNlcnZpY2U6IEdyaWRTZXJ2aWNlID0gbnVsbDtcclxuZnVuY3Rpb24gZ3JpZFNlcnZpY2VJbml0KGdyaWRTaXplOiBudW1iZXIpIHtcclxuICBncmlkU2VydmljZSA9IG5ldyBHcmlkU2VydmljZShncmlkU2l6ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGdyaWRTZXJ2aWNlLCBncmlkU2VydmljZUluaXQgfTtcclxuIiwiaW1wb3J0IHsgZ3JpZFNlcnZpY2UgfSBmcm9tICcuL0dyaWRTZXJ2aWNlJztcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGUnO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vTWFwRW50aXRpZXMvUG9pbnQnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGVUeXBlJztcclxuaW1wb3J0IFRpbGVTZXJ2aWNlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlU2VydmljZSc7XHJcblxyXG5jbGFzcyBNYXBHZW5lcmF0b3Ige1xyXG5cclxuICBnZW5lcmF0ZShncmlkU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBsZXQgZ3JpZDogVGlsZVtdW10gPSBbXVxyXG4gICAgZm9yKGxldCBoPTA7aDxncmlkU2l6ZTtoKyspIHtcclxuICAgICAgY29uc3Qgcm93ID0gW107XHJcbiAgICAgIGZvcihsZXQgdz0wO3c8Z3JpZFNpemU7dysrKSB7XHJcbiAgICAgICAgcm93LnB1c2gobmV3IFRpbGUobmV3IFBvaW50KHcsIGgpLCBUaWxlVHlwZS5Ob25lKSk7XHJcbiAgICAgIH1cclxuICAgICAgZ3JpZC5wdXNoKHJvdyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNlZWRUaWxlQ291bnQgPSA4MDtcclxuICAgIGZvciAobGV0IGk9MDtpIDwgc2VlZFRpbGVDb3VudDtpKyspIHtcclxuICAgICAgY29uc3QgcmFuZG9tVGlsZSA9IGdyaWRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JpZC5sZW5ndGgpXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBncmlkLmxlbmd0aCldO1xyXG4gICAgICByYW5kb21UaWxlLnR5cGUgPSBUaWxlVHlwZS5HcmFzcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ3JpZFtNYXRoLnJvdW5kKGdyaWQubGVuZ3RoLzIpXVtNYXRoLnJvdW5kKGdyaWQubGVuZ3RoLzIpXS50eXBlID0gVGlsZVR5cGUuR3Jhc3M7XHJcbiAgICAgIFxyXG4gICAgZ3JpZCA9IHRoaXMuZGZhKGdyaWRTaXplLCBncmlkLCB0aGlzLmdyb3dHcmFzcyk7XHJcbiAgICBncmlkID0gdGhpcy5kZmEoZ3JpZFNpemUsIGdyaWQsIHRoaXMuZ3Jvd0dyYXNzKTtcclxuICAgIHRoaXMuZmxvb2RGaWxsKGdyaWQsIGdyaWRbTWF0aC5yb3VuZChncmlkLmxlbmd0aC8yKV1bTWF0aC5yb3VuZChncmlkLmxlbmd0aC8yKV0pO1xyXG5cclxuICAgIGdyaWQgPSB0aGlzLmRmYShncmlkU2l6ZSwgZ3JpZCwgdGhpcy5zbW9vdGhSdWxlKTtcclxuICAgIGdyaWQgPSB0aGlzLmRmYShncmlkU2l6ZSwgZ3JpZCwgdGhpcy5zbW9vdGhSdWxlKTtcclxuXHJcbiAgICB0aGlzLmZpbGxJbkhvbGVzKGdyaWQpO1xyXG5cclxuICAgIHJldHVybiBncmlkO1xyXG4gIH1cclxuXHJcbiAgZmxvb2RGaWxsKGdyaWQ6IFRpbGVbXVtdLCBzdGFydDogVGlsZSkge1xyXG4gICAgY29uc3Qgc3RhY2sgPSBbc3RhcnRdO1xyXG5cclxuICAgIHdoaWxlIChzdGFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IHRpbGUgPSBzdGFjay5wb3AoKTtcclxuICAgICAgY29uc3QgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmdldE5laWdoYm91cnModGlsZSwgZmFsc2UsIGZhbHNlLCBncmlkKTtcclxuICAgICAgY29uc3Qgd2F0ZXJOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKS5sZW5ndGg7XHJcbiAgICAgIGNvbnN0IGdyYXNzTmVpZ2hib3VycyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geC50eXBlID09PSBUaWxlVHlwZS5HcmFzcykubGVuZ3RoO1xyXG4gICAgICBcclxuICAgICAgaWYgKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh3YXRlck5laWdoYm91cnMgKyBncmFzc05laWdoYm91cnMpKSA+IHdhdGVyTmVpZ2hib3Vycykge1xyXG4gICAgICAgIHRpbGUudHlwZSA9IFRpbGVUeXBlLkdyYXNzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRpbGUudHlwZSA9IFRpbGVUeXBlLk9jZWFuO1xyXG4gICAgICB9XHJcbiAgICAgIG5laWdoYm91cnMuZmlsdGVyKHggPT4geC50eXBlID09PSBUaWxlVHlwZS5Ob25lKS5mb3JFYWNoKHggPT4gc3RhY2sucHVzaCh4KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZmEgKGdyaWRTaXplOiBudW1iZXIsIGdyaWQ6IFRpbGVbXVtdLCBydWxlOiBhbnkpIHtcclxuICAgIGNvbnN0IG5ld0dyaWQgPSBbXTtcclxuXHJcbiAgICBmb3IobGV0IGg9MDtoIDwgZ3JpZFNpemU7aCsrKSB7XHJcbiAgICAgIGNvbnN0IG5ld1JvdyA9IFtdO1xyXG4gICAgICBmb3IobGV0IHc9MDt3IDwgZ3JpZFNpemU7dysrKSB7XHJcbiAgICAgICAgY29uc3QgdGlsZSA9IGdyaWRbaF1bd107XHJcbiAgICAgICAgY29uc3QgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmdldE5laWdoYm91cnModGlsZSwgZmFsc2UsIGZhbHNlLCBncmlkKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd2F0ZXJOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgZ3Jhc3NOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLkdyYXNzKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBydWxlKHRpbGUsIHdhdGVyTmVpZ2hib3VycywgZ3Jhc3NOZWlnaGJvdXJzKTtcclxuICAgICAgICBjb25zdCBjb3B5ID0gVGlsZVNlcnZpY2UuY3JlYXRlVGlsZSh0aWxlLCB0eXBlKTtcclxuICAgICAgICBcclxuICAgICAgICBuZXdSb3cucHVzaChjb3B5KTtcclxuICAgICAgfVxyXG4gICAgICBuZXdHcmlkLnB1c2gobmV3Um93KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdHcmlkO1xyXG4gIH1cclxuXHJcbiAgc21vb3RoUnVsZSAodGlsZTogVGlsZSwgd2F0ZXJOZWlnaGJvdXJzOiBudW1iZXIsIGdyYXNzTmVpZ2hib3VyczogbnVtYmVyKSB7XHJcbiAgICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5PY2VhbiAmJiBncmFzc05laWdoYm91cnMgPiAzKSB7XHJcbiAgICAgIHJldHVybiBUaWxlVHlwZS5HcmFzcztcclxuICAgIH1cclxuICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLkdyYXNzICYmIHdhdGVyTmVpZ2hib3VycyA+IDcpIHtcclxuICAgICAgcmV0dXJuIFRpbGVUeXBlLk9jZWFuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRpbGUudHlwZTtcclxuICB9XHJcblxyXG4gIGdyb3dHcmFzcyAodGlsZTogVGlsZSwgd2F0ZXJOZWlnaGJvdXJzOiBudW1iZXIsIGdyYXNzTmVpZ2hib3VyczogbnVtYmVyKSB7XHJcbiAgICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5PY2VhbiAmJiBncmFzc05laWdoYm91cnMgPiAwKSB7XHJcbiAgICAgIHJldHVybiBUaWxlVHlwZS5HcmFzcztcclxuICAgIH1cclxuICAgIHJldHVybiB0aWxlLnR5cGU7XHJcbiAgfVxyXG5cclxuICBmaWxsSW5Ib2xlcyhncmlkOiBUaWxlW11bXSkge1xyXG4gICAgZm9yKGxldCB5ID0gMDsgeSA8IGdyaWQubGVuZ3RoOyB5KyspIHtcclxuICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCBncmlkW3ldLmxlbmd0aDsgaCsrKSB7XHJcbiAgICAgICAgaWYgKGdyaWRbeV1baF0udHlwZSA9PT0gVGlsZVR5cGUuTm9uZSkge1xyXG4gICAgICAgICAgZ3JpZFt5XVtoXS50eXBlID0gVGlsZVR5cGUuT2NlYW47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgTWFwR2VuZXJhdG9yKCk7IiwiaW1wb3J0ICogYXMgUmVzb3VyY2VzIGZyb20gXCIuLi9SZXNvdXJjZXMvUmVzb3VyY2VzXCI7XHJcblxyXG5jb25zdCBIb3VzZSA9IHtcclxuICBuYW1lOiAnSG91c2UnLFxyXG4gIGNvc3RzOiBbXHJcbiAgICB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAxMCB9LFxyXG4gIF0sXHJcbiAgbWFpbnRhaW5lbmNlOiBbXHJcbiAgICB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAuMjUgfSxcclxuICBdLFxyXG4gIGVmZmVjdHM6IHtcclxuICAgIGZlcnRpbGl0eTogMS4xLFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgSG91c2UgfTtcclxuIiwiaW1wb3J0IFBvaW50IGZyb20gJy4uL01hcEVudGl0aWVzL1BvaW50JztcclxuaW1wb3J0IENpdHkgZnJvbSAnLi4vTWFwRW50aXRpZXMvQ2l0eSc7XHJcbmltcG9ydCBVbml0IGZyb20gJy4uL01hcEVudGl0aWVzL1VuaXQnO1xyXG5pbXBvcnQgeyBncmlkU2VydmljZSwgZ3JpZFNlcnZpY2VJbml0IH0gZnJvbSAnLi4vR3JpZC9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBSb2FkIGZyb20gJy4uL01hcEVudGl0aWVzL1JvYWQnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi9UaWxlcy9UaWxlVHlwZSc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4vVGlsZXMvVGlsZSc7XHJcbmltcG9ydCBHYXRoZXJlciBmcm9tICcuLi9Qb3BzL0dhdGhlcmVyJztcclxuaW1wb3J0IFBvcCBmcm9tICcuLi9Qb3BzL1BvcCc7XHJcbmltcG9ydCBDcmFmdHNwZXJzb24gZnJvbSAnLi4vUG9wcy9DcmFmdHNwZXJzb24nO1xyXG5cclxuY2xhc3MgTWFwIHtcclxuICBjb250ZXh0OiBhbnk7XHJcbiAgc2l6ZTogbnVtYmVyO1xyXG4gIHRpbGVOdW1iZXI6IG51bWJlcjtcclxuICB2aWV3UG9ydE9yaWdpbjogUG9pbnQ7XHJcbiAgc2VsZWN0ZWRUaWxlOiBUaWxlO1xyXG4gIHNlbGVjdGVkRW50aXR5OiBhbnk7XHJcbiAgem9vbUxldmVsOiBudW1iZXI7XHJcbiAgb3JpZ2luOiBQb2ludDtcclxuICB2aWV3UG9ydEVuZDogUG9pbnQ7XHJcbiAgdGlsZVNpemU6IG51bWJlcjtcclxuICBjbGlwcGVkR3JpZDogYW55W107XHJcbiAgdmlld1BvcnRTaXplOiBudW1iZXI7XHJcbiAgZW50aXRpZXM6IGFueTtcclxuICBcclxuICBjb25zdHJ1Y3RvcihzaXplOiBudW1iZXIsIHRpbGVOdW1iZXI6IG51bWJlciwgY29udGV4dDogYW55KSB7XHJcbiAgICAvLyAgRHJhdyBncmlkIG9mIHNxdWFyZXNcclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgdGhpcy50aWxlTnVtYmVyID0gdGlsZU51bWJlcjtcclxuICAgIHRoaXMudmlld1BvcnRPcmlnaW4gPSBuZXcgUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLm9yaWdpbiA9IG5ldyBQb2ludCgwLCAwKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUaWxlID0gbnVsbDtcclxuICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSBudWxsO1xyXG4gICAgdGhpcy5lbnRpdGllcyA9IHtcclxuICAgICAgcG9wczogW10sXHJcbiAgICAgIGNpdGllczogW10sXHJcbiAgICB9O1xyXG5cclxuICAgIGdyaWRTZXJ2aWNlSW5pdCh0aGlzLnRpbGVOdW1iZXIpO1xyXG4gICAgZ3JpZFNlcnZpY2UuY3JlYXRlTWFwKCk7XHJcblxyXG4gICAgdGhpcy5jbGlwcGVkR3JpZCA9IFtdO1xyXG4gICAgdGhpcy52aWV3UG9ydFNpemUgPSBzaXplOyAvLyAgaG93IGxhcmdlIHRoZSB2aWV3IHBvcnQgaXNcclxuICAgIHRoaXMuem9vbUxldmVsID0gNDA7ICAvLyAgaG93IG1hbnkgVGlsZXMgYXJlIGluIHZpZXcgcG9ydFxyXG4gICAgdGhpcy52aWV3UG9ydEVuZCA9IG5ldyBQb2ludCh0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyAgdGhpcy56b29tTGV2ZWwsIHRoaXMudmlld1BvcnRPcmlnaW4ueSArICB0aGlzLnpvb21MZXZlbCk7XHJcbiAgICAgXHJcbiAgICB0aGlzLmNsaXBwZWRHcmlkID0gZ3JpZFNlcnZpY2UuY3JlYXRlQ2xpcHBlZEdyaWQodGhpcy52aWV3UG9ydE9yaWdpbiwgdGhpcy52aWV3UG9ydEVuZCk7XHJcbiAgICB0aGlzLnRpbGVTaXplID0gdGhpcy52aWV3UG9ydFNpemUgLyB0aGlzLnpvb21MZXZlbDsgLy8gIHNob3VsZCBiZSB2aWV3IHBvcnQgc2l6ZSAvIHZpZXcgcG9ydCBjb250ZW50IHNpemVcclxuICB9XHJcblxyXG4gIGdyaWQoKSB7XHJcbiAgICByZXR1cm4gZ3JpZFNlcnZpY2UuZ3JpZDtcclxuICB9XHJcblxyXG4gIGNsaWNrVGlsZShwb2ludDogUG9pbnQpIHtcclxuICAgIGNvbnN0IHRpbGVYID0gTWF0aC5mbG9vcihwb2ludC54IC8gdGhpcy50aWxlU2l6ZSk7XHJcbiAgICBjb25zdCB0aWxlWSA9IE1hdGguZmxvb3IocG9pbnQueSAvIHRoaXMudGlsZVNpemUpO1xyXG5cclxuICAgIGNvbnN0IHRpbGUgPSB0aGlzLmNsaXBwZWRHcmlkW3RpbGVZXSAmJiB0aGlzLmNsaXBwZWRHcmlkW3RpbGVZXVt0aWxlWF07XHJcblxyXG4gICAgaWYgKHRpbGUpIHsgIFxyXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFRpbGUpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGlsZS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aWxlLnVuaXQgfHwgdGlsZS5yb2FkIHx8IHRpbGUuY2l0eSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSB0aWxlLnVuaXQgfHwgdGlsZS5yb2FkIHx8IHRpbGUuY2l0eTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlbGVjdGVkVGlsZSA9IHRpbGU7XHJcbiAgICAgIHRpbGUuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGlsZTtcclxuICB9XHJcblxyXG4gIGRyYWcoZGlmZlg6IG51bWJlciwgZGlmZlk6IG51bWJlcikge1xyXG5cclxuICAgIGNvbnN0IG1pbkRyYWcgPSAxO1xyXG4gICAgaWYgKE1hdGguYWJzKGRpZmZYKSA+IG1pbkRyYWcgfHwgTWF0aC5hYnMoZGlmZlkpID4gbWluRHJhZykge1xyXG4gICAgICBpZiAoZGlmZlggPiAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy52aWV3UG9ydE9yaWdpbi54ICsgTWF0aC5yb3VuZChkaWZmWCk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi54ID0gTWF0aC5taW4oc3VtLCB0aGlzLnRpbGVOdW1iZXIpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRFbmQueCA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIHRoaXMuem9vbUxldmVsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIE1hdGgucm91bmQoZGlmZlgpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCA9IE1hdGgubWF4KHN1bSwgMCk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi54ID0gdGhpcy52aWV3UG9ydE9yaWdpbi54ICsgdGhpcy56b29tTGV2ZWw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkaWZmWSA+IDApIHtcclxuICAgICAgICBjb25zdCBzdW0gPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyBNYXRoLnJvdW5kKGRpZmZZKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgPSBNYXRoLm1pbihzdW0sIHRoaXMudGlsZU51bWJlcik7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55ID0gdGhpcy52aWV3UG9ydE9yaWdpbi55ICsgdGhpcy56b29tTGV2ZWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy52aWV3UG9ydE9yaWdpbi54ICsgTWF0aC5yb3VuZChkaWZmWSk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55ID0gTWF0aC5tYXgoc3VtLCAwKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyB0aGlzLnpvb21MZXZlbDtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAgbW92ZSB0byB1bml0XHJcbiAgbW92ZVVuaXQodW5pdDogVW5pdCwgbmVpZ2hib3VyOiBUaWxlKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbFRpbGUgPSB1bml0LnRpbGU7XHJcbiAgICB1bml0LnRpbGUgPSBncmlkU2VydmljZS5ncmlkW25laWdoYm91ci5wb2ludC55XVtuZWlnaGJvdXIucG9pbnQueF07XHJcbiAgICBncmlkU2VydmljZS5ncmlkW25laWdoYm91ci5wb2ludC55XVtuZWlnaGJvdXIucG9pbnQueF0udW5pdCA9IHVuaXQ7XHJcbiAgICBvcmlnaW5hbFRpbGUudW5pdCA9IG51bGw7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG5cclxuICBsZWZ0S2V5KCl7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSAmJiB0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgVW5pdCkge1xyXG4gICAgICB0aGlzLmVudGl0eUxlZnQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuTGVmdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmlnaHRLZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5UmlnaHQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuUmlnaHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwS2V5KCl7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSAmJiB0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgVW5pdCkge1xyXG4gICAgICB0aGlzLmVudGl0eVVwKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhblVwKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkb3duS2V5KCl7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSAmJiB0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgVW5pdCkge1xyXG4gICAgICB0aGlzLmVudGl0eURvd24oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuRG93bigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW50aXR5TGVmdCgpIHtcclxuICAgIGNvbnN0IG5laWdoYm91ciA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnModGhpcy5zZWxlY3RlZEVudGl0eS50aWxlKVsxXTtcclxuICAgIGlmIChuZWlnaGJvdXIgJiYgbmVpZ2hib3VyLnR5cGUgIT09IFRpbGVUeXBlLk9jZWFuKSB7XHJcbiAgICAgIHRoaXMubW92ZVVuaXQodGhpcy5zZWxlY3RlZEVudGl0eSwgbmVpZ2hib3VyKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZW50aXR5UmlnaHQoKSB7XHJcbiAgICBjb25zdCBuZWlnaGJvdXIgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRoaXMuc2VsZWN0ZWRFbnRpdHkudGlsZSlbMl07XHJcbiAgICBpZiAobmVpZ2hib3VyICYmIG5laWdoYm91ci50eXBlICE9PSBUaWxlVHlwZS5PY2Vhbikge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGVudGl0eVVwKCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGUpWzBdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gVGlsZVR5cGUuT2NlYW4pIHtcclxuICAgICAgdGhpcy5tb3ZlVW5pdCh0aGlzLnNlbGVjdGVkRW50aXR5LCBuZWlnaGJvdXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW50aXR5RG93bigpIHtcclxuICAgIGNvbnN0IG5laWdoYm91ciA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnModGhpcy5zZWxlY3RlZEVudGl0eS5UaWxlKVszXTtcclxuICAgIGlmIChuZWlnaGJvdXIgJiYgbmVpZ2hib3VyLnR5cGUgIT09IFRpbGVUeXBlLk9jZWFuKSB7XHJcbiAgICAgIHRoaXMubW92ZVVuaXQodGhpcy5zZWxlY3RlZEVudGl0eSwgbmVpZ2hib3VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhbkxlZnQoKSB7XHJcbiAgICBpZiAodGhpcy52aWV3UG9ydE9yaWdpbi54ID4gMCkge1xyXG4gICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLngtLTtcclxuICAgICAgdGhpcy52aWV3UG9ydEVuZC54LS07XHJcbiAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFuUmlnaHQoKSB7XHJcbiAgICBpZiAodGhpcy52aWV3UG9ydE9yaWdpbi54ICsgdGhpcy56b29tTGV2ZWwgPCB0aGlzLnRpbGVOdW1iZXIpIHtcclxuICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi54Kys7XHJcbiAgICAgIHRoaXMudmlld1BvcnRFbmQueCsrO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhblVwKCkge1xyXG4gICAgaWYgKHRoaXMudmlld1BvcnRPcmlnaW4ueSA+IDApIHtcclxuICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55LS07XHJcbiAgICAgIHRoaXMudmlld1BvcnRFbmQueS0tO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTsgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFuRG93bigpIHtcclxuICAgIGlmICh0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyB0aGlzLnpvb21MZXZlbCA8IHRoaXMudGlsZU51bWJlcikge1xyXG4gICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnkrKztcclxuICAgICAgdGhpcy52aWV3UG9ydEVuZC55Kys7XHJcbiAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgem9vbU91dCgpIHtcclxuICAgIGlmICh0aGlzLnpvb21MZXZlbCA8IDEwMCkge1xyXG4gICAgICB0aGlzLnpvb21MZXZlbCsrO1xyXG4gICAgICB0aGlzLnpvb20oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHpvb21JbigpIHtcclxuICAgIGlmICh0aGlzLnpvb21MZXZlbCA+IDEpIHtcclxuICAgICAgdGhpcy56b29tTGV2ZWwtLTtcclxuICAgICAgdGhpcy56b29tKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB6b29tKCkge1xyXG4gICAgdGhpcy52aWV3UG9ydEVuZCA9IG5ldyBQb2ludCh0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyAgdGhpcy56b29tTGV2ZWwsIHRoaXMudmlld1BvcnRPcmlnaW4ueSArICB0aGlzLnpvb21MZXZlbCk7XHJcbiAgICB0aGlzLnRpbGVTaXplID0gdGhpcy52aWV3UG9ydFNpemUgLyB0aGlzLnpvb21MZXZlbDtcclxuICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlVmlldyh1cGRhdGVHcmlkID0gdHJ1ZSkge1xyXG4gICAgaWYgKHVwZGF0ZUdyaWQpdGhpcy5jbGlwcGVkR3JpZCA9IGdyaWRTZXJ2aWNlLmNyZWF0ZUNsaXBwZWRHcmlkKHRoaXMudmlld1BvcnRPcmlnaW4sIHRoaXMudmlld1BvcnRFbmQpO1xyXG4gICAgdGhpcy5kcmF3KCk7XHJcbiAgfVxyXG5cclxuICBlbmRUdXJuKCkge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMuZW50aXRpZXMuY2l0aWVzLmZvckVhY2goKGNpdHk6IENpdHkpID0+IGNpdHkudXBkYXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgZHJhdygpIHtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnI0ZGRkZGRic7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcclxuXHJcbiAgICBmb3IobGV0IGg9MDtoPHRoaXMuY2xpcHBlZEdyaWQubGVuZ3RoO2grKykge1xyXG4gICAgICBmb3IobGV0IHc9MDt3PHRoaXMuY2xpcHBlZEdyaWRbaF0ubGVuZ3RoO3crKykge1xyXG4gICAgICAgIGNvbnN0IHRpbGUgPSB0aGlzLmNsaXBwZWRHcmlkW2hdW3ddO1xyXG4gICAgICAgIGlmICh0aWxlICYmICh0aWxlLmRyYXdpbmdQb2ludC54KSA8PSB0aGlzLnZpZXdQb3J0RW5kLnggJiYgKHRpbGUuZHJhd2luZ1BvaW50LngpID49IDAgJiYgKHRpbGUuZHJhd2luZ1BvaW50LnkpID49IDAgJiYgdGlsZS5kcmF3aW5nUG9pbnQueSA8PSB0aGlzLnZpZXdQb3J0RW5kLnkpIHtcclxuICAgICAgICAgIHRpbGUuZHJhdyh0aGlzLmNvbnRleHQsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgaWYgKHRpbGUuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdCh0aWxlLmRyYXdpbmdQb2ludC54ICogdGhpcy50aWxlU2l6ZSwgdGlsZS5kcmF3aW5nUG9pbnQueSAqIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnI0ZGRkZGRic7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRpbGUuY2l0eSkge1xyXG4gICAgICAgICAgICB0aWxlLmNpdHkuZHJhdyh0aGlzLmNvbnRleHQsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aWxlLnJvYWQpIHtcclxuICAgICAgICAgICAgdGlsZS5yb2FkLmRyYXcodGhpcy5jb250ZXh0LCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGlsZS51bml0KSB7XHJcbiAgICAgICAgICAgIHRpbGUudW5pdC5kcmF3KHRoaXMuY29udGV4dCwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRpbGUucG9wKSB7XHJcbiAgICAgICAgICAgIHRpbGUucG9wLmRyYXcodGhpcy5jb250ZXh0LCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFVuaXRUb1NlbGVjdGVkVGlsZSgpIHtcclxuICAgIGlmIChVbml0LmFkZCh0aGlzLnNlbGVjdGVkVGlsZSkpIHtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRSb2FkVG9TZWxlY3RlZFRpbGUoKSB7XHJcbiAgICBpZiAoUm9hZC5hZGQodGhpcy5zZWxlY3RlZFRpbGUpKSB7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkQ2l0eVRvU2VsZWN0ZWRUaWxlKCkge1xyXG4gICAgaWYgKENpdHkuYWRkKHRoaXMuc2VsZWN0ZWRUaWxlLCB0aGlzLmVudGl0aWVzKSkge1xyXG4gICAgICB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZEdhdGhlcmVyKCkge1xyXG4gICAgaWYgKEdhdGhlcmVyLmFkZCh0aGlzLnNlbGVjdGVkVGlsZSwgdGhpcy5lbnRpdGllcykpIHtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRDcmFmdHNwZXJzb24oKSB7XHJcbiAgICBpZiAoQ3JhZnRzcGVyc29uLmFkZCh0aGlzLnNlbGVjdGVkVGlsZSwgdGhpcy5lbnRpdGllcykpIHtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVTZWxlY3RlZEVudGl0eSgpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RlZEVudGl0eSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGlsZSA9IHRoaXMuc2VsZWN0ZWRFbnRpdHkudGlsZTtcclxuICAgIGNvbnN0IGdyaWRUaWxlID0gZ3JpZFNlcnZpY2UuZ3JpZFt0aWxlLnBvaW50LnldW3RpbGUucG9pbnQueF07XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIGdyaWRUaWxlLnVuaXQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5laWdoYm91cnMgPSB0aGlzLnNlbGVjdGVkRW50aXR5Lm5laWdoYm91cnM7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIFJvYWQpIHtcclxuICAgICAgLy8gIEZvciBlYWNoIG5laWdoYm91ciBkbyBhIGNvbm5lY3Rpdml0eSBjaGVjayBhbmQgdXBkYXRlIGNvbm5lY3RlZG5lc3NcclxuICAgICAgLy8gIFVwZGF0ZSBuZXR3b3JrcyByb2Fkcy5cclxuICAgICAgUm9hZC5yZW1vdmUoZ3JpZFRpbGUsIHRoaXMuc2VsZWN0ZWRFbnRpdHkpO1xyXG4gICAgICAvLyAgRmluZCBuZXR3b3JrIHRoYXQgdGhlIHJvYWQgaXMgY29ubmVjdGVkIHRvIGFuZCBpdCdzIG5laWdoYm91cnMgYW5kIHJlbW92ZVxyXG4gICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBDaXR5KSB7XHJcbiAgICAgIENpdHkucmVtb3ZlKGdyaWRUaWxlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwO1xyXG4iLCJpbXBvcnQgVGlsZSBmcm9tICcuL1RpbGUnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi9UaWxlVHlwZSc7XHJcbmltcG9ydCBQb2ludCBmcm9tICcuLi8uLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCAqIGFzIFJlc291cmNlcyBmcm9tICcuLi8uLi9SZXNvdXJjZXMvUmVzb3VyY2VzJztcclxuXHJcbmNsYXNzIEdyYXNzVGlsZSBleHRlbmRzIFRpbGUge1xyXG4gIGNvbnN0cnVjdG9yKHBvaW50OiBQb2ludCkge1xyXG4gICAgc3VwZXIocG9pbnQsIFRpbGVUeXBlLkdyYXNzKTtcclxuICAgIHRoaXMucmVzb3VyY2VzID0geyB9O1xyXG4gICAgdGhpcy5yZXNvdXJjZXNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuRm9vZCwgYW1vdW50OiAxLjUgfTtcclxuICAgIHRoaXMucmVzb3VyY2VzW1Jlc291cmNlcy5Xb29kLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLldvb2QsIGFtb3VudDogMC41IH07XHJcbiAgICB0aGlzLnJlc291cmNlc1tSZXNvdXJjZXMuRmlicmUubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuRmlicmUsIGFtb3VudDogMC41IH07XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwRkYwMCc7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplLCB0aWxlU2l6ZSwgdGlsZVNpemUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3Jhc3NUaWxlO1xyXG4iLCJpbXBvcnQgVGlsZSBmcm9tICcuL1RpbGUnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi9UaWxlVHlwZSc7XHJcbmltcG9ydCBQb2ludCBmcm9tICcuLi8uLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcblxyXG5jbGFzcyBPY2VhblRpbGUgZXh0ZW5kcyBUaWxlIHtcclxuICBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQpIHtcclxuICAgIHN1cGVyKHBvaW50LCBUaWxlVHlwZS5PY2Vhbik7XHJcbiAgfVxyXG4gIGRyYXcoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMEZGJztcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplLCB0aGlzLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUsIHRpbGVTaXplLCB0aWxlU2l6ZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPY2VhblRpbGU7XHJcbiIsImltcG9ydCBQb2ludCBmcm9tICcuLi8uLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tICcuL1RpbGVUeXBlJztcclxuaW1wb3J0IFVuaXQgZnJvbSAnLi4vLi4vTWFwRW50aXRpZXMvVW5pdCc7XHJcbmltcG9ydCBDaXR5IGZyb20gJy4uLy4uL01hcEVudGl0aWVzL0NpdHknO1xyXG5pbXBvcnQgUG9wIGZyb20gJy4uLy4uL1BvcHMvUG9wJztcclxuaW1wb3J0IE9jZWFuVGlsZSBmcm9tICcuL09jZWFuVGlsZSc7XHJcbmltcG9ydCBHcmFzc1RpbGUgZnJvbSAnLi9HcmFzc1RpbGUnO1xyXG5pbXBvcnQgSVByaW50YWJsZSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lQcmludGFibGUnO1xyXG5cclxuY2xhc3MgVGlsZSBpbXBsZW1lbnRzIElQcmludGFibGV7XHJcbiAgcG9pbnQ6IFBvaW50O1xyXG4gIHNlbGVjdGVkOiBib29sZWFuO1xyXG4gIHR5cGU6IFRpbGVUeXBlO1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY2l0eTogQ2l0eTtcclxuICByb2FkOiBhbnk7XHJcbiAgdW5pdDogVW5pdDtcclxuICBkcmF3aW5nUG9pbnQ6IFBvaW50O1xyXG4gIHJlc291cmNlczogYW55O1xyXG4gIHBvcDogUG9wO1xyXG4gIGltcHJvdmVtZW50czogYW55ID0gW107XHJcbiAgc3RhdGljIGNvcHk6ICh0aWxlOiBUaWxlLCB0eXBlPzogYW55KSA9PiBUaWxlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQsIHR5cGU6IFRpbGVUeXBlKSB7XHJcbiAgICB0aGlzLnBvaW50ID0gUG9pbnQuY29weShwb2ludCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmlkID0gYCR7cG9pbnQueH0tJHtwb2ludC55fWA7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gIH1cclxuXHJcbiAgZXF1YWxzKG90aGVyVGlsZTogVGlsZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9pbnQuZXF1YWxzKG90aGVyVGlsZS5wb2ludCk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIGNvbnN0IHRpbGVEZXRhaWxzID0gYCR7dGhpcy5wb2ludC54fSwgJHt0aGlzLnBvaW50Lnl9LCAke3RoaXMudHlwZX1gO1xyXG4gICAgbGV0IGNpdHlEZXRhaWxzID0gJyc7XHJcbiAgICBpZiAodGhpcy5jaXR5KSB7XHJcbiAgICAgIGNpdHlEZXRhaWxzID0gdGhpcy5jaXR5LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJvYWREZXRhaWxzID0gJyc7XHJcbiAgICBpZiAodGhpcy5yb2FkKSB7XHJcbiAgICAgIHJvYWREZXRhaWxzID0gYCR7dGhpcy5yb2FkLnRvU3RyaW5nKCl9XFxuJHt0aGlzLnJvYWQucm9hZE5ldHdvcmsudG9TdHJpbmcoKX1gXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBvcERldGFpbHMgPSB0aGlzLnBvcCA/IHRoaXMucG9wLnRvU3RyaW5nKCkgOiAnJztcclxuXHJcbiAgICBjb25zdCB1bml0RGV0YWlscyA9IHRoaXMudW5pdCA/IHRoaXMudW5pdC50b1N0cmluZygpIDogJyc7XHJcblxyXG4gICAgY29uc3QgaW1wcm92ZW1lbnREZXRhaWxzID0gdGhpcy5pbXByb3ZlbWVudHMubWFwKCh4OiBhbnkpID0+IHgubmFtZSkuam9pbignLCcpO1xyXG4gICAgcmV0dXJuIGAke3RpbGVEZXRhaWxzfSAke2NpdHlEZXRhaWxzfSAke3JvYWREZXRhaWxzfSAke3VuaXREZXRhaWxzfSAke3BvcERldGFpbHN9ICR7aW1wcm92ZW1lbnREZXRhaWxzfWA7XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnI0ZGRkZGRic7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplLCB0aWxlU2l6ZSwgdGlsZVNpemUpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaWxlO1xyXG4iLCJpbXBvcnQgVGlsZSBmcm9tIFwiLi9UaWxlXCI7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tIFwiLi9UaWxlVHlwZVwiO1xyXG5pbXBvcnQgR3Jhc3NUaWxlIGZyb20gXCIuL0dyYXNzVGlsZVwiO1xyXG5pbXBvcnQgT2NlYW5UaWxlIGZyb20gXCIuL09jZWFuVGlsZVwiO1xyXG5cclxuY2xhc3MgVGlsZVNlcnZpY2Uge1xyXG5cclxuICBjb3B5VGlsZSA9IGZ1bmN0aW9uICh0aWxlOiBUaWxlKSB7XHJcbiAgICBsZXQgY29weTtcclxuICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk5vbmUpIHtcclxuICAgICAgY29weSA9IG5ldyBUaWxlKHRpbGUucG9pbnQsIHRpbGUudHlwZSk7XHJcbiAgICAgIGNvcHkuc2VsZWN0ZWQgPSBjb3B5LnNlbGVjdGVkO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuR3Jhc3MpIHtcclxuICAgICAgY29weSA9IG5ldyBHcmFzc1RpbGUodGlsZS5wb2ludCk7XHJcbiAgICAgIGNvcHkuc2VsZWN0ZWQgPSBjb3B5LnNlbGVjdGVkO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHtcclxuICAgICAgY29weSA9IG5ldyBPY2VhblRpbGUodGlsZS5wb2ludCk7XHJcbiAgICAgIGNvcHkuc2VsZWN0ZWQgPSBjb3B5LnNlbGVjdGVkO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcmV0dXJuIGNvcHk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUaWxlID0gZnVuY3Rpb24odGlsZTogVGlsZSwgdHlwZTogVGlsZVR5cGUpIHtcclxuICAgIHN3aXRjaCh0eXBlKSB7XHJcbiAgICAgIGNhc2UgVGlsZVR5cGUuR3Jhc3M6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFzc1RpbGUodGlsZS5wb2ludCk7XHJcbiAgICAgIGNhc2UgVGlsZVR5cGUuT2NlYW46XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPY2VhblRpbGUodGlsZS5wb2ludCk7XHJcbiAgICAgIGNhc2UgVGlsZVR5cGUuTm9uZTpcclxuICAgICAgICByZXR1cm4gbmV3IFRpbGUodGlsZS5wb2ludCwgVGlsZVR5cGUuTm9uZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBpbnN0YW5jZSA9IG5ldyBUaWxlU2VydmljZSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiZW51bSBUaWxlVHlwZSB7XHJcbiAgTm9uZSA9ICdOb25lJyxcclxuICBHcmFzcyA9ICdHcmFzcycsXHJcbiAgRm9yZXN0ID0gJ0ZvcmVzdCcsXHJcbiAgT2NlYW4gPSAnT2NlYW4nLFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaWxlVHlwZTtcclxuIiwiXHJcbmltcG9ydCBnZW5lcmF0ZUd1aWQgZnJvbSAnLi4vZ2VuZXJhdGVHdWlkJztcclxuaW1wb3J0IHsgZ3JpZFNlcnZpY2UgfSBmcm9tICcuLi9HcmlkL0dyaWRTZXJ2aWNlJztcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGUnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGVUeXBlJztcclxuaW1wb3J0IFBvcCBmcm9tICcuLi9Qb3BzL1BvcCc7XHJcbmltcG9ydCAqIGFzIFJlc291cmNlcyBmcm9tICcuLi9SZXNvdXJjZXMvUmVzb3VyY2VzJztcclxuXHJcbmNsYXNzIENpdHkge1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBpZDogc3RyaW5nO1xyXG4gIHRpbGU6IFRpbGU7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHBvcHVsYXRpb246IG51bWJlcjtcclxuICBkaXN0YW5jZXM6IGFueVtdO1xyXG4gIHN0YXRpYyBhZGQ6ICh0aWxlOiBUaWxlLCBlbnRpdGllczogYW55KSA9PiBib29sZWFuO1xyXG4gIHJvYWROZXR3b3JrczogYW55O1xyXG4gIHBvcHM6IFBvcFtdO1xyXG4gIHJlc291cmNlczogYW55O1xyXG4gIFxyXG4gIHN1cHBseUFuZERlbWFuZDogYW55ID0ge307XHJcbiAgc3RhdGljIHJlbW92ZTogKGdyaWRUaWxlOiBUaWxlKSA9PiB2b2lkO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0aWxlOiBUaWxlLCBuYW1lOiBzdHJpbmcsIHBvcHVsYXRpb246IG51bWJlcikge1xyXG4gICAgdGhpcy50eXBlID0gJ2NpdHknO1xyXG4gICAgdGhpcy5pZCA9IGdlbmVyYXRlR3VpZCgpO1xyXG4gICAgdGhpcy50aWxlID0gdGlsZTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnBvcHVsYXRpb24gPSBwb3B1bGF0aW9uO1xyXG4gICAgdGhpcy5wb3BzID0gW107XHJcbiAgICB0aGlzLmRpc3RhbmNlcyA9IFtdO1xyXG5cclxuICAgIHRoaXMucmVzb3VyY2VzID0ge307XHJcblxyXG4gICAgbGV0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRpbGUpXHJcbiAgICAgIC5maWx0ZXIoKG5laWdoYm91cjogYW55KSA9PiBuZWlnaGJvdXIuY2l0eSB8fCBuZWlnaGJvdXIucm9hZClcclxuICAgICAgLm1hcCh4ID0+IHgucm9hZCB8fCB4LmNpdHkpO1xyXG5cclxuICAgIHRoaXMucm9hZE5ldHdvcmtzID0gW107XHJcbiAgICBcclxuICAgIG5laWdoYm91cnMuZm9yRWFjaCgobmVpZ2hib3VyOiBhbnkpID0+IHtcclxuICAgICAgaWYgKG5laWdoYm91ci50eXBlID09PSAncm9hZCcpIHtcclxuICAgICAgICB0aGlzLmFkZE5ldHdvcmsobmVpZ2hib3VyLnJvYWROZXR3b3JrKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbmVpZ2hib3Vycy5maWx0ZXIoKHg6IGFueSkgPT4geCAmJiB4LnJvYWQpLmZvckVhY2goKG5laWdoYm91cjogYW55KSA9PiB7XHJcbiAgICAgIG5laWdoYm91ci5yb2FkLnVwZGF0ZVNoYXBlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGVxdWFscyhvdGhlckNpdHk6IGFueSkge1xyXG4gICAgcmV0dXJuIG90aGVyQ2l0eS5pZCA9PT0gdGhpcy5pZDtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcclxuICAgIGNvbnN0IGJhc2VYID0gdGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemU7XHJcbiAgICBjb25zdCBiYXNlWSA9IHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplO1xyXG4gICAgY29udGV4dC5maWxsUmVjdChiYXNlWCwgIGJhc2VZICsgdGlsZVNpemUvMiwgdGlsZVNpemUvNCwgdGlsZVNpemUvMik7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KGJhc2VYICsgdGlsZVNpemUvNCwgIGJhc2VZICsgdGlsZVNpemUvNCwgdGlsZVNpemUvMiwgMyp0aWxlU2l6ZS80KTtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoYmFzZVggKyAzKnRpbGVTaXplLzQsICBiYXNlWSArIHRpbGVTaXplLzIsIHRpbGVTaXplLzQsIHRpbGVTaXplLzIpO1xyXG4gXHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgY29udGV4dC5zdHJva2VSZWN0KCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggLSAxKSAqIHRpbGVTaXplLCAodGhpcy50aWxlLmRyYXdpbmdQb2ludC55IC0gMSkgKiB0aWxlU2l6ZSwgdGlsZVNpemUqMywgdGlsZVNpemUqMyk7XHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyNGRkZGRkYnO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICBjb25zdCBkaXN0YW5jZXMgPSB0aGlzLmRpc3RhbmNlcy5tYXAoeCA9PiBgSWQ6ICR7eC5jaXR5LmlkfSBkaXN0YW5jZTogJHt4LmRpc3RhbmNlfVxcbmApO1xyXG4gICAgY29uc3QgcG9wcyA9IHRoaXMucG9wcy5tYXAoeCA9PiBgJHt4LnR5cGV9LCAke3gubnVtYmVyfWApLmpvaW4oJywgJyk7XHJcbiAgICBjb25zdCByZXNvdXJjZXMgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnJlc291cmNlcyk7XHJcbiAgICByZXR1cm4gYCR7dGhpcy5pZH06ICR7dGhpcy5wb3B1bGF0aW9ufVxcbiAke2Rpc3RhbmNlc30gJHtwb3BzfSAke3Jlc291cmNlc31gO1xyXG4gIH1cclxuXHJcbiAgYWRkTmV0d29yayhuZXR3b3JrOiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5yb2FkTmV0d29ya3Muc29tZSgoeDogYW55KSA9PiB4LmlkID09PSBuZXR3b3JrLmlkKSkge1xyXG4gICAgICB0aGlzLnJvYWROZXR3b3Jrcy5wdXNoKG5ldHdvcmspO1xyXG4gICAgICBuZXR3b3JrLmNpdGllcy5wdXNoKHRoaXMpO1xyXG4gICAgICBuZXR3b3JrLmZpbmREaXN0YW5jZXNGb3JDaXRpZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMucmVzb3VyY2VzKS5mb3JFYWNoKChrZXk6YW55KSA9PiB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucmVzb3VyY2VzW2tleV0pLmZvckVhY2goKGsyOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLnJlc291cmNlc1trZXldW2syXS5kZXNpcmUgPSAwO1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VzW2tleV1bazJdLmFtb3VudCA9IDA7XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBvcHMuZm9yRWFjaChwb3AgPT4ge1xyXG4gICAgICBjb25zdCB0eXBlID0gcG9wLnR5cGU7XHJcbiAgICAgIC8vICBnYXRoZXIgcmVzb3VyY2VzXHJcbiAgICAgIHBvcC51cGRhdGUodGhpcy5yZXNvdXJjZXNbdHlwZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy5zdXBwbHlBbmREZW1hbmQpLmZvckVhY2goKHg6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS5zdXBwbHkgPSAwO1xyXG4gICAgICB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS5kZW1hbmQgPSAwO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gIHdvcmsgb3V0IHN1cHBseSBhbmQgZGVtYW5kXHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLnJlc291cmNlcykuZm9yRWFjaCgocG9wS2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5yZXNvdXJjZXNbcG9wS2V5XSkuZm9yRWFjaCgocmVzb3VyY2VLZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gdGhpcy5yZXNvdXJjZXNbcG9wS2V5XVtyZXNvdXJjZUtleV1cclxuICAgICAgICBpZiAoIXRoaXMuc3VwcGx5QW5kRGVtYW5kW3Jlc291cmNlS2V5XSkge1xyXG4gICAgICAgICAgdGhpcy5zdXBwbHlBbmREZW1hbmRbcmVzb3VyY2VLZXldID0geyBzdXBwbHk6IDAsIGRlbWFuZDogMCwgdmFsdWU6IHJlc291cmNlLnZhbHVlLCBtYXhWYWx1ZTogdGhpcy5yZXNvdXJjZXNbcG9wS2V5XVtyZXNvdXJjZUtleV0ubWF4VmFsdWUgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdXBwbHlBbmREZW1hbmRbcmVzb3VyY2VLZXldLmRlbWFuZCArPSByZXNvdXJjZS5hbW91bnQgPCAwID8gTWF0aC5hYnMocmVzb3VyY2UuYW1vdW50KSA6IDA7XHJcbiAgICAgICAgdGhpcy5zdXBwbHlBbmREZW1hbmRbcmVzb3VyY2VLZXldLnN1cHBseSArPSByZXNvdXJjZS5hbW91bnQgPiAwID8gTWF0aC5hYnMocmVzb3VyY2UuYW1vdW50KSA6IDBcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLnN1cHBseUFuZERlbWFuZCkuZm9yRWFjaCgoeDogYW55KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnN1cHBseUFuZERlbWFuZFt4XS5zdXBwbHkgPiB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS5kZW1hbmQpIHtcclxuICAgICAgICB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS52YWx1ZSAqPSAwLjk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zdXBwbHlBbmREZW1hbmRbeF0uc3VwcGx5IDwgdGhpcy5zdXBwbHlBbmREZW1hbmRbeF0uZGVtYW5kKXtcclxuICAgICAgICB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS52YWx1ZSAqPSAxLjE7XHJcbiAgICAgICAgdGhpcy5zdXBwbHlBbmREZW1hbmRbeF0udmFsdWUgPSB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS52YWx1ZSA+IHRoaXMuc3VwcGx5QW5kRGVtYW5kW3hdLm1heFZhbHVlID8gXHJcbiAgICAgICAgdGhpcy5zdXBwbHlBbmREZW1hbmRbeF0ubWF4VmFsdWUgOiB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnN1cHBseUFuZERlbWFuZCkpO1xyXG5cclxuICAgIGNvbnN0IGJ1eWluZzogYW55ID0ge307IC8vICBrZXlzIG9mIHJlc291cmNlIHR5cGVzO1xyXG4gICAgY29uc3Qgc2VsbGluZzogYW55ID0ge307XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLnJlc291cmNlcykuZm9yRWFjaCgocG9wS2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgcG9wID0gdGhpcy5yZXNvdXJjZXNbcG9wS2V5XTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKHBvcClcclxuICAgICAgICAuZmlsdGVyKChyZXNvdXJjZUtleTogc3RyaW5nKSA9PiBwb3BbcmVzb3VyY2VLZXldLmFtb3VudCA8IDApXHJcbiAgICAgICAgLmZvckVhY2goKHJlc291cmNlS2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGlmICghYnV5aW5nW3Jlc291cmNlS2V5XSkge1xyXG4gICAgICAgICAgICBidXlpbmdbcmVzb3VyY2VLZXldID0gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBidXlpbmdbcmVzb3VyY2VLZXldLnB1c2goeyBwb3BLZXksIGFtb3VudDogTWF0aC5hYnMocG9wW3Jlc291cmNlS2V5XS5hbW91bnQgKSwgbmVlZFR5cGU6IHBvcFtyZXNvdXJjZUtleV0ubmVlZFR5cGUgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKHBvcClcclxuICAgICAgICAuZmlsdGVyKChyZXNvdXJjZUtleTogc3RyaW5nKSA9PiBwb3BbcmVzb3VyY2VLZXldLmFtb3VudCA+IDApXHJcbiAgICAgICAgLmZvckVhY2goKHJlc291cmNlS2V5OiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmICghc2VsbGluZ1tyZXNvdXJjZUtleV0pIHtcclxuICAgICAgICAgICAgc2VsbGluZ1tyZXNvdXJjZUtleV0gPSBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNlbGxpbmdbcmVzb3VyY2VLZXldLnB1c2goeyBwb3BLZXksIGFtb3VudDogTWF0aC5hYnMocG9wW3Jlc291cmNlS2V5XS5hbW91bnQpIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gT2JqZWN0LmtleXModHJhbnNhY3Rpb25zKS5mb3JFYWNoKChyZXNvdXJjZUtleTogYW55KSA9PiB7XHJcbiAgICAvLyAgIC8vICBtYXRjaCB3aXRoIFxyXG4gICAgLy8gfSk7XHJcbiAgICBjb25zb2xlLmxvZyhgQnV5aW5nOiAke0pTT04uc3RyaW5naWZ5KGJ1eWluZyl9YCk7XHJcbiAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgY29uc29sZS5sb2coYFNlbGxpbmc6ICR7SlNPTi5zdHJpbmdpZnkoc2VsbGluZyl9YCk7XHJcbiAgICAvLyAgZWFjaCBwb3Bncm91cCB3b3JrIG91dCBob3cgbXVjaCB2YWx1ZSB0aGV5IGNhbiBzZWxsXHJcbiAgICBcclxuXHJcbiAgICAvLyAgYWRqdXN0IHZhbHVlc1xyXG4gICAgLy8gIGRvIHRyYWRlc1xyXG5cclxuICAgIC8vICB3b3JrIG91dCBkZXNpcmVzXHJcbiAgICAvLyAgd29yayBvdXQgdHJhZGVzXHJcbiAgICAvLyAgcmVkaXN0cmlidXRlIHJlc291cmNlc1xyXG5cclxuICAgIC8vICAgT2JqZWN0LmtleXMocG9wLnJlc291cmNlcykuZm9yRWFjaCgocmVzb3VyY2VLZXk6IHN0cmluZykgPT4ge1xyXG4gICAgLy8gICAgIGlmICh0aGlzLnJlc291cmNlc1tyZXNvdXJjZUtleV0pIHtcclxuICAgIC8vICAgICAgIHRoaXMucmVzb3VyY2VzW3Jlc291cmNlS2V5XS5hbW91bnQgKz0gcG9wLnJlc291cmNlc1tyZXNvdXJjZUtleV0uYW1vdW50O1xyXG4gICAgLy8gICAgICAgcG9wLnJlc291cmNlc1tyZXNvdXJjZUtleV0uYW1vdW50ID0gMDtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgdGhpcy5yZXNvdXJjZXNbcmVzb3VyY2VLZXldID0geyBhbW91bnQ6IHBvcC5yZXNvdXJjZXNbcmVzb3VyY2VLZXldLmFtb3VudCB9O1xyXG4gICAgLy8gICAgICAgcG9wLnJlc291cmNlc1tyZXNvdXJjZUtleV0uYW1vdW50ID0gMDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuQ2l0eS5yZW1vdmUgPSBmdW5jdGlvbihncmlkVGlsZTogVGlsZSkge1xyXG4gIFxyXG4gIGdyaWRUaWxlLmNpdHkgPSBudWxsO1xyXG4gIC8vICBSZW1vdmUgZnJvbSBuZWlnaGJvdXJpbmcgcm9hZG5ldHdvcmtzIGFuZCByZWNhbGN1bGF0ZSBuZXR3b3Jrc1xyXG59XHJcblxyXG5DaXR5LmFkZCA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnkpIHtcclxuICBpZiAoIXRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUuY2l0eSB8fCB0aWxlLnJvYWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3QgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmdldFJlZ2lvbih0aWxlLnBvaW50LCAyKTtcclxuXHJcbiAgaWYgKG5laWdoYm91cnMuZmlsdGVyKCh4OiBhbnkpID0+IHguY2l0eSkubGVuZ3RoID4gMCkgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IGNpdHkgPSBuZXcgQ2l0eSh0aWxlLCAnTmV3IENpdHknLCAxKTtcclxuICB0aWxlLmNpdHkgPSBjaXR5O1xyXG4gIGVudGl0aWVzLmNpdGllcy5wdXNoKGNpdHkpO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5IiwiXHJcbmNsYXNzIFBvaW50IHtcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG4gIHN0YXRpYyBjb3B5OiAocG9pbnQ6IFBvaW50KSA9PiBQb2ludDtcclxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICBlcXVhbHMob3RoZXJQb2ludDogUG9pbnQpIHtcclxuICAgIHJldHVybiB0aGlzLnggPT09IG90aGVyUG9pbnQueCAmJiB0aGlzLnkgPT09IG90aGVyUG9pbnQueTtcclxuICB9XHJcbn1cclxuXHJcblBvaW50LmNvcHkgPSBmdW5jdGlvbihwb2ludDogUG9pbnQpIHtcclxuICByZXR1cm4gbmV3IFBvaW50KHBvaW50LngsIHBvaW50LnkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQb2ludDsiLCJcclxuaW1wb3J0IFJvYWROZXR3b3JrIGZyb20gJy4vUm9hZE5ldHdvcmsnO1xyXG5pbXBvcnQgQ2l0eSBmcm9tICcuL0NpdHknO1xyXG5pbXBvcnQgZ2VuZXJhdGVHdWlkIGZyb20gJy4uL2dlbmVyYXRlR3VpZCc7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vR3JpZC9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlVHlwZSc7XHJcblxyXG5jb25zdCBTaGFwZXMgPSB7XHJcbiAgaXNvbGF0ZWQ6ICdpc29sYXRlZCcsXHJcbiAgdG9wOiAndG9wJyxcclxuICBsZWZ0OiAnbGVmdCcsXHJcbiAgYm90dG9tOiAnYm90dG9tJyxcclxuICByaWdodDogJ3JpZ2h0JyxcclxuICB2ZXJ0aWNhbDogJ3ZlcnRpY2FsJyxcclxuICBob3Jpem9udGFsOiAnaG9yaXpvbnRhbCcsXHJcbiAgdG9wUmlnaHQ6ICd0b3BSaWdodCcsXHJcbiAgdG9wTGVmdDogJ3RvcExlZnQnLFxyXG4gIGJvdHRvbVJpZ2h0OiAnYm90dG9tUmlnaHQnLFxyXG4gIGJvdHRvbUxlZnQ6ICdib3R0b21MZWZ0JyxcclxuICBob3Jpem9udGFsQm90dG9tOiAnaG9yaXpvbnRhbEJvdHRvbScsXHJcbiAgaG9yaXpvbnRhbFRvcDogJ2hvcml6b250YWxUb3AnLFxyXG4gIHZlcnRpY2FsTGVmdDogJ3ZlcnRpY2FsTGVmdCcsXHJcbiAgdmVydGljYWxSaWdodDogJ3ZlcnRpY2FsUmlnaHQnLFxyXG4gIGNyb3NzOiAnY3Jvc3MnXHJcbn07XHJcblxyXG5cclxuY2xhc3MgUm9hZCB7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgdGlsZTogVGlsZTtcclxuICBzaGFwZTogYW55O1xyXG4gIHN0YXRpYyBhZGQ6ICh0aWxlOiBUaWxlKSA9PiBib29sZWFuO1xyXG4gIHN0YXRpYyBmaW5kU2hhcGU6IGFueTtcclxuICByb2FkTmV0d29yazogUm9hZE5ldHdvcms7XHJcbiAgc3RhdGljIHJlbW92ZTogKGdyaWRUaWxlOiBUaWxlLCByb2FkOiBSb2FkKSA9PiB2b2lkO1xyXG4gIHN0YXRpYyBmaW5kQ29ubmVjdGl2aXR5OiAocm9hZHM6IGFueSkgPT4gdm9pZDtcclxuICBjb25zdHJ1Y3Rvcih0aWxlOiBUaWxlKSB7XHJcbiAgICB0aGlzLnR5cGUgPSAncm9hZCc7XHJcbiAgICB0aGlzLmlkID0gZ2VuZXJhdGVHdWlkKCk7XHJcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xyXG5cclxuICAgIGxldCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aWxlKTtcclxuXHJcbiAgICB0aGlzLnNoYXBlID0gUm9hZC5maW5kU2hhcGUobmVpZ2hib3Vycyk7XHJcbiAgICBuZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIobmVpZ2hib3VyID0+IG5laWdoYm91ci5jaXR5IHx8IG5laWdoYm91ci5yb2FkKVxyXG4gICAgICAubWFwKHggPT4geC5yb2FkIHx8IHguY2l0eSk7XHJcblxyXG4gICAgY29uc3QgbmVpZ2hib3VyaW5nUm9hZHMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHggaW5zdGFuY2VvZiBSb2FkKVxyXG4gICAgY29uc3QgbmVpZ2hib3VyaW5nUm9hZE5ldHdvcmtzID0gbmVpZ2hib3VyaW5nUm9hZHMubWFwKHggPT4geC5yb2FkTmV0d29yayk7XHJcblxyXG4gICAgaWYgKG5laWdoYm91cmluZ1JvYWROZXR3b3Jrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5tZXJnZU5ldHdvcmtzKG5laWdoYm91cmluZ1JvYWROZXR3b3Jrcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJvYWROZXR3b3JrID0gbmV3IFJvYWROZXR3b3JrKCk7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmsuYWRkUm9hZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJpbmdDaXRpZXMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHggaW5zdGFuY2VvZiBDaXR5KTtcclxuICAgIG5laWdoYm91cmluZ0NpdGllcy5mb3JFYWNoKGNpdHkgPT4ge1xyXG4gICAgICBjaXR5LmFkZE5ldHdvcmsodGhpcy5yb2FkTmV0d29yayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBuZWlnaGJvdXJpbmdSb2Fkcy5mb3JFYWNoKHJvYWQgPT4ge1xyXG4gICAgICByb2FkLm5laWdoYm91cnMucHVzaCh0aGlzKTtcclxuICAgICAgcm9hZC5zaGFwZSA9IFJvYWQuZmluZFNoYXBlKHJvYWQubmVpZ2hib3Vycyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGVxdWFscyhvdGhlclJvYWQ6IFJvYWQpIHtcclxuICAgIHJldHVybiB0aGlzLnRpbGUuZXF1YWxzKG90aGVyUm9hZC50aWxlKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGAke3RoaXMudHlwZX06ICR7dGhpcy5zaGFwZX1gO1xyXG4gIH1cclxuICBcclxuICBtZXJnZU5ldHdvcmtzKG5ldHdvcmtzOiBhbnlbXSkge1xyXG4gICAgY29uc3QgZmlyc3QgPSBuZXR3b3Jrcy5wb3AoKTtcclxuICAgIGlmICghdGhpcy5yb2FkTmV0d29yaykge1xyXG4gICAgICBmaXJzdC5hZGRSb2FkKHRoaXMpO1xyXG4gICAgICB0aGlzLnJvYWROZXR3b3JrID0gZmlyc3Q7XHJcbiAgICB9XHJcbiAgICBmaXJzdC5tZXJnZShuZXR3b3Jrcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTaGFwZSgpIHtcclxuICAgIGNvbnN0IG4gPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRoaXMudGlsZSk7XHJcbiAgICB0aGlzLnNoYXBlID0gUm9hZC5maW5kU2hhcGUobik7XHJcbiAgfVxyXG5cclxuICBkcmF3SG9yaXpvbnRhbChjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aWxlU2l6ZSwgdGlsZVNpemUvNCk7XHJcbiAgfVxyXG5cclxuICBkcmF3VmVydGljYWwoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSwgdGlsZVNpemUvNCwgdGlsZVNpemUpO1xyXG4gIH1cclxuXHJcbiAgZHJhd1RvcChjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHsgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSwgdGlsZVNpemUvNCwgNSp0aWxlU2l6ZS84KTtcclxuICB9XHJcbiAgXHJcbiAgZHJhd0JvdHRvbShjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHsgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgdGlsZVNpemUvNCwgdGlsZVNpemUpO1xyXG4gIH1cclxuICBcclxuICBkcmF3TGVmdChjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHsgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplLCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgNSp0aWxlU2l6ZS84LCB0aWxlU2l6ZS80KTtcclxuICB9XHJcbiAgXHJcbiAgZHJhd1JpZ2h0KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikgeyBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyB0aWxlU2l6ZS8yLCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgMyp0aWxlU2l6ZS80LCB0aWxlU2l6ZS80KTtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjYzQ4YjIzJztcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuc2hhcGUpIHtcclxuICAgICAgY2FzZSBTaGFwZXMuaXNvbGF0ZWQ6XHJcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSArIHRpbGVTaXplLzIsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgdGlsZVNpemUvMiwgdGlsZVNpemUvNCwgdGlsZVNpemUvNCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgXHJcbiAgICAgIGNhc2UgU2hhcGVzLnZlcnRpY2FsOlxyXG4gICAgICAgIHRoaXMuZHJhd1ZlcnRpY2FsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgXHJcbiAgICAgIGNhc2UgU2hhcGVzLmhvcml6b250YWw6XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgXHJcbiAgICAgIGNhc2UgU2hhcGVzLmxlZnQ6XHJcbiAgICAgICAgdGhpcy5kcmF3TGVmdChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5yaWdodDpcclxuICAgICAgICB0aGlzLmRyYXdSaWdodChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy50b3A6XHJcbiAgICAgICAgdGhpcy5kcmF3VG9wKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmJvdHRvbTpcclxuICAgICAgICB0aGlzLmRyYXdCb3R0b20oY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMuY3Jvc3M6XHJcbiAgICAgICAgdGhpcy5kcmF3VmVydGljYWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0hvcml6b250YWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMudG9wTGVmdDpcclxuICAgICAgICB0aGlzLmRyYXdUb3AoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0xlZnQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMudG9wUmlnaHQ6XHJcbiAgICAgICAgdGhpcy5kcmF3VG9wKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdSaWdodChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5ib3R0b21MZWZ0OlxyXG4gICAgICAgIHRoaXMuZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3TGVmdChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5ib3R0b21SaWdodDpcclxuICAgICAgICB0aGlzLmRyYXdCb3R0b20oY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnZlcnRpY2FsTGVmdDpcclxuICAgICAgICB0aGlzLmRyYXdWZXJ0aWNhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3TGVmdChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy52ZXJ0aWNhbFJpZ2h0OlxyXG4gICAgICAgIHRoaXMuZHJhd1ZlcnRpY2FsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdSaWdodChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5ob3Jpem9udGFsVG9wOlxyXG4gICAgICAgIHRoaXMuZHJhd0hvcml6b250YWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1RvcChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5ob3Jpem9udGFsQm90dG9tOlxyXG4gICAgICAgIHRoaXMuZHJhd0hvcml6b250YWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5Sb2FkLnJlbW92ZSA9IGZ1bmN0aW9uIChncmlkVGlsZTogVGlsZSwgcm9hZDogUm9hZCkge1xyXG4gIGdyaWRUaWxlLnJvYWQgPSBudWxsO1xyXG5cclxuICAvLyAgQ2FzZXM6XHJcbiAgLy8gICAgc2luZ2xlIG5laWdoYm91cmluZyByb2FkXHJcbiAgLy8gICAgICByZW1vdmUgcm9hZCBmcm9tIG5laWdoYm91ciBhbmQgZnJvbSBuZXR3b3JrXHJcbiAgLy8gICAgbXVsdGlwbGUgbmVpZ2hib3VyaW5nIHJvYWRzXHJcbiAgLy8gICAgICByZW1vdmUgcm9hZCBmcm9tIG5laWdoYm91cnMgXHJcbiAgLy8gICAgICBmb3IgZWFjaCBuZWlnaGJvdXJpbmcgbmV0d29yayByZXByb2Nlc3MgY29ubmVjdGl2aXR5XHJcbiAgLy8gICAgbmVpZ2hib3VyaW5nIGNpdHlcclxuICAvLyAgICAgIFJlbW92ZSByb2FkIGZyb20gbmVpZ2hib3Vyc1xyXG4gIC8vICAgICAgcHJvY2VzcyBjb25uZWN0aXZpdHkgdG8gY2hlY2sgaWYgdGhlIG5ldHdvcmsgc2hvdWxkIGJlIHJlbW92ZWRcclxuICAvLyByb2FkLm5laWdoYm91cnMuZm9yRWFjaChuZWlnaGJvdXIgPT4ge1xyXG4gIC8vICAgbmVpZ2hib3VyLm5laWdoYm91cnMgPSBuZWlnaGJvdXIubmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LmlkICE9PSBuZWlnaGJvdXIpO1xyXG4gIC8vIH0pXHJcbn1cclxuXHJcblJvYWQuZmluZENvbm5lY3Rpdml0eSA9IGZ1bmN0aW9uKHJvYWRzKSB7XHJcbiAgLy8gSWRlYSBpcyB0byBwZXJmb3JtIGEgc2VwZXJhdGUgYmZzIGluIHN0ZXAgb24gZWFjaCBwZWFjZSBvZiByb2FkIGFuZCBjaGVjayBjb25uZWN0aXZpdHkgYXQgZWFjaCBzdGVwXHJcbiAgLy8gSWYgdHdvIG5ldHdvcmtzIGNvbnRhaW4gdGhlIHNhbWUgbm9kZSB0aGVuIHRoZXkgYXJlIGNvbm5lY3RlZC5cclxuXHJcbiAgLy8gY29uc3Qgc2VhcmNoZXMgPSByb2Fkcy5tYXAoeCA9PiB7XHJcbiAgLy8gICBjb25zdCB2aXNpdGVkID0ge307XHJcbiAgLy8gICB2aXNpdGVkW3guaWRdID0gdHJ1ZTtcclxuICAvLyAgIHJldHVybiB7IGlzRmluaXNoZWQ6IGZhbHNlLCBlZGdlU2V0OiB4Lm5laWdoYm91cnMsIHZpc2l0ZWQsIGNvbm5lY3RlZDogW10gfTtcclxuICAvLyB9KTtcclxuXHJcbiAgLy8gd2hpbGUgKHNlYXJjaGVzLmZpbmQoeCA9PiB4LmlzRmluaXNoZWQpLmxlbmd0aCA+IDApIHtcclxuICAvLyAgIGNvbnNvbGUubG9nKCdJdGVyYXRpb24gMScpO1xyXG4gIC8vICAgc2VhcmNoZXMuZm9yRWFjaCh4ID0+IHguZmluaXNoZWQgPSB0cnVlKTtcclxuICAvLyB9XHJcbiAgLy8gIENvbnRpbnVlIHVudGlsIGFsbCBzZWFyY2hlcyBhcmUgY29tcGxldGUuXHJcbiAgLy8gIFRlc3QgZWFjaCBpdGVyYXRpb24gYW5kIHN0b3Agc2VhcmNoIGlmIG5lY2Vzc2FyeS5cclxufVxyXG5cclxuLy8gIFNhdmUgc3RhdGUgXHJcbi8vIFJvYWQuaW5jcmVtZW50YWxCZnMgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vIH1cclxuXHJcblxyXG5Sb2FkLmZpbmRTaGFwZSA9IGZ1bmN0aW9uIChuZWlnaGJvdXJzOiBUaWxlW10pIHtcclxuICBjb25zdCB0b3BOZWlnaGJvdXIgPSAobmVpZ2hib3Vyc1swXSAmJiAobmVpZ2hib3Vyc1swXS5yb2FkIHx8IG5laWdoYm91cnNbMF0uY2l0eSkpIHx8IG51bGw7XHJcbiAgY29uc3QgbGVmdE5laWdoYm91ciA9IChuZWlnaGJvdXJzWzFdICYmIChuZWlnaGJvdXJzWzFdLnJvYWQgfHwgbmVpZ2hib3Vyc1sxXS5jaXR5KSkgfHwgbnVsbDtcclxuICBjb25zdCByaWdodE5laWdoYm91ciA9IChuZWlnaGJvdXJzWzJdICYmIChuZWlnaGJvdXJzWzJdLnJvYWQgfHwgbmVpZ2hib3Vyc1syXS5jaXR5KSkgfHwgbnVsbDtcclxuICBjb25zdCBib3R0b21OZWlnaGJvdXIgPSAobmVpZ2hib3Vyc1szXSAmJiAobmVpZ2hib3Vyc1szXS5yb2FkIHx8IG5laWdoYm91cnNbM10uY2l0eSkpIHx8IG51bGw7XHJcblxyXG4gIGxldCBzaGFwZSA9IFNoYXBlcy5pc29sYXRlZDtcclxuICBcclxuICBpZiAodG9wTmVpZ2hib3VyKSB7XHJcbiAgICBpZiAobGVmdE5laWdoYm91cikge1xyXG4gICAgICBpZiAocmlnaHROZWlnaGJvdXIgJiYgYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMuY3Jvc3M7XHJcbiAgICAgICAgLy8gW3RvcE5laWdoYm91ciwgbGVmdE5laWdoYm91ciwgcmlnaHROZWlnaGJvdXIsIGJvdHRvbU5laWdoYm91cl0uZm9yRWFjaCh1cGRhdGVSb2FkKTtcclxuICAgICAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLmhvcml6b250YWxUb3A7XHJcbiAgICAgIH0gZWxzZSBpZiAoYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudmVydGljYWxMZWZ0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnRvcExlZnQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgICAgaWYgKGJvdHRvbU5laWdoYm91cikge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnZlcnRpY2FsUmlnaHQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudG9wUmlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChib3R0b21OZWlnaGJvdXIpIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy52ZXJ0aWNhbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy50b3A7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGJvdHRvbU5laWdoYm91cikge1xyXG4gIGlmIChsZWZ0TmVpZ2hib3VyKSB7XHJcbiAgICBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgICAgc2hhcGUgPSBTaGFwZXMuaG9yaXpvbnRhbEJvdHRvbTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoYXBlID0gU2hhcGVzLmJvdHRvbUxlZnQ7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgc2hhcGUgPSBTaGFwZXMuYm90dG9tUmlnaHQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNoYXBlID0gU2hhcGVzLmJvdHRvbTtcclxuICB9XHJcbiAgfSBlbHNlIGlmIChsZWZ0TmVpZ2hib3VyKSB7XHJcbiAgICBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgICAgc2hhcGUgPSBTaGFwZXMuaG9yaXpvbnRhbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoYXBlID0gU2hhcGVzLmxlZnQ7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgc2hhcGUgPSBTaGFwZXMucmlnaHQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2hhcGU7XHJcbn1cclxuXHJcblJvYWQuYWRkID0gZnVuY3Rpb24gKHRpbGU6IFRpbGUpIHtcclxuICBpZiAoIXRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUuY2l0eSB8fCB0aWxlLnJvYWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgdGlsZS5yb2FkID0gbmV3IFJvYWQodGlsZSk7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvYWQ7IiwiaW1wb3J0IGdlbmVyYXRlR3VpZCBmcm9tICcuLi9nZW5lcmF0ZUd1aWQnO1xyXG5pbXBvcnQgeyBncmlkU2VydmljZSB9IGZyb20gJy4uL0dyaWQvR3JpZFNlcnZpY2UnO1xyXG5pbXBvcnQgUm9hZCBmcm9tICcuL1JvYWQnO1xyXG5pbXBvcnQgQ2l0eSBmcm9tICcuL0NpdHknO1xyXG5cclxuY2xhc3MgUm9hZE5ldHdvcmsge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY2l0aWVzOiBhbnlbXTtcclxuICByb2FkczogYW55W107XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmlkID0gZ2VuZXJhdGVHdWlkKCk7XHJcbiAgICB0aGlzLmNpdGllcyA9IFtdO1xyXG4gICAgdGhpcy5yb2FkcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgYWRkUm9hZChyb2FkOiBSb2FkKSB7XHJcbiAgICB0aGlzLnJvYWRzLnB1c2gocm9hZCk7XHJcbiAgICByb2FkLnJvYWROZXR3b3JrID0gdGhpcztcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBJZDogJHt0aGlzLmlkfSwgQ2l0aWVzOiAke3RoaXMuY2l0aWVzLmxlbmd0aH0sIFJvYWRzOiAke3RoaXMucm9hZHMubGVuZ3RofWA7XHJcbiAgfVxyXG5cclxuICBhZGRDaXR5KGNpdHk6IENpdHkpIHtcclxuICAgIHRoaXMuY2l0aWVzLnB1c2goY2l0eSk7XHJcbiAgICBjaXR5LnJvYWROZXR3b3JrcyA9IHRoaXM7XHJcbiAgfVxyXG5cclxuICBtZXJnZShuZXR3b3JrczogUm9hZE5ldHdvcmtbXSkge1xyXG4gICAgbmV0d29ya3MuZm9yRWFjaChuZXR3b3JrID0+IHtcclxuICAgICAgbmV0d29yay5jaXRpZXMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuY2l0aWVzLmZpbmQoKGNpdHk6IENpdHkpID0+IGNpdHkuZXF1YWxzKHgpKSkge1xyXG4gICAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh4KTtcclxuICAgICAgICAgIHgucm9hZE5ldHdvcmsgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgXHJcbiAgICAgIC8vICBTaG91bGQgb3B0aW1pc2UgLSBzdG9yZSByb2FkcyBhcyBkaWN0aW9uYXJ5XHJcbiAgICAgIG5ldHdvcmsucm9hZHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMucm9hZHMuZmluZCgocm9hZDogUm9hZCkgPT4gcm9hZC5lcXVhbHMoeCkpKSB7XHJcbiAgICAgICAgICB0aGlzLnJvYWRzLnB1c2goeCk7XHJcbiAgICAgICAgICB4LnJvYWROZXR3b3JrID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgdGhpcy5maW5kRGlzdGFuY2VzRm9yQ2l0aWVzKCk7XHJcbiAgfVxyXG5cclxuICBmaW5kRGlzdGFuY2VzRm9yQ2l0aWVzKCkge1xyXG4gICAgLy8gIEZvciBlYWNoIGNpdHkgdG8gYSBiZnMgYW5kIGZpbmQgbmVpZ2hib3Vycy5cclxuICAgIHRoaXMuY2l0aWVzLmZvckVhY2goY2l0eSA9PiB7XHJcbiAgICAgIHRoaXMuZmluZERpc3RhbmNlcyhjaXR5KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGZpbmREaXN0YW5jZXMoY2l0eTogQ2l0eSkge1xyXG4gICAgY29uc3QgZGlzdGFuY2VzID0gW107XHJcbiAgICBsZXQgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnMoY2l0eS50aWxlKS5tYXAobm9kZSA9PiAoe25vZGUsIGRpc3RhbmNlOiAwIH0pKTtcclxuICAgIGNvbnN0IHZpc2l0ZWQ6IGFueSA9IHt9O1xyXG4gICAgdmlzaXRlZFtjaXR5LmlkXSA9IHRydWU7XHJcblxyXG4gICAgd2hpbGUobmVpZ2hib3Vycy5sZW5ndGggIT09IDApIHtcclxuICAgICAgLy8gIHZpc2l0IGVhY2ggbmVpZ2hib3VyXHJcbiAgICAgIGNvbnN0IG5laWdoYm91ciA9IG5laWdoYm91cnMucG9wKCk7XHJcbiAgICAgIGlmIChuZWlnaGJvdXIubm9kZS50eXBlID09PSAnY2l0eScpIHtcclxuICAgICAgICBkaXN0YW5jZXMucHVzaCh7Y2l0eSwgZGlzdGFuY2U6IG5laWdoYm91ci5kaXN0YW5jZSB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2aXNpdGVkW25laWdoYm91ci5ub2RlLmlkXSA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgbmVpZ2hib3Vyc05laWdoYm91cnMgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKG5laWdoYm91ci5ub2RlKVxyXG4gICAgICAgICAgICAuZmlsdGVyKHggPT4gIXZpc2l0ZWRbeC5pZF0pXHJcbiAgICAgICAgICAubWFwKHggPT4gKHsgbm9kZTogeCwgZGlzdGFuY2U6IG5laWdoYm91ci5kaXN0YW5jZSArIDEgfSkpO1xyXG4gICAgICAgIG5laWdoYm91cnMgPSBuZWlnaGJvdXJzLmNvbmNhdChuZWlnaGJvdXJzTmVpZ2hib3Vycyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNpdHkuZGlzdGFuY2VzID0gZGlzdGFuY2VzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm9hZE5ldHdvcms7XHJcbiIsImltcG9ydCBUaWxlIGZyb20gXCIuLi9NYXAvVGlsZXMvVGlsZVwiO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSBcIi4uL01hcC9UaWxlcy9UaWxlVHlwZVwiO1xyXG5cclxuY2xhc3MgVW5pdCB7XHJcbiAgdGlsZTogVGlsZTtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgc3RhdGljIGFkZDogKHNlbGVjdGVkVGlsZTogVGlsZSkgPT4gYm9vbGVhbjtcclxuICBjb25zdHJ1Y3Rvcih0aWxlOiBhbnksIG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy50aWxlID0gdGlsZTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnI0ZGMDAwMCc7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgdGlsZVNpemUvNCwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyB0aWxlU2l6ZS80LCB0aWxlU2l6ZS8yLCAzKnRpbGVTaXplLzQpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYFVuaXQ6ICR7dGhpcy5uYW1lfWA7XHJcbiAgfVxyXG59XHJcblxyXG5Vbml0LmFkZCA9IGZ1bmN0aW9uKHNlbGVjdGVkVGlsZTogVGlsZSkgeyAgXHJcbiAgaWYgKCFzZWxlY3RlZFRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHNlbGVjdGVkVGlsZS5jaXR5IHx8IHNlbGVjdGVkVGlsZS5yb2FkIHx8IHNlbGVjdGVkVGlsZS51bml0KSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChzZWxlY3RlZFRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHJldHVybiBmYWxzZTtcclxuICBzZWxlY3RlZFRpbGUudW5pdCA9IG5ldyBVbml0KHNlbGVjdGVkVGlsZSwgJ05ldyBVbml0Jyk7XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFVuaXQiLCJpbXBvcnQgUG9wIGZyb20gJy4vUG9wJztcclxuaW1wb3J0ICogYXMgUmVzb3VyY2VzIGZyb20gJy4uL1Jlc291cmNlcy9SZXNvdXJjZXMnO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZSc7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZVR5cGUnO1xyXG5pbXBvcnQgeyBIb3VzZSB9IGZyb20gJy4uL0ltcHJvdmVtZW50L0ltcHJvdmVtZW50cyc7XHJcblxyXG5jb25zdCByZXNvdXJjZXM6IGFueSA9IHt9O1xyXG5yZXNvdXJjZXNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7IGFtb3VudDogMSwgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kIH07XHJcbnJlc291cmNlc1tSZXNvdXJjZXMuV29vZC5uYW1lXSA9IHsgYW1vdW50OiAxLCByZXNvdXJjZTogUmVzb3VyY2VzLldvb2QsIH07XHJcbnJlc291cmNlc1tSZXNvdXJjZXMuRmlicmUubmFtZV0gPSB7IGFtb3VudDogMSwgcmVzb3VyY2U6IFJlc291cmNlcy5GaWJyZSB9O1xyXG5yZXNvdXJjZXNbUmVzb3VyY2VzLkJhc2ljVG9vbHMubmFtZV0gPSB7IGFtb3VudDogMiwgcmVzb3VyY2U6IFJlc291cmNlcy5CYXNpY1Rvb2xzIH07XHJcblxyXG5jb25zdCBuZWVkczogIGFueSA9IHt9O1xyXG5uZWVkc1tSZXNvdXJjZXMuRm9vZC5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kLCBhbW91bnQ6IDEsIHR5cGU6ICdjcml0aWNhbCcgfTtcclxubmVlZHNbUmVzb3VyY2VzLldvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAwLjEsIHR5cGU6ICd3b3JraW5nJyB9O1xyXG5uZWVkc1tSZXNvdXJjZXMuRmlicmUubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuRmlicmUsIGFtb3VudDogMC4xLCB0eXBlOiAnd29ya2luZycgfTtcclxubmVlZHNbUmVzb3VyY2VzLkJhc2ljVG9vbHMubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuQmFzaWNUb29scywgYW1vdW50OiAwLjEsIHR5cGU6ICd3YW50JyAgfTtcclxuXHJcbmNvbnN0IGRlc2lyZXM6IGFueSA9IHt9O1xyXG5kZXNpcmVzW1Jlc291cmNlcy5Gb29kLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkZvb2QsIGFtb3VudDogNSB9O1xyXG5kZXNpcmVzW1Jlc291cmNlcy5Xb29kLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLldvb2QsIGFtb3VudDogMS41IH07XHJcbmRlc2lyZXNbUmVzb3VyY2VzLkJhc2ljVG9vbHMubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuQmFzaWNUb29scywgYW1vdW50OiAxLjUgfTtcclxuZGVzaXJlc1tSZXNvdXJjZXMuRmlicmUubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuRmlicmUsIGFtb3VudDogMS41IH07XHJcblxyXG4vLyAgbXVsdGlwbHlcclxuXHJcbmNvbnN0IHByb2R1Y2VzOiBhbnkgPSB7fTtcclxuXHJcbnByb2R1Y2VzW1Jlc291cmNlcy5CYXNpY1Rvb2xzLm5hbWVdID0geyBcclxuICB0eXBlOiAnY3JhZnQnLFxyXG4gIHJlc291cmNlOiBSZXNvdXJjZXMuQmFzaWNUb29scyxcclxuICBlZmZpY2llbmN5OiAxLFxyXG4gIHJlcXVpcmVzOlxyXG4gICAge1xyXG4gICAgICBbUmVzb3VyY2VzLldvb2QubmFtZV06IDEsXHJcbiAgICAgIFtSZXNvdXJjZXMuRmlicmUubmFtZV06IDEsXHJcbiAgICB9LFxyXG4gIG91dHB1dDogMSxcclxufTtcclxuXHJcbmNvbnN0IGdyb3dSZXF1aXJlbWVudDogYW55ID0geyB9O1xyXG5ncm93UmVxdWlyZW1lbnRbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuRm9vZCwgYW1vdW50OiA1IH07XHJcblxyXG5jb25zdCBpbXByb3ZlbWVudHMgPSBbXHJcbiAgeyBpbXByb3ZlbWVudDogSG91c2UsIHdlaWdodDogMSB9LFxyXG5dO1xyXG5cclxuY2xhc3MgQ3JhZnRzcGVyc29uIGV4dGVuZHMgUG9wIHtcclxuICBzdGF0aWMgYWRkOiAodGlsZTogVGlsZSwgZW50aXRpZXM6IGFueSkgPT4gYm9vbGVhbjtcclxuICBjb25zdHJ1Y3Rvcih0aWxlOiBUaWxlLCBudW1iZXI6IG51bWJlcikge1xyXG4gICAgc3VwZXIoJ0NyYWZ0c3BlcnNvbicsIHRpbGUsIG51bWJlciwgcmVzb3VyY2VzLCBuZWVkcywgcHJvZHVjZXMsIGltcHJvdmVtZW50cywgZGVzaXJlcyk7XHJcbiAgICB0aGlzLmdyb3dSZXF1aXJlbWVudCA9IGdyb3dSZXF1aXJlbWVudDtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyNGRjAwMDAnO1xyXG4gICAgY29udGV4dC5zdHJva2VUZXh0KCdDJywgdGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgdGlsZVNpemUsIHRpbGVTaXplKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBDcmFmdHNwZXJzb246IEZvb2Q6ICR7dGhpcy5yZXNvdXJjZXNbJ2Zvb2QnXS5hbW91bnQgfSwgV29vZDogJHt0aGlzLnJlc291cmNlc1snd29vZCddLmFtb3VudH0gVG9vbHMgJHt0aGlzLnJlc291cmNlc1snYmFzaWNUb29scyddLmFtb3VudCB9IE51bWJlcjogJHt0aGlzLm51bWJlcn1gO1xyXG4gIH1cclxufVxyXG5cclxuQ3JhZnRzcGVyc29uLmFkZCA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnkpOiBib29sZWFuIHtcclxuICBjb25zdCBwb3AgPSBuZXcgQ3JhZnRzcGVyc29uKHRpbGUsIDEwKTtcclxuXHJcbiAgcmV0dXJuIFBvcC5hZGQodGlsZSwgZW50aXRpZXMsIHBvcCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmFmdHNwZXJzb247XHJcbiIsImltcG9ydCBQb3AgZnJvbSAnLi9Qb3AnO1xyXG5pbXBvcnQgKiBhcyBSZXNvdXJjZXMgZnJvbSAnLi4vUmVzb3VyY2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlVHlwZSc7XHJcbmltcG9ydCB7IEhvdXNlIH0gZnJvbSAnLi4vSW1wcm92ZW1lbnQvSW1wcm92ZW1lbnRzJztcclxuXHJcbmNvbnN0IHJlc291cmNlczogYW55ID0ge307XHJcbnJlc291cmNlc1tSZXNvdXJjZXMuRm9vZC5uYW1lXSA9IHsgYW1vdW50OiAxLCByZXNvdXJjZTogUmVzb3VyY2VzLkZvb2QgfTtcclxucmVzb3VyY2VzW1Jlc291cmNlcy5Xb29kLm5hbWVdID0geyBhbW91bnQ6IDAsIHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCB9O1xyXG5yZXNvdXJjZXNbUmVzb3VyY2VzLkJhc2ljVG9vbHMubmFtZV0gPSB7IGFtb3VudDogMCwgcmVzb3VyY2U6IFJlc291cmNlcy5CYXNpY1Rvb2xzIH07XHJcbnJlc291cmNlc1tSZXNvdXJjZXMuRmlicmUubmFtZV0gPSB7IGFtb3VudDogMCwgcmVzb3VyY2U6IFJlc291cmNlcy5GaWJyZSB9O1xyXG5cclxuY29uc3QgbmVlZHM6ICBhbnkgPSB7fTtcclxubmVlZHNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuRm9vZCwgYW1vdW50OiAxLCB0eXBlOiAnY3JpdGljYWwnIH07XHJcbm5lZWRzW1Jlc291cmNlcy5Xb29kLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLldvb2QsIGFtb3VudDogMCwgdHlwZTogJ3dhbnQnIH07XHJcbm5lZWRzW1Jlc291cmNlcy5CYXNpY1Rvb2xzLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkJhc2ljVG9vbHMsIGFtb3VudDogMC4xLCB0eXBlOiAnd2FudCcgfTtcclxubmVlZHNbUmVzb3VyY2VzLkZpYnJlLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkZpYnJlLCBhbW91bnQ6IDAsIHR5cGU6ICdub25lJyB9O1xyXG5cclxuY29uc3QgZGVzaXJlczogYW55ID0ge307XHJcbmRlc2lyZXNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuRm9vZCwgYW1vdW50OiAyLjUsIH07XHJcbmRlc2lyZXNbUmVzb3VyY2VzLldvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAwIH07XHJcbmRlc2lyZXNbUmVzb3VyY2VzLkJhc2ljVG9vbHMubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuQmFzaWNUb29scywgYW1vdW50OiAxIH07XHJcbmRlc2lyZXNbUmVzb3VyY2VzLkZpYnJlLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkZpYnJlLCBhbW91bnQ6IDAgfTtcclxuXHJcbmNvbnN0IHByb2R1Y2VzOiBhbnkgPSBbXTtcclxucHJvZHVjZXNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7XHJcbiAgdHlwZTogJ2dhdGhlcicsXHJcbiAgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kLFxyXG4gIGVmZmljaWVuY3k6IDAuOFxyXG59O1xyXG5wcm9kdWNlc1tSZXNvdXJjZXMuV29vZC5uYW1lXSA9IHtcclxuICB0eXBlOiAnZ2F0aGVyJyxcclxuICByZXNvdXJjZTogUmVzb3VyY2VzLldvb2QsXHJcbiAgZWZmaWNpZW5jeTogMC4yNVxyXG59O1xyXG5cclxucHJvZHVjZXNbUmVzb3VyY2VzLkZpYnJlLm5hbWVdID0ge1xyXG4gIHR5cGU6ICdnYXRoZXInLFxyXG4gIHJlc291cmNlOiBSZXNvdXJjZXMuRmlicmUsXHJcbiAgZWZmaWNpZW5jeTogMC4yNVxyXG59O1xyXG5cclxuY29uc3QgZ3Jvd1JlcXVpcmVtZW50OiBhbnkgPSB7IH07XHJcbmdyb3dSZXF1aXJlbWVudFtSZXNvdXJjZXMuRm9vZC5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kLCBhbW91bnQ6IDMgfTtcclxuXHJcbmNvbnN0IGltcHJvdmVtZW50cyA9IFtcclxuICB7IGltcHJvdmVtZW50OiBIb3VzZSwgd2VpZ2h0OiAxIH0sXHJcbl07XHJcblxyXG5jbGFzcyBHYXRoZXJlciBleHRlbmRzIFBvcCB7XHJcbiAgc3RhdGljIGFkZDogKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnkpID0+IGJvb2xlYW47XHJcbiAgY29uc3RydWN0b3IodGlsZTogVGlsZSwgbnVtYmVyOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKCdHYXRoZXJlcicsIHRpbGUsIG51bWJlciwgcmVzb3VyY2VzLCBuZWVkcywgcHJvZHVjZXMsIGltcHJvdmVtZW50cywgZGVzaXJlcyk7XHJcbiAgICB0aGlzLmdyb3dSZXF1aXJlbWVudCA9IGdyb3dSZXF1aXJlbWVudDtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgY29udGV4dC5zdHJva2VUZXh0KCdHJywgdGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgdGlsZVNpemUsIHRpbGVTaXplKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBHYXRoZXJlcjogRm9vZDogJHt0aGlzLnJlc291cmNlc1snZm9vZCddLmFtb3VudCB9LCBXb29kOiAke3RoaXMucmVzb3VyY2VzWyd3b29kJ10uYW1vdW50fSBOdW1iZXI6ICR7dGhpcy5udW1iZXJ9YDtcclxuICB9XHJcbn1cclxuXHJcbkdhdGhlcmVyLmFkZCA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnkpOiBib29sZWFuIHtcclxuICBjb25zdCBwb3AgPSBuZXcgR2F0aGVyZXIodGlsZSwgMSk7XHJcblxyXG4gIHJldHVybiBQb3AuYWRkKHRpbGUsIGVudGl0aWVzLCBwb3ApO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2F0aGVyZXI7XHJcbiIsImltcG9ydCBSZXNvdXJjZSBmcm9tIFwiLi4vUmVzb3VyY2VzL1Jlc291cmNlXCI7XHJcbmltcG9ydCBOZWVkcyBmcm9tIFwiLi4vUmVzb3VyY2VzL05lZWRzXCI7XHJcbmltcG9ydCBUaWxlIGZyb20gXCIuLi9NYXAvVGlsZXMvVGlsZVwiO1xyXG5pbXBvcnQgSURyYXdhYmxlIGZyb20gXCIuLi9pbnRlcmZhY2VzL0lEcmF3YWJsZVwiO1xyXG5pbXBvcnQgSVByaW50YWJsZSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JUHJpbnRhYmxlXCI7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tIFwiLi4vTWFwL1RpbGVzL1RpbGVUeXBlXCI7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSBcIi4uL0dyaWQvR3JpZFNlcnZpY2VcIjtcclxuXHJcbmNsYXNzIFBvcCBpbXBsZW1lbnRzIElEcmF3YWJsZSwgSVByaW50YWJsZXtcclxuICBudW1iZXI6IG51bWJlcjtcclxuICByZXNvdXJjZXM6IGFueTtcclxuICBuZWVkczogYW55O1xyXG4gIHByb2R1Y2VzOiBhbnk7XHJcbiAgdGlsZTogVGlsZTtcclxuICBncm93UmVxdWlyZW1lbnQ6IGFueTtcclxuICBmZXJ0aWxpdHk6IG51bWJlcjtcclxuICBpbXByb3ZlbWVudHM6IGFueTtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgbWFpbnRhaW5lbmNlOiBhbnk7XHJcbiAgcHJvZHVjdGlvbjogYW55O1xyXG4gIHBvcE5lZWRzOiBhbnk7XHJcbiAgZGVzaXJlczogYW55O1xyXG5cclxuICBzdGF0aWMgYWRkOiAodGlsZTogVGlsZSwgZW50aXRpZXM6IGFueSwgcG9wOiBQb3ApID0+IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgdGlsZTogVGlsZSwgbnVtYmVyOiBudW1iZXIsIHJlc291Y2VzOiBSZXNvdXJjZVtdLCBuZWVkczogTmVlZHMsIHByb2R1Y2VzOiBhbnksIGltcHJvdmVtZW50czogYW55LCBkZXNpcmVzOiBhbnkpIHtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xyXG4gICAgdGhpcy5udW1iZXIgPSBudW1iZXI7XHJcbiAgICB0aGlzLnJlc291cmNlcyA9IHJlc291Y2VzO1xyXG4gICAgdGhpcy5uZWVkcyA9IG5lZWRzO1xyXG4gICAgdGhpcy5wcm9kdWNlcyA9IHByb2R1Y2VzO1xyXG4gICAgdGhpcy5mZXJ0aWxpdHkgPSAxO1xyXG4gICAgdGhpcy5pbXByb3ZlbWVudHMgPSBpbXByb3ZlbWVudHM7XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0aW9uID0ge307XHJcbiAgICB0aGlzLnBvcE5lZWRzID0ge307XHJcbiAgICB0aGlzLmRlc2lyZXMgPSBkZXNpcmVzO1xyXG4gIH1cclxuXHJcbiAgLy8gIFdvcmsgb3V0IGhvdyBtdWNoIGVhY2ggcG9wIHByb2R1Y2VzXHJcbiAgLy8gIFdvcmsgb3V0IGhvdyBtdWNoIHRoZXkgYXJlIHdpbGxpbmcgdG8gZ2l2ZSB1cC5cclxuICAvLyAgUG9vbCB0aGlzIGFtb3VudC5cclxuICAvLyAgUmVkaXN0cmlidXRlIGFtb25nIHR5cGVzLlxyXG4gIGdyb3coKSB7XHJcbiAgICBpZiAodGhpcy5yZXNvdXJjZXNbJ2Zvb2QnXS5hbW91bnQgPj0gKHRoaXMuZ3Jvd1JlcXVpcmVtZW50Wydmb29kJ10gJiYgdGhpcy5ncm93UmVxdWlyZW1lbnRbJ2Zvb2QnXS5hbW91bnQpICogdGhpcy5udW1iZXIpIHtcclxuICAgICAgY29uc3QgaW5jcmVhc2UgPSBNYXRoLnJvdW5kKHRoaXMuZmVydGlsaXR5ICogdGhpcy5yZXNvdXJjZXNbJ2Zvb2QnXS5hbW91bnQvdGhpcy5ncm93UmVxdWlyZW1lbnRbJ2Zvb2QnXS5hbW91bnQpO1xyXG4gICAgICB0aGlzLm51bWJlciArPSBpbmNyZWFzZTtcclxuICAgICAgdGhpcy5yZXNvdXJjZXNbJ2Zvb2QnXS5hbW91bnQgLT0gaW5jcmVhc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnJlc291cmNlc1snZm9vZCddLmFtb3VudCA8PSAwICYmIHRoaXMuZ3Jvd1JlcXVpcmVtZW50Wydmb29kJ10pIHtcclxuICAgICAgdGhpcy5udW1iZXItLTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZShyZXNvdXJjZXM6IGFueSkge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5yZXNvdXJjZXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc291cmNlID0gdGhpcy5yZXNvdXJjZXNba2V5XTtcclxuICAgICAgY29uc3QgcHJvZHVjZXMgPSB0aGlzLnByb2R1Y2VzW2tleV0gfHwgeyBhbW91bnQ6IDAgfTtcclxuICAgICAgY29uc3QgY2FycnlpbmdQb3AgPSAxICsgdGhpcy5udW1iZXIvMjVcclxuXHJcbiAgICAgIGxldCBnYXRoZXJlZEFtb3VudCA9IDA7XHJcbiAgICAgIGlmIChwcm9kdWNlcy50eXBlID09PSAnZ2F0aGVyJykge1xyXG4gICAgICAgIGdhdGhlcmVkQW1vdW50ID0gcHJvZHVjZXMuZWZmaWNpZW5jeSAqIHRoaXMubnVtYmVyICogdGhpcy50aWxlLnJlc291cmNlc1trZXldLmFtb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHByb2R1Y2VzLnR5cGUgPT09ICdjcmFmdCcpIHtcclxuICAgICAgICBjb25zdCBtYXhQcm9kdWNlZCA9IE9iamVjdC5rZXlzKHRoaXMucHJvZHVjZXNba2V5XS5yZXF1aXJlcylcclxuICAgICAgICAgIC5tYXAoKGs6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW1iZXIgPiAwID8gTWF0aC5mbG9vcih0aGlzLnJlc291cmNlc1trXS5hbW91bnQgLyAodGhpcy5wcm9kdWNlc1trZXldLnJlcXVpcmVzW2tdICogdGhpcy5udW1iZXIpKSA6IDA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIGdhdGhlcmVkQW1vdW50ID0gbWF4UHJvZHVjZWQucmVkdWNlKChtaW46IG51bWJlciwgY3VycmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gY3VycmVudCA8IG1pbiA/IGN1cnJlbnQgOiBtaW47XHJcbiAgICAgICAgfSwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpXHJcblxyXG4gICAgICAgIGdhdGhlcmVkQW1vdW50ID0gZ2F0aGVyZWRBbW91bnQgPiAwID8gZ2F0aGVyZWRBbW91bnQgOiAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcm9kdWNlZCA9IGdhdGhlcmVkQW1vdW50ID8gZ2F0aGVyZWRBbW91bnQvY2FycnlpbmdQb3AgOiAwO1xyXG5cclxuICAgICAgY29uc3QgbmVlZHMgPSB0aGlzLm5lZWRzW2tleV0gPyB0aGlzLm5lZWRzW2tleV0uYW1vdW50ICogdGhpcy5udW1iZXIgOiAwO1xyXG5cclxuICAgICAgcmVzb3VyY2UuYW1vdW50ICs9IHByb2R1Y2VkIC0gbmVlZHM7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoIXJlc291cmNlc1trZXldKSB7XHJcbiAgICAgICAgcmVzb3VyY2VzW2tleV0gPSB7XHJcbiAgICAgICAgICBhbW91bnQ6IDAsXHJcbiAgICAgICAgICBkZXNpcmU6IDAsXHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy5yZXNvdXJjZXNba2V5XS5yZXNvdXJjZS5iYXNlVmFsdWUsXHJcbiAgICAgICAgICB0eXBlOiBrZXksXHJcbiAgICAgICAgICBtYXhWYWx1ZTogdGhpcy5yZXNvdXJjZXNba2V5XS5yZXNvdXJjZS5tYXhWYWx1ZSxcclxuICAgICAgICAgIG5lZWRUeXBlOiB0aGlzLm5lZWRzW2tleV0udHlwZSB9OyBcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkaWZmID0gTWF0aC5mbG9vcihyZXNvdXJjZS5hbW91bnQgLSB0aGlzLmRlc2lyZXNba2V5XS5hbW91bnQpO1xyXG4gICAgICByZXNvdXJjZXNba2V5XS5hbW91bnQgKz0gZGlmZjtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZ3JvdygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGVzaXJlcygpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuZGVzaXJlcykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgLy8gIGlmIHJlc291cmNlIHRoZXkgaGF2ZSBtaW51cyB3aGF0IHRoZXkgbmVlZCBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvZHVjZSgpIHtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgaW1wcm92ZVRpbGUoKSB7XHJcbiAgICB0aGlzLmltcHJvdmVtZW50cy5mb3JFYWNoKChpOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgY29zdHMgPSBpLmltcHJvdmVtZW50LmNvc3RzO1xyXG4gICAgICBcclxuICAgICAgbGV0IGFmZm9yYWJsZSA9IGNvc3RzLnJlZHVjZSgoaXNBZmZvcmRhYmxlOiBib29sZWFuLCBjdXJyZW50OiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBjdXJyZW50LnJlc291cmNlLm5hbWU7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzb3VyY2VzW2tleV0uYW1vdW50ID49IGN1cnJlbnQuYW1vdW50ICogMS41KSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9LCB0cnVlKTtcclxuXHJcbiAgICAgIGlmIChhZmZvcmFibGUpIHtcclxuICAgICAgICBpZiAoIXRoaXMudGlsZS5pbXByb3ZlbWVudHMuZmluZCgoeDogYW55KSA9PiB4Lm5hbWUgPT09IGkuaW1wcm92ZW1lbnQubmFtZSkpIHtcclxuICAgICAgICAgIHRoaXMudGlsZS5pbXByb3ZlbWVudHMucHVzaChpLmltcHJvdmVtZW50KTtcclxuICAgICAgICAgIHRoaXMuZmVydGlsaXR5ICo9IGkuaW1wcm92ZW1lbnQuZWZmZWN0cy5mZXJ0aWxpdHk7XHJcblxyXG4gICAgICAgICAgaS5tYWludGFpbmVuY2UuZm9yRWFjaCgobWFpbnRhaW46IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYWludGFpbmVuY2VbbWFpbnRhaW4ucmVzb3VyY2UubmFtZV0pIHtcclxuICAgICAgICAgICAgICB0aGlzLm1haW50YWluZW5jZVttYWludGFpbi5yZXNvdXJjZS5uYW1lXSArPSBtYWludGFpbi5hbW91bnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5tYWludGFpbmVuY2VbbWFpbnRhaW4ucmVzb3VyY2UubmFtZV0gPSBtYWludGFpbi5hbW91bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgdGlsZVNpemU6IG51bWJlcil7XHJcbiAgICBcclxuICB9XHJcbn1cclxuUG9wLmFkZCA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnksIHBvcDogUG9wKTogYm9vbGVhbiB7XHJcbiAgaWYgKCF0aWxlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0aWxlLmNpdHkgfHwgdGlsZS5yb2FkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGNvbnN0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5nZXROZWlnaGJvdXJzKHRpbGUsIGZhbHNlLCBmYWxzZSlcclxuICAgIC5maWx0ZXIoeCA9PiB4LmNpdHkpLm1hcCh4ID0+IHguY2l0eSk7XHJcblxyXG4gIE9iamVjdC5rZXlzKHBvcC5yZXNvdXJjZXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICBwb3AucmVzb3VyY2VzW2tleV0uYW1vdW50ID0gcG9wLnJlc291cmNlc1trZXldLmFtb3VudCAqIHBvcC5udW1iZXI7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChuZWlnaGJvdXJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IGNpdHkgPSBuZWlnaGJvdXJzWzBdO1xyXG4gIGNpdHkucG9wcy5wdXNoKHBvcCk7XHJcbiAgdGlsZS5wb3AgPSBwb3A7XHJcbiAgZW50aXRpZXMucG9wcy5wdXNoKHBvcCk7XHJcblxyXG4gIGlmICghY2l0eS5yZXNvdXJjZXNbcG9wLnR5cGVdKSB7XHJcbiAgICBjaXR5LnJlc291cmNlc1twb3AudHlwZV0gPSB7fTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQb3A7XHJcbiIsImltcG9ydCBSZXNvdXJjZSBmcm9tIFwiLi9SZXNvdXJjZVwiO1xyXG5pbXBvcnQgUmVzb3VyY2VUeXBlcyBmcm9tIFwiLi9SZXNvdXJjZVR5cGVcIjtcclxuXHJcbmNvbnN0IEJhc2ljVG9vbHMgPSBuZXcgUmVzb3VyY2UoJ2Jhc2ljVG9vbHMnLCBbUmVzb3VyY2VUeXBlcy5Ub29sXSwgMC4xLCAxMCwgMSwgMSk7XHJcbmV4cG9ydCBkZWZhdWx0IEJhc2ljVG9vbHM7XHJcbiIsImltcG9ydCBSZXNvdXJjZSBmcm9tIFwiLi9SZXNvdXJjZVwiO1xyXG5pbXBvcnQgUmVzb3VyY2VUeXBlcyBmcm9tIFwiLi9SZXNvdXJjZVR5cGVcIjtcclxuXHJcbmNvbnN0IEZpYnJlID0gbmV3IFJlc291cmNlKCdmaWJyZScsIFtSZXNvdXJjZVR5cGVzLkluZ3JlZGllbnRdLCAwLjEsIDEsIDAuMSwgMC4xKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpYnJlO1xyXG4iLCJpbXBvcnQgUmVzb3VyY2UgZnJvbSBcIi4vUmVzb3VyY2VcIjtcclxuaW1wb3J0IFJlc291cmNlVHlwZXMgZnJvbSBcIi4vUmVzb3VyY2VUeXBlXCI7XHJcblxyXG5jb25zdCBGb29kID0gbmV3IFJlc291cmNlKCdmb29kJywgW1Jlc291cmNlVHlwZXMuRm9vZF0sIDEuMSwgNSwgMSwgMSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb29kO1xyXG4iLCJjbGFzcyBSZXNvdXJjZSB7XHJcbiAgdHlwZXM6IGFueTtcclxuICBkZWNheTogbnVtYmVyO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBtYXhWYWx1ZTogbnVtYmVyO1xyXG4gIG1pblZhbHVlOiBudW1iZXI7XHJcbiAgYmFzZVZhbHVlOiBudW1iZXI7XHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB0eXBlczogYW55LCBkZWNheTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCBtaW5WYWx1ZTogbnVtYmVyLCBiYXNlVmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMudHlwZXMgPSB0eXBlcztcclxuICAgIHRoaXMuZGVjYXkgPSBkZWNheTtcclxuICAgIHRoaXMubWF4VmFsdWUgPSBtYXhWYWx1ZTtcclxuICAgIHRoaXMubWluVmFsdWUgPSBtaW5WYWx1ZTtcclxuICAgIHRoaXMuYmFzZVZhbHVlID0gYmFzZVZhbHVlO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHByb2R1Y2VkOiBudW1iZXIsIHVzZWQ6IG51bWJlcikge1xyXG4gICAgY29uc3QgbnVtYmVyID0gKHByb2R1Y2VkIC0gdXNlZCk7XHJcbiAgICByZXR1cm4gbnVtYmVyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVzb3VyY2U7IiwiXHJcbmVudW0gUmVzb3VyY2VUeXBlcyB7XHJcbiAgJ0Zvb2QnID0gJ0Zvb2QnLFxyXG4gICdGdWVsJyA9ICdGdWVsJyxcclxuICAnSW5ncmVkaWVudCcgPSAnSW5ncmVkaWVudCcsXHJcbiAgJ1Rvb2wnID0gJ1Rvb2wnLFxyXG4gICdTaGVsdGVyJyA9ICdTaGVsdGVyJyxcclxuICAnQnVpbGRpbmdNYXRlcmlhbCcgPSAnQnVpbGRpbmdNYXRlcmlhbCdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVzb3VyY2VUeXBlcztcclxuIiwiaW1wb3J0IEZpYnJlIGZyb20gJy4vRmlicmUnO1xyXG5pbXBvcnQgQmFzaWNUb29scyBmcm9tICcuL0Jhc2ljVG9vbHMnO1xyXG5pbXBvcnQgRm9vZCBmcm9tICcuL0Zvb2QnO1xyXG5pbXBvcnQgV29vZCBmcm9tICcuL1dvb2QnO1xyXG5cclxuZXhwb3J0IHsgRmlicmUsIEJhc2ljVG9vbHMsIEZvb2QsIFdvb2QsIH1cclxuIiwiaW1wb3J0IFJlc291cmNlIGZyb20gXCIuL1Jlc291cmNlXCI7XHJcbmltcG9ydCBSZXNvdXJjZVR5cGVzIGZyb20gXCIuL1Jlc291cmNlVHlwZVwiO1xyXG5cclxuY29uc3QgV29vZCA9IG5ldyBSZXNvdXJjZSgnd29vZCcsIFtSZXNvdXJjZVR5cGVzLkJ1aWxkaW5nTWF0ZXJpYWwsIFJlc291cmNlVHlwZXMuRnVlbCwgUmVzb3VyY2VUeXBlcy5JbmdyZWRpZW50XSwgMS4wMSwgNSwgMC4xLCAwLjEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgV29vZDtcclxuIiwiZnVuY3Rpb24gZ2VuZXJhdGVHdWlkKCkge1xyXG4gIHJldHVybiBgJHtnZW5lcmF0ZU51bWJlcigpfS0ke2dlbmVyYXRlTnVtYmVyKCl9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVOdW1iZXIoKSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZUd1aWQ7XHJcbiIsImltcG9ydCBNYXAgZnJvbSAnLi9NYXAvTWFwJztcclxuaW1wb3J0IFBvaW50IGZyb20gJy4vTWFwRW50aXRpZXMvUG9pbnQnO1xyXG5cclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbmNvbnN0IHNpemUgPSA1MDA7XHJcbmNvbnN0IGJvZHlNYXJnaW4gPSA4O1xyXG5cclxuY2FudmFzLndpZHRoPXNpemU7XHJcbmNhbnZhcy5oZWlnaHQ9c2l6ZTtcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuY29uc3QgbWFwID0gbmV3IE1hcChzaXplLCA1MCwgY29udGV4dCk7XHJcbm1hcC5kcmF3KCk7XHJcblxyXG4vLyAgQ29sb3IgaW4gY2xpY2tlZCBzcXVhcmVcclxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICBsZXQgeyBjbGllbnRYICwgY2xpZW50WSB9ID0gZTtcclxuICBjbGllbnRYIC09IGJvZHlNYXJnaW47XHJcbiAgY2xpZW50WSAtPSBib2R5TWFyZ2luO1xyXG4gIFxyXG4gIGNvbnN0IHRpbGUgPSBtYXAuY2xpY2tUaWxlKG5ldyBQb2ludChjbGllbnRYLCBjbGllbnRZKSk7XHJcblxyXG4gIGlmICh0aWxlKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0ZWRUaWxlJykuaW5uZXJIVE1MID0gdGlsZS50b1N0cmluZygpXHJcbiAgICAgIC5zcGxpdCgnJylcclxuICAgICAgLm1hcCh4ID0+IHggPT09ICdcXG4nID8gJzxiciAvPicgOiB4KS5qb2luKCcnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbGVjdGVkVGlsZScpLmlubmVySFRNTCA9ICcnO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyAgWm9vbSBpbiBhbmQgb3V0IGFuZCBkcmFnXHJcbmxldCBkcmFnU3RhdGUgPSAwO1xyXG5jb25zdCBzdGFydERyYWcgPSBuZXcgUG9pbnQoMCwgMCk7XHJcblxyXG5jb25zdCBkcmFnU3RhdGVzID0geyBTVEFSVEVEOiAwLCBEUkFHR0lORzogMSwgRU5ERUQ6IDJ9XHJcblxyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xyXG4gIGRyYWdTdGF0ZSA9IGRyYWdTdGF0ZXMuU1RBUlRFRDtcclxuICBsZXQgeyBjbGllbnRYICwgY2xpZW50WSB9ID0gZTtcclxuICBjbGllbnRYIC09IGJvZHlNYXJnaW47XHJcbiAgY2xpZW50WSAtPSBib2R5TWFyZ2luO1xyXG5cclxuICBzdGFydERyYWcueCA9IGNsaWVudFg7XHJcbiAgc3RhcnREcmFnLnkgPSBjbGllbnRZO1xyXG59LCBmYWxzZSk7XHJcblxyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoKSA9PiB7XHJcbiAgaWYgKGRyYWdTdGF0ZSA9PT0gZHJhZ1N0YXRlcy5TVEFSVEVEKSBkcmFnU3RhdGUgPSBkcmFnU3RhdGVzLkRSQUdHSU5HO1xyXG59LCBmYWxzZSk7XHJcblxyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKGUpID0+IHtcclxuICBpZihkcmFnU3RhdGUgPT09IGRyYWdTdGF0ZXMuU1RBUlRFRCl7XHJcbiAgfVxyXG4gIGVsc2UgaWYoZHJhZ1N0YXRlID09PSBkcmFnU3RhdGVzLkRSQUdHSU5HKSB7XHJcbiAgICBsZXQgeyBjbGllbnRYICwgY2xpZW50WSB9ID0gZTtcclxuICAgIGNsaWVudFggLT0gYm9keU1hcmdpbjtcclxuICAgIGNsaWVudFkgLT0gYm9keU1hcmdpbjtcclxuXHJcbiAgICBjb25zdCBkaWZmWCA9IHN0YXJ0RHJhZy54IC0gY2xpZW50WDtcclxuICAgIGNvbnN0IGRpZmZZID0gc3RhcnREcmFnLnkgLSBjbGllbnRZO1xyXG5cclxuICAgLy8gbWFwLmRyYWcoZGlmZlgsIGRpZmZZKTtcclxuICAgIHN0YXJ0RHJhZy54ID0gMDtcclxuICAgIHN0YXJ0RHJhZy55ID0gMDtcclxuICB9XHJcbiAgZHJhZ1N0YXRlID0gZHJhZ1N0YXRlcy5FTkRFRDtcclxufSwgZmFsc2UpO1xyXG5cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XHJcbiAgY29uc29sZS5sb2coZS5rZXlDb2RlKTtcclxuICBpZiAoZS5rZXlDb2RlID09PSAzNykge1xyXG4gICAgbWFwLmxlZnRLZXkoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDM4KSB7XHJcbiAgICBtYXAudXBLZXkoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDM5KSB7XHJcbiAgICBtYXAucmlnaHRLZXkoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDQwKSB7XHJcbiAgICBtYXAuZG93bktleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTA3KSB7XHJcbiAgICBtYXAuem9vbUluKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSAxMDkpIHtcclxuICAgIG1hcC56b29tT3V0KCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA4Mikge1xyXG4gICAgbWFwLmFkZFJvYWRUb1NlbGVjdGVkVGlsZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gNjcpIHtcclxuICAgIG1hcC5hZGRDaXR5VG9TZWxlY3RlZFRpbGUoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDg1KSB7XHJcbiAgICBtYXAuYWRkVW5pdFRvU2VsZWN0ZWRUaWxlKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA4IHx8IGUua2V5Q29kZSA9PT0gNDYpIHtcclxuICAgIG1hcC5yZW1vdmVTZWxlY3RlZEVudGl0eSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgIG1hcC5lbmRUdXJuKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA3MSkge1xyXG4gICAgbWFwLmFkZEdhdGhlcmVyKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA3MCkge1xyXG4gICAgbWFwLmFkZENyYWZ0c3BlcnNvbigpO1xyXG4gIH1cclxufSk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkQ2l0eScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1hcC5hZGRDaXR5VG9TZWxlY3RlZFRpbGUoKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkUm9hZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1hcC5hZGRSb2FkVG9TZWxlY3RlZFRpbGUoKTtcclxufSk7XHJcblxyXG5cclxuLy8gIEdpdmVuIGFuIGFycmF5IG9mIHNxdWFyZXMgYW5kIGEgdmlldyBwb3J0LCBmaW5kIHRoZSBzcXVhcmVzIGluIHRoZSB2aWV3cG9ydFxyXG4vLyAgWm9vbWluZyBjaGFuZ2VzIGhvdyBsYXJnZSB5b3Ugd2FudCB0byBkcmF3IHRoZSBzcXVhcmVzIGJ1dCBhbHNvIHRoZSB2aWV3cG9ydFxyXG4vLyAgRHJhZ2dpbmcgY2hhbmdlcyB0aGUgdmlld3BvcnQgc3RhcnQuIl0sInNvdXJjZVJvb3QiOiIifQ==