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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./util.ts");




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
        console.log(`Supply and demand: ${JSON.stringify(this.supplyAndDemand)}`);
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
                const sellingPop = this.resources[popKey];
                buying[resourceKey].push({
                    popKey,
                    amount: Math.abs(pop[resourceKey].amount),
                    priority: pop[resourceKey].priority,
                    selling: Object.keys(sellingPop).map((key) => sellingPop[key]).filter((x) => x.amount > 0)
                });
            });
            Object.keys(pop)
                .filter((resourceKey) => pop[resourceKey].amount > 0)
                .forEach((resourceKey) => {
                if (!selling[resourceKey]) {
                    selling[resourceKey] = [];
                }
                const sellingPop = this.resources[popKey];
                selling[resourceKey].push({
                    popKey,
                    selling: sellingPop[resourceKey],
                    buying: Object.keys(sellingPop).map((key) => sellingPop[key]).filter((x) => x.amount < 0)
                });
            });
        });
        Object.keys(buying).forEach((resourceKey) => {
            const sellingPops = selling[resourceKey];
            const valueWanted = buying.amount * this.supplyAndDemand[resourceKey].value;
            console.log(resourceKey);
            const pooledResources = [];
            const resourcePriorities = {};
            //  iterate through each pop in the selling and try to get the amount we want.
            sellingPops && sellingPops.forEach((sellingPop) => {
                pooledResources.push({ popKey: sellingPop.popKey, amount: sellingPop.selling.amount });
            });
            buying[resourceKey].forEach((buyer) => {
                const amountWanted = buyer.amount;
                const valueWanted = amountWanted * this.supplyAndDemand[resourceKey].value;
                const valueBought = 0;
                const transaction = { bought: 0, sold: [] };
                buyer.selling.forEach((sellingResource) => {
                    if (valueBought >= valueWanted)
                        return;
                    // value of the thing the buyer is selling.
                    const sellingValue = Object(_util__WEBPACK_IMPORTED_MODULE_3__["default"])(this.supplyAndDemand[sellingResource.type].value *
                        sellingResource.amount, valueWanted);
                    //  amount bought is equal to selling value divided by the amount
                    transaction.bought += sellingValue / this.supplyAndDemand[sellingResource.type].value;
                    transaction.sold.push({ type: sellingResource.type, amount: sellingValue / sellingResource.amount });
                });
                console.log(`Transaction: ${JSON.stringify(transaction)}`);
            });
            console.log(JSON.stringify(pooledResources));
        });
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
/* harmony import */ var _Resources_Priorities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Resources/Priorities */ "./Resources/Priorities.ts");




const resources = {};
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { amount: 2, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"] };
const needs = {};
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 1, priority: _Resources_Priorities__WEBPACK_IMPORTED_MODULE_3__["default"].Critical };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], amount: 0.1, priority: _Resources_Priorities__WEBPACK_IMPORTED_MODULE_3__["default"].Working };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"], amount: 0.1, priority: _Resources_Priorities__WEBPACK_IMPORTED_MODULE_3__["default"].Working };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], amount: 0.1, priority: _Resources_Priorities__WEBPACK_IMPORTED_MODULE_3__["default"].Want };
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
    efficiencyModifiers: [{ resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], multiplier: 0.2 }],
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
/* harmony import */ var _Resources_Priorities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Resources/Priorities */ "./Resources/Priorities.ts");




const resources = {};
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { amount: 0, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { amount: 1, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"] };
resources[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { amount: 0, resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"] };
const needs = {};
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 1, priority: _Resources_Priorities__WEBPACK_IMPORTED_MODULE_3__["default"].Critical };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], amount: 0, priority: _Resources_Priorities__WEBPACK_IMPORTED_MODULE_3__["default"].Want };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], amount: 0.1, priority: _Resources_Priorities__WEBPACK_IMPORTED_MODULE_3__["default"].Want };
needs[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"], amount: 0, priority: _Resources_Priorities__WEBPACK_IMPORTED_MODULE_3__["default"].None };
const desires = {};
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"], amount: 1, };
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"], amount: 0 };
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], amount: 1 };
desires[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = { resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"], amount: 0 };
const produces = [];
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"].name] = {
    type: 'gather',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"],
    efficiency: 1,
    efficiencyModifiers: [{ resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], multiplier: 0.2 }]
};
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"].name] = {
    type: 'gather',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Wood"],
    efficiency: 0.25,
    efficiencyModifiers: [{ resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], multiplier: 0.2 }]
};
produces[_Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"].name] = {
    type: 'gather',
    resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Fibre"],
    efficiency: 0.25,
    efficiencyModifiers: [{ resource: _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["BasicTools"], multiplier: 0.2 }]
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
        return `Gatherer: Food: ${this.resources['food'].amount}, Wood: ${this.resources['wood'].amount} Tools: ${this.resources['basicTools'].amount} Number: ${this.number}`;
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./util.ts");



class Pop {
    constructor(type, tile, number, resouces, needs, produces, improvements, desires) {
        this.type = type;
        this.tile = tile;
        this.number = number;
        this.resources = resouces;
        this.needs = needs;
        this.produces = produces;
        this.fertility = 0.2;
        this.health = 0.05;
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
        if (this.resources['food'].amount > this.previousResources['food'].amount && this.resources['food'].amount >= (this.growRequirement['food'] && this.growRequirement['food'].amount)) {
            const increase = this.resources['food'].amount / this.previousResources['food'].amount * this.fertility * this.resources['food'].amount / this.growRequirement['food'].amount;
            this.number += increase;
        }
        if (this.resources['food'].amount <= 0 && this.needs['food'].amount) {
            this.number -= (1 - this.health) * this.number;
        }
        this.number *= (1 - this.health);
    }
    update(resources) {
        this.previousResources = JSON.parse(JSON.stringify(this.resources));
        Object.keys(this.resources).forEach((key) => {
            const resource = this.resources[key];
            const produces = this.produces[key] || { amount: 0 };
            const carryingPop = 1 + this.number / 25;
            let gatheredAmount = 0;
            const modifiers = produces.efficiencyModifiers ? produces.efficiencyModifiers.map((x) => {
                return Object(_util__WEBPACK_IMPORTED_MODULE_2__["default"])(this.resources[x.resource.name].amount / this.number, 1) * x.multiplier;
            }) : [];
            const modifier = modifiers.reduce((sum, current) => sum + current, 1);
            if (produces.type === 'gather') {
                gatheredAmount = modifier * produces.efficiency * this.number * this.tile.resources[key].amount;
            }
            if (produces.type === 'craft') {
                const maxProduced = Object.keys(this.produces[key].requires)
                    .map((k) => {
                    return this.number > 0 ? this.resources[k].amount / this.produces[key].requires[k] : 0;
                });
                const max = maxProduced.reduce((min, current) => {
                    return current < min ? current : min;
                }, Number.MAX_SAFE_INTEGER);
                gatheredAmount = Object(_util__WEBPACK_IMPORTED_MODULE_2__["default"])(modifier * produces.efficiency * this.number, max);
                gatheredAmount = gatheredAmount > 0 ? gatheredAmount : 0;
                Object.keys(this.produces[key].requires).forEach((x) => {
                    this.resources[x].amount -= gatheredAmount / modifier;
                });
            }
            const produced = gatheredAmount ? gatheredAmount / carryingPop : 0;
            const needs = this.needs[key] ? this.needs[key].amount * this.number : 0;
            resource.amount += produced - needs;
            resource.amount = resource.amount > 0 ? resource.amount : 0;
            if (!resources[key]) {
                resources[key] = {
                    amount: 0,
                    desire: 0,
                    value: this.resources[key].resource.baseValue,
                    type: key,
                    maxValue: this.resources[key].resource.maxValue,
                    priority: this.needs[key].priority
                };
            }
            const diff = resource.amount - this.desires[key].amount * this.number;
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

/***/ "./Resources/Priorities.ts":
/*!*********************************!*\
  !*** ./Resources/Priorities.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Priorities;
(function (Priorities) {
    Priorities[Priorities["Critical"] = 1] = "Critical";
    Priorities[Priorities["Working"] = 2] = "Working";
    Priorities[Priorities["Want"] = 3] = "Want";
    Priorities[Priorities["None"] = 4] = "None";
})(Priorities || (Priorities = {}));
/* harmony default export */ __webpack_exports__["default"] = (Priorities);


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

/***/ }),

/***/ "./util.ts":
/*!*****************!*\
  !*** ./util.ts ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const clamp = (number, max) => number > max ? max : number;
/* harmony default export */ __webpack_exports__["default"] = (clamp);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vR3JpZC9HcmlkU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9HcmlkL01hcEdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly8vLi9JbXByb3ZlbWVudC9JbXByb3ZlbWVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwL01hcC50cyIsIndlYnBhY2s6Ly8vLi9NYXAvVGlsZXMvR3Jhc3NUaWxlLnRzIiwid2VicGFjazovLy8uL01hcC9UaWxlcy9PY2VhblRpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwL1RpbGVzL1RpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwL1RpbGVzL1RpbGVTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL01hcC9UaWxlcy9UaWxlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9NYXBFbnRpdGllcy9DaXR5LnRzIiwid2VicGFjazovLy8uL01hcEVudGl0aWVzL1BvaW50LnRzIiwid2VicGFjazovLy8uL01hcEVudGl0aWVzL1JvYWQudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwRW50aXRpZXMvUm9hZE5ldHdvcmsudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwRW50aXRpZXMvVW5pdC50cyIsIndlYnBhY2s6Ly8vLi9Qb3BzL0NyYWZ0c3BlcnNvbi50cyIsIndlYnBhY2s6Ly8vLi9Qb3BzL0dhdGhlcmVyLnRzIiwid2VicGFjazovLy8uL1BvcHMvUG9wLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9CYXNpY1Rvb2xzLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9GaWJyZS50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvRm9vZC50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvUHJpb3JpdGllcy50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvUmVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL1Jlc291cmNlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvUmVzb3VyY2VzLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9Xb29kLnRzIiwid2VicGFjazovLy8uL2dlbmVyYXRlR3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF5QztBQUNDO0FBRzFDLE1BQU0sV0FBVztJQUdmLFlBQVksUUFBZ0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLHFEQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsaUNBQWlD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QyxFQUFFLEVBQUU7WUFDbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFHLFVBQVUsQ0FBQyxJQUFJLEdBQUcsMkRBQVEsQ0FBQyxLQUFLLENBQUM7U0FDbEM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLDJEQUFRLENBQUMsS0FBSyxDQUFDO1FBRWpGLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpGLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FB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Q0FBaUMsMERBQUs7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxzQkFBc0IsMERBQUs7O0FBRTNCLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBLE9BQU8sb0JBQW9CO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3pJRTtBQUFBLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBYyxFQUFFLEdBQVcsRUFBRSxFQUFFLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFFNUQsb0VBQUssRUFBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBQb2ludCBmcm9tICcuLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCBtYXBHZW5lcmF0b3IgZnJvbSAnLi9NYXBHZW5lcmF0b3InO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZSc7XHJcblxyXG5jbGFzcyBHcmlkU2VydmljZSB7XHJcbiAgZ3JpZFNpemU6IG51bWJlcjtcclxuICBncmlkOiBhbnlbXTtcclxuICBjb25zdHJ1Y3RvcihncmlkU2l6ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmdyaWRTaXplID0gZ3JpZFNpemU7XHJcbiAgICB0aGlzLmdyaWQgPSBbXTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1hcCgpIHtcclxuICAgIHRoaXMuZ3JpZCA9IG1hcEdlbmVyYXRvci5nZW5lcmF0ZSh0aGlzLmdyaWRTaXplKTtcclxuICB9XHJcblxyXG4gIC8vICB0b2RvIC0gY2hhbmdlIHRoZXNlIHRvIHBvaW50c1xyXG4gIGNyZWF0ZUNsaXBwZWRHcmlkKHZpZXdQb3J0T3JpZ2luOiBhbnksIHZpZXdQb3J0RW5kOiBhbnkpIHtcclxuICAgIGNvbnN0IG5ld2dyaWQgPSBbXTtcclxuICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSBuZXcgUG9pbnQodmlld1BvcnRPcmlnaW4ueCwgdmlld1BvcnRPcmlnaW4ueSk7XHJcbiAgICBjb25zdCBlbmRQb2ludCA9IG5ldyBQb2ludCh2aWV3UG9ydEVuZC54LCB2aWV3UG9ydEVuZC55KTtcclxuICAgIFxyXG4gICAgZm9yIChsZXQgeSA9IHN0YXJ0UG9pbnQueTt5IDw9IGVuZFBvaW50Lnk7eSsrKSB7XHJcbiAgICAgIGNvbnN0IG5ld3JvdyA9IFtdO1xyXG4gICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRbeV07XHJcbiAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gc3RhcnRQb2ludC54OyB4IDw9IGVuZFBvaW50Lng7IHgrKykge1xyXG4gICAgICAgIGNvbnN0IHRpbGUgPSByb3dbeF07XHJcblxyXG4gICAgICAgICAgaWYgKHRpbGUgJiYgdGlsZS5wb2ludCkge1xyXG4gICAgICAgICAgICB0aWxlLmRyYXdpbmdQb2ludCA9IG5ldyBQb2ludCh0aWxlLnBvaW50LngsIHRpbGUucG9pbnQueSk7XHJcbiAgICAgICAgICAgIHRpbGUuZHJhd2luZ1BvaW50LnggPSB4IC0gc3RhcnRQb2ludC54O1xyXG4gICAgICAgICAgICB0aWxlLmRyYXdpbmdQb2ludC55ID0geSAtIHN0YXJ0UG9pbnQueTtcclxuICAgICAgICAgICAgbmV3cm93LnB1c2godGlsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICBcclxuICAgICAgbmV3Z3JpZC5wdXNoKG5ld3Jvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3Z3JpZDtcclxuICB9XHJcbiAgXHJcbiAgdGlsZVRvSW5kZXggKHRpbGU6IFRpbGUpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGlsZS5wb2ludC54LCB0aWxlLnBvaW50LnkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVnaW9uKGluZGV4OiBhbnksIHJhZGl1czogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkZWx0YXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCB4PTA7eDxyYWRpdXMqMisxO3grKykge1xyXG4gICAgICBmb3IgKGxldCB5PTA7eSA8IHJhZGl1cyoyKzE7IHkrKykge1xyXG4gICAgICAgIGRlbHRhcy5wdXNoKHsgeDogeCAtIDEsIHk6IHkgLTEgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJzOiBhbnlbXSA9IFtdO1xyXG4gICAgZGVsdGFzLmZvckVhY2goZGVsdGEgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleFggPSBpbmRleC54ICsgZGVsdGEueDtcclxuICAgICAgY29uc3QgaW5kZXhZID0gaW5kZXgueSArIGRlbHRhLnk7XHJcblxyXG4gICAgICBpZiAoaW5kZXhYIDwgMCB8fCBpbmRleFggPiB0aGlzLmdyaWQubGVuZ3RoLTEgfHxcclxuICAgICAgICAgIGluZGV4WSA8IDAgfHwgaW5kZXhZID4gdGhpcy5ncmlkLmxlbmd0aC0xKSB7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmVpZ2hib3Vycy5wdXNoKHRoaXMuZ3JpZFtpbmRleFldW2luZGV4WF0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3VycztcclxuICB9XHJcblxyXG4gIGdldE5laWdoYm91cnMoaW5Db21pbmluZ1RpbGU6IFRpbGUsIHByZXNlcnZlT3JkZXIgPSBmYWxzZSwgbm9EaWFnb25hbHMgPSBmYWxzZSwgaW5wdXRHcmlkOiBhbnkgPSBudWxsKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudGlsZVRvSW5kZXgoaW5Db21pbmluZ1RpbGUpO1xyXG4gICAgbGV0IGdyaWQgPSBpbnB1dEdyaWQgPyBpbnB1dEdyaWQgOiB0aGlzLmdyaWQ7XHJcbiAgICBjb25zdCB0aWxlID0gZ3JpZFtpbmRleC55XVtpbmRleC54XTtcclxuICAgIGNvbnN0IGFsbERlbHRhcyA9IFtcclxuICAgICAgeyB4Oi0xLCB5OiAtMSB9LCB7eDogMCwgeTogLTF9LCAgeyB4OiAxLCB5OiAtMX0sXHJcbiAgICAgIHsgeDotMSwgeTogIDAgfSwgICAgICAgICAgICAgICwgIHsgeDogMSwgeTogIDB9LFxyXG4gICAgICB7IHg6LTEsIHk6ICAxIH0sIHt4OiAwLCB5OiAgMSB9LCB7IHg6IDEsIHk6ICAxfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qgbm9EaWFnb25hbHNEZWx0YXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICwgeyB4OiAwLCB5OiAtMSB9LCAgXHJcbiAgICAgIHsgeDotMSwgeTogIDAgfSwgICAgICAgICAgICAgICwgIHsgeDogMSwgeTogIDB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgeTogIDEgfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgbmVpZ2hib3VyczogYW55W10gPSBbXTtcclxuICAgIGlmICghdGlsZSkge1xyXG4gICAgICByZXR1cm4gbmVpZ2hib3VycztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWx0YXMgPSBub0RpYWdvbmFscyA/IG5vRGlhZ29uYWxzRGVsdGFzIDogYWxsRGVsdGFzO1xyXG4gICAgZGVsdGFzLmZvckVhY2goZGVsdGEgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleFggPSBpbmRleC54ICsgZGVsdGEueDtcclxuICAgICAgY29uc3QgaW5kZXhZID0gaW5kZXgueSArIGRlbHRhLnk7XHJcblxyXG4gICAgICBpZiAoaW5kZXhYIDwgMCB8fCBpbmRleFggPiBncmlkLmxlbmd0aC0xIHx8XHJcbiAgICAgICAgICBpbmRleFkgPCAwIHx8IGluZGV4WSA+IGdyaWQubGVuZ3RoLTEpIHtcclxuICAgICAgICAgIGlmIChwcmVzZXJ2ZU9yZGVyKSBuZWlnaGJvdXJzLnB1c2gobnVsbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmVpZ2hib3Vycy5wdXNoKGdyaWRbaW5kZXhZXVtpbmRleFhdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5laWdoYm91cnM7XHJcbiAgfVxyXG5cclxuICBmaW5kU2VsZWN0ZWRUaWxlQ3Jvc3NOZWlnaGJvdXJzKHRpbGU6IFRpbGUpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRDcm9zc05laWdoYm91cnModGlsZSk7XHJcbiAgfVxyXG5cclxuICBmaW5kQ3Jvc3NOZWlnaGJvdXJzKHRpbGU6IFRpbGUpIHtcclxuICAgIHJldHVybiB0aGlzLmdldE5laWdoYm91cnModGlsZSwgZmFsc2UsIHRydWUpO1xyXG4gIH1cclxufVxyXG5cclxubGV0IGdyaWRTZXJ2aWNlOiBHcmlkU2VydmljZSA9IG51bGw7XHJcbmZ1bmN0aW9uIGdyaWRTZXJ2aWNlSW5pdChncmlkU2l6ZTogbnVtYmVyKSB7XHJcbiAgZ3JpZFNlcnZpY2UgPSBuZXcgR3JpZFNlcnZpY2UoZ3JpZFNpemUpO1xyXG59XHJcblxyXG5leHBvcnQgeyBncmlkU2VydmljZSwgZ3JpZFNlcnZpY2VJbml0IH07XHJcbiIsImltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSAnLi9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuaW1wb3J0IFBvaW50IGZyb20gJy4uL01hcEVudGl0aWVzL1BvaW50JztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlVHlwZSc7XHJcbmltcG9ydCBUaWxlU2VydmljZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZVNlcnZpY2UnO1xyXG5cclxuY2xhc3MgTWFwR2VuZXJhdG9yIHtcclxuXHJcbiAgZ2VuZXJhdGUoZ3JpZFNpemU6IG51bWJlcikge1xyXG4gICAgbGV0IGdyaWQ6IFRpbGVbXVtdID0gW11cclxuICAgIGZvcihsZXQgaD0wO2g8Z3JpZFNpemU7aCsrKSB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xyXG4gICAgICBmb3IobGV0IHc9MDt3PGdyaWRTaXplO3crKykge1xyXG4gICAgICAgIHJvdy5wdXNoKG5ldyBUaWxlKG5ldyBQb2ludCh3LCBoKSwgVGlsZVR5cGUuTm9uZSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGdyaWQucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBzZWVkVGlsZUNvdW50ID0gODA7XHJcbiAgICBmb3IgKGxldCBpPTA7aSA8IHNlZWRUaWxlQ291bnQ7aSsrKSB7XHJcbiAgICAgIGNvbnN0IHJhbmRvbVRpbGUgPSBncmlkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdyaWQubGVuZ3RoKV1bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JpZC5sZW5ndGgpXTtcclxuICAgICAgcmFuZG9tVGlsZS50eXBlID0gVGlsZVR5cGUuR3Jhc3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdyaWRbTWF0aC5yb3VuZChncmlkLmxlbmd0aC8yKV1bTWF0aC5yb3VuZChncmlkLmxlbmd0aC8yKV0udHlwZSA9IFRpbGVUeXBlLkdyYXNzO1xyXG4gICAgICBcclxuICAgIGdyaWQgPSB0aGlzLmRmYShncmlkU2l6ZSwgZ3JpZCwgdGhpcy5ncm93R3Jhc3MpO1xyXG4gICAgZ3JpZCA9IHRoaXMuZGZhKGdyaWRTaXplLCBncmlkLCB0aGlzLmdyb3dHcmFzcyk7XHJcbiAgICB0aGlzLmZsb29kRmlsbChncmlkLCBncmlkW01hdGgucm91bmQoZ3JpZC5sZW5ndGgvMildW01hdGgucm91bmQoZ3JpZC5sZW5ndGgvMildKTtcclxuXHJcbiAgICBncmlkID0gdGhpcy5kZmEoZ3JpZFNpemUsIGdyaWQsIHRoaXMuc21vb3RoUnVsZSk7XHJcbiAgICBncmlkID0gdGhpcy5kZmEoZ3JpZFNpemUsIGdyaWQsIHRoaXMuc21vb3RoUnVsZSk7XHJcblxyXG4gICAgdGhpcy5maWxsSW5Ib2xlcyhncmlkKTtcclxuXHJcbiAgICByZXR1cm4gZ3JpZDtcclxuICB9XHJcblxyXG4gIGZsb29kRmlsbChncmlkOiBUaWxlW11bXSwgc3RhcnQ6IFRpbGUpIHtcclxuICAgIGNvbnN0IHN0YWNrID0gW3N0YXJ0XTtcclxuXHJcbiAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCB0aWxlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgIGNvbnN0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5nZXROZWlnaGJvdXJzKHRpbGUsIGZhbHNlLCBmYWxzZSwgZ3JpZCk7XHJcbiAgICAgIGNvbnN0IHdhdGVyTmVpZ2hib3VycyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geC50eXBlID09PSBUaWxlVHlwZS5PY2VhbikubGVuZ3RoO1xyXG4gICAgICBjb25zdCBncmFzc05laWdoYm91cnMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHgudHlwZSA9PT0gVGlsZVR5cGUuR3Jhc3MpLmxlbmd0aDtcclxuICAgICAgXHJcbiAgICAgIGlmIChNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAod2F0ZXJOZWlnaGJvdXJzICsgZ3Jhc3NOZWlnaGJvdXJzKSkgPiB3YXRlck5laWdoYm91cnMpIHtcclxuICAgICAgICB0aWxlLnR5cGUgPSBUaWxlVHlwZS5HcmFzcztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aWxlLnR5cGUgPSBUaWxlVHlwZS5PY2VhbjtcclxuICAgICAgfVxyXG4gICAgICBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHgudHlwZSA9PT0gVGlsZVR5cGUuTm9uZSkuZm9yRWFjaCh4ID0+IHN0YWNrLnB1c2goeCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGZhIChncmlkU2l6ZTogbnVtYmVyLCBncmlkOiBUaWxlW11bXSwgcnVsZTogYW55KSB7XHJcbiAgICBjb25zdCBuZXdHcmlkID0gW107XHJcblxyXG4gICAgZm9yKGxldCBoPTA7aCA8IGdyaWRTaXplO2grKykge1xyXG4gICAgICBjb25zdCBuZXdSb3cgPSBbXTtcclxuICAgICAgZm9yKGxldCB3PTA7dyA8IGdyaWRTaXplO3crKykge1xyXG4gICAgICAgIGNvbnN0IHRpbGUgPSBncmlkW2hdW3ddO1xyXG4gICAgICAgIGNvbnN0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5nZXROZWlnaGJvdXJzKHRpbGUsIGZhbHNlLCBmYWxzZSwgZ3JpZCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHdhdGVyTmVpZ2hib3VycyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geC50eXBlID09PSBUaWxlVHlwZS5PY2VhbikubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGdyYXNzTmVpZ2hib3VycyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geC50eXBlID09PSBUaWxlVHlwZS5HcmFzcykubGVuZ3RoO1xyXG5cclxuICAgICAgICBjb25zdCB0eXBlID0gcnVsZSh0aWxlLCB3YXRlck5laWdoYm91cnMsIGdyYXNzTmVpZ2hib3Vycyk7XHJcbiAgICAgICAgY29uc3QgY29weSA9IFRpbGVTZXJ2aWNlLmNyZWF0ZVRpbGUodGlsZSwgdHlwZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbmV3Um93LnB1c2goY29weSk7XHJcbiAgICAgIH1cclxuICAgICAgbmV3R3JpZC5wdXNoKG5ld1Jvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3R3JpZDtcclxuICB9XHJcblxyXG4gIHNtb290aFJ1bGUgKHRpbGU6IFRpbGUsIHdhdGVyTmVpZ2hib3VyczogbnVtYmVyLCBncmFzc05laWdoYm91cnM6IG51bWJlcikge1xyXG4gICAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4gJiYgZ3Jhc3NOZWlnaGJvdXJzID4gMykge1xyXG4gICAgICByZXR1cm4gVGlsZVR5cGUuR3Jhc3M7XHJcbiAgICB9XHJcbiAgICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5HcmFzcyAmJiB3YXRlck5laWdoYm91cnMgPiA3KSB7XHJcbiAgICAgIHJldHVybiBUaWxlVHlwZS5PY2VhbjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aWxlLnR5cGU7XHJcbiAgfVxyXG5cclxuICBncm93R3Jhc3MgKHRpbGU6IFRpbGUsIHdhdGVyTmVpZ2hib3VyczogbnVtYmVyLCBncmFzc05laWdoYm91cnM6IG51bWJlcikge1xyXG4gICAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4gJiYgZ3Jhc3NOZWlnaGJvdXJzID4gMCkge1xyXG4gICAgICByZXR1cm4gVGlsZVR5cGUuR3Jhc3M7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGlsZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgZmlsbEluSG9sZXMoZ3JpZDogVGlsZVtdW10pIHtcclxuICAgIGZvcihsZXQgeSA9IDA7IHkgPCBncmlkLmxlbmd0aDsgeSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgZ3JpZFt5XS5sZW5ndGg7IGgrKykge1xyXG4gICAgICAgIGlmIChncmlkW3ldW2hdLnR5cGUgPT09IFRpbGVUeXBlLk5vbmUpIHtcclxuICAgICAgICAgIGdyaWRbeV1baF0udHlwZSA9IFRpbGVUeXBlLk9jZWFuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IE1hcEdlbmVyYXRvcigpOyIsImltcG9ydCAqIGFzIFJlc291cmNlcyBmcm9tIFwiLi4vUmVzb3VyY2VzL1Jlc291cmNlc1wiO1xyXG5cclxuY29uc3QgSG91c2UgPSB7XHJcbiAgbmFtZTogJ0hvdXNlJyxcclxuICBjb3N0czogW1xyXG4gICAgeyByZXNvdXJjZTogUmVzb3VyY2VzLldvb2QsIGFtb3VudDogMTAgfSxcclxuICBdLFxyXG4gIG1haW50YWluZW5jZTogW1xyXG4gICAgeyByZXNvdXJjZTogUmVzb3VyY2VzLldvb2QsIGFtb3VudDogLjI1IH0sXHJcbiAgXSxcclxuICBlZmZlY3RzOiB7XHJcbiAgICBmZXJ0aWxpdHk6IDEuMSxcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEhvdXNlIH07XHJcbiIsImltcG9ydCBQb2ludCBmcm9tICcuLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCBDaXR5IGZyb20gJy4uL01hcEVudGl0aWVzL0NpdHknO1xyXG5pbXBvcnQgVW5pdCBmcm9tICcuLi9NYXBFbnRpdGllcy9Vbml0JztcclxuaW1wb3J0IHsgZ3JpZFNlcnZpY2UsIGdyaWRTZXJ2aWNlSW5pdCB9IGZyb20gJy4uL0dyaWQvR3JpZFNlcnZpY2UnO1xyXG5pbXBvcnQgUm9hZCBmcm9tICcuLi9NYXBFbnRpdGllcy9Sb2FkJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4vVGlsZXMvVGlsZVR5cGUnO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuL1RpbGVzL1RpbGUnO1xyXG5pbXBvcnQgR2F0aGVyZXIgZnJvbSAnLi4vUG9wcy9HYXRoZXJlcic7XHJcbmltcG9ydCBQb3AgZnJvbSAnLi4vUG9wcy9Qb3AnO1xyXG5pbXBvcnQgQ3JhZnRzcGVyc29uIGZyb20gJy4uL1BvcHMvQ3JhZnRzcGVyc29uJztcclxuXHJcbmNsYXNzIE1hcCB7XHJcbiAgY29udGV4dDogYW55O1xyXG4gIHNpemU6IG51bWJlcjtcclxuICB0aWxlTnVtYmVyOiBudW1iZXI7XHJcbiAgdmlld1BvcnRPcmlnaW46IFBvaW50O1xyXG4gIHNlbGVjdGVkVGlsZTogVGlsZTtcclxuICBzZWxlY3RlZEVudGl0eTogYW55O1xyXG4gIHpvb21MZXZlbDogbnVtYmVyO1xyXG4gIG9yaWdpbjogUG9pbnQ7XHJcbiAgdmlld1BvcnRFbmQ6IFBvaW50O1xyXG4gIHRpbGVTaXplOiBudW1iZXI7XHJcbiAgY2xpcHBlZEdyaWQ6IGFueVtdO1xyXG4gIHZpZXdQb3J0U2l6ZTogbnVtYmVyO1xyXG4gIGVudGl0aWVzOiBhbnk7XHJcbiAgXHJcbiAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyLCB0aWxlTnVtYmVyOiBudW1iZXIsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgLy8gIERyYXcgZ3JpZCBvZiBzcXVhcmVzXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIHRoaXMudGlsZU51bWJlciA9IHRpbGVOdW1iZXI7XHJcbiAgICB0aGlzLnZpZXdQb3J0T3JpZ2luID0gbmV3IFBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5vcmlnaW4gPSBuZXcgUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGlsZSA9IG51bGw7XHJcbiAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcclxuICAgIHRoaXMuZW50aXRpZXMgPSB7XHJcbiAgICAgIHBvcHM6IFtdLFxyXG4gICAgICBjaXRpZXM6IFtdLFxyXG4gICAgfTtcclxuXHJcbiAgICBncmlkU2VydmljZUluaXQodGhpcy50aWxlTnVtYmVyKTtcclxuICAgIGdyaWRTZXJ2aWNlLmNyZWF0ZU1hcCgpO1xyXG5cclxuICAgIHRoaXMuY2xpcHBlZEdyaWQgPSBbXTtcclxuICAgIHRoaXMudmlld1BvcnRTaXplID0gc2l6ZTsgLy8gIGhvdyBsYXJnZSB0aGUgdmlldyBwb3J0IGlzXHJcbiAgICB0aGlzLnpvb21MZXZlbCA9IDQwOyAgLy8gIGhvdyBtYW55IFRpbGVzIGFyZSBpbiB2aWV3IHBvcnRcclxuICAgIHRoaXMudmlld1BvcnRFbmQgPSBuZXcgUG9pbnQodGhpcy52aWV3UG9ydE9yaWdpbi54ICsgIHRoaXMuem9vbUxldmVsLCB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyAgdGhpcy56b29tTGV2ZWwpO1xyXG4gICAgIFxyXG4gICAgdGhpcy5jbGlwcGVkR3JpZCA9IGdyaWRTZXJ2aWNlLmNyZWF0ZUNsaXBwZWRHcmlkKHRoaXMudmlld1BvcnRPcmlnaW4sIHRoaXMudmlld1BvcnRFbmQpO1xyXG4gICAgdGhpcy50aWxlU2l6ZSA9IHRoaXMudmlld1BvcnRTaXplIC8gdGhpcy56b29tTGV2ZWw7IC8vICBzaG91bGQgYmUgdmlldyBwb3J0IHNpemUgLyB2aWV3IHBvcnQgY29udGVudCBzaXplXHJcbiAgfVxyXG5cclxuICBncmlkKCkge1xyXG4gICAgcmV0dXJuIGdyaWRTZXJ2aWNlLmdyaWQ7XHJcbiAgfVxyXG5cclxuICBjbGlja1RpbGUocG9pbnQ6IFBvaW50KSB7XHJcbiAgICBjb25zdCB0aWxlWCA9IE1hdGguZmxvb3IocG9pbnQueCAvIHRoaXMudGlsZVNpemUpO1xyXG4gICAgY29uc3QgdGlsZVkgPSBNYXRoLmZsb29yKHBvaW50LnkgLyB0aGlzLnRpbGVTaXplKTtcclxuXHJcbiAgICBjb25zdCB0aWxlID0gdGhpcy5jbGlwcGVkR3JpZFt0aWxlWV0gJiYgdGhpcy5jbGlwcGVkR3JpZFt0aWxlWV1bdGlsZVhdO1xyXG5cclxuICAgIGlmICh0aWxlKSB7ICBcclxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUaWxlKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRpbGUuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGlsZS51bml0IHx8IHRpbGUucm9hZCB8fCB0aWxlLmNpdHkpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gdGlsZS51bml0IHx8IHRpbGUucm9hZCB8fCB0aWxlLmNpdHk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEVudGl0eSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZWxlY3RlZFRpbGUgPSB0aWxlO1xyXG4gICAgICB0aWxlLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRpbGU7XHJcbiAgfVxyXG5cclxuICBkcmFnKGRpZmZYOiBudW1iZXIsIGRpZmZZOiBudW1iZXIpIHtcclxuXHJcbiAgICBjb25zdCBtaW5EcmFnID0gMTtcclxuICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPiBtaW5EcmFnIHx8IE1hdGguYWJzKGRpZmZZKSA+IG1pbkRyYWcpIHtcclxuICAgICAgaWYgKGRpZmZYID4gMCkge1xyXG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIE1hdGgucm91bmQoZGlmZlgpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCA9IE1hdGgubWluKHN1bSwgdGhpcy50aWxlTnVtYmVyKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0RW5kLnggPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyB0aGlzLnpvb21MZXZlbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBzdW0gPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyBNYXRoLnJvdW5kKGRpZmZYKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnggPSBNYXRoLm1heChzdW0sIDApO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIHRoaXMuem9vbUxldmVsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGlmZlkgPiAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy52aWV3UG9ydE9yaWdpbi55ICsgTWF0aC5yb3VuZChkaWZmWSk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55ID0gTWF0aC5taW4oc3VtLCB0aGlzLnRpbGVOdW1iZXIpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueSArIHRoaXMuem9vbUxldmVsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIE1hdGgucm91bmQoZGlmZlkpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueSA9IE1hdGgubWF4KHN1bSwgMCk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55ID0gdGhpcy52aWV3UG9ydE9yaWdpbi55ICsgdGhpcy56b29tTGV2ZWw7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gIG1vdmUgdG8gdW5pdFxyXG4gIG1vdmVVbml0KHVuaXQ6IFVuaXQsIG5laWdoYm91cjogVGlsZSkge1xyXG4gICAgY29uc3Qgb3JpZ2luYWxUaWxlID0gdW5pdC50aWxlO1xyXG4gICAgdW5pdC50aWxlID0gZ3JpZFNlcnZpY2UuZ3JpZFtuZWlnaGJvdXIucG9pbnQueV1bbmVpZ2hib3VyLnBvaW50LnhdO1xyXG4gICAgZ3JpZFNlcnZpY2UuZ3JpZFtuZWlnaGJvdXIucG9pbnQueV1bbmVpZ2hib3VyLnBvaW50LnhdLnVuaXQgPSB1bml0O1xyXG4gICAgb3JpZ2luYWxUaWxlLnVuaXQgPSBudWxsO1xyXG4gICAgdGhpcy5kcmF3KCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgbGVmdEtleSgpe1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgJiYgdGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIFVuaXQpIHtcclxuICAgICAgdGhpcy5lbnRpdHlMZWZ0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbkxlZnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJpZ2h0S2V5KCl7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSAmJiB0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgVW5pdCkge1xyXG4gICAgICB0aGlzLmVudGl0eVJpZ2h0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhblJpZ2h0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cEtleSgpe1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgJiYgdGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIFVuaXQpIHtcclxuICAgICAgdGhpcy5lbnRpdHlVcCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5VcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZG93bktleSgpe1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgJiYgdGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIFVuaXQpIHtcclxuICAgICAgdGhpcy5lbnRpdHlEb3duKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbkRvd24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVudGl0eUxlZnQoKSB7XHJcbiAgICBjb25zdCBuZWlnaGJvdXIgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRoaXMuc2VsZWN0ZWRFbnRpdHkudGlsZSlbMV07XHJcbiAgICBpZiAobmVpZ2hib3VyICYmIG5laWdoYm91ci50eXBlICE9PSBUaWxlVHlwZS5PY2Vhbikge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGVudGl0eVJpZ2h0KCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGUpWzJdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gVGlsZVR5cGUuT2NlYW4pIHtcclxuICAgICAgdGhpcy5tb3ZlVW5pdCh0aGlzLnNlbGVjdGVkRW50aXR5LCBuZWlnaGJvdXIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBlbnRpdHlVcCgpIHtcclxuICAgIGNvbnN0IG5laWdoYm91ciA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnModGhpcy5zZWxlY3RlZEVudGl0eS50aWxlKVswXTtcclxuICAgIGlmIChuZWlnaGJvdXIgJiYgbmVpZ2hib3VyLnR5cGUgIT09IFRpbGVUeXBlLk9jZWFuKSB7XHJcbiAgICAgIHRoaXMubW92ZVVuaXQodGhpcy5zZWxlY3RlZEVudGl0eSwgbmVpZ2hib3VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVudGl0eURvd24oKSB7XHJcbiAgICBjb25zdCBuZWlnaGJvdXIgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRoaXMuc2VsZWN0ZWRFbnRpdHkuVGlsZSlbM107XHJcbiAgICBpZiAobmVpZ2hib3VyICYmIG5laWdoYm91ci50eXBlICE9PSBUaWxlVHlwZS5PY2Vhbikge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYW5MZWZ0KCkge1xyXG4gICAgaWYgKHRoaXMudmlld1BvcnRPcmlnaW4ueCA+IDApIHtcclxuICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi54LS07XHJcbiAgICAgIHRoaXMudmlld1BvcnRFbmQueC0tO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhblJpZ2h0KCkge1xyXG4gICAgaWYgKHRoaXMudmlld1BvcnRPcmlnaW4ueCArIHRoaXMuem9vbUxldmVsIDwgdGhpcy50aWxlTnVtYmVyKSB7XHJcbiAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCsrO1xyXG4gICAgICB0aGlzLnZpZXdQb3J0RW5kLngrKztcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYW5VcCgpIHtcclxuICAgIGlmICh0aGlzLnZpZXdQb3J0T3JpZ2luLnkgPiAwKSB7XHJcbiAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueS0tO1xyXG4gICAgICB0aGlzLnZpZXdQb3J0RW5kLnktLTtcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7ICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhbkRvd24oKSB7XHJcbiAgICBpZiAodGhpcy52aWV3UG9ydE9yaWdpbi55ICsgdGhpcy56b29tTGV2ZWwgPCB0aGlzLnRpbGVOdW1iZXIpIHtcclxuICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55Kys7XHJcbiAgICAgIHRoaXMudmlld1BvcnRFbmQueSsrO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHpvb21PdXQoKSB7XHJcbiAgICBpZiAodGhpcy56b29tTGV2ZWwgPCAxMDApIHtcclxuICAgICAgdGhpcy56b29tTGV2ZWwrKztcclxuICAgICAgdGhpcy56b29tKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB6b29tSW4oKSB7XHJcbiAgICBpZiAodGhpcy56b29tTGV2ZWwgPiAxKSB7XHJcbiAgICAgIHRoaXMuem9vbUxldmVsLS07XHJcbiAgICAgIHRoaXMuem9vbSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgem9vbSgpIHtcclxuICAgIHRoaXMudmlld1BvcnRFbmQgPSBuZXcgUG9pbnQodGhpcy52aWV3UG9ydE9yaWdpbi54ICsgIHRoaXMuem9vbUxldmVsLCB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyAgdGhpcy56b29tTGV2ZWwpO1xyXG4gICAgdGhpcy50aWxlU2l6ZSA9IHRoaXMudmlld1BvcnRTaXplIC8gdGhpcy56b29tTGV2ZWw7XHJcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVZpZXcodXBkYXRlR3JpZCA9IHRydWUpIHtcclxuICAgIGlmICh1cGRhdGVHcmlkKXRoaXMuY2xpcHBlZEdyaWQgPSBncmlkU2VydmljZS5jcmVhdGVDbGlwcGVkR3JpZCh0aGlzLnZpZXdQb3J0T3JpZ2luLCB0aGlzLnZpZXdQb3J0RW5kKTtcclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxuXHJcbiAgZW5kVHVybigpIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICB0aGlzLmVudGl0aWVzLmNpdGllcy5mb3JFYWNoKChjaXR5OiBDaXR5KSA9PiBjaXR5LnVwZGF0ZSgpKTtcclxuICB9XHJcblxyXG4gIGRyYXcoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XHJcblxyXG4gICAgZm9yKGxldCBoPTA7aDx0aGlzLmNsaXBwZWRHcmlkLmxlbmd0aDtoKyspIHtcclxuICAgICAgZm9yKGxldCB3PTA7dzx0aGlzLmNsaXBwZWRHcmlkW2hdLmxlbmd0aDt3KyspIHtcclxuICAgICAgICBjb25zdCB0aWxlID0gdGhpcy5jbGlwcGVkR3JpZFtoXVt3XTtcclxuICAgICAgICBpZiAodGlsZSAmJiAodGlsZS5kcmF3aW5nUG9pbnQueCkgPD0gdGhpcy52aWV3UG9ydEVuZC54ICYmICh0aWxlLmRyYXdpbmdQb2ludC54KSA+PSAwICYmICh0aWxlLmRyYXdpbmdQb2ludC55KSA+PSAwICYmIHRpbGUuZHJhd2luZ1BvaW50LnkgPD0gdGhpcy52aWV3UG9ydEVuZC55KSB7XHJcbiAgICAgICAgICB0aWxlLmRyYXcodGhpcy5jb250ZXh0LCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgIGlmICh0aWxlLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QodGlsZS5kcmF3aW5nUG9pbnQueCAqIHRoaXMudGlsZVNpemUsIHRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aWxlLmNpdHkpIHtcclxuICAgICAgICAgICAgdGlsZS5jaXR5LmRyYXcodGhpcy5jb250ZXh0LCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGlsZS5yb2FkKSB7XHJcbiAgICAgICAgICAgIHRpbGUucm9hZC5kcmF3KHRoaXMuY29udGV4dCwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRpbGUudW5pdCkge1xyXG4gICAgICAgICAgICB0aWxlLnVuaXQuZHJhdyh0aGlzLmNvbnRleHQsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aWxlLnBvcCkge1xyXG4gICAgICAgICAgICB0aWxlLnBvcC5kcmF3KHRoaXMuY29udGV4dCwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRVbml0VG9TZWxlY3RlZFRpbGUoKSB7XHJcbiAgICBpZiAoVW5pdC5hZGQodGhpcy5zZWxlY3RlZFRpbGUpKSB7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkUm9hZFRvU2VsZWN0ZWRUaWxlKCkge1xyXG4gICAgaWYgKFJvYWQuYWRkKHRoaXMuc2VsZWN0ZWRUaWxlKSkge1xyXG4gICAgICB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZENpdHlUb1NlbGVjdGVkVGlsZSgpIHtcclxuICAgIGlmIChDaXR5LmFkZCh0aGlzLnNlbGVjdGVkVGlsZSwgdGhpcy5lbnRpdGllcykpIHtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRHYXRoZXJlcigpIHtcclxuICAgIGlmIChHYXRoZXJlci5hZGQodGhpcy5zZWxlY3RlZFRpbGUsIHRoaXMuZW50aXRpZXMpKSB7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkQ3JhZnRzcGVyc29uKCkge1xyXG4gICAgaWYgKENyYWZ0c3BlcnNvbi5hZGQodGhpcy5zZWxlY3RlZFRpbGUsIHRoaXMuZW50aXRpZXMpKSB7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlU2VsZWN0ZWRFbnRpdHkoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRFbnRpdHkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRpbGUgPSB0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGU7XHJcbiAgICBjb25zdCBncmlkVGlsZSA9IGdyaWRTZXJ2aWNlLmdyaWRbdGlsZS5wb2ludC55XVt0aWxlLnBvaW50LnhdO1xyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgVW5pdCkge1xyXG4gICAgICBncmlkVGlsZS51bml0ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJzID0gdGhpcy5zZWxlY3RlZEVudGl0eS5uZWlnaGJvdXJzO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBSb2FkKSB7XHJcbiAgICAgIC8vICBGb3IgZWFjaCBuZWlnaGJvdXIgZG8gYSBjb25uZWN0aXZpdHkgY2hlY2sgYW5kIHVwZGF0ZSBjb25uZWN0ZWRuZXNzXHJcbiAgICAgIC8vICBVcGRhdGUgbmV0d29ya3Mgcm9hZHMuXHJcbiAgICAgIFJvYWQucmVtb3ZlKGdyaWRUaWxlLCB0aGlzLnNlbGVjdGVkRW50aXR5KTtcclxuICAgICAgLy8gIEZpbmQgbmV0d29yayB0aGF0IHRoZSByb2FkIGlzIGNvbm5lY3RlZCB0byBhbmQgaXQncyBuZWlnaGJvdXJzIGFuZCByZW1vdmVcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgQ2l0eSkge1xyXG4gICAgICBDaXR5LnJlbW92ZShncmlkVGlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZEVudGl0eSA9IG51bGw7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hcDtcclxuIiwiaW1wb3J0IFRpbGUgZnJvbSAnLi9UaWxlJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4vVGlsZVR5cGUnO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vTWFwRW50aXRpZXMvUG9pbnQnO1xyXG5pbXBvcnQgKiBhcyBSZXNvdXJjZXMgZnJvbSAnLi4vLi4vUmVzb3VyY2VzL1Jlc291cmNlcyc7XHJcblxyXG5jbGFzcyBHcmFzc1RpbGUgZXh0ZW5kcyBUaWxlIHtcclxuICBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQpIHtcclxuICAgIHN1cGVyKHBvaW50LCBUaWxlVHlwZS5HcmFzcyk7XHJcbiAgICB0aGlzLnJlc291cmNlcyA9IHsgfTtcclxuICAgIHRoaXMucmVzb3VyY2VzW1Jlc291cmNlcy5Gb29kLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkZvb2QsIGFtb3VudDogMS41IH07XHJcbiAgICB0aGlzLnJlc291cmNlc1tSZXNvdXJjZXMuV29vZC5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5Xb29kLCBhbW91bnQ6IDAuNSB9O1xyXG4gICAgdGhpcy5yZXNvdXJjZXNbUmVzb3VyY2VzLkZpYnJlLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkZpYnJlLCBhbW91bnQ6IDAuNSB9O1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMEZGMDAnO1xyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSwgdGlsZVNpemUsIHRpbGVTaXplKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyYXNzVGlsZTtcclxuIiwiaW1wb3J0IFRpbGUgZnJvbSAnLi9UaWxlJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4vVGlsZVR5cGUnO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vTWFwRW50aXRpZXMvUG9pbnQnO1xyXG5cclxuY2xhc3MgT2NlYW5UaWxlIGV4dGVuZHMgVGlsZSB7XHJcbiAgY29uc3RydWN0b3IocG9pbnQ6IFBvaW50KSB7XHJcbiAgICBzdXBlcihwb2ludCwgVGlsZVR5cGUuT2NlYW4pO1xyXG4gIH1cclxuICBkcmF3KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDBGRic7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplLCB0aWxlU2l6ZSwgdGlsZVNpemUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2NlYW5UaWxlO1xyXG4iLCJpbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vTWFwRW50aXRpZXMvUG9pbnQnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi9UaWxlVHlwZSc7XHJcbmltcG9ydCBVbml0IGZyb20gJy4uLy4uL01hcEVudGl0aWVzL1VuaXQnO1xyXG5pbXBvcnQgQ2l0eSBmcm9tICcuLi8uLi9NYXBFbnRpdGllcy9DaXR5JztcclxuaW1wb3J0IFBvcCBmcm9tICcuLi8uLi9Qb3BzL1BvcCc7XHJcbmltcG9ydCBPY2VhblRpbGUgZnJvbSAnLi9PY2VhblRpbGUnO1xyXG5pbXBvcnQgR3Jhc3NUaWxlIGZyb20gJy4vR3Jhc3NUaWxlJztcclxuaW1wb3J0IElQcmludGFibGUgZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUHJpbnRhYmxlJztcclxuXHJcbmNsYXNzIFRpbGUgaW1wbGVtZW50cyBJUHJpbnRhYmxle1xyXG4gIHBvaW50OiBQb2ludDtcclxuICBzZWxlY3RlZDogYm9vbGVhbjtcclxuICB0eXBlOiBUaWxlVHlwZTtcclxuICBpZDogc3RyaW5nO1xyXG4gIGNpdHk6IENpdHk7XHJcbiAgcm9hZDogYW55O1xyXG4gIHVuaXQ6IFVuaXQ7XHJcbiAgZHJhd2luZ1BvaW50OiBQb2ludDtcclxuICByZXNvdXJjZXM6IGFueTtcclxuICBwb3A6IFBvcDtcclxuICBpbXByb3ZlbWVudHM6IGFueSA9IFtdO1xyXG4gIHN0YXRpYyBjb3B5OiAodGlsZTogVGlsZSwgdHlwZT86IGFueSkgPT4gVGlsZTtcclxuXHJcbiAgY29uc3RydWN0b3IocG9pbnQ6IFBvaW50LCB0eXBlOiBUaWxlVHlwZSkge1xyXG4gICAgdGhpcy5wb2ludCA9IFBvaW50LmNvcHkocG9pbnQpO1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pZCA9IGAke3BvaW50Lnh9LSR7cG9pbnQueX1gO1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICB9XHJcblxyXG4gIGVxdWFscyhvdGhlclRpbGU6IFRpbGUpIHtcclxuICAgIHJldHVybiB0aGlzLnBvaW50LmVxdWFscyhvdGhlclRpbGUucG9pbnQpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICBjb25zdCB0aWxlRGV0YWlscyA9IGAke3RoaXMucG9pbnQueH0sICR7dGhpcy5wb2ludC55fSwgJHt0aGlzLnR5cGV9YDtcclxuICAgIGxldCBjaXR5RGV0YWlscyA9ICcnO1xyXG4gICAgaWYgKHRoaXMuY2l0eSkge1xyXG4gICAgICBjaXR5RGV0YWlscyA9IHRoaXMuY2l0eS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByb2FkRGV0YWlscyA9ICcnO1xyXG4gICAgaWYgKHRoaXMucm9hZCkge1xyXG4gICAgICByb2FkRGV0YWlscyA9IGAke3RoaXMucm9hZC50b1N0cmluZygpfVxcbiR7dGhpcy5yb2FkLnJvYWROZXR3b3JrLnRvU3RyaW5nKCl9YFxyXG4gICAgfVxyXG5cclxuICAgIGxldCBwb3BEZXRhaWxzID0gdGhpcy5wb3AgPyB0aGlzLnBvcC50b1N0cmluZygpIDogJyc7XHJcblxyXG4gICAgY29uc3QgdW5pdERldGFpbHMgPSB0aGlzLnVuaXQgPyB0aGlzLnVuaXQudG9TdHJpbmcoKSA6ICcnO1xyXG5cclxuICAgIGNvbnN0IGltcHJvdmVtZW50RGV0YWlscyA9IHRoaXMuaW1wcm92ZW1lbnRzLm1hcCgoeDogYW55KSA9PiB4Lm5hbWUpLmpvaW4oJywnKTtcclxuICAgIHJldHVybiBgJHt0aWxlRGV0YWlsc30gJHtjaXR5RGV0YWlsc30gJHtyb2FkRGV0YWlsc30gJHt1bml0RGV0YWlsc30gJHtwb3BEZXRhaWxzfSAke2ltcHJvdmVtZW50RGV0YWlsc31gO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSwgdGlsZVNpemUsIHRpbGVTaXplKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlsZTtcclxuIiwiaW1wb3J0IFRpbGUgZnJvbSBcIi4vVGlsZVwiO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSBcIi4vVGlsZVR5cGVcIjtcclxuaW1wb3J0IEdyYXNzVGlsZSBmcm9tIFwiLi9HcmFzc1RpbGVcIjtcclxuaW1wb3J0IE9jZWFuVGlsZSBmcm9tIFwiLi9PY2VhblRpbGVcIjtcclxuXHJcbmNsYXNzIFRpbGVTZXJ2aWNlIHtcclxuXHJcbiAgY29weVRpbGUgPSBmdW5jdGlvbiAodGlsZTogVGlsZSkge1xyXG4gICAgbGV0IGNvcHk7XHJcbiAgICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5Ob25lKSB7XHJcbiAgICAgIGNvcHkgPSBuZXcgVGlsZSh0aWxlLnBvaW50LCB0aWxlLnR5cGUpO1xyXG4gICAgICBjb3B5LnNlbGVjdGVkID0gY29weS5zZWxlY3RlZDtcclxuICAgIH1cclxuICBcclxuICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLkdyYXNzKSB7XHJcbiAgICAgIGNvcHkgPSBuZXcgR3Jhc3NUaWxlKHRpbGUucG9pbnQpO1xyXG4gICAgICBjb3B5LnNlbGVjdGVkID0gY29weS5zZWxlY3RlZDtcclxuICAgIH1cclxuICBcclxuICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKSB7XHJcbiAgICAgIGNvcHkgPSBuZXcgT2NlYW5UaWxlKHRpbGUucG9pbnQpO1xyXG4gICAgICBjb3B5LnNlbGVjdGVkID0gY29weS5zZWxlY3RlZDtcclxuICAgIH1cclxuICBcclxuICAgIHJldHVybiBjb3B5O1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVGlsZSA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIHR5cGU6IFRpbGVUeXBlKSB7XHJcbiAgICBzd2l0Y2godHlwZSkge1xyXG4gICAgICBjYXNlIFRpbGVUeXBlLkdyYXNzOlxyXG4gICAgICAgIHJldHVybiBuZXcgR3Jhc3NUaWxlKHRpbGUucG9pbnQpO1xyXG4gICAgICBjYXNlIFRpbGVUeXBlLk9jZWFuOlxyXG4gICAgICAgIHJldHVybiBuZXcgT2NlYW5UaWxlKHRpbGUucG9pbnQpO1xyXG4gICAgICBjYXNlIFRpbGVUeXBlLk5vbmU6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaWxlKHRpbGUucG9pbnQsIFRpbGVUeXBlLk5vbmUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgaW5zdGFuY2UgPSBuZXcgVGlsZVNlcnZpY2UoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImVudW0gVGlsZVR5cGUge1xyXG4gIE5vbmUgPSAnTm9uZScsXHJcbiAgR3Jhc3MgPSAnR3Jhc3MnLFxyXG4gIEZvcmVzdCA9ICdGb3Jlc3QnLFxyXG4gIE9jZWFuID0gJ09jZWFuJyxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlsZVR5cGU7XHJcbiIsIlxyXG5pbXBvcnQgZ2VuZXJhdGVHdWlkIGZyb20gJy4uL2dlbmVyYXRlR3VpZCc7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vR3JpZC9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlVHlwZSc7XHJcbmltcG9ydCBQb3AgZnJvbSAnLi4vUG9wcy9Qb3AnO1xyXG5pbXBvcnQgKiBhcyBSZXNvdXJjZXMgZnJvbSAnLi4vUmVzb3VyY2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCBjbGFtcCBmcm9tICcuLi91dGlsJztcclxuXHJcbmNsYXNzIENpdHkge1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBpZDogc3RyaW5nO1xyXG4gIHRpbGU6IFRpbGU7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHBvcHVsYXRpb246IG51bWJlcjtcclxuICBkaXN0YW5jZXM6IGFueVtdO1xyXG4gIHN0YXRpYyBhZGQ6ICh0aWxlOiBUaWxlLCBlbnRpdGllczogYW55KSA9PiBib29sZWFuO1xyXG4gIHJvYWROZXR3b3JrczogYW55O1xyXG4gIHBvcHM6IFBvcFtdO1xyXG4gIHJlc291cmNlczogYW55O1xyXG4gIFxyXG4gIHN1cHBseUFuZERlbWFuZDogYW55ID0ge307XHJcbiAgc3RhdGljIHJlbW92ZTogKGdyaWRUaWxlOiBUaWxlKSA9PiB2b2lkO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0aWxlOiBUaWxlLCBuYW1lOiBzdHJpbmcsIHBvcHVsYXRpb246IG51bWJlcikge1xyXG4gICAgdGhpcy50eXBlID0gJ2NpdHknO1xyXG4gICAgdGhpcy5pZCA9IGdlbmVyYXRlR3VpZCgpO1xyXG4gICAgdGhpcy50aWxlID0gdGlsZTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnBvcHVsYXRpb24gPSBwb3B1bGF0aW9uO1xyXG4gICAgdGhpcy5wb3BzID0gW107XHJcbiAgICB0aGlzLmRpc3RhbmNlcyA9IFtdO1xyXG5cclxuICAgIHRoaXMucmVzb3VyY2VzID0ge307XHJcblxyXG4gICAgbGV0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRpbGUpXHJcbiAgICAgIC5maWx0ZXIoKG5laWdoYm91cjogYW55KSA9PiBuZWlnaGJvdXIuY2l0eSB8fCBuZWlnaGJvdXIucm9hZClcclxuICAgICAgLm1hcCh4ID0+IHgucm9hZCB8fCB4LmNpdHkpO1xyXG5cclxuICAgIHRoaXMucm9hZE5ldHdvcmtzID0gW107XHJcbiAgICBcclxuICAgIG5laWdoYm91cnMuZm9yRWFjaCgobmVpZ2hib3VyOiBhbnkpID0+IHtcclxuICAgICAgaWYgKG5laWdoYm91ci50eXBlID09PSAncm9hZCcpIHtcclxuICAgICAgICB0aGlzLmFkZE5ldHdvcmsobmVpZ2hib3VyLnJvYWROZXR3b3JrKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbmVpZ2hib3Vycy5maWx0ZXIoKHg6IGFueSkgPT4geCAmJiB4LnJvYWQpLmZvckVhY2goKG5laWdoYm91cjogYW55KSA9PiB7XHJcbiAgICAgIG5laWdoYm91ci5yb2FkLnVwZGF0ZVNoYXBlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGVxdWFscyhvdGhlckNpdHk6IGFueSkge1xyXG4gICAgcmV0dXJuIG90aGVyQ2l0eS5pZCA9PT0gdGhpcy5pZDtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcclxuICAgIGNvbnN0IGJhc2VYID0gdGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemU7XHJcbiAgICBjb25zdCBiYXNlWSA9IHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplO1xyXG4gICAgY29udGV4dC5maWxsUmVjdChiYXNlWCwgIGJhc2VZICsgdGlsZVNpemUvMiwgdGlsZVNpemUvNCwgdGlsZVNpemUvMik7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KGJhc2VYICsgdGlsZVNpemUvNCwgIGJhc2VZICsgdGlsZVNpemUvNCwgdGlsZVNpemUvMiwgMyp0aWxlU2l6ZS80KTtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoYmFzZVggKyAzKnRpbGVTaXplLzQsICBiYXNlWSArIHRpbGVTaXplLzIsIHRpbGVTaXplLzQsIHRpbGVTaXplLzIpO1xyXG4gXHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgY29udGV4dC5zdHJva2VSZWN0KCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggLSAxKSAqIHRpbGVTaXplLCAodGhpcy50aWxlLmRyYXdpbmdQb2ludC55IC0gMSkgKiB0aWxlU2l6ZSwgdGlsZVNpemUqMywgdGlsZVNpemUqMyk7XHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyNGRkZGRkYnO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICBjb25zdCBkaXN0YW5jZXMgPSB0aGlzLmRpc3RhbmNlcy5tYXAoeCA9PiBgSWQ6ICR7eC5jaXR5LmlkfSBkaXN0YW5jZTogJHt4LmRpc3RhbmNlfVxcbmApO1xyXG4gICAgY29uc3QgcG9wcyA9IHRoaXMucG9wcy5tYXAoeCA9PiBgJHt4LnR5cGV9LCAke3gubnVtYmVyfWApLmpvaW4oJywgJyk7XHJcbiAgICBjb25zdCByZXNvdXJjZXMgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnJlc291cmNlcyk7XHJcbiAgICByZXR1cm4gYCR7dGhpcy5pZH06ICR7dGhpcy5wb3B1bGF0aW9ufVxcbiAke2Rpc3RhbmNlc30gJHtwb3BzfSAke3Jlc291cmNlc31gO1xyXG4gIH1cclxuXHJcbiAgYWRkTmV0d29yayhuZXR3b3JrOiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5yb2FkTmV0d29ya3Muc29tZSgoeDogYW55KSA9PiB4LmlkID09PSBuZXR3b3JrLmlkKSkge1xyXG4gICAgICB0aGlzLnJvYWROZXR3b3Jrcy5wdXNoKG5ldHdvcmspO1xyXG4gICAgICBuZXR3b3JrLmNpdGllcy5wdXNoKHRoaXMpO1xyXG4gICAgICBuZXR3b3JrLmZpbmREaXN0YW5jZXNGb3JDaXRpZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMucmVzb3VyY2VzKS5mb3JFYWNoKChrZXk6YW55KSA9PiB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucmVzb3VyY2VzW2tleV0pLmZvckVhY2goKGsyOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLnJlc291cmNlc1trZXldW2syXS5kZXNpcmUgPSAwO1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VzW2tleV1bazJdLmFtb3VudCA9IDA7XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBvcHMuZm9yRWFjaChwb3AgPT4ge1xyXG4gICAgICBjb25zdCB0eXBlID0gcG9wLnR5cGU7XHJcbiAgICAgIC8vICBnYXRoZXIgcmVzb3VyY2VzXHJcbiAgICAgIHBvcC51cGRhdGUodGhpcy5yZXNvdXJjZXNbdHlwZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy5zdXBwbHlBbmREZW1hbmQpLmZvckVhY2goKHg6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS5zdXBwbHkgPSAwO1xyXG4gICAgICB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS5kZW1hbmQgPSAwO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gIHdvcmsgb3V0IHN1cHBseSBhbmQgZGVtYW5kXHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLnJlc291cmNlcykuZm9yRWFjaCgocG9wS2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5yZXNvdXJjZXNbcG9wS2V5XSkuZm9yRWFjaCgocmVzb3VyY2VLZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gdGhpcy5yZXNvdXJjZXNbcG9wS2V5XVtyZXNvdXJjZUtleV1cclxuICAgICAgICBpZiAoIXRoaXMuc3VwcGx5QW5kRGVtYW5kW3Jlc291cmNlS2V5XSkge1xyXG4gICAgICAgICAgdGhpcy5zdXBwbHlBbmREZW1hbmRbcmVzb3VyY2VLZXldID0geyBzdXBwbHk6IDAsIGRlbWFuZDogMCwgdmFsdWU6IHJlc291cmNlLnZhbHVlLCBtYXhWYWx1ZTogdGhpcy5yZXNvdXJjZXNbcG9wS2V5XVtyZXNvdXJjZUtleV0ubWF4VmFsdWUgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdXBwbHlBbmREZW1hbmRbcmVzb3VyY2VLZXldLmRlbWFuZCArPSByZXNvdXJjZS5hbW91bnQgPCAwID8gTWF0aC5hYnMocmVzb3VyY2UuYW1vdW50KSA6IDA7XHJcbiAgICAgICAgdGhpcy5zdXBwbHlBbmREZW1hbmRbcmVzb3VyY2VLZXldLnN1cHBseSArPSByZXNvdXJjZS5hbW91bnQgPiAwID8gTWF0aC5hYnMocmVzb3VyY2UuYW1vdW50KSA6IDBcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLnN1cHBseUFuZERlbWFuZCkuZm9yRWFjaCgoeDogYW55KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnN1cHBseUFuZERlbWFuZFt4XS5zdXBwbHkgPiB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS5kZW1hbmQpIHtcclxuICAgICAgICB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS52YWx1ZSAqPSAwLjk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zdXBwbHlBbmREZW1hbmRbeF0uc3VwcGx5IDwgdGhpcy5zdXBwbHlBbmREZW1hbmRbeF0uZGVtYW5kKXtcclxuICAgICAgICB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS52YWx1ZSAqPSAxLjE7XHJcbiAgICAgICAgdGhpcy5zdXBwbHlBbmREZW1hbmRbeF0udmFsdWUgPSB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS52YWx1ZSA+IHRoaXMuc3VwcGx5QW5kRGVtYW5kW3hdLm1heFZhbHVlID8gXHJcbiAgICAgICAgdGhpcy5zdXBwbHlBbmREZW1hbmRbeF0ubWF4VmFsdWUgOiB0aGlzLnN1cHBseUFuZERlbWFuZFt4XS52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhgU3VwcGx5IGFuZCBkZW1hbmQ6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5zdXBwbHlBbmREZW1hbmQpfWApO1xyXG5cclxuICAgIGNvbnN0IGJ1eWluZzogYW55ID0ge307IC8vICBrZXlzIG9mIHJlc291cmNlIHR5cGVzO1xyXG4gICAgY29uc3Qgc2VsbGluZzogYW55ID0ge307XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLnJlc291cmNlcykuZm9yRWFjaCgocG9wS2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgcG9wID0gdGhpcy5yZXNvdXJjZXNbcG9wS2V5XTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKHBvcClcclxuICAgICAgICAuZmlsdGVyKChyZXNvdXJjZUtleTogc3RyaW5nKSA9PiBwb3BbcmVzb3VyY2VLZXldLmFtb3VudCA8IDApXHJcbiAgICAgICAgLmZvckVhY2goKHJlc291cmNlS2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGlmICghYnV5aW5nW3Jlc291cmNlS2V5XSkge1xyXG4gICAgICAgICAgICBidXlpbmdbcmVzb3VyY2VLZXldID0gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBzZWxsaW5nUG9wID0gdGhpcy5yZXNvdXJjZXNbcG9wS2V5XTtcclxuICAgICAgICAgIGJ1eWluZ1tyZXNvdXJjZUtleV0ucHVzaCh7IFxyXG4gICAgICAgICAgICBwb3BLZXksXHJcbiAgICAgICAgICAgIGFtb3VudDogTWF0aC5hYnMocG9wW3Jlc291cmNlS2V5XS5hbW91bnQgKSxcclxuICAgICAgICAgICAgcHJpb3JpdHk6IHBvcFtyZXNvdXJjZUtleV0ucHJpb3JpdHksXHJcbiAgICAgICAgICAgIHNlbGxpbmc6IE9iamVjdC5rZXlzKHNlbGxpbmdQb3ApLm1hcCgoa2V5OiBhbnkpID0+IHNlbGxpbmdQb3Bba2V5XSkuZmlsdGVyKCh4OiBhbnkpID0+IHguYW1vdW50ID4gMClcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhwb3ApXHJcbiAgICAgICAgLmZpbHRlcigocmVzb3VyY2VLZXk6IHN0cmluZykgPT4gcG9wW3Jlc291cmNlS2V5XS5hbW91bnQgPiAwKVxyXG4gICAgICAgIC5mb3JFYWNoKChyZXNvdXJjZUtleTogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXNlbGxpbmdbcmVzb3VyY2VLZXldKSB7XHJcbiAgICAgICAgICAgIHNlbGxpbmdbcmVzb3VyY2VLZXldID0gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBzZWxsaW5nUG9wID0gdGhpcy5yZXNvdXJjZXNbcG9wS2V5XTtcclxuICAgICAgICAgIHNlbGxpbmdbcmVzb3VyY2VLZXldLnB1c2goe1xyXG4gICAgICAgICAgICBwb3BLZXksXHJcbiAgICAgICAgICAgIHNlbGxpbmc6IHNlbGxpbmdQb3BbcmVzb3VyY2VLZXldLFxyXG4gICAgICAgICAgICBidXlpbmc6IE9iamVjdC5rZXlzKHNlbGxpbmdQb3ApLm1hcCgoa2V5OiBhbnkpID0+IHNlbGxpbmdQb3Bba2V5XSkuZmlsdGVyKCh4OiBhbnkpID0+IHguYW1vdW50IDwgMClcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoYnV5aW5nKS5mb3JFYWNoKChyZXNvdXJjZUtleTogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsbGluZ1BvcHMgPSBzZWxsaW5nW3Jlc291cmNlS2V5XTtcclxuICAgICAgICBjb25zdCB2YWx1ZVdhbnRlZCA9IGJ1eWluZy5hbW91bnQgKiB0aGlzLnN1cHBseUFuZERlbWFuZFtyZXNvdXJjZUtleV0udmFsdWU7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc291cmNlS2V5KTtcclxuICAgICAgICBjb25zdCBwb29sZWRSZXNvdXJjZXM6IGFueSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHJlc291cmNlUHJpb3JpdGllczogYW55ID0ge307XHJcbiAgICAgICAgLy8gIGl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBvcCBpbiB0aGUgc2VsbGluZyBhbmQgdHJ5IHRvIGdldCB0aGUgYW1vdW50IHdlIHdhbnQuXHJcbiAgICAgICAgc2VsbGluZ1BvcHMgJiYgc2VsbGluZ1BvcHMuZm9yRWFjaCgoc2VsbGluZ1BvcDogYW55KSA9PiB7XHJcbiAgICAgICAgICBwb29sZWRSZXNvdXJjZXMucHVzaCh7IHBvcEtleTogc2VsbGluZ1BvcC5wb3BLZXksIGFtb3VudDogc2VsbGluZ1BvcC5zZWxsaW5nLmFtb3VudCB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnV5aW5nW3Jlc291cmNlS2V5XS5mb3JFYWNoKChidXllcjogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBhbW91bnRXYW50ZWQgPSBidXllci5hbW91bnQ7XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZVdhbnRlZCA9IGFtb3VudFdhbnRlZCAqIHRoaXMuc3VwcGx5QW5kRGVtYW5kW3Jlc291cmNlS2V5XS52YWx1ZTtcclxuICAgICAgICAgIGNvbnN0IHZhbHVlQm91Z2h0ID0gMDtcclxuXHJcbiAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbjogYW55ID0geyBib3VnaHQ6IDAsIHNvbGQ6IFtdIH07XHJcbiAgICAgICAgICBidXllci5zZWxsaW5nLmZvckVhY2goKHNlbGxpbmdSZXNvdXJjZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZUJvdWdodCA+PSB2YWx1ZVdhbnRlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgLy8gdmFsdWUgb2YgdGhlIHRoaW5nIHRoZSBidXllciBpcyBzZWxsaW5nLlxyXG4gICAgICAgICAgICBjb25zdCBzZWxsaW5nVmFsdWUgPSBjbGFtcCh0aGlzLnN1cHBseUFuZERlbWFuZFtzZWxsaW5nUmVzb3VyY2UudHlwZV0udmFsdWUgKlxyXG4gICAgICAgICAgICAgIHNlbGxpbmdSZXNvdXJjZS5hbW91bnQsIHZhbHVlV2FudGVkKTtcclxuXHJcbiAgICAgICAgICAgIC8vICBhbW91bnQgYm91Z2h0IGlzIGVxdWFsIHRvIHNlbGxpbmcgdmFsdWUgZGl2aWRlZCBieSB0aGUgYW1vdW50XHJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLmJvdWdodCArPSBzZWxsaW5nVmFsdWUgLyB0aGlzLnN1cHBseUFuZERlbWFuZFtzZWxsaW5nUmVzb3VyY2UudHlwZV0udmFsdWU7XHJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLnNvbGQucHVzaCh7IHR5cGU6IHNlbGxpbmdSZXNvdXJjZS50eXBlLCBhbW91bnQ6IHNlbGxpbmdWYWx1ZS9zZWxsaW5nUmVzb3VyY2UuYW1vdW50fSkgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBUcmFuc2FjdGlvbjogJHtKU09OLnN0cmluZ2lmeSh0cmFuc2FjdGlvbil9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocG9vbGVkUmVzb3VyY2VzKSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcbiAgICAvLyAgYWRqdXN0IHZhbHVlc1xyXG4gICAgLy8gIGRvIHRyYWRlc1xyXG5cclxuICAgIC8vICB3b3JrIG91dCBkZXNpcmVzXHJcbiAgICAvLyAgd29yayBvdXQgdHJhZGVzXHJcbiAgICAvLyAgcmVkaXN0cmlidXRlIHJlc291cmNlc1xyXG5cclxuICAgIC8vICAgT2JqZWN0LmtleXMocG9wLnJlc291cmNlcykuZm9yRWFjaCgocmVzb3VyY2VLZXk6IHN0cmluZykgPT4ge1xyXG4gICAgLy8gICAgIGlmICh0aGlzLnJlc291cmNlc1tyZXNvdXJjZUtleV0pIHtcclxuICAgIC8vICAgICAgIHRoaXMucmVzb3VyY2VzW3Jlc291cmNlS2V5XS5hbW91bnQgKz0gcG9wLnJlc291cmNlc1tyZXNvdXJjZUtleV0uYW1vdW50O1xyXG4gICAgLy8gICAgICAgcG9wLnJlc291cmNlc1tyZXNvdXJjZUtleV0uYW1vdW50ID0gMDtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgdGhpcy5yZXNvdXJjZXNbcmVzb3VyY2VLZXldID0geyBhbW91bnQ6IHBvcC5yZXNvdXJjZXNbcmVzb3VyY2VLZXldLmFtb3VudCB9O1xyXG4gICAgLy8gICAgICAgcG9wLnJlc291cmNlc1tyZXNvdXJjZUtleV0uYW1vdW50ID0gMDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuQ2l0eS5yZW1vdmUgPSBmdW5jdGlvbihncmlkVGlsZTogVGlsZSkge1xyXG4gIFxyXG4gIGdyaWRUaWxlLmNpdHkgPSBudWxsO1xyXG4gIC8vICBSZW1vdmUgZnJvbSBuZWlnaGJvdXJpbmcgcm9hZG5ldHdvcmtzIGFuZCByZWNhbGN1bGF0ZSBuZXR3b3Jrc1xyXG59XHJcblxyXG5DaXR5LmFkZCA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnkpIHtcclxuICBpZiAoIXRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUuY2l0eSB8fCB0aWxlLnJvYWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3QgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmdldFJlZ2lvbih0aWxlLnBvaW50LCAyKTtcclxuXHJcbiAgaWYgKG5laWdoYm91cnMuZmlsdGVyKCh4OiBhbnkpID0+IHguY2l0eSkubGVuZ3RoID4gMCkgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IGNpdHkgPSBuZXcgQ2l0eSh0aWxlLCAnTmV3IENpdHknLCAxKTtcclxuICB0aWxlLmNpdHkgPSBjaXR5O1xyXG4gIGVudGl0aWVzLmNpdGllcy5wdXNoKGNpdHkpO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5IiwiXHJcbmNsYXNzIFBvaW50IHtcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG4gIHN0YXRpYyBjb3B5OiAocG9pbnQ6IFBvaW50KSA9PiBQb2ludDtcclxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICBlcXVhbHMob3RoZXJQb2ludDogUG9pbnQpIHtcclxuICAgIHJldHVybiB0aGlzLnggPT09IG90aGVyUG9pbnQueCAmJiB0aGlzLnkgPT09IG90aGVyUG9pbnQueTtcclxuICB9XHJcbn1cclxuXHJcblBvaW50LmNvcHkgPSBmdW5jdGlvbihwb2ludDogUG9pbnQpIHtcclxuICByZXR1cm4gbmV3IFBvaW50KHBvaW50LngsIHBvaW50LnkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQb2ludDsiLCJcclxuaW1wb3J0IFJvYWROZXR3b3JrIGZyb20gJy4vUm9hZE5ldHdvcmsnO1xyXG5pbXBvcnQgQ2l0eSBmcm9tICcuL0NpdHknO1xyXG5pbXBvcnQgZ2VuZXJhdGVHdWlkIGZyb20gJy4uL2dlbmVyYXRlR3VpZCc7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vR3JpZC9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlVHlwZSc7XHJcblxyXG5jb25zdCBTaGFwZXMgPSB7XHJcbiAgaXNvbGF0ZWQ6ICdpc29sYXRlZCcsXHJcbiAgdG9wOiAndG9wJyxcclxuICBsZWZ0OiAnbGVmdCcsXHJcbiAgYm90dG9tOiAnYm90dG9tJyxcclxuICByaWdodDogJ3JpZ2h0JyxcclxuICB2ZXJ0aWNhbDogJ3ZlcnRpY2FsJyxcclxuICBob3Jpem9udGFsOiAnaG9yaXpvbnRhbCcsXHJcbiAgdG9wUmlnaHQ6ICd0b3BSaWdodCcsXHJcbiAgdG9wTGVmdDogJ3RvcExlZnQnLFxyXG4gIGJvdHRvbVJpZ2h0OiAnYm90dG9tUmlnaHQnLFxyXG4gIGJvdHRvbUxlZnQ6ICdib3R0b21MZWZ0JyxcclxuICBob3Jpem9udGFsQm90dG9tOiAnaG9yaXpvbnRhbEJvdHRvbScsXHJcbiAgaG9yaXpvbnRhbFRvcDogJ2hvcml6b250YWxUb3AnLFxyXG4gIHZlcnRpY2FsTGVmdDogJ3ZlcnRpY2FsTGVmdCcsXHJcbiAgdmVydGljYWxSaWdodDogJ3ZlcnRpY2FsUmlnaHQnLFxyXG4gIGNyb3NzOiAnY3Jvc3MnXHJcbn07XHJcblxyXG5cclxuY2xhc3MgUm9hZCB7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgdGlsZTogVGlsZTtcclxuICBzaGFwZTogYW55O1xyXG4gIHN0YXRpYyBhZGQ6ICh0aWxlOiBUaWxlKSA9PiBib29sZWFuO1xyXG4gIHN0YXRpYyBmaW5kU2hhcGU6IGFueTtcclxuICByb2FkTmV0d29yazogUm9hZE5ldHdvcms7XHJcbiAgc3RhdGljIHJlbW92ZTogKGdyaWRUaWxlOiBUaWxlLCByb2FkOiBSb2FkKSA9PiB2b2lkO1xyXG4gIHN0YXRpYyBmaW5kQ29ubmVjdGl2aXR5OiAocm9hZHM6IGFueSkgPT4gdm9pZDtcclxuICBjb25zdHJ1Y3Rvcih0aWxlOiBUaWxlKSB7XHJcbiAgICB0aGlzLnR5cGUgPSAncm9hZCc7XHJcbiAgICB0aGlzLmlkID0gZ2VuZXJhdGVHdWlkKCk7XHJcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xyXG5cclxuICAgIGxldCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aWxlKTtcclxuXHJcbiAgICB0aGlzLnNoYXBlID0gUm9hZC5maW5kU2hhcGUobmVpZ2hib3Vycyk7XHJcbiAgICBuZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIobmVpZ2hib3VyID0+IG5laWdoYm91ci5jaXR5IHx8IG5laWdoYm91ci5yb2FkKVxyXG4gICAgICAubWFwKHggPT4geC5yb2FkIHx8IHguY2l0eSk7XHJcblxyXG4gICAgY29uc3QgbmVpZ2hib3VyaW5nUm9hZHMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHggaW5zdGFuY2VvZiBSb2FkKVxyXG4gICAgY29uc3QgbmVpZ2hib3VyaW5nUm9hZE5ldHdvcmtzID0gbmVpZ2hib3VyaW5nUm9hZHMubWFwKHggPT4geC5yb2FkTmV0d29yayk7XHJcblxyXG4gICAgaWYgKG5laWdoYm91cmluZ1JvYWROZXR3b3Jrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5tZXJnZU5ldHdvcmtzKG5laWdoYm91cmluZ1JvYWROZXR3b3Jrcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJvYWROZXR3b3JrID0gbmV3IFJvYWROZXR3b3JrKCk7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmsuYWRkUm9hZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJpbmdDaXRpZXMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHggaW5zdGFuY2VvZiBDaXR5KTtcclxuICAgIG5laWdoYm91cmluZ0NpdGllcy5mb3JFYWNoKGNpdHkgPT4ge1xyXG4gICAgICBjaXR5LmFkZE5ldHdvcmsodGhpcy5yb2FkTmV0d29yayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBuZWlnaGJvdXJpbmdSb2Fkcy5mb3JFYWNoKHJvYWQgPT4ge1xyXG4gICAgICByb2FkLm5laWdoYm91cnMucHVzaCh0aGlzKTtcclxuICAgICAgcm9hZC5zaGFwZSA9IFJvYWQuZmluZFNoYXBlKHJvYWQubmVpZ2hib3Vycyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGVxdWFscyhvdGhlclJvYWQ6IFJvYWQpIHtcclxuICAgIHJldHVybiB0aGlzLnRpbGUuZXF1YWxzKG90aGVyUm9hZC50aWxlKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGAke3RoaXMudHlwZX06ICR7dGhpcy5zaGFwZX1gO1xyXG4gIH1cclxuICBcclxuICBtZXJnZU5ldHdvcmtzKG5ldHdvcmtzOiBhbnlbXSkge1xyXG4gICAgY29uc3QgZmlyc3QgPSBuZXR3b3Jrcy5wb3AoKTtcclxuICAgIGlmICghdGhpcy5yb2FkTmV0d29yaykge1xyXG4gICAgICBmaXJzdC5hZGRSb2FkKHRoaXMpO1xyXG4gICAgICB0aGlzLnJvYWROZXR3b3JrID0gZmlyc3Q7XHJcbiAgICB9XHJcbiAgICBmaXJzdC5tZXJnZShuZXR3b3Jrcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTaGFwZSgpIHtcclxuICAgIGNvbnN0IG4gPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRoaXMudGlsZSk7XHJcbiAgICB0aGlzLnNoYXBlID0gUm9hZC5maW5kU2hhcGUobik7XHJcbiAgfVxyXG5cclxuICBkcmF3SG9yaXpvbnRhbChjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aWxlU2l6ZSwgdGlsZVNpemUvNCk7XHJcbiAgfVxyXG5cclxuICBkcmF3VmVydGljYWwoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSwgdGlsZVNpemUvNCwgdGlsZVNpemUpO1xyXG4gIH1cclxuXHJcbiAgZHJhd1RvcChjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHsgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSwgdGlsZVNpemUvNCwgNSp0aWxlU2l6ZS84KTtcclxuICB9XHJcbiAgXHJcbiAgZHJhd0JvdHRvbShjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHsgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgdGlsZVNpemUvNCwgdGlsZVNpemUpO1xyXG4gIH1cclxuICBcclxuICBkcmF3TGVmdChjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHsgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplLCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgNSp0aWxlU2l6ZS84LCB0aWxlU2l6ZS80KTtcclxuICB9XHJcbiAgXHJcbiAgZHJhd1JpZ2h0KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikgeyBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyB0aWxlU2l6ZS8yLCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgMyp0aWxlU2l6ZS80LCB0aWxlU2l6ZS80KTtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjYzQ4YjIzJztcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuc2hhcGUpIHtcclxuICAgICAgY2FzZSBTaGFwZXMuaXNvbGF0ZWQ6XHJcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSArIHRpbGVTaXplLzIsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgdGlsZVNpemUvMiwgdGlsZVNpemUvNCwgdGlsZVNpemUvNCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgXHJcbiAgICAgIGNhc2UgU2hhcGVzLnZlcnRpY2FsOlxyXG4gICAgICAgIHRoaXMuZHJhd1ZlcnRpY2FsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgXHJcbiAgICAgIGNhc2UgU2hhcGVzLmhvcml6b250YWw6XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgXHJcbiAgICAgIGNhc2UgU2hhcGVzLmxlZnQ6XHJcbiAgICAgICAgdGhpcy5kcmF3TGVmdChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5yaWdodDpcclxuICAgICAgICB0aGlzLmRyYXdSaWdodChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy50b3A6XHJcbiAgICAgICAgdGhpcy5kcmF3VG9wKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmJvdHRvbTpcclxuICAgICAgICB0aGlzLmRyYXdCb3R0b20oY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMuY3Jvc3M6XHJcbiAgICAgICAgdGhpcy5kcmF3VmVydGljYWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0hvcml6b250YWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMudG9wTGVmdDpcclxuICAgICAgICB0aGlzLmRyYXdUb3AoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0xlZnQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMudG9wUmlnaHQ6XHJcbiAgICAgICAgdGhpcy5kcmF3VG9wKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdSaWdodChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5ib3R0b21MZWZ0OlxyXG4gICAgICAgIHRoaXMuZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3TGVmdChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5ib3R0b21SaWdodDpcclxuICAgICAgICB0aGlzLmRyYXdCb3R0b20oY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnZlcnRpY2FsTGVmdDpcclxuICAgICAgICB0aGlzLmRyYXdWZXJ0aWNhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3TGVmdChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy52ZXJ0aWNhbFJpZ2h0OlxyXG4gICAgICAgIHRoaXMuZHJhd1ZlcnRpY2FsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdSaWdodChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5ob3Jpem9udGFsVG9wOlxyXG4gICAgICAgIHRoaXMuZHJhd0hvcml6b250YWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1RvcChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5ob3Jpem9udGFsQm90dG9tOlxyXG4gICAgICAgIHRoaXMuZHJhd0hvcml6b250YWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5Sb2FkLnJlbW92ZSA9IGZ1bmN0aW9uIChncmlkVGlsZTogVGlsZSwgcm9hZDogUm9hZCkge1xyXG4gIGdyaWRUaWxlLnJvYWQgPSBudWxsO1xyXG5cclxuICAvLyAgQ2FzZXM6XHJcbiAgLy8gICAgc2luZ2xlIG5laWdoYm91cmluZyByb2FkXHJcbiAgLy8gICAgICByZW1vdmUgcm9hZCBmcm9tIG5laWdoYm91ciBhbmQgZnJvbSBuZXR3b3JrXHJcbiAgLy8gICAgbXVsdGlwbGUgbmVpZ2hib3VyaW5nIHJvYWRzXHJcbiAgLy8gICAgICByZW1vdmUgcm9hZCBmcm9tIG5laWdoYm91cnMgXHJcbiAgLy8gICAgICBmb3IgZWFjaCBuZWlnaGJvdXJpbmcgbmV0d29yayByZXByb2Nlc3MgY29ubmVjdGl2aXR5XHJcbiAgLy8gICAgbmVpZ2hib3VyaW5nIGNpdHlcclxuICAvLyAgICAgIFJlbW92ZSByb2FkIGZyb20gbmVpZ2hib3Vyc1xyXG4gIC8vICAgICAgcHJvY2VzcyBjb25uZWN0aXZpdHkgdG8gY2hlY2sgaWYgdGhlIG5ldHdvcmsgc2hvdWxkIGJlIHJlbW92ZWRcclxuICAvLyByb2FkLm5laWdoYm91cnMuZm9yRWFjaChuZWlnaGJvdXIgPT4ge1xyXG4gIC8vICAgbmVpZ2hib3VyLm5laWdoYm91cnMgPSBuZWlnaGJvdXIubmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LmlkICE9PSBuZWlnaGJvdXIpO1xyXG4gIC8vIH0pXHJcbn1cclxuXHJcblJvYWQuZmluZENvbm5lY3Rpdml0eSA9IGZ1bmN0aW9uKHJvYWRzKSB7XHJcbiAgLy8gSWRlYSBpcyB0byBwZXJmb3JtIGEgc2VwZXJhdGUgYmZzIGluIHN0ZXAgb24gZWFjaCBwZWFjZSBvZiByb2FkIGFuZCBjaGVjayBjb25uZWN0aXZpdHkgYXQgZWFjaCBzdGVwXHJcbiAgLy8gSWYgdHdvIG5ldHdvcmtzIGNvbnRhaW4gdGhlIHNhbWUgbm9kZSB0aGVuIHRoZXkgYXJlIGNvbm5lY3RlZC5cclxuXHJcbiAgLy8gY29uc3Qgc2VhcmNoZXMgPSByb2Fkcy5tYXAoeCA9PiB7XHJcbiAgLy8gICBjb25zdCB2aXNpdGVkID0ge307XHJcbiAgLy8gICB2aXNpdGVkW3guaWRdID0gdHJ1ZTtcclxuICAvLyAgIHJldHVybiB7IGlzRmluaXNoZWQ6IGZhbHNlLCBlZGdlU2V0OiB4Lm5laWdoYm91cnMsIHZpc2l0ZWQsIGNvbm5lY3RlZDogW10gfTtcclxuICAvLyB9KTtcclxuXHJcbiAgLy8gd2hpbGUgKHNlYXJjaGVzLmZpbmQoeCA9PiB4LmlzRmluaXNoZWQpLmxlbmd0aCA+IDApIHtcclxuICAvLyAgIGNvbnNvbGUubG9nKCdJdGVyYXRpb24gMScpO1xyXG4gIC8vICAgc2VhcmNoZXMuZm9yRWFjaCh4ID0+IHguZmluaXNoZWQgPSB0cnVlKTtcclxuICAvLyB9XHJcbiAgLy8gIENvbnRpbnVlIHVudGlsIGFsbCBzZWFyY2hlcyBhcmUgY29tcGxldGUuXHJcbiAgLy8gIFRlc3QgZWFjaCBpdGVyYXRpb24gYW5kIHN0b3Agc2VhcmNoIGlmIG5lY2Vzc2FyeS5cclxufVxyXG5cclxuLy8gIFNhdmUgc3RhdGUgXHJcbi8vIFJvYWQuaW5jcmVtZW50YWxCZnMgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vIH1cclxuXHJcblxyXG5Sb2FkLmZpbmRTaGFwZSA9IGZ1bmN0aW9uIChuZWlnaGJvdXJzOiBUaWxlW10pIHtcclxuICBjb25zdCB0b3BOZWlnaGJvdXIgPSAobmVpZ2hib3Vyc1swXSAmJiAobmVpZ2hib3Vyc1swXS5yb2FkIHx8IG5laWdoYm91cnNbMF0uY2l0eSkpIHx8IG51bGw7XHJcbiAgY29uc3QgbGVmdE5laWdoYm91ciA9IChuZWlnaGJvdXJzWzFdICYmIChuZWlnaGJvdXJzWzFdLnJvYWQgfHwgbmVpZ2hib3Vyc1sxXS5jaXR5KSkgfHwgbnVsbDtcclxuICBjb25zdCByaWdodE5laWdoYm91ciA9IChuZWlnaGJvdXJzWzJdICYmIChuZWlnaGJvdXJzWzJdLnJvYWQgfHwgbmVpZ2hib3Vyc1syXS5jaXR5KSkgfHwgbnVsbDtcclxuICBjb25zdCBib3R0b21OZWlnaGJvdXIgPSAobmVpZ2hib3Vyc1szXSAmJiAobmVpZ2hib3Vyc1szXS5yb2FkIHx8IG5laWdoYm91cnNbM10uY2l0eSkpIHx8IG51bGw7XHJcblxyXG4gIGxldCBzaGFwZSA9IFNoYXBlcy5pc29sYXRlZDtcclxuICBcclxuICBpZiAodG9wTmVpZ2hib3VyKSB7XHJcbiAgICBpZiAobGVmdE5laWdoYm91cikge1xyXG4gICAgICBpZiAocmlnaHROZWlnaGJvdXIgJiYgYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMuY3Jvc3M7XHJcbiAgICAgICAgLy8gW3RvcE5laWdoYm91ciwgbGVmdE5laWdoYm91ciwgcmlnaHROZWlnaGJvdXIsIGJvdHRvbU5laWdoYm91cl0uZm9yRWFjaCh1cGRhdGVSb2FkKTtcclxuICAgICAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLmhvcml6b250YWxUb3A7XHJcbiAgICAgIH0gZWxzZSBpZiAoYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudmVydGljYWxMZWZ0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnRvcExlZnQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgICAgaWYgKGJvdHRvbU5laWdoYm91cikge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnZlcnRpY2FsUmlnaHQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudG9wUmlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChib3R0b21OZWlnaGJvdXIpIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy52ZXJ0aWNhbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy50b3A7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGJvdHRvbU5laWdoYm91cikge1xyXG4gIGlmIChsZWZ0TmVpZ2hib3VyKSB7XHJcbiAgICBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgICAgc2hhcGUgPSBTaGFwZXMuaG9yaXpvbnRhbEJvdHRvbTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoYXBlID0gU2hhcGVzLmJvdHRvbUxlZnQ7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgc2hhcGUgPSBTaGFwZXMuYm90dG9tUmlnaHQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNoYXBlID0gU2hhcGVzLmJvdHRvbTtcclxuICB9XHJcbiAgfSBlbHNlIGlmIChsZWZ0TmVpZ2hib3VyKSB7XHJcbiAgICBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgICAgc2hhcGUgPSBTaGFwZXMuaG9yaXpvbnRhbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoYXBlID0gU2hhcGVzLmxlZnQ7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgc2hhcGUgPSBTaGFwZXMucmlnaHQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2hhcGU7XHJcbn1cclxuXHJcblJvYWQuYWRkID0gZnVuY3Rpb24gKHRpbGU6IFRpbGUpIHtcclxuICBpZiAoIXRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUuY2l0eSB8fCB0aWxlLnJvYWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgdGlsZS5yb2FkID0gbmV3IFJvYWQodGlsZSk7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvYWQ7IiwiaW1wb3J0IGdlbmVyYXRlR3VpZCBmcm9tICcuLi9nZW5lcmF0ZUd1aWQnO1xyXG5pbXBvcnQgeyBncmlkU2VydmljZSB9IGZyb20gJy4uL0dyaWQvR3JpZFNlcnZpY2UnO1xyXG5pbXBvcnQgUm9hZCBmcm9tICcuL1JvYWQnO1xyXG5pbXBvcnQgQ2l0eSBmcm9tICcuL0NpdHknO1xyXG5cclxuY2xhc3MgUm9hZE5ldHdvcmsge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY2l0aWVzOiBhbnlbXTtcclxuICByb2FkczogYW55W107XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmlkID0gZ2VuZXJhdGVHdWlkKCk7XHJcbiAgICB0aGlzLmNpdGllcyA9IFtdO1xyXG4gICAgdGhpcy5yb2FkcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgYWRkUm9hZChyb2FkOiBSb2FkKSB7XHJcbiAgICB0aGlzLnJvYWRzLnB1c2gocm9hZCk7XHJcbiAgICByb2FkLnJvYWROZXR3b3JrID0gdGhpcztcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBJZDogJHt0aGlzLmlkfSwgQ2l0aWVzOiAke3RoaXMuY2l0aWVzLmxlbmd0aH0sIFJvYWRzOiAke3RoaXMucm9hZHMubGVuZ3RofWA7XHJcbiAgfVxyXG5cclxuICBhZGRDaXR5KGNpdHk6IENpdHkpIHtcclxuICAgIHRoaXMuY2l0aWVzLnB1c2goY2l0eSk7XHJcbiAgICBjaXR5LnJvYWROZXR3b3JrcyA9IHRoaXM7XHJcbiAgfVxyXG5cclxuICBtZXJnZShuZXR3b3JrczogUm9hZE5ldHdvcmtbXSkge1xyXG4gICAgbmV0d29ya3MuZm9yRWFjaChuZXR3b3JrID0+IHtcclxuICAgICAgbmV0d29yay5jaXRpZXMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuY2l0aWVzLmZpbmQoKGNpdHk6IENpdHkpID0+IGNpdHkuZXF1YWxzKHgpKSkge1xyXG4gICAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh4KTtcclxuICAgICAgICAgIHgucm9hZE5ldHdvcmsgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgXHJcbiAgICAgIC8vICBTaG91bGQgb3B0aW1pc2UgLSBzdG9yZSByb2FkcyBhcyBkaWN0aW9uYXJ5XHJcbiAgICAgIG5ldHdvcmsucm9hZHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMucm9hZHMuZmluZCgocm9hZDogUm9hZCkgPT4gcm9hZC5lcXVhbHMoeCkpKSB7XHJcbiAgICAgICAgICB0aGlzLnJvYWRzLnB1c2goeCk7XHJcbiAgICAgICAgICB4LnJvYWROZXR3b3JrID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgdGhpcy5maW5kRGlzdGFuY2VzRm9yQ2l0aWVzKCk7XHJcbiAgfVxyXG5cclxuICBmaW5kRGlzdGFuY2VzRm9yQ2l0aWVzKCkge1xyXG4gICAgLy8gIEZvciBlYWNoIGNpdHkgdG8gYSBiZnMgYW5kIGZpbmQgbmVpZ2hib3Vycy5cclxuICAgIHRoaXMuY2l0aWVzLmZvckVhY2goY2l0eSA9PiB7XHJcbiAgICAgIHRoaXMuZmluZERpc3RhbmNlcyhjaXR5KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGZpbmREaXN0YW5jZXMoY2l0eTogQ2l0eSkge1xyXG4gICAgY29uc3QgZGlzdGFuY2VzID0gW107XHJcbiAgICBsZXQgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnMoY2l0eS50aWxlKS5tYXAobm9kZSA9PiAoe25vZGUsIGRpc3RhbmNlOiAwIH0pKTtcclxuICAgIGNvbnN0IHZpc2l0ZWQ6IGFueSA9IHt9O1xyXG4gICAgdmlzaXRlZFtjaXR5LmlkXSA9IHRydWU7XHJcblxyXG4gICAgd2hpbGUobmVpZ2hib3Vycy5sZW5ndGggIT09IDApIHtcclxuICAgICAgLy8gIHZpc2l0IGVhY2ggbmVpZ2hib3VyXHJcbiAgICAgIGNvbnN0IG5laWdoYm91ciA9IG5laWdoYm91cnMucG9wKCk7XHJcbiAgICAgIGlmIChuZWlnaGJvdXIubm9kZS50eXBlID09PSAnY2l0eScpIHtcclxuICAgICAgICBkaXN0YW5jZXMucHVzaCh7Y2l0eSwgZGlzdGFuY2U6IG5laWdoYm91ci5kaXN0YW5jZSB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2aXNpdGVkW25laWdoYm91ci5ub2RlLmlkXSA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgbmVpZ2hib3Vyc05laWdoYm91cnMgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKG5laWdoYm91ci5ub2RlKVxyXG4gICAgICAgICAgICAuZmlsdGVyKHggPT4gIXZpc2l0ZWRbeC5pZF0pXHJcbiAgICAgICAgICAubWFwKHggPT4gKHsgbm9kZTogeCwgZGlzdGFuY2U6IG5laWdoYm91ci5kaXN0YW5jZSArIDEgfSkpO1xyXG4gICAgICAgIG5laWdoYm91cnMgPSBuZWlnaGJvdXJzLmNvbmNhdChuZWlnaGJvdXJzTmVpZ2hib3Vycyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNpdHkuZGlzdGFuY2VzID0gZGlzdGFuY2VzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm9hZE5ldHdvcms7XHJcbiIsImltcG9ydCBUaWxlIGZyb20gXCIuLi9NYXAvVGlsZXMvVGlsZVwiO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSBcIi4uL01hcC9UaWxlcy9UaWxlVHlwZVwiO1xyXG5cclxuY2xhc3MgVW5pdCB7XHJcbiAgdGlsZTogVGlsZTtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgc3RhdGljIGFkZDogKHNlbGVjdGVkVGlsZTogVGlsZSkgPT4gYm9vbGVhbjtcclxuICBjb25zdHJ1Y3Rvcih0aWxlOiBhbnksIG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy50aWxlID0gdGlsZTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnI0ZGMDAwMCc7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgdGlsZVNpemUvNCwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyB0aWxlU2l6ZS80LCB0aWxlU2l6ZS8yLCAzKnRpbGVTaXplLzQpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYFVuaXQ6ICR7dGhpcy5uYW1lfWA7XHJcbiAgfVxyXG59XHJcblxyXG5Vbml0LmFkZCA9IGZ1bmN0aW9uKHNlbGVjdGVkVGlsZTogVGlsZSkgeyAgXHJcbiAgaWYgKCFzZWxlY3RlZFRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHNlbGVjdGVkVGlsZS5jaXR5IHx8IHNlbGVjdGVkVGlsZS5yb2FkIHx8IHNlbGVjdGVkVGlsZS51bml0KSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChzZWxlY3RlZFRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHJldHVybiBmYWxzZTtcclxuICBzZWxlY3RlZFRpbGUudW5pdCA9IG5ldyBVbml0KHNlbGVjdGVkVGlsZSwgJ05ldyBVbml0Jyk7XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFVuaXQiLCJpbXBvcnQgUG9wIGZyb20gJy4vUG9wJztcclxuaW1wb3J0ICogYXMgUmVzb3VyY2VzIGZyb20gJy4uL1Jlc291cmNlcy9SZXNvdXJjZXMnO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZSc7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZVR5cGUnO1xyXG5pbXBvcnQgeyBIb3VzZSB9IGZyb20gJy4uL0ltcHJvdmVtZW50L0ltcHJvdmVtZW50cyc7XHJcbmltcG9ydCBQcmlvcml0aWVzIGZyb20gJy4uL1Jlc291cmNlcy9Qcmlvcml0aWVzJztcclxuXHJcbmNvbnN0IHJlc291cmNlczogYW55ID0ge307XHJcbnJlc291cmNlc1tSZXNvdXJjZXMuRm9vZC5uYW1lXSA9IHsgYW1vdW50OiAxLCByZXNvdXJjZTogUmVzb3VyY2VzLkZvb2QgfTtcclxucmVzb3VyY2VzW1Jlc291cmNlcy5Xb29kLm5hbWVdID0geyBhbW91bnQ6IDEsIHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgfTtcclxucmVzb3VyY2VzW1Jlc291cmNlcy5GaWJyZS5uYW1lXSA9IHsgYW1vdW50OiAxLCByZXNvdXJjZTogUmVzb3VyY2VzLkZpYnJlIH07XHJcbnJlc291cmNlc1tSZXNvdXJjZXMuQmFzaWNUb29scy5uYW1lXSA9IHsgYW1vdW50OiAyLCByZXNvdXJjZTogUmVzb3VyY2VzLkJhc2ljVG9vbHMgfTtcclxuXHJcbmNvbnN0IG5lZWRzOiAgYW55ID0ge307XHJcbm5lZWRzW1Jlc291cmNlcy5Gb29kLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkZvb2QsIGFtb3VudDogMSwgcHJpb3JpdHk6IFByaW9yaXRpZXMuQ3JpdGljYWwgfTtcclxubmVlZHNbUmVzb3VyY2VzLldvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAwLjEsIHByaW9yaXR5OiBQcmlvcml0aWVzLldvcmtpbmcgfTtcclxubmVlZHNbUmVzb3VyY2VzLkZpYnJlLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkZpYnJlLCBhbW91bnQ6IDAuMSwgcHJpb3JpdHk6IFByaW9yaXRpZXMuV29ya2luZyB9O1xyXG5uZWVkc1tSZXNvdXJjZXMuQmFzaWNUb29scy5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5CYXNpY1Rvb2xzLCBhbW91bnQ6IDAuMSwgcHJpb3JpdHk6IFByaW9yaXRpZXMuV2FudCB9O1xyXG5cclxuY29uc3QgZGVzaXJlczogYW55ID0ge307XHJcbmRlc2lyZXNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuRm9vZCwgYW1vdW50OiA1IH07XHJcbmRlc2lyZXNbUmVzb3VyY2VzLldvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAxLjUgfTtcclxuZGVzaXJlc1tSZXNvdXJjZXMuQmFzaWNUb29scy5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5CYXNpY1Rvb2xzLCBhbW91bnQ6IDEuNSB9O1xyXG5kZXNpcmVzW1Jlc291cmNlcy5GaWJyZS5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5GaWJyZSwgYW1vdW50OiAxLjUgfTtcclxuXHJcbi8vICBtdWx0aXBseVxyXG5cclxuY29uc3QgcHJvZHVjZXM6IGFueSA9IHt9O1xyXG5cclxucHJvZHVjZXNbUmVzb3VyY2VzLkJhc2ljVG9vbHMubmFtZV0gPSB7IFxyXG4gIHR5cGU6ICdjcmFmdCcsXHJcbiAgcmVzb3VyY2U6IFJlc291cmNlcy5CYXNpY1Rvb2xzLFxyXG4gIGVmZmljaWVuY3k6IDEsXHJcbiAgcmVxdWlyZXM6XHJcbiAgICB7XHJcbiAgICAgIFtSZXNvdXJjZXMuV29vZC5uYW1lXTogMSxcclxuICAgICAgW1Jlc291cmNlcy5GaWJyZS5uYW1lXTogMSxcclxuICAgIH0sXHJcbiAgZWZmaWNpZW5jeU1vZGlmaWVyczogW3sgcmVzb3VyY2U6IFJlc291cmNlcy5CYXNpY1Rvb2xzLCBtdWx0aXBsaWVyOiAwLjIgfV0sXHJcbiAgb3V0cHV0OiAxLFxyXG59O1xyXG5cclxuY29uc3QgZ3Jvd1JlcXVpcmVtZW50OiBhbnkgPSB7IH07XHJcbmdyb3dSZXF1aXJlbWVudFtSZXNvdXJjZXMuRm9vZC5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kLCBhbW91bnQ6IDUgfTtcclxuXHJcbmNvbnN0IGltcHJvdmVtZW50cyA9IFtcclxuICB7IGltcHJvdmVtZW50OiBIb3VzZSwgd2VpZ2h0OiAxIH0sXHJcbl07XHJcblxyXG5jbGFzcyBDcmFmdHNwZXJzb24gZXh0ZW5kcyBQb3Age1xyXG4gIHN0YXRpYyBhZGQ6ICh0aWxlOiBUaWxlLCBlbnRpdGllczogYW55KSA9PiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IFRpbGUsIG51bWJlcjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcignQ3JhZnRzcGVyc29uJywgdGlsZSwgbnVtYmVyLCByZXNvdXJjZXMsIG5lZWRzLCBwcm9kdWNlcywgaW1wcm92ZW1lbnRzLCBkZXNpcmVzKTtcclxuICAgIHRoaXMuZ3Jvd1JlcXVpcmVtZW50ID0gZ3Jvd1JlcXVpcmVtZW50O1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnI0ZGMDAwMCc7XHJcbiAgICBjb250ZXh0LnN0cm9rZVRleHQoJ0MnLCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyB0aWxlU2l6ZSwgdGlsZVNpemUpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYENyYWZ0c3BlcnNvbjogRm9vZDogJHt0aGlzLnJlc291cmNlc1snZm9vZCddLmFtb3VudCB9LCBXb29kOiAke3RoaXMucmVzb3VyY2VzWyd3b29kJ10uYW1vdW50fSBUb29scyAke3RoaXMucmVzb3VyY2VzWydiYXNpY1Rvb2xzJ10uYW1vdW50IH0gTnVtYmVyOiAke3RoaXMubnVtYmVyfWA7XHJcbiAgfVxyXG59XHJcblxyXG5DcmFmdHNwZXJzb24uYWRkID0gZnVuY3Rpb24odGlsZTogVGlsZSwgZW50aXRpZXM6IGFueSk6IGJvb2xlYW4ge1xyXG4gIGNvbnN0IHBvcCA9IG5ldyBDcmFmdHNwZXJzb24odGlsZSwgMTApO1xyXG5cclxuICByZXR1cm4gUG9wLmFkZCh0aWxlLCBlbnRpdGllcywgcG9wKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyYWZ0c3BlcnNvbjtcclxuIiwiaW1wb3J0IFBvcCBmcm9tICcuL1BvcCc7XHJcbmltcG9ydCAqIGFzIFJlc291cmNlcyBmcm9tICcuLi9SZXNvdXJjZXMvUmVzb3VyY2VzJztcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGUnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGVUeXBlJztcclxuaW1wb3J0IHsgSG91c2UgfSBmcm9tICcuLi9JbXByb3ZlbWVudC9JbXByb3ZlbWVudHMnO1xyXG5pbXBvcnQgUHJpb3JpdGllcyBmcm9tICcuLi9SZXNvdXJjZXMvUHJpb3JpdGllcyc7XHJcblxyXG5jb25zdCByZXNvdXJjZXM6IGFueSA9IHt9O1xyXG5yZXNvdXJjZXNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7IGFtb3VudDogMSwgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kIH07XHJcbnJlc291cmNlc1tSZXNvdXJjZXMuV29vZC5uYW1lXSA9IHsgYW1vdW50OiAwLCByZXNvdXJjZTogUmVzb3VyY2VzLldvb2QgfTtcclxucmVzb3VyY2VzW1Jlc291cmNlcy5CYXNpY1Rvb2xzLm5hbWVdID0geyBhbW91bnQ6IDEsIHJlc291cmNlOiBSZXNvdXJjZXMuQmFzaWNUb29scyB9O1xyXG5yZXNvdXJjZXNbUmVzb3VyY2VzLkZpYnJlLm5hbWVdID0geyBhbW91bnQ6IDAsIHJlc291cmNlOiBSZXNvdXJjZXMuRmlicmUgfTtcclxuXHJcbmNvbnN0IG5lZWRzOiAgYW55ID0ge307XHJcbm5lZWRzW1Jlc291cmNlcy5Gb29kLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkZvb2QsIGFtb3VudDogMSwgcHJpb3JpdHk6IFByaW9yaXRpZXMuQ3JpdGljYWwgfTtcclxubmVlZHNbUmVzb3VyY2VzLldvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAwLCBwcmlvcml0eTogUHJpb3JpdGllcy5XYW50IH07XHJcbm5lZWRzW1Jlc291cmNlcy5CYXNpY1Rvb2xzLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkJhc2ljVG9vbHMsIGFtb3VudDogMC4xLCBwcmlvcml0eTogUHJpb3JpdGllcy5XYW50IH07XHJcbm5lZWRzW1Jlc291cmNlcy5GaWJyZS5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5GaWJyZSwgYW1vdW50OiAwLCBwcmlvcml0eTogUHJpb3JpdGllcy5Ob25lIH07XHJcblxyXG5jb25zdCBkZXNpcmVzOiBhbnkgPSB7fTtcclxuZGVzaXJlc1tSZXNvdXJjZXMuRm9vZC5uYW1lXSA9IHsgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kLCBhbW91bnQ6IDEsIH07XHJcbmRlc2lyZXNbUmVzb3VyY2VzLldvb2QubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCwgYW1vdW50OiAwIH07XHJcbmRlc2lyZXNbUmVzb3VyY2VzLkJhc2ljVG9vbHMubmFtZV0gPSB7IHJlc291cmNlOiBSZXNvdXJjZXMuQmFzaWNUb29scywgYW1vdW50OiAxIH07XHJcbmRlc2lyZXNbUmVzb3VyY2VzLkZpYnJlLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkZpYnJlLCBhbW91bnQ6IDAgfTtcclxuXHJcbmNvbnN0IHByb2R1Y2VzOiBhbnkgPSBbXTtcclxucHJvZHVjZXNbUmVzb3VyY2VzLkZvb2QubmFtZV0gPSB7XHJcbiAgdHlwZTogJ2dhdGhlcicsXHJcbiAgcmVzb3VyY2U6IFJlc291cmNlcy5Gb29kLFxyXG4gIGVmZmljaWVuY3k6IDEsXHJcbiAgZWZmaWNpZW5jeU1vZGlmaWVyczogW3sgcmVzb3VyY2U6IFJlc291cmNlcy5CYXNpY1Rvb2xzLCBtdWx0aXBsaWVyOiAwLjIgfV1cclxufTtcclxuXHJcbnByb2R1Y2VzW1Jlc291cmNlcy5Xb29kLm5hbWVdID0ge1xyXG4gIHR5cGU6ICdnYXRoZXInLFxyXG4gIHJlc291cmNlOiBSZXNvdXJjZXMuV29vZCxcclxuICBlZmZpY2llbmN5OiAwLjI1LFxyXG4gIGVmZmljaWVuY3lNb2RpZmllcnM6IFt7IHJlc291cmNlOiBSZXNvdXJjZXMuQmFzaWNUb29scywgbXVsdGlwbGllcjogMC4yIH1dXHJcbn07XHJcblxyXG5wcm9kdWNlc1tSZXNvdXJjZXMuRmlicmUubmFtZV0gPSB7XHJcbiAgdHlwZTogJ2dhdGhlcicsXHJcbiAgcmVzb3VyY2U6IFJlc291cmNlcy5GaWJyZSxcclxuICBlZmZpY2llbmN5OiAwLjI1LFxyXG4gIGVmZmljaWVuY3lNb2RpZmllcnM6IFt7IHJlc291cmNlOiBSZXNvdXJjZXMuQmFzaWNUb29scywgbXVsdGlwbGllcjogMC4yIH1dXHJcbn07XHJcblxyXG5jb25zdCBncm93UmVxdWlyZW1lbnQ6IGFueSA9IHsgfTtcclxuZ3Jvd1JlcXVpcmVtZW50W1Jlc291cmNlcy5Gb29kLm5hbWVdID0geyByZXNvdXJjZTogUmVzb3VyY2VzLkZvb2QsIGFtb3VudDogMyB9O1xyXG5cclxuY29uc3QgaW1wcm92ZW1lbnRzID0gW1xyXG4gIHsgaW1wcm92ZW1lbnQ6IEhvdXNlLCB3ZWlnaHQ6IDEgfSxcclxuXTtcclxuXHJcbmNsYXNzIEdhdGhlcmVyIGV4dGVuZHMgUG9wIHtcclxuICBzdGF0aWMgYWRkOiAodGlsZTogVGlsZSwgZW50aXRpZXM6IGFueSkgPT4gYm9vbGVhbjtcclxuICBjb25zdHJ1Y3Rvcih0aWxlOiBUaWxlLCBudW1iZXI6IG51bWJlcikge1xyXG4gICAgc3VwZXIoJ0dhdGhlcmVyJywgdGlsZSwgbnVtYmVyLCByZXNvdXJjZXMsIG5lZWRzLCBwcm9kdWNlcywgaW1wcm92ZW1lbnRzLCBkZXNpcmVzKTtcclxuICAgIHRoaXMuZ3Jvd1JlcXVpcmVtZW50ID0gZ3Jvd1JlcXVpcmVtZW50O1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnI0ZGRkZGRic7XHJcbiAgICBjb250ZXh0LnN0cm9rZVRleHQoJ0cnLCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyB0aWxlU2l6ZSwgdGlsZVNpemUpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYEdhdGhlcmVyOiBGb29kOiAke3RoaXMucmVzb3VyY2VzWydmb29kJ10uYW1vdW50IH0sIFdvb2Q6ICR7dGhpcy5yZXNvdXJjZXNbJ3dvb2QnXS5hbW91bnR9IFRvb2xzOiAke3RoaXMucmVzb3VyY2VzWydiYXNpY1Rvb2xzJ10uYW1vdW50fSBOdW1iZXI6ICR7dGhpcy5udW1iZXJ9YDtcclxuICB9XHJcbn1cclxuXHJcbkdhdGhlcmVyLmFkZCA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnkpOiBib29sZWFuIHtcclxuICBjb25zdCBwb3AgPSBuZXcgR2F0aGVyZXIodGlsZSwgMSk7XHJcblxyXG4gIHJldHVybiBQb3AuYWRkKHRpbGUsIGVudGl0aWVzLCBwb3ApO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2F0aGVyZXI7XHJcbiIsImltcG9ydCBSZXNvdXJjZSBmcm9tIFwiLi4vUmVzb3VyY2VzL1Jlc291cmNlXCI7XHJcbmltcG9ydCBOZWVkcyBmcm9tIFwiLi4vUmVzb3VyY2VzL05lZWRzXCI7XHJcbmltcG9ydCBUaWxlIGZyb20gXCIuLi9NYXAvVGlsZXMvVGlsZVwiO1xyXG5pbXBvcnQgSURyYXdhYmxlIGZyb20gXCIuLi9pbnRlcmZhY2VzL0lEcmF3YWJsZVwiO1xyXG5pbXBvcnQgSVByaW50YWJsZSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JUHJpbnRhYmxlXCI7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tIFwiLi4vTWFwL1RpbGVzL1RpbGVUeXBlXCI7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSBcIi4uL0dyaWQvR3JpZFNlcnZpY2VcIjtcclxuaW1wb3J0IGNsYW1wIGZyb20gJy4uL3V0aWwnO1xyXG5cclxuY2xhc3MgUG9wIGltcGxlbWVudHMgSURyYXdhYmxlLCBJUHJpbnRhYmxle1xyXG4gIG51bWJlcjogbnVtYmVyO1xyXG4gIHJlc291cmNlczogYW55O1xyXG4gIHByZXZpb3VzUmVzb3VyY2VzOiBhbnk7XHJcbiAgbmVlZHM6IGFueTtcclxuICBwcm9kdWNlczogYW55O1xyXG4gIHRpbGU6IFRpbGU7XHJcbiAgZ3Jvd1JlcXVpcmVtZW50OiBhbnk7XHJcbiAgZmVydGlsaXR5OiBudW1iZXI7XHJcbiAgaW1wcm92ZW1lbnRzOiBhbnk7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIG1haW50YWluZW5jZTogYW55O1xyXG4gIHByb2R1Y3Rpb246IGFueTtcclxuICBwb3BOZWVkczogYW55O1xyXG4gIGRlc2lyZXM6IGFueTtcclxuICBoZWFsdGg6IG51bWJlcjtcclxuXHJcbiAgc3RhdGljIGFkZDogKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnksIHBvcDogUG9wKSA9PiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIHRpbGU6IFRpbGUsIG51bWJlcjogbnVtYmVyLCByZXNvdWNlczogUmVzb3VyY2VbXSwgbmVlZHM6IE5lZWRzLCBwcm9kdWNlczogYW55LCBpbXByb3ZlbWVudHM6IGFueSwgZGVzaXJlczogYW55KSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy50aWxlID0gdGlsZTtcclxuICAgIHRoaXMubnVtYmVyID0gbnVtYmVyO1xyXG4gICAgdGhpcy5yZXNvdXJjZXMgPSByZXNvdWNlcztcclxuICAgIHRoaXMubmVlZHMgPSBuZWVkcztcclxuICAgIHRoaXMucHJvZHVjZXMgPSBwcm9kdWNlcztcclxuICAgIHRoaXMuZmVydGlsaXR5ID0gMC4yO1xyXG4gICAgdGhpcy5oZWFsdGggPSAwLjA1O1xyXG4gICAgdGhpcy5pbXByb3ZlbWVudHMgPSBpbXByb3ZlbWVudHM7XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0aW9uID0ge307XHJcbiAgICB0aGlzLnBvcE5lZWRzID0ge307XHJcbiAgICB0aGlzLmRlc2lyZXMgPSBkZXNpcmVzO1xyXG4gIH1cclxuXHJcbiAgLy8gIFdvcmsgb3V0IGhvdyBtdWNoIGVhY2ggcG9wIHByb2R1Y2VzXHJcbiAgLy8gIFdvcmsgb3V0IGhvdyBtdWNoIHRoZXkgYXJlIHdpbGxpbmcgdG8gZ2l2ZSB1cC5cclxuICAvLyAgUG9vbCB0aGlzIGFtb3VudC5cclxuICAvLyAgUmVkaXN0cmlidXRlIGFtb25nIHR5cGVzLlxyXG4gIGdyb3coKSB7XHJcbiAgICBcclxuICAgIGlmICggdGhpcy5yZXNvdXJjZXNbJ2Zvb2QnXS5hbW91bnQgPiB0aGlzLnByZXZpb3VzUmVzb3VyY2VzWydmb29kJ10uYW1vdW50ICYmIHRoaXMucmVzb3VyY2VzWydmb29kJ10uYW1vdW50ID49ICh0aGlzLmdyb3dSZXF1aXJlbWVudFsnZm9vZCddICYmIHRoaXMuZ3Jvd1JlcXVpcmVtZW50Wydmb29kJ10uYW1vdW50KSkge1xyXG4gICAgICBjb25zdCBpbmNyZWFzZSA9IHRoaXMucmVzb3VyY2VzWydmb29kJ10uYW1vdW50L3RoaXMucHJldmlvdXNSZXNvdXJjZXNbJ2Zvb2QnXS5hbW91bnQgKiB0aGlzLmZlcnRpbGl0eSAqIHRoaXMucmVzb3VyY2VzWydmb29kJ10uYW1vdW50L3RoaXMuZ3Jvd1JlcXVpcmVtZW50Wydmb29kJ10uYW1vdW50O1xyXG4gICAgICB0aGlzLm51bWJlciArPSBpbmNyZWFzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMucmVzb3VyY2VzWydmb29kJ10uYW1vdW50IDw9IDAgJiYgdGhpcy5uZWVkc1snZm9vZCddLmFtb3VudCkge1xyXG4gICAgICB0aGlzLm51bWJlciAtPSAoMSAtIHRoaXMuaGVhbHRoKSAqIHRoaXMubnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubnVtYmVyICo9ICgxIC0gdGhpcy5oZWFsdGgpO1xyXG4gIH1cclxuXHJcblxyXG4gIHVwZGF0ZShyZXNvdXJjZXM6IGFueSkge1xyXG4gICAgdGhpcy5wcmV2aW91c1Jlc291cmNlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5yZXNvdXJjZXMpKTtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMucmVzb3VyY2VzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCByZXNvdXJjZSA9IHRoaXMucmVzb3VyY2VzW2tleV07XHJcbiAgICAgIGNvbnN0IHByb2R1Y2VzID0gdGhpcy5wcm9kdWNlc1trZXldIHx8IHsgYW1vdW50OiAwIH07XHJcbiAgICAgIGNvbnN0IGNhcnJ5aW5nUG9wID0gMSArIHRoaXMubnVtYmVyLzI1XHJcblxyXG4gICAgICBsZXQgZ2F0aGVyZWRBbW91bnQgPSAwO1xyXG4gICAgICBjb25zdCBtb2RpZmllcnMgPSBwcm9kdWNlcy5lZmZpY2llbmN5TW9kaWZpZXJzID8gcHJvZHVjZXMuZWZmaWNpZW5jeU1vZGlmaWVycy5tYXAoKHg6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjbGFtcCh0aGlzLnJlc291cmNlc1t4LnJlc291cmNlLm5hbWVdLmFtb3VudCAvIHRoaXMubnVtYmVyLCAxKSAqIHgubXVsdGlwbGllcjtcclxuICAgICAgfSkgOiBbXTtcclxuXHJcbiAgICAgIGNvbnN0IG1vZGlmaWVyID0gbW9kaWZpZXJzLnJlZHVjZSgoc3VtOiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlcikgPT4gc3VtICsgY3VycmVudCwgMSk7XHJcbiAgICAgIGlmIChwcm9kdWNlcy50eXBlID09PSAnZ2F0aGVyJykge1xyXG4gICAgICAgIGdhdGhlcmVkQW1vdW50ID0gbW9kaWZpZXIgKiBwcm9kdWNlcy5lZmZpY2llbmN5ICogdGhpcy5udW1iZXIgKiB0aGlzLnRpbGUucmVzb3VyY2VzW2tleV0uYW1vdW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocHJvZHVjZXMudHlwZSA9PT0gJ2NyYWZ0Jykge1xyXG4gICAgICAgIGNvbnN0IG1heFByb2R1Y2VkID0gT2JqZWN0LmtleXModGhpcy5wcm9kdWNlc1trZXldLnJlcXVpcmVzKVxyXG4gICAgICAgICAgLm1hcCgoazogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bWJlciA+IDAgPyB0aGlzLnJlc291cmNlc1trXS5hbW91bnQgLyB0aGlzLnByb2R1Y2VzW2tleV0ucmVxdWlyZXNba10gOiAwO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICBjb25zdCBtYXggPSBtYXhQcm9kdWNlZC5yZWR1Y2UoKG1pbjogbnVtYmVyLCBjdXJyZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBjdXJyZW50IDwgbWluID8gY3VycmVudCA6IG1pbjtcclxuICAgICAgICB9LCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XHJcblxyXG4gICAgICAgIGdhdGhlcmVkQW1vdW50ID0gY2xhbXAobW9kaWZpZXIgKiBwcm9kdWNlcy5lZmZpY2llbmN5ICogdGhpcy5udW1iZXIsIG1heCk7XHJcblxyXG4gICAgICAgIGdhdGhlcmVkQW1vdW50ID0gZ2F0aGVyZWRBbW91bnQgPiAwID8gZ2F0aGVyZWRBbW91bnQgOiAwO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb2R1Y2VzW2tleV0ucmVxdWlyZXMpLmZvckVhY2goKHg6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXNvdXJjZXNbeF0uYW1vdW50IC09IGdhdGhlcmVkQW1vdW50L21vZGlmaWVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcm9kdWNlZCA9IGdhdGhlcmVkQW1vdW50ID8gZ2F0aGVyZWRBbW91bnQvY2FycnlpbmdQb3AgOiAwO1xyXG5cclxuICAgICAgY29uc3QgbmVlZHMgPSB0aGlzLm5lZWRzW2tleV0gPyB0aGlzLm5lZWRzW2tleV0uYW1vdW50ICogdGhpcy5udW1iZXIgOiAwO1xyXG5cclxuICAgICAgcmVzb3VyY2UuYW1vdW50ICs9IHByb2R1Y2VkIC0gbmVlZHM7XHJcbiAgICAgIHJlc291cmNlLmFtb3VudCA9IHJlc291cmNlLmFtb3VudCA+IDAgPyByZXNvdXJjZS5hbW91bnQgOiAwO1xyXG4gICAgICBcclxuICAgICAgaWYgKCFyZXNvdXJjZXNba2V5XSkge1xyXG4gICAgICAgIHJlc291cmNlc1trZXldID0ge1xyXG4gICAgICAgICAgYW1vdW50OiAwLFxyXG4gICAgICAgICAgZGVzaXJlOiAwLFxyXG4gICAgICAgICAgdmFsdWU6IHRoaXMucmVzb3VyY2VzW2tleV0ucmVzb3VyY2UuYmFzZVZhbHVlLFxyXG4gICAgICAgICAgdHlwZToga2V5LFxyXG4gICAgICAgICAgbWF4VmFsdWU6IHRoaXMucmVzb3VyY2VzW2tleV0ucmVzb3VyY2UubWF4VmFsdWUsXHJcbiAgICAgICAgICBwcmlvcml0eTogdGhpcy5uZWVkc1trZXldLnByaW9yaXR5IH07IFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGRpZmYgPSByZXNvdXJjZS5hbW91bnQgLSB0aGlzLmRlc2lyZXNba2V5XS5hbW91bnQgKiB0aGlzLm51bWJlcjtcclxuICAgICAgcmVzb3VyY2VzW2tleV0uYW1vdW50ICs9IGRpZmY7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmdyb3coKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURlc2lyZXMoKSB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLmRlc2lyZXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIC8vICBpZiByZXNvdXJjZSB0aGV5IGhhdmUgbWludXMgd2hhdCB0aGV5IG5lZWQgXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb2R1Y2UoKSB7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIGltcHJvdmVUaWxlKCkge1xyXG4gICAgdGhpcy5pbXByb3ZlbWVudHMuZm9yRWFjaCgoaTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvc3RzID0gaS5pbXByb3ZlbWVudC5jb3N0cztcclxuICAgICAgXHJcbiAgICAgIGxldCBhZmZvcmFibGUgPSBjb3N0cy5yZWR1Y2UoKGlzQWZmb3JkYWJsZTogYm9vbGVhbiwgY3VycmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gY3VycmVudC5yZXNvdXJjZS5uYW1lO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlc1trZXldLmFtb3VudCA+PSBjdXJyZW50LmFtb3VudCAqIDEuNSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICBpZiAoYWZmb3JhYmxlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRpbGUuaW1wcm92ZW1lbnRzLmZpbmQoKHg6IGFueSkgPT4geC5uYW1lID09PSBpLmltcHJvdmVtZW50Lm5hbWUpKSB7XHJcbiAgICAgICAgICB0aGlzLnRpbGUuaW1wcm92ZW1lbnRzLnB1c2goaS5pbXByb3ZlbWVudCk7XHJcbiAgICAgICAgICB0aGlzLmZlcnRpbGl0eSAqPSBpLmltcHJvdmVtZW50LmVmZmVjdHMuZmVydGlsaXR5O1xyXG5cclxuICAgICAgICAgIGkubWFpbnRhaW5lbmNlLmZvckVhY2goKG1haW50YWluOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWFpbnRhaW5lbmNlW21haW50YWluLnJlc291cmNlLm5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5tYWludGFpbmVuY2VbbWFpbnRhaW4ucmVzb3VyY2UubmFtZV0gKz0gbWFpbnRhaW4uYW1vdW50O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMubWFpbnRhaW5lbmNlW21haW50YWluLnJlc291cmNlLm5hbWVdID0gbWFpbnRhaW4uYW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHRpbGVTaXplOiBudW1iZXIpe1xyXG4gICAgXHJcbiAgfVxyXG59XHJcblBvcC5hZGQgPSBmdW5jdGlvbih0aWxlOiBUaWxlLCBlbnRpdGllczogYW55LCBwb3A6IFBvcCk6IGJvb2xlYW4ge1xyXG4gIGlmICghdGlsZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAodGlsZS5jaXR5IHx8IHRpbGUucm9hZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5PY2VhbikgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBjb25zdCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZ2V0TmVpZ2hib3Vycyh0aWxlLCBmYWxzZSwgZmFsc2UpXHJcbiAgICAuZmlsdGVyKHggPT4geC5jaXR5KS5tYXAoeCA9PiB4LmNpdHkpO1xyXG5cclxuICBPYmplY3Qua2V5cyhwb3AucmVzb3VyY2VzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgcG9wLnJlc291cmNlc1trZXldLmFtb3VudCA9IHBvcC5yZXNvdXJjZXNba2V5XS5hbW91bnQgKiBwb3AubnVtYmVyO1xyXG4gIH0pO1xyXG5cclxuICBpZiAobmVpZ2hib3Vycy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuICBjb25zdCBjaXR5ID0gbmVpZ2hib3Vyc1swXTtcclxuICBjaXR5LnBvcHMucHVzaChwb3ApO1xyXG4gIHRpbGUucG9wID0gcG9wO1xyXG4gIGVudGl0aWVzLnBvcHMucHVzaChwb3ApO1xyXG5cclxuICBpZiAoIWNpdHkucmVzb3VyY2VzW3BvcC50eXBlXSkge1xyXG4gICAgY2l0eS5yZXNvdXJjZXNbcG9wLnR5cGVdID0ge307XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9wO1xyXG4iLCJpbXBvcnQgUmVzb3VyY2UgZnJvbSBcIi4vUmVzb3VyY2VcIjtcclxuaW1wb3J0IFJlc291cmNlVHlwZXMgZnJvbSBcIi4vUmVzb3VyY2VUeXBlXCI7XHJcblxyXG5jb25zdCBCYXNpY1Rvb2xzID0gbmV3IFJlc291cmNlKCdiYXNpY1Rvb2xzJywgW1Jlc291cmNlVHlwZXMuVG9vbF0sIDAuMSwgMTAsIDEsIDEpO1xyXG5leHBvcnQgZGVmYXVsdCBCYXNpY1Rvb2xzO1xyXG4iLCJpbXBvcnQgUmVzb3VyY2UgZnJvbSBcIi4vUmVzb3VyY2VcIjtcclxuaW1wb3J0IFJlc291cmNlVHlwZXMgZnJvbSBcIi4vUmVzb3VyY2VUeXBlXCI7XHJcblxyXG5jb25zdCBGaWJyZSA9IG5ldyBSZXNvdXJjZSgnZmlicmUnLCBbUmVzb3VyY2VUeXBlcy5JbmdyZWRpZW50XSwgMC4xLCAxLCAwLjEsIDAuMSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWJyZTtcclxuIiwiaW1wb3J0IFJlc291cmNlIGZyb20gXCIuL1Jlc291cmNlXCI7XHJcbmltcG9ydCBSZXNvdXJjZVR5cGVzIGZyb20gXCIuL1Jlc291cmNlVHlwZVwiO1xyXG5cclxuY29uc3QgRm9vZCA9IG5ldyBSZXNvdXJjZSgnZm9vZCcsIFtSZXNvdXJjZVR5cGVzLkZvb2RdLCAxLjEsIDUsIDEsIDEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9vZDtcclxuIiwiZW51bSBQcmlvcml0aWVzIHtcclxuICBDcml0aWNhbCA9IDEsXHJcbiAgV29ya2luZyA9IDIsXHJcbiAgV2FudCA9IDMsXHJcbiAgTm9uZSA9IDQsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByaW9yaXRpZXM7XHJcbiIsImNsYXNzIFJlc291cmNlIHtcclxuICB0eXBlczogYW55O1xyXG4gIGRlY2F5OiBudW1iZXI7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIG1heFZhbHVlOiBudW1iZXI7XHJcbiAgbWluVmFsdWU6IG51bWJlcjtcclxuICBiYXNlVmFsdWU6IG51bWJlcjtcclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHR5cGVzOiBhbnksIGRlY2F5OiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIG1pblZhbHVlOiBudW1iZXIsIGJhc2VWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy50eXBlcyA9IHR5cGVzO1xyXG4gICAgdGhpcy5kZWNheSA9IGRlY2F5O1xyXG4gICAgdGhpcy5tYXhWYWx1ZSA9IG1heFZhbHVlO1xyXG4gICAgdGhpcy5taW5WYWx1ZSA9IG1pblZhbHVlO1xyXG4gICAgdGhpcy5iYXNlVmFsdWUgPSBiYXNlVmFsdWU7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUocHJvZHVjZWQ6IG51bWJlciwgdXNlZDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBudW1iZXIgPSAocHJvZHVjZWQgLSB1c2VkKTtcclxuICAgIHJldHVybiBudW1iZXI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZXNvdXJjZTsiLCJcclxuZW51bSBSZXNvdXJjZVR5cGVzIHtcclxuICAnRm9vZCcgPSAnRm9vZCcsXHJcbiAgJ0Z1ZWwnID0gJ0Z1ZWwnLFxyXG4gICdJbmdyZWRpZW50JyA9ICdJbmdyZWRpZW50JyxcclxuICAnVG9vbCcgPSAnVG9vbCcsXHJcbiAgJ1NoZWx0ZXInID0gJ1NoZWx0ZXInLFxyXG4gICdCdWlsZGluZ01hdGVyaWFsJyA9ICdCdWlsZGluZ01hdGVyaWFsJ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZXNvdXJjZVR5cGVzO1xyXG4iLCJpbXBvcnQgRmlicmUgZnJvbSAnLi9GaWJyZSc7XHJcbmltcG9ydCBCYXNpY1Rvb2xzIGZyb20gJy4vQmFzaWNUb29scyc7XHJcbmltcG9ydCBGb29kIGZyb20gJy4vRm9vZCc7XHJcbmltcG9ydCBXb29kIGZyb20gJy4vV29vZCc7XHJcblxyXG5leHBvcnQgeyBGaWJyZSwgQmFzaWNUb29scywgRm9vZCwgV29vZCwgfVxyXG4iLCJpbXBvcnQgUmVzb3VyY2UgZnJvbSBcIi4vUmVzb3VyY2VcIjtcclxuaW1wb3J0IFJlc291cmNlVHlwZXMgZnJvbSBcIi4vUmVzb3VyY2VUeXBlXCI7XHJcblxyXG5jb25zdCBXb29kID0gbmV3IFJlc291cmNlKCd3b29kJywgW1Jlc291cmNlVHlwZXMuQnVpbGRpbmdNYXRlcmlhbCwgUmVzb3VyY2VUeXBlcy5GdWVsLCBSZXNvdXJjZVR5cGVzLkluZ3JlZGllbnRdLCAxLjAxLCA1LCAwLjEsIDAuMSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXb29kO1xyXG4iLCJmdW5jdGlvbiBnZW5lcmF0ZUd1aWQoKSB7XHJcbiAgcmV0dXJuIGAke2dlbmVyYXRlTnVtYmVyKCl9LSR7Z2VuZXJhdGVOdW1iZXIoKX1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZU51bWJlcigpIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlR3VpZDtcclxuIiwiaW1wb3J0IE1hcCBmcm9tICcuL01hcC9NYXAnO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcblxyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuY29uc3Qgc2l6ZSA9IDUwMDtcclxuY29uc3QgYm9keU1hcmdpbiA9IDg7XHJcblxyXG5jYW52YXMud2lkdGg9c2l6ZTtcclxuY2FudmFzLmhlaWdodD1zaXplO1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG5jb25zdCBtYXAgPSBuZXcgTWFwKHNpemUsIDUwLCBjb250ZXh0KTtcclxubWFwLmRyYXcoKTtcclxuXHJcbi8vICBDb2xvciBpbiBjbGlja2VkIHNxdWFyZVxyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gIGxldCB7IGNsaWVudFggLCBjbGllbnRZIH0gPSBlO1xyXG4gIGNsaWVudFggLT0gYm9keU1hcmdpbjtcclxuICBjbGllbnRZIC09IGJvZHlNYXJnaW47XHJcbiAgXHJcbiAgY29uc3QgdGlsZSA9IG1hcC5jbGlja1RpbGUobmV3IFBvaW50KGNsaWVudFgsIGNsaWVudFkpKTtcclxuXHJcbiAgaWYgKHRpbGUpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3RlZFRpbGUnKS5pbm5lckhUTUwgPSB0aWxlLnRvU3RyaW5nKClcclxuICAgICAgLnNwbGl0KCcnKVxyXG4gICAgICAubWFwKHggPT4geCA9PT0gJ1xcbicgPyAnPGJyIC8+JyA6IHgpLmpvaW4oJycpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0ZWRUaWxlJykuaW5uZXJIVE1MID0gJyc7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vICBab29tIGluIGFuZCBvdXQgYW5kIGRyYWdcclxubGV0IGRyYWdTdGF0ZSA9IDA7XHJcbmNvbnN0IHN0YXJ0RHJhZyA9IG5ldyBQb2ludCgwLCAwKTtcclxuXHJcbmNvbnN0IGRyYWdTdGF0ZXMgPSB7IFNUQVJURUQ6IDAsIERSQUdHSU5HOiAxLCBFTkRFRDogMn1cclxuXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XHJcbiAgZHJhZ1N0YXRlID0gZHJhZ1N0YXRlcy5TVEFSVEVEO1xyXG4gIGxldCB7IGNsaWVudFggLCBjbGllbnRZIH0gPSBlO1xyXG4gIGNsaWVudFggLT0gYm9keU1hcmdpbjtcclxuICBjbGllbnRZIC09IGJvZHlNYXJnaW47XHJcblxyXG4gIHN0YXJ0RHJhZy54ID0gY2xpZW50WDtcclxuICBzdGFydERyYWcueSA9IGNsaWVudFk7XHJcbn0sIGZhbHNlKTtcclxuXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsICgpID0+IHtcclxuICBpZiAoZHJhZ1N0YXRlID09PSBkcmFnU3RhdGVzLlNUQVJURUQpIGRyYWdTdGF0ZSA9IGRyYWdTdGF0ZXMuRFJBR0dJTkc7XHJcbn0sIGZhbHNlKTtcclxuXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZSkgPT4ge1xyXG4gIGlmKGRyYWdTdGF0ZSA9PT0gZHJhZ1N0YXRlcy5TVEFSVEVEKXtcclxuICB9XHJcbiAgZWxzZSBpZihkcmFnU3RhdGUgPT09IGRyYWdTdGF0ZXMuRFJBR0dJTkcpIHtcclxuICAgIGxldCB7IGNsaWVudFggLCBjbGllbnRZIH0gPSBlO1xyXG4gICAgY2xpZW50WCAtPSBib2R5TWFyZ2luO1xyXG4gICAgY2xpZW50WSAtPSBib2R5TWFyZ2luO1xyXG5cclxuICAgIGNvbnN0IGRpZmZYID0gc3RhcnREcmFnLnggLSBjbGllbnRYO1xyXG4gICAgY29uc3QgZGlmZlkgPSBzdGFydERyYWcueSAtIGNsaWVudFk7XHJcblxyXG4gICAvLyBtYXAuZHJhZyhkaWZmWCwgZGlmZlkpO1xyXG4gICAgc3RhcnREcmFnLnggPSAwO1xyXG4gICAgc3RhcnREcmFnLnkgPSAwO1xyXG4gIH1cclxuICBkcmFnU3RhdGUgPSBkcmFnU3RhdGVzLkVOREVEO1xyXG59LCBmYWxzZSk7XHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICBjb25zb2xlLmxvZyhlLmtleUNvZGUpO1xyXG4gIGlmIChlLmtleUNvZGUgPT09IDM3KSB7XHJcbiAgICBtYXAubGVmdEtleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMzgpIHtcclxuICAgIG1hcC51cEtleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgIG1hcC5yaWdodEtleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gNDApIHtcclxuICAgIG1hcC5kb3duS2V5KCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSAxMDcpIHtcclxuICAgIG1hcC56b29tSW4oKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDEwOSkge1xyXG4gICAgbWFwLnpvb21PdXQoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDgyKSB7XHJcbiAgICBtYXAuYWRkUm9hZFRvU2VsZWN0ZWRUaWxlKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA2Nykge1xyXG4gICAgbWFwLmFkZENpdHlUb1NlbGVjdGVkVGlsZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gODUpIHtcclxuICAgIG1hcC5hZGRVbml0VG9TZWxlY3RlZFRpbGUoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDggfHwgZS5rZXlDb2RlID09PSA0Nikge1xyXG4gICAgbWFwLnJlbW92ZVNlbGVjdGVkRW50aXR5KCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgbWFwLmVuZFR1cm4oKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDcxKSB7XHJcbiAgICBtYXAuYWRkR2F0aGVyZXIoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDcwKSB7XHJcbiAgICBtYXAuYWRkQ3JhZnRzcGVyc29uKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRDaXR5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbWFwLmFkZENpdHlUb1NlbGVjdGVkVGlsZSgpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRSb2FkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbWFwLmFkZFJvYWRUb1NlbGVjdGVkVGlsZSgpO1xyXG59KTtcclxuXHJcblxyXG4vLyAgR2l2ZW4gYW4gYXJyYXkgb2Ygc3F1YXJlcyBhbmQgYSB2aWV3IHBvcnQsIGZpbmQgdGhlIHNxdWFyZXMgaW4gdGhlIHZpZXdwb3J0XHJcbi8vICBab29taW5nIGNoYW5nZXMgaG93IGxhcmdlIHlvdSB3YW50IHRvIGRyYXcgdGhlIHNxdWFyZXMgYnV0IGFsc28gdGhlIHZpZXdwb3J0XHJcbi8vICBEcmFnZ2luZyBjaGFuZ2VzIHRoZSB2aWV3cG9ydCBzdGFydC4iLCJcclxuICBjb25zdCBjbGFtcCA9IChudW1iZXI6IG51bWJlciwgbWF4OiBudW1iZXIpID0+IG51bWJlciA+IG1heCA/IG1heCA6IG51bWJlcjtcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhbXA7Il0sInNvdXJjZVJvb3QiOiIifQ==