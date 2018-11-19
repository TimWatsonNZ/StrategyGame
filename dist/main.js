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
                const copy = _Map_Tiles_Tile__WEBPACK_IMPORTED_MODULE_1__["default"].copy(tile);
                copy.type = rule(copy, waterNeighbours, grassNeighbours);
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
                    if (tile.type === _Tiles_TileType__WEBPACK_IMPORTED_MODULE_5__["default"].Grass) {
                        this.context.fillStyle = '#00FF00';
                    }
                    if (tile.type === _Tiles_TileType__WEBPACK_IMPORTED_MODULE_5__["default"].Ocean) {
                        this.context.fillStyle = '#0000FF';
                    }
                    if (tile.type === _Tiles_TileType__WEBPACK_IMPORTED_MODULE_5__["default"].None) {
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
        return `${tileDetails} ${cityDetails} ${roadDetails} ${unitDetails} ${popDetails}`;
    }
}
Tile.copy = function (tile, type = null) {
    let copy;
    if (!type) {
        copy = new Tile(tile.point, tile.type);
        copy.selected = copy.selected;
    }
    return copy;
};
/* harmony default export */ __webpack_exports__["default"] = (Tile);


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



const resources = {};
resources['food'] = { amount: 1, resource: new _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"]() };
const needs = {};
needs['food'] = { resource: new _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"](), amount: 1 };
const produces = [];
produces['food'] = { resource: new _Resources_Resources__WEBPACK_IMPORTED_MODULE_1__["Food"](), amount: 1.1 };
class Gatherer extends _Pop__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(tile, number) {
        super(tile, number, resources, needs, produces);
    }
    draw(context, tileSize) {
        context.strokeStyle = '#FFFFFF';
        context.strokeText('G', this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + tileSize, tileSize);
    }
    toString() {
        return `Gatherer: Food: ${this.resources['food'].amount}`;
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
    constructor(tile, number, resouces, needs, produces) {
        this.tile = tile;
        this.number = number;
        this.resources = resouces;
        this.needs = needs;
        this.produces = produces;
    }
    update() {
        Object.keys(this.produces).forEach((key) => {
            const resource = this.resources[key];
            const needs = this.needs[key];
            const produces = this.produces[key];
            resource.amount += produces.amount - needs.amount;
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


class Food extends _Resource__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super('food', [_ResourceType__WEBPACK_IMPORTED_MODULE_1__["default"].Food], 0.1);
    }
}
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

class Wood extends _Resource__WEBPACK_IMPORTED_MODULE_0__["default"] {
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vR3JpZC9HcmlkU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9HcmlkL01hcEdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly8vLi9NYXAvTWFwLnRzIiwid2VicGFjazovLy8uL01hcC9UaWxlcy9UaWxlLnRzIiwid2VicGFjazovLy8uL01hcC9UaWxlcy9UaWxlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9NYXBFbnRpdGllcy9DaXR5LnRzIiwid2VicGFjazovLy8uL01hcEVudGl0aWVzL1BvaW50LnRzIiwid2VicGFjazovLy8uL01hcEVudGl0aWVzL1JvYWQudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwRW50aXRpZXMvUm9hZE5ldHdvcmsudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwRW50aXRpZXMvVW5pdC50cyIsIndlYnBhY2s6Ly8vLi9Qb3BzL0dhdGhlcmVyLnRzIiwid2VicGFjazovLy8uL1BvcHMvUG9wLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9CYXNpY1Rvb2xzLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9GaWJyZS50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvRm9vZC50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvUmVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL1Jlc291cmNlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvUmVzb3VyY2VzLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9Xb29kLnRzIiwid2VicGFjazovLy8uL2dlbmVyYXRlR3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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QUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sU0FBUyxHQUFHO1lBQ2hCLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDO1lBQy9DLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRyxDQUFDLEVBQUUsRUFBZSxFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsQ0FBQyxFQUFDO1lBQy9DLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRyxDQUFDLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsQ0FBQyxFQUFDO1NBQ2hELENBQUM7UUFFRixNQUFNLGlCQUFpQixHQUFHO1lBQ1Q7WUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ2hDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRyxDQUFDLEVBQUUsRUFBZSxFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsQ0FBQyxFQUFDO1lBQzlCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsQ0FBQyxFQUFFO1NBQ2pDLENBQUM7UUFFRixNQUFNLFVBQVUsR0FBVSxFQUFFLENBQUM7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QUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBQyxRQUFRLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUUsUUFBUSxHQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsSSxDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQVksRUFBRSxRQUFnQjtRQUNwQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxHQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsRUFBRSxRQUFRLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEksQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFZLEVBQUUsUUFBZ0I7UUFDdkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBQyxRQUFRLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxHQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqSixDQUFDO0lBRUQsUUFBUSxDQUFDLE9BQVksRUFBRSxRQUFnQjtRQUNyQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsRUFB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QUFDQTtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBLHdDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFBvaW50IGZyb20gJy4uL01hcEVudGl0aWVzL1BvaW50JztcclxuaW1wb3J0IG1hcEdlbmVyYXRvciBmcm9tICcuL01hcEdlbmVyYXRvcic7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuXHJcbmNsYXNzIEdyaWRTZXJ2aWNlIHtcclxuICBncmlkU2l6ZTogbnVtYmVyO1xyXG4gIGdyaWQ6IGFueVtdO1xyXG4gIGNvbnN0cnVjdG9yKGdyaWRTaXplOiBudW1iZXIpIHtcclxuICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcclxuICAgIHRoaXMuZ3JpZCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTWFwKCkge1xyXG4gICAgdGhpcy5ncmlkID0gbWFwR2VuZXJhdG9yLmdlbmVyYXRlKHRoaXMuZ3JpZFNpemUpO1xyXG4gIH1cclxuXHJcbiAgLy8gIHRvZG8gLSBjaGFuZ2UgdGhlc2UgdG8gcG9pbnRzXHJcbiAgY3JlYXRlQ2xpcHBlZEdyaWQodmlld1BvcnRPcmlnaW46IGFueSwgdmlld1BvcnRFbmQ6IGFueSkge1xyXG4gICAgY29uc3QgbmV3Z3JpZCA9IFtdO1xyXG4gICAgY29uc3Qgc3RhcnRQb2ludCA9IG5ldyBQb2ludCh2aWV3UG9ydE9yaWdpbi54LCB2aWV3UG9ydE9yaWdpbi55KTtcclxuICAgIGNvbnN0IGVuZFBvaW50ID0gbmV3IFBvaW50KHZpZXdQb3J0RW5kLngsIHZpZXdQb3J0RW5kLnkpO1xyXG4gICAgXHJcbiAgICBmb3IgKGxldCB5ID0gc3RhcnRQb2ludC55O3kgPD0gZW5kUG9pbnQueTt5KyspIHtcclxuICAgICAgY29uc3QgbmV3cm93ID0gW107XHJcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZFt5XTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIGZvciAobGV0IHggPSBzdGFydFBvaW50Lng7IHggPD0gZW5kUG9pbnQueDsgeCsrKSB7XHJcbiAgICAgICAgY29uc3QgdGlsZSA9IHJvd1t4XTtcclxuXHJcbiAgICAgICAgICBpZiAodGlsZSAmJiB0aWxlLnBvaW50KSB7XHJcbiAgICAgICAgICAgIHRpbGUuZHJhd2luZ1BvaW50ID0gbmV3IFBvaW50KHRpbGUucG9pbnQueCwgdGlsZS5wb2ludC55KTtcclxuICAgICAgICAgICAgdGlsZS5kcmF3aW5nUG9pbnQueCA9IHggLSBzdGFydFBvaW50Lng7XHJcbiAgICAgICAgICAgIHRpbGUuZHJhd2luZ1BvaW50LnkgPSB5IC0gc3RhcnRQb2ludC55O1xyXG4gICAgICAgICAgICBuZXdyb3cucHVzaCh0aWxlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gIFxyXG4gICAgICBuZXdncmlkLnB1c2gobmV3cm93KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdncmlkO1xyXG4gIH1cclxuICBcclxuICB0aWxlVG9JbmRleCAodGlsZTogVGlsZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aWxlLnBvaW50LngsIHRpbGUucG9pbnQueSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZWdpb24oaW5kZXg6IGFueSwgcmFkaXVzOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGRlbHRhcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IHg9MDt4PHJhZGl1cyoyKzE7eCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHk9MDt5IDwgcmFkaXVzKjIrMTsgeSsrKSB7XHJcbiAgICAgICAgZGVsdGFzLnB1c2goeyB4OiB4IC0gMSwgeTogeSAtMSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5laWdoYm91cnM6IGFueVtdID0gW107XHJcbiAgICBkZWx0YXMuZm9yRWFjaChkZWx0YSA9PiB7XHJcbiAgICAgIGNvbnN0IGluZGV4WCA9IGluZGV4LnggKyBkZWx0YS54O1xyXG4gICAgICBjb25zdCBpbmRleFkgPSBpbmRleC55ICsgZGVsdGEueTtcclxuXHJcbiAgICAgIGlmIChpbmRleFggPCAwIHx8IGluZGV4WCA+IHRoaXMuZ3JpZC5sZW5ndGgtMSB8fFxyXG4gICAgICAgICAgaW5kZXhZIDwgMCB8fCBpbmRleFkgPiB0aGlzLmdyaWQubGVuZ3RoLTEpIHtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZWlnaGJvdXJzLnB1c2godGhpcy5ncmlkW2luZGV4WV1baW5kZXhYXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBuZWlnaGJvdXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmVpZ2hib3VycyhpbmRleDogUG9pbnQsIHByZXNlcnZlT3JkZXIgPSBmYWxzZSwgbm9EaWFnb25hbHMgPSBmYWxzZSwgaW5wdXRHcmlkOiBhbnkgPSBudWxsKSB7XHJcbiAgICBsZXQgZ3JpZCA9IGlucHV0R3JpZCA/IGlucHV0R3JpZCA6IHRoaXMuZ3JpZDtcclxuICAgIGNvbnN0IHRpbGUgPSBncmlkW2luZGV4LnldW2luZGV4LnhdO1xyXG4gICAgY29uc3QgYWxsRGVsdGFzID0gW1xyXG4gICAgICB7IHg6LTEsIHk6IC0xIH0sIHt4OiAwLCB5OiAtMX0sICB7IHg6IDEsIHk6IC0xfSxcclxuICAgICAgeyB4Oi0xLCB5OiAgMCB9LCAgICAgICAgICAgICAgLCAgeyB4OiAxLCB5OiAgMH0sXHJcbiAgICAgIHsgeDotMSwgeTogIDEgfSwge3g6IDAsIHk6ICAxIH0sIHsgeDogMSwgeTogIDF9LFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBub0RpYWdvbmFsc0RlbHRhcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgLCB7IHg6IDAsIHk6IC0xIH0sICBcclxuICAgICAgeyB4Oi0xLCB5OiAgMCB9LCAgICAgICAgICAgICAgLCAgeyB4OiAxLCB5OiAgMH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCB5OiAgMSB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJzOiBhbnlbXSA9IFtdO1xyXG4gICAgaWYgKCF0aWxlKSB7XHJcbiAgICAgIHJldHVybiBuZWlnaGJvdXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlbHRhcyA9IG5vRGlhZ29uYWxzID8gbm9EaWFnb25hbHNEZWx0YXMgOiBhbGxEZWx0YXM7XHJcbiAgICBkZWx0YXMuZm9yRWFjaChkZWx0YSA9PiB7XHJcbiAgICAgIGNvbnN0IGluZGV4WCA9IGluZGV4LnggKyBkZWx0YS54O1xyXG4gICAgICBjb25zdCBpbmRleFkgPSBpbmRleC55ICsgZGVsdGEueTtcclxuXHJcbiAgICAgIGlmIChpbmRleFggPCAwIHx8IGluZGV4WCA+IGdyaWQubGVuZ3RoLTEgfHxcclxuICAgICAgICAgIGluZGV4WSA8IDAgfHwgaW5kZXhZID4gZ3JpZC5sZW5ndGgtMSkge1xyXG4gICAgICAgICAgaWYgKHByZXNlcnZlT3JkZXIpIG5laWdoYm91cnMucHVzaChudWxsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZWlnaGJvdXJzLnB1c2goZ3JpZFtpbmRleFldW2luZGV4WF0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3VycztcclxuICB9XHJcblxyXG4gIGZpbmRTZWxlY3RlZFRpbGVDcm9zc05laWdoYm91cnModGlsZTogVGlsZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZENyb3NzTmVpZ2hib3Vycyh0aWxlKTtcclxuICB9XHJcblxyXG4gIGZpbmRDcm9zc05laWdoYm91cnModGlsZTogVGlsZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0TmVpZ2hib3Vycyh0aGlzLnRpbGVUb0luZGV4KHRpbGUpLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgZ3JpZFNlcnZpY2U6IEdyaWRTZXJ2aWNlID0gbnVsbDtcclxuZnVuY3Rpb24gZ3JpZFNlcnZpY2VJbml0KGdyaWRTaXplOiBudW1iZXIpIHtcclxuICBncmlkU2VydmljZSA9IG5ldyBHcmlkU2VydmljZShncmlkU2l6ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGdyaWRTZXJ2aWNlLCBncmlkU2VydmljZUluaXQgfTtcclxuIiwiaW1wb3J0IHsgZ3JpZFNlcnZpY2UgfSBmcm9tICcuL0dyaWRTZXJ2aWNlJztcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGUnO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vTWFwRW50aXRpZXMvUG9pbnQnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGVUeXBlJztcclxuXHJcbmNsYXNzIE1hcEdlbmVyYXRvciB7XHJcblxyXG4gIGdlbmVyYXRlKGdyaWRTaXplOiBudW1iZXIpIHtcclxuICAgIGxldCBncmlkOiBUaWxlW11bXSA9IFtdXHJcbiAgICBmb3IobGV0IGg9MDtoPGdyaWRTaXplO2grKykge1xyXG4gICAgICBjb25zdCByb3cgPSBbXTtcclxuICAgICAgZm9yKGxldCB3PTA7dzxncmlkU2l6ZTt3KyspIHtcclxuICAgICAgICByb3cucHVzaChuZXcgVGlsZShuZXcgUG9pbnQodywgaCksIFRpbGVUeXBlLk5vbmUpKTtcclxuICAgICAgfVxyXG4gICAgICBncmlkLnB1c2gocm93KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3Qgc2VlZFRpbGVDb3VudCA9IDgwO1xyXG4gICAgZm9yIChsZXQgaT0wO2kgPCBzZWVkVGlsZUNvdW50O2krKykge1xyXG4gICAgICBjb25zdCByYW5kb21UaWxlID0gZ3JpZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBncmlkLmxlbmd0aCldW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdyaWQubGVuZ3RoKV07XHJcbiAgICAgIHJhbmRvbVRpbGUudHlwZSA9IFRpbGVUeXBlLkdyYXNzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBncmlkW01hdGgucm91bmQoZ3JpZC5sZW5ndGgvMildW01hdGgucm91bmQoZ3JpZC5sZW5ndGgvMildLnR5cGUgPSBUaWxlVHlwZS5HcmFzcztcclxuICAgICAgXHJcbiAgICBncmlkID0gdGhpcy5kZmEoZ3JpZFNpemUsIGdyaWQsIHRoaXMuZ3Jvd0dyYXNzKTtcclxuICAgIGdyaWQgPSB0aGlzLmRmYShncmlkU2l6ZSwgZ3JpZCwgdGhpcy5ncm93R3Jhc3MpO1xyXG4gICAgdGhpcy5mbG9vZEZpbGwoZ3JpZCwgZ3JpZFtNYXRoLnJvdW5kKGdyaWQubGVuZ3RoLzIpXVtNYXRoLnJvdW5kKGdyaWQubGVuZ3RoLzIpXSk7XHJcblxyXG4gICAgZ3JpZCA9IHRoaXMuZGZhKGdyaWRTaXplLCBncmlkLCB0aGlzLnNtb290aFJ1bGUpO1xyXG4gICAgZ3JpZCA9IHRoaXMuZGZhKGdyaWRTaXplLCBncmlkLCB0aGlzLnNtb290aFJ1bGUpO1xyXG5cclxuICAgIHRoaXMuZmlsbEluSG9sZXMoZ3JpZCk7XHJcblxyXG4gICAgcmV0dXJuIGdyaWQ7XHJcbiAgfVxyXG5cclxuICBmbG9vZEZpbGwoZ3JpZDogVGlsZVtdW10sIHN0YXJ0OiBUaWxlKSB7XHJcbiAgICBjb25zdCBzdGFjayA9IFtzdGFydF07XHJcblxyXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgdGlsZSA9IHN0YWNrLnBvcCgpO1xyXG4gICAgICBjb25zdCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZ2V0TmVpZ2hib3VycyhncmlkU2VydmljZS50aWxlVG9JbmRleCh0aWxlKSwgZmFsc2UsIGZhbHNlLCBncmlkKTtcclxuICAgICAgY29uc3Qgd2F0ZXJOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKS5sZW5ndGg7XHJcbiAgICAgIGNvbnN0IGdyYXNzTmVpZ2hib3VycyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geC50eXBlID09PSBUaWxlVHlwZS5HcmFzcykubGVuZ3RoO1xyXG4gICAgICBcclxuICAgICAgaWYgKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh3YXRlck5laWdoYm91cnMgKyBncmFzc05laWdoYm91cnMpKSA+IHdhdGVyTmVpZ2hib3Vycykge1xyXG4gICAgICAgIHRpbGUudHlwZSA9IFRpbGVUeXBlLkdyYXNzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRpbGUudHlwZSA9IFRpbGVUeXBlLk9jZWFuO1xyXG4gICAgICB9XHJcbiAgICAgIG5laWdoYm91cnMuZmlsdGVyKHggPT4geC50eXBlID09PSBUaWxlVHlwZS5Ob25lKS5mb3JFYWNoKHggPT4gc3RhY2sucHVzaCh4KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZmEgKGdyaWRTaXplOiBudW1iZXIsIGdyaWQ6IFRpbGVbXVtdLCBydWxlOiBhbnkpIHtcclxuICAgIGNvbnN0IG5ld0dyaWQgPSBbXTtcclxuXHJcbiAgICBmb3IobGV0IGg9MDtoIDwgZ3JpZFNpemU7aCsrKSB7XHJcbiAgICAgIGNvbnN0IG5ld1JvdyA9IFtdO1xyXG4gICAgICBmb3IobGV0IHc9MDt3IDwgZ3JpZFNpemU7dysrKSB7XHJcbiAgICAgICAgY29uc3QgdGlsZSA9IGdyaWRbaF1bd107XHJcbiAgICAgICAgY29uc3QgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmdldE5laWdoYm91cnMoZ3JpZFNlcnZpY2UudGlsZVRvSW5kZXgodGlsZSksIGZhbHNlLCBmYWxzZSwgZ3JpZCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHdhdGVyTmVpZ2hib3VycyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geC50eXBlID09PSBUaWxlVHlwZS5PY2VhbikubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGdyYXNzTmVpZ2hib3VycyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geC50eXBlID09PSBUaWxlVHlwZS5HcmFzcykubGVuZ3RoO1xyXG5cclxuICAgICAgICBjb25zdCBjb3B5ID0gVGlsZS5jb3B5KHRpbGUpO1xyXG4gICAgICAgIGNvcHkudHlwZSA9IHJ1bGUoY29weSwgd2F0ZXJOZWlnaGJvdXJzLCBncmFzc05laWdoYm91cnMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5ld1Jvdy5wdXNoKGNvcHkpO1xyXG4gICAgICB9XHJcbiAgICAgIG5ld0dyaWQucHVzaChuZXdSb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0dyaWQ7XHJcbiAgfVxyXG5cclxuICBzbW9vdGhSdWxlICh0aWxlOiBUaWxlLCB3YXRlck5laWdoYm91cnM6IG51bWJlciwgZ3Jhc3NOZWlnaGJvdXJzOiBudW1iZXIpIHtcclxuICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuICYmIGdyYXNzTmVpZ2hib3VycyA+IDMpIHtcclxuICAgICAgcmV0dXJuIFRpbGVUeXBlLkdyYXNzO1xyXG4gICAgfVxyXG4gICAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuR3Jhc3MgJiYgd2F0ZXJOZWlnaGJvdXJzID4gNykge1xyXG4gICAgICByZXR1cm4gVGlsZVR5cGUuT2NlYW47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGlsZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgZ3Jvd0dyYXNzICh0aWxlOiBUaWxlLCB3YXRlck5laWdoYm91cnM6IG51bWJlciwgZ3Jhc3NOZWlnaGJvdXJzOiBudW1iZXIpIHtcclxuICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuICYmIGdyYXNzTmVpZ2hib3VycyA+IDApIHtcclxuICAgICAgcmV0dXJuIFRpbGVUeXBlLkdyYXNzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRpbGUudHlwZTtcclxuICB9XHJcblxyXG4gIGZpbGxJbkhvbGVzKGdyaWQ6IFRpbGVbXVtdKSB7XHJcbiAgICBmb3IobGV0IHkgPSAwOyB5IDwgZ3JpZC5sZW5ndGg7IHkrKykge1xyXG4gICAgICBmb3IgKGxldCBoID0gMDsgaCA8IGdyaWRbeV0ubGVuZ3RoOyBoKyspIHtcclxuICAgICAgICBpZiAoZ3JpZFt5XVtoXS50eXBlID09PSBUaWxlVHlwZS5Ob25lKSB7XHJcbiAgICAgICAgICBncmlkW3ldW2hdLnR5cGUgPSBUaWxlVHlwZS5PY2VhbjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBNYXBHZW5lcmF0b3IoKTsiLCJpbXBvcnQgUG9pbnQgZnJvbSAnLi4vTWFwRW50aXRpZXMvUG9pbnQnO1xyXG5pbXBvcnQgQ2l0eSBmcm9tICcuLi9NYXBFbnRpdGllcy9DaXR5JztcclxuaW1wb3J0IFVuaXQgZnJvbSAnLi4vTWFwRW50aXRpZXMvVW5pdCc7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlLCBncmlkU2VydmljZUluaXQgfSBmcm9tICcuLi9HcmlkL0dyaWRTZXJ2aWNlJztcclxuaW1wb3J0IFJvYWQgZnJvbSAnLi4vTWFwRW50aXRpZXMvUm9hZCc7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tICcuL1RpbGVzL1RpbGVUeXBlJztcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi9UaWxlcy9UaWxlJztcclxuaW1wb3J0IEdhdGhlcmVyIGZyb20gJy4uL1BvcHMvR2F0aGVyZXInO1xyXG5pbXBvcnQgUG9wIGZyb20gJy4uL1BvcHMvUG9wJztcclxuXHJcbmNsYXNzIE1hcCB7XHJcbiAgY29udGV4dDogYW55O1xyXG4gIHNpemU6IG51bWJlcjtcclxuICB0aWxlTnVtYmVyOiBudW1iZXI7XHJcbiAgdmlld1BvcnRPcmlnaW46IFBvaW50O1xyXG4gIHNlbGVjdGVkVGlsZTogVGlsZTtcclxuICBzZWxlY3RlZEVudGl0eTogYW55O1xyXG4gIHpvb21MZXZlbDogbnVtYmVyO1xyXG4gIG9yaWdpbjogUG9pbnQ7XHJcbiAgdmlld1BvcnRFbmQ6IFBvaW50O1xyXG4gIHRpbGVTaXplOiBudW1iZXI7XHJcbiAgY2xpcHBlZEdyaWQ6IGFueVtdO1xyXG4gIHZpZXdQb3J0U2l6ZTogbnVtYmVyO1xyXG4gIGVudGl0aWVzOiBhbnk7XHJcbiAgXHJcbiAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyLCB0aWxlTnVtYmVyOiBudW1iZXIsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgLy8gIERyYXcgZ3JpZCBvZiBzcXVhcmVzXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIHRoaXMudGlsZU51bWJlciA9IHRpbGVOdW1iZXI7XHJcbiAgICB0aGlzLnZpZXdQb3J0T3JpZ2luID0gbmV3IFBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5vcmlnaW4gPSBuZXcgUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGlsZSA9IG51bGw7XHJcbiAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcclxuICAgIHRoaXMuZW50aXRpZXMgPSB7XHJcbiAgICAgIHBvcHM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGdyaWRTZXJ2aWNlSW5pdCh0aGlzLnRpbGVOdW1iZXIpO1xyXG4gICAgZ3JpZFNlcnZpY2UuY3JlYXRlTWFwKCk7XHJcblxyXG4gICAgdGhpcy5jbGlwcGVkR3JpZCA9IFtdO1xyXG4gICAgdGhpcy52aWV3UG9ydFNpemUgPSBzaXplOyAvLyAgaG93IGxhcmdlIHRoZSB2aWV3IHBvcnQgaXNcclxuICAgIHRoaXMuem9vbUxldmVsID0gNDA7ICAvLyAgaG93IG1hbnkgVGlsZXMgYXJlIGluIHZpZXcgcG9ydFxyXG4gICAgdGhpcy52aWV3UG9ydEVuZCA9IG5ldyBQb2ludCh0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyAgdGhpcy56b29tTGV2ZWwsIHRoaXMudmlld1BvcnRPcmlnaW4ueSArICB0aGlzLnpvb21MZXZlbCk7XHJcbiAgICAgXHJcbiAgICB0aGlzLmNsaXBwZWRHcmlkID0gZ3JpZFNlcnZpY2UuY3JlYXRlQ2xpcHBlZEdyaWQodGhpcy52aWV3UG9ydE9yaWdpbiwgdGhpcy52aWV3UG9ydEVuZCk7XHJcbiAgICB0aGlzLnRpbGVTaXplID0gdGhpcy52aWV3UG9ydFNpemUgLyB0aGlzLnpvb21MZXZlbDsgLy8gIHNob3VsZCBiZSB2aWV3IHBvcnQgc2l6ZSAvIHZpZXcgcG9ydCBjb250ZW50IHNpemVcclxuICB9XHJcblxyXG4gIGdyaWQoKSB7XHJcbiAgICByZXR1cm4gZ3JpZFNlcnZpY2UuZ3JpZDtcclxuICB9XHJcblxyXG4gIGNsaWNrVGlsZShwb2ludDogUG9pbnQpIHtcclxuICAgIGNvbnN0IHRpbGVYID0gTWF0aC5mbG9vcihwb2ludC54IC8gdGhpcy50aWxlU2l6ZSk7XHJcbiAgICBjb25zdCB0aWxlWSA9IE1hdGguZmxvb3IocG9pbnQueSAvIHRoaXMudGlsZVNpemUpO1xyXG5cclxuICAgIGNvbnN0IHRpbGUgPSB0aGlzLmNsaXBwZWRHcmlkW3RpbGVZXSAmJiB0aGlzLmNsaXBwZWRHcmlkW3RpbGVZXVt0aWxlWF07XHJcblxyXG4gICAgaWYgKHRpbGUpIHsgIFxyXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFRpbGUpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGlsZS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aWxlLnVuaXQgfHwgdGlsZS5yb2FkIHx8IHRpbGUuY2l0eSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSB0aWxlLnVuaXQgfHwgdGlsZS5yb2FkIHx8IHRpbGUuY2l0eTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlbGVjdGVkVGlsZSA9IHRpbGU7XHJcbiAgICAgIHRpbGUuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGlsZTtcclxuICB9XHJcblxyXG4gIGRyYWcoZGlmZlg6IG51bWJlciwgZGlmZlk6IG51bWJlcikge1xyXG5cclxuICAgIGNvbnN0IG1pbkRyYWcgPSAxO1xyXG4gICAgaWYgKE1hdGguYWJzKGRpZmZYKSA+IG1pbkRyYWcgfHwgTWF0aC5hYnMoZGlmZlkpID4gbWluRHJhZykge1xyXG4gICAgICBpZiAoZGlmZlggPiAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy52aWV3UG9ydE9yaWdpbi54ICsgTWF0aC5yb3VuZChkaWZmWCk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi54ID0gTWF0aC5taW4oc3VtLCB0aGlzLnRpbGVOdW1iZXIpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRFbmQueCA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIHRoaXMuem9vbUxldmVsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIE1hdGgucm91bmQoZGlmZlgpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCA9IE1hdGgubWF4KHN1bSwgMCk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi54ID0gdGhpcy52aWV3UG9ydE9yaWdpbi54ICsgdGhpcy56b29tTGV2ZWw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkaWZmWSA+IDApIHtcclxuICAgICAgICBjb25zdCBzdW0gPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyBNYXRoLnJvdW5kKGRpZmZZKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgPSBNYXRoLm1pbihzdW0sIHRoaXMudGlsZU51bWJlcik7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55ID0gdGhpcy52aWV3UG9ydE9yaWdpbi55ICsgdGhpcy56b29tTGV2ZWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy52aWV3UG9ydE9yaWdpbi54ICsgTWF0aC5yb3VuZChkaWZmWSk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55ID0gTWF0aC5tYXgoc3VtLCAwKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyB0aGlzLnpvb21MZXZlbDtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAgbW92ZSB0byB1bml0XHJcbiAgbW92ZVVuaXQodW5pdDogVW5pdCwgbmVpZ2hib3VyOiBUaWxlKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbFRpbGUgPSB1bml0LnRpbGU7XHJcbiAgICB1bml0LnRpbGUgPSBncmlkU2VydmljZS5ncmlkW25laWdoYm91ci5wb2ludC55XVtuZWlnaGJvdXIucG9pbnQueF07XHJcbiAgICBncmlkU2VydmljZS5ncmlkW25laWdoYm91ci5wb2ludC55XVtuZWlnaGJvdXIucG9pbnQueF0udW5pdCA9IHVuaXQ7XHJcbiAgICBvcmlnaW5hbFRpbGUudW5pdCA9IG51bGw7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG5cclxuICBsZWZ0S2V5KCl7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSAmJiB0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgVW5pdCkge1xyXG4gICAgICB0aGlzLmVudGl0eUxlZnQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuTGVmdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmlnaHRLZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5UmlnaHQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuUmlnaHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwS2V5KCl7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSAmJiB0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgVW5pdCkge1xyXG4gICAgICB0aGlzLmVudGl0eVVwKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhblVwKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkb3duS2V5KCl7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSAmJiB0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgVW5pdCkge1xyXG4gICAgICB0aGlzLmVudGl0eURvd24oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuRG93bigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW50aXR5TGVmdCgpIHtcclxuICAgIGNvbnN0IG5laWdoYm91ciA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnModGhpcy5zZWxlY3RlZEVudGl0eS50aWxlKVsxXTtcclxuICAgIGlmIChuZWlnaGJvdXIgJiYgbmVpZ2hib3VyLnR5cGUgIT09IFRpbGVUeXBlLk9jZWFuKSB7XHJcbiAgICAgIHRoaXMubW92ZVVuaXQodGhpcy5zZWxlY3RlZEVudGl0eSwgbmVpZ2hib3VyKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZW50aXR5UmlnaHQoKSB7XHJcbiAgICBjb25zdCBuZWlnaGJvdXIgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRoaXMuc2VsZWN0ZWRFbnRpdHkudGlsZSlbMl07XHJcbiAgICBpZiAobmVpZ2hib3VyICYmIG5laWdoYm91ci50eXBlICE9PSBUaWxlVHlwZS5PY2Vhbikge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGVudGl0eVVwKCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGUpWzBdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gVGlsZVR5cGUuT2NlYW4pIHtcclxuICAgICAgdGhpcy5tb3ZlVW5pdCh0aGlzLnNlbGVjdGVkRW50aXR5LCBuZWlnaGJvdXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW50aXR5RG93bigpIHtcclxuICAgIGNvbnN0IG5laWdoYm91ciA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnModGhpcy5zZWxlY3RlZEVudGl0eS5UaWxlKVszXTtcclxuICAgIGlmIChuZWlnaGJvdXIgJiYgbmVpZ2hib3VyLnR5cGUgIT09IFRpbGVUeXBlLk9jZWFuKSB7XHJcbiAgICAgIHRoaXMubW92ZVVuaXQodGhpcy5zZWxlY3RlZEVudGl0eSwgbmVpZ2hib3VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhbkxlZnQoKSB7XHJcbiAgICBpZiAodGhpcy52aWV3UG9ydE9yaWdpbi54ID4gMCkge1xyXG4gICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLngtLTtcclxuICAgICAgdGhpcy52aWV3UG9ydEVuZC54LS07XHJcbiAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFuUmlnaHQoKSB7XHJcbiAgICBpZiAodGhpcy52aWV3UG9ydE9yaWdpbi54ICsgdGhpcy56b29tTGV2ZWwgPCB0aGlzLnRpbGVOdW1iZXIpIHtcclxuICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi54Kys7XHJcbiAgICAgIHRoaXMudmlld1BvcnRFbmQueCsrO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhblVwKCkge1xyXG4gICAgaWYgKHRoaXMudmlld1BvcnRPcmlnaW4ueSA+IDApIHtcclxuICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55LS07XHJcbiAgICAgIHRoaXMudmlld1BvcnRFbmQueS0tO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTsgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFuRG93bigpIHtcclxuICAgIGlmICh0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyB0aGlzLnpvb21MZXZlbCA8IHRoaXMudGlsZU51bWJlcikge1xyXG4gICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnkrKztcclxuICAgICAgdGhpcy52aWV3UG9ydEVuZC55Kys7XHJcbiAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgem9vbU91dCgpIHtcclxuICAgIGlmICh0aGlzLnpvb21MZXZlbCA8IDEwMCkge1xyXG4gICAgICB0aGlzLnpvb21MZXZlbCsrO1xyXG4gICAgICB0aGlzLnpvb20oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHpvb21JbigpIHtcclxuICAgIGlmICh0aGlzLnpvb21MZXZlbCA+IDEpIHtcclxuICAgICAgdGhpcy56b29tTGV2ZWwtLTtcclxuICAgICAgdGhpcy56b29tKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB6b29tKCkge1xyXG4gICAgdGhpcy52aWV3UG9ydEVuZCA9IG5ldyBQb2ludCh0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyAgdGhpcy56b29tTGV2ZWwsIHRoaXMudmlld1BvcnRPcmlnaW4ueSArICB0aGlzLnpvb21MZXZlbCk7XHJcbiAgICB0aGlzLnRpbGVTaXplID0gdGhpcy52aWV3UG9ydFNpemUgLyB0aGlzLnpvb21MZXZlbDtcclxuICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlVmlldyh1cGRhdGVHcmlkID0gdHJ1ZSkge1xyXG4gICAgaWYgKHVwZGF0ZUdyaWQpdGhpcy5jbGlwcGVkR3JpZCA9IGdyaWRTZXJ2aWNlLmNyZWF0ZUNsaXBwZWRHcmlkKHRoaXMudmlld1BvcnRPcmlnaW4sIHRoaXMudmlld1BvcnRFbmQpO1xyXG4gICAgdGhpcy5kcmF3KCk7XHJcbiAgfVxyXG5cclxuICBlbmRUdXJuKCkge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMuZW50aXRpZXMucG9wcy5mb3JFYWNoKChwb3A6IFBvcCkgPT4ge1xyXG4gICAgICBwb3AudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRyYXcoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XHJcblxyXG4gICAgZm9yKGxldCBoPTA7aDx0aGlzLmNsaXBwZWRHcmlkLmxlbmd0aDtoKyspIHtcclxuICAgICAgZm9yKGxldCB3PTA7dzx0aGlzLmNsaXBwZWRHcmlkW2hdLmxlbmd0aDt3KyspIHtcclxuICAgICAgICBjb25zdCB0aWxlID0gdGhpcy5jbGlwcGVkR3JpZFtoXVt3XTtcclxuICAgICAgICBpZiAodGlsZSAmJiAodGlsZS5kcmF3aW5nUG9pbnQueCkgPD0gdGhpcy52aWV3UG9ydEVuZC54ICYmICh0aWxlLmRyYXdpbmdQb2ludC54KSA+PSAwICYmICh0aWxlLmRyYXdpbmdQb2ludC55KSA+PSAwICYmIHRpbGUuZHJhd2luZ1BvaW50LnkgPD0gdGhpcy52aWV3UG9ydEVuZC55KSB7XHJcbiAgICAgICAgICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5HcmFzcykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyMwMEZGMDAnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMEZGJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk5vbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjRkZGRkZGJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aWxlLmRyYXdpbmdQb2ludC54ICogdGhpcy50aWxlU2l6ZSwgdGlsZS5kcmF3aW5nUG9pbnQueSAqIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG5cclxuICAgICAgICAgIGlmICh0aWxlLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QodGlsZS5kcmF3aW5nUG9pbnQueCAqIHRoaXMudGlsZVNpemUsIHRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aWxlLmNpdHkpIHtcclxuICAgICAgICAgICAgdGlsZS5jaXR5LmRyYXcodGhpcy5jb250ZXh0LCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGlsZS5yb2FkKSB7XHJcbiAgICAgICAgICAgIHRpbGUucm9hZC5kcmF3KHRoaXMuY29udGV4dCwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRpbGUudW5pdCkge1xyXG4gICAgICAgICAgICB0aWxlLnVuaXQuZHJhdyh0aGlzLmNvbnRleHQsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aWxlLnBvcCkge1xyXG4gICAgICAgICAgICB0aWxlLnBvcC5kcmF3KHRoaXMuY29udGV4dCwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRVbml0VG9TZWxlY3RlZFRpbGUoKSB7XHJcbiAgICBpZiAoVW5pdC5hZGQodGhpcy5zZWxlY3RlZFRpbGUpKSB7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkUm9hZFRvU2VsZWN0ZWRUaWxlKCkge1xyXG4gICAgaWYgKFJvYWQuYWRkKHRoaXMuc2VsZWN0ZWRUaWxlKSkge1xyXG4gICAgICB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZENpdHlUb1NlbGVjdGVkVGlsZSgpIHtcclxuICAgIGlmIChDaXR5LmFkZCh0aGlzLnNlbGVjdGVkVGlsZSkpIHtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRHYXRoZXJlcigpIHtcclxuICAgIGlmIChHYXRoZXJlci5hZGQodGhpcy5zZWxlY3RlZFRpbGUsIHRoaXMuZW50aXRpZXMpKSB7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlU2VsZWN0ZWRFbnRpdHkoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRFbnRpdHkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRpbGUgPSB0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGU7XHJcbiAgICBjb25zdCBncmlkVGlsZSA9IGdyaWRTZXJ2aWNlLmdyaWRbdGlsZS5wb2ludC55XVt0aWxlLnBvaW50LnhdO1xyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgVW5pdCkge1xyXG4gICAgICBncmlkVGlsZS51bml0ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJzID0gdGhpcy5zZWxlY3RlZEVudGl0eS5uZWlnaGJvdXJzO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBSb2FkKSB7XHJcbiAgICAgIC8vICBGb3IgZWFjaCBuZWlnaGJvdXIgZG8gYSBjb25uZWN0aXZpdHkgY2hlY2sgYW5kIHVwZGF0ZSBjb25uZWN0ZWRuZXNzXHJcbiAgICAgIC8vICBVcGRhdGUgbmV0d29ya3Mgcm9hZHMuXHJcbiAgICAgIFJvYWQucmVtb3ZlKGdyaWRUaWxlLCB0aGlzLnNlbGVjdGVkRW50aXR5KTtcclxuICAgICAgLy8gIEZpbmQgbmV0d29yayB0aGF0IHRoZSByb2FkIGlzIGNvbm5lY3RlZCB0byBhbmQgaXQncyBuZWlnaGJvdXJzIGFuZCByZW1vdmVcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgQ2l0eSkge1xyXG4gICAgICBDaXR5LnJlbW92ZShncmlkVGlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZEVudGl0eSA9IG51bGw7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hcDtcclxuIiwiaW1wb3J0IFBvaW50IGZyb20gJy4uLy4uL01hcEVudGl0aWVzL1BvaW50JztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4vVGlsZVR5cGUnO1xyXG5pbXBvcnQgVW5pdCBmcm9tICcuLi8uLi9NYXBFbnRpdGllcy9Vbml0JztcclxuaW1wb3J0IENpdHkgZnJvbSAnLi4vLi4vTWFwRW50aXRpZXMvQ2l0eSc7XHJcbmltcG9ydCBQb3AgZnJvbSAnLi4vLi4vUG9wcy9Qb3AnO1xyXG5pbXBvcnQgSVByaW50YWJsZSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lQcmludGFibGUnO1xyXG5cclxuY2xhc3MgVGlsZSBpbXBsZW1lbnRzIElQcmludGFibGV7XHJcbiAgcG9pbnQ6IFBvaW50O1xyXG4gIHNlbGVjdGVkOiBib29sZWFuO1xyXG4gIHR5cGU6IFRpbGVUeXBlO1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY2l0eTogQ2l0eTtcclxuICByb2FkOiBhbnk7XHJcbiAgdW5pdDogVW5pdDtcclxuICBkcmF3aW5nUG9pbnQ6IFBvaW50O1xyXG4gIHBvcDogUG9wO1xyXG4gIHN0YXRpYyBjb3B5OiAodGlsZTogVGlsZSwgdHlwZT86IGFueSkgPT4gVGlsZTtcclxuICBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQsIHR5cGU6IFRpbGVUeXBlKSB7XHJcbiAgICB0aGlzLnBvaW50ID0gUG9pbnQuY29weShwb2ludCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmlkID0gYCR7cG9pbnQueH0tJHtwb2ludC55fWA7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gIH1cclxuXHJcbiAgZXF1YWxzKG90aGVyVGlsZTogVGlsZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9pbnQuZXF1YWxzKG90aGVyVGlsZS5wb2ludCk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIGNvbnN0IHRpbGVEZXRhaWxzID0gYCR7dGhpcy5wb2ludC54fSwgJHt0aGlzLnBvaW50Lnl9LCAke3RoaXMudHlwZX1gO1xyXG4gICAgbGV0IGNpdHlEZXRhaWxzID0gJyc7XHJcbiAgICBpZiAodGhpcy5jaXR5KSB7XHJcbiAgICAgIGNpdHlEZXRhaWxzID0gdGhpcy5jaXR5LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJvYWREZXRhaWxzID0gJyc7XHJcbiAgICBpZiAodGhpcy5yb2FkKSB7XHJcbiAgICAgIHJvYWREZXRhaWxzID0gYCR7dGhpcy5yb2FkLnRvU3RyaW5nKCl9XFxuJHt0aGlzLnJvYWQucm9hZE5ldHdvcmsudG9TdHJpbmcoKX1gXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBvcERldGFpbHMgPSB0aGlzLnBvcCA/IHRoaXMucG9wLnRvU3RyaW5nKCkgOiAnJztcclxuXHJcbiAgICBjb25zdCB1bml0RGV0YWlscyA9IHRoaXMudW5pdCA/IHRoaXMudW5pdC50b1N0cmluZygpIDogJyc7XHJcbiAgICByZXR1cm4gYCR7dGlsZURldGFpbHN9ICR7Y2l0eURldGFpbHN9ICR7cm9hZERldGFpbHN9ICR7dW5pdERldGFpbHN9ICR7cG9wRGV0YWlsc31gO1xyXG4gIH1cclxufVxyXG5cclxuVGlsZS5jb3B5ID0gZnVuY3Rpb24gKHRpbGU6IFRpbGUsIHR5cGUgPSBudWxsKSB7XHJcbiAgbGV0IGNvcHk7XHJcbiAgaWYgKCF0eXBlKSB7XHJcbiAgICBjb3B5ID0gbmV3IFRpbGUodGlsZS5wb2ludCwgdGlsZS50eXBlKTtcclxuICAgIGNvcHkuc2VsZWN0ZWQgPSBjb3B5LnNlbGVjdGVkO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNvcHk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpbGU7XHJcbiIsImVudW0gVGlsZVR5cGUge1xyXG4gIE5vbmUgPSAnTm9uZScsXHJcbiAgR3Jhc3MgPSAnR3Jhc3MnLFxyXG4gIEZvcmVzdCA9ICdGb3Jlc3QnLFxyXG4gIE9jZWFuID0gJ09jZWFuJyxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlsZVR5cGU7XHJcbiIsIlxyXG5pbXBvcnQgZ2VuZXJhdGVHdWlkIGZyb20gJy4uL2dlbmVyYXRlR3VpZCc7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vR3JpZC9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBUaWxlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4uL01hcC9UaWxlcy9UaWxlVHlwZSc7XHJcblxyXG5jbGFzcyBDaXR5IHtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgaWQ6IHN0cmluZztcclxuICB0aWxlOiBUaWxlO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBwb3B1bGF0aW9uOiBudW1iZXI7XHJcbiAgZGlzdGFuY2VzOiBhbnlbXTtcclxuICBzdGF0aWMgYWRkOiAodGlsZTogVGlsZSkgPT4gYm9vbGVhbjtcclxuICByb2FkTmV0d29ya3M6IGFueTtcclxuICBzdGF0aWMgcmVtb3ZlOiAoZ3JpZFRpbGU6IFRpbGUpID0+IHZvaWQ7XHJcbiAgY29uc3RydWN0b3IodGlsZTogVGlsZSwgbmFtZTogc3RyaW5nLCBwb3B1bGF0aW9uOiBudW1iZXIpIHtcclxuICAgIHRoaXMudHlwZSA9ICdjaXR5JztcclxuICAgIHRoaXMuaWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuICAgIHRoaXMudGlsZSA9IHRpbGU7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5wb3B1bGF0aW9uID0gcG9wdWxhdGlvbjtcclxuXHJcbiAgICB0aGlzLmRpc3RhbmNlcyA9IFtdO1xyXG5cclxuICAgIGxldCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aWxlKVxyXG4gICAgICAuZmlsdGVyKChuZWlnaGJvdXI6IGFueSkgPT4gbmVpZ2hib3VyLmNpdHkgfHwgbmVpZ2hib3VyLnJvYWQpXHJcbiAgICAgIC5tYXAoeCA9PiB4LnJvYWQgfHwgeC5jaXR5KTtcclxuXHJcbiAgICB0aGlzLnJvYWROZXR3b3JrcyA9IFtdO1xyXG4gICAgXHJcbiAgICBuZWlnaGJvdXJzLmZvckVhY2goKG5laWdoYm91cjogYW55KSA9PiB7XHJcbiAgICAgIGlmIChuZWlnaGJvdXIudHlwZSA9PT0gJ3JvYWQnKSB7XHJcbiAgICAgICAgdGhpcy5hZGROZXR3b3JrKG5laWdoYm91ci5yb2FkTmV0d29yayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIG5laWdoYm91cnMuZmlsdGVyKCh4OiBhbnkpID0+IHggJiYgeC5yb2FkKS5mb3JFYWNoKChuZWlnaGJvdXI6IGFueSkgPT4ge1xyXG4gICAgICBuZWlnaGJvdXIucm9hZC51cGRhdGVTaGFwZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBlcXVhbHMob3RoZXJDaXR5OiBhbnkpIHtcclxuICAgIHJldHVybiBvdGhlckNpdHkuaWQgPT09IHRoaXMuaWQ7XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XHJcbiAgICBjb25zdCBiYXNlWCA9IHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplO1xyXG4gICAgY29uc3QgYmFzZVkgPSB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZTtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoYmFzZVgsICBiYXNlWSArIHRpbGVTaXplLzIsIHRpbGVTaXplLzQsIHRpbGVTaXplLzIpO1xyXG4gICAgY29udGV4dC5maWxsUmVjdChiYXNlWCArIHRpbGVTaXplLzQsICBiYXNlWSArIHRpbGVTaXplLzQsIHRpbGVTaXplLzIsIDMqdGlsZVNpemUvNCk7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KGJhc2VYICsgMyp0aWxlU2l6ZS80LCAgYmFzZVkgKyB0aWxlU2l6ZS8yLCB0aWxlU2l6ZS80LCB0aWxlU2l6ZS8yKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgY29uc3QgZGlzdGFuY2VzID0gdGhpcy5kaXN0YW5jZXMubWFwKHggPT4gYElkOiAke3guY2l0eS5pZH0gZGlzdGFuY2U6ICR7eC5kaXN0YW5jZX1cXG5gKTtcclxuICAgIHJldHVybiBgJHt0aGlzLmlkfTogJHt0aGlzLnBvcHVsYXRpb259XFxuICR7ZGlzdGFuY2VzfWA7XHJcbiAgfVxyXG5cclxuICBhZGROZXR3b3JrKG5ldHdvcms6IGFueSkge1xyXG4gICAgaWYgKCF0aGlzLnJvYWROZXR3b3Jrcy5zb21lKCh4OiBhbnkpID0+IHguaWQgPT09IG5ldHdvcmsuaWQpKSB7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmtzLnB1c2gobmV0d29yayk7XHJcbiAgICAgIG5ldHdvcmsuY2l0aWVzLnB1c2godGhpcyk7XHJcbiAgICAgIG5ldHdvcmsuZmluZERpc3RhbmNlc0ZvckNpdGllcygpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuQ2l0eS5yZW1vdmUgPSBmdW5jdGlvbihncmlkVGlsZTogVGlsZSkge1xyXG4gIFxyXG4gIGdyaWRUaWxlLmNpdHkgPSBudWxsO1xyXG4gIC8vICBSZW1vdmUgZnJvbSBuZWlnaGJvdXJpbmcgcm9hZG5ldHdvcmtzIGFuZCByZWNhbGN1bGF0ZSBuZXR3b3Jrc1xyXG59XHJcblxyXG5DaXR5LmFkZCA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUpIHtcclxuICBpZiAoIXRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUuY2l0eSB8fCB0aWxlLnJvYWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3QgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmdldFJlZ2lvbih0aWxlLnBvaW50LCAyKTtcclxuXHJcbiAgaWYgKG5laWdoYm91cnMuZmlsdGVyKCh4OiBhbnkpID0+IHguY2l0eSkubGVuZ3RoID4gMCkgcmV0dXJuIGZhbHNlO1xyXG4gIHRpbGUuY2l0eSA9IG5ldyBDaXR5KHRpbGUsICdOZXcgQ2l0eScsIDEpO1xyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2l0eSIsIlxyXG5jbGFzcyBQb2ludCB7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxuICBzdGF0aWMgY29weTogKHBvaW50OiBQb2ludCkgPT4gUG9pbnQ7XHJcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG4gIH1cclxuXHJcbiAgZXF1YWxzKG90aGVyUG9pbnQ6IFBvaW50KSB7XHJcbiAgICByZXR1cm4gdGhpcy54ID09PSBvdGhlclBvaW50LnggJiYgdGhpcy55ID09PSBvdGhlclBvaW50Lnk7XHJcbiAgfVxyXG59XHJcblxyXG5Qb2ludC5jb3B5ID0gZnVuY3Rpb24ocG9pbnQ6IFBvaW50KSB7XHJcbiAgcmV0dXJuIG5ldyBQb2ludChwb2ludC54LCBwb2ludC55KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9pbnQ7IiwiXHJcbmltcG9ydCBSb2FkTmV0d29yayBmcm9tICcuL1JvYWROZXR3b3JrJztcclxuaW1wb3J0IENpdHkgZnJvbSAnLi9DaXR5JztcclxuaW1wb3J0IGdlbmVyYXRlR3VpZCBmcm9tICcuLi9nZW5lcmF0ZUd1aWQnO1xyXG5pbXBvcnQgeyBncmlkU2VydmljZSB9IGZyb20gJy4uL0dyaWQvR3JpZFNlcnZpY2UnO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZSc7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZVR5cGUnO1xyXG5cclxuY29uc3QgU2hhcGVzID0ge1xyXG4gIGlzb2xhdGVkOiAnaXNvbGF0ZWQnLFxyXG4gIHRvcDogJ3RvcCcsXHJcbiAgbGVmdDogJ2xlZnQnLFxyXG4gIGJvdHRvbTogJ2JvdHRvbScsXHJcbiAgcmlnaHQ6ICdyaWdodCcsXHJcbiAgdmVydGljYWw6ICd2ZXJ0aWNhbCcsXHJcbiAgaG9yaXpvbnRhbDogJ2hvcml6b250YWwnLFxyXG4gIHRvcFJpZ2h0OiAndG9wUmlnaHQnLFxyXG4gIHRvcExlZnQ6ICd0b3BMZWZ0JyxcclxuICBib3R0b21SaWdodDogJ2JvdHRvbVJpZ2h0JyxcclxuICBib3R0b21MZWZ0OiAnYm90dG9tTGVmdCcsXHJcbiAgaG9yaXpvbnRhbEJvdHRvbTogJ2hvcml6b250YWxCb3R0b20nLFxyXG4gIGhvcml6b250YWxUb3A6ICdob3Jpem9udGFsVG9wJyxcclxuICB2ZXJ0aWNhbExlZnQ6ICd2ZXJ0aWNhbExlZnQnLFxyXG4gIHZlcnRpY2FsUmlnaHQ6ICd2ZXJ0aWNhbFJpZ2h0JyxcclxuICBjcm9zczogJ2Nyb3NzJ1xyXG59O1xyXG5cclxuXHJcbmNsYXNzIFJvYWQge1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBpZDogc3RyaW5nO1xyXG4gIHRpbGU6IFRpbGU7XHJcbiAgc2hhcGU6IGFueTtcclxuICBzdGF0aWMgYWRkOiAodGlsZTogVGlsZSkgPT4gYm9vbGVhbjtcclxuICBzdGF0aWMgZmluZFNoYXBlOiBhbnk7XHJcbiAgcm9hZE5ldHdvcms6IFJvYWROZXR3b3JrO1xyXG4gIHN0YXRpYyByZW1vdmU6IChncmlkVGlsZTogVGlsZSwgcm9hZDogUm9hZCkgPT4gdm9pZDtcclxuICBzdGF0aWMgZmluZENvbm5lY3Rpdml0eTogKHJvYWRzOiBhbnkpID0+IHZvaWQ7XHJcbiAgY29uc3RydWN0b3IodGlsZTogVGlsZSkge1xyXG4gICAgdGhpcy50eXBlID0gJ3JvYWQnO1xyXG4gICAgdGhpcy5pZCA9IGdlbmVyYXRlR3VpZCgpO1xyXG4gICAgdGhpcy50aWxlID0gdGlsZTtcclxuXHJcbiAgICBsZXQgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnModGlsZSk7XHJcblxyXG4gICAgdGhpcy5zaGFwZSA9IFJvYWQuZmluZFNoYXBlKG5laWdoYm91cnMpO1xyXG4gICAgbmVpZ2hib3VycyA9IG5laWdoYm91cnMuZmlsdGVyKG5laWdoYm91ciA9PiBuZWlnaGJvdXIuY2l0eSB8fCBuZWlnaGJvdXIucm9hZClcclxuICAgICAgLm1hcCh4ID0+IHgucm9hZCB8fCB4LmNpdHkpO1xyXG5cclxuICAgIGNvbnN0IG5laWdoYm91cmluZ1JvYWRzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4IGluc3RhbmNlb2YgUm9hZClcclxuICAgIGNvbnN0IG5laWdoYm91cmluZ1JvYWROZXR3b3JrcyA9IG5laWdoYm91cmluZ1JvYWRzLm1hcCh4ID0+IHgucm9hZE5ldHdvcmspO1xyXG5cclxuICAgIGlmIChuZWlnaGJvdXJpbmdSb2FkTmV0d29ya3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMubWVyZ2VOZXR3b3JrcyhuZWlnaGJvdXJpbmdSb2FkTmV0d29ya3MpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yb2FkTmV0d29yayA9IG5ldyBSb2FkTmV0d29yaygpO1xyXG4gICAgICB0aGlzLnJvYWROZXR3b3JrLmFkZFJvYWQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmVpZ2hib3VyaW5nQ2l0aWVzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4IGluc3RhbmNlb2YgQ2l0eSk7XHJcbiAgICBuZWlnaGJvdXJpbmdDaXRpZXMuZm9yRWFjaChjaXR5ID0+IHtcclxuICAgICAgY2l0eS5hZGROZXR3b3JrKHRoaXMucm9hZE5ldHdvcmspO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbmVpZ2hib3VyaW5nUm9hZHMuZm9yRWFjaChyb2FkID0+IHtcclxuICAgICAgcm9hZC5uZWlnaGJvdXJzLnB1c2godGhpcyk7XHJcbiAgICAgIHJvYWQuc2hhcGUgPSBSb2FkLmZpbmRTaGFwZShyb2FkLm5laWdoYm91cnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBlcXVhbHMob3RoZXJSb2FkOiBSb2FkKSB7XHJcbiAgICByZXR1cm4gdGhpcy50aWxlLmVxdWFscyhvdGhlclJvYWQudGlsZSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBgJHt0aGlzLnR5cGV9OiAke3RoaXMuc2hhcGV9YDtcclxuICB9XHJcbiAgXHJcbiAgbWVyZ2VOZXR3b3JrcyhuZXR3b3JrczogYW55W10pIHtcclxuICAgIGNvbnN0IGZpcnN0ID0gbmV0d29ya3MucG9wKCk7XHJcbiAgICBpZiAoIXRoaXMucm9hZE5ldHdvcmspIHtcclxuICAgICAgZmlyc3QuYWRkUm9hZCh0aGlzKTtcclxuICAgICAgdGhpcy5yb2FkTmV0d29yayA9IGZpcnN0O1xyXG4gICAgfVxyXG4gICAgZmlyc3QubWVyZ2UobmV0d29ya3MpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU2hhcGUoKSB7XHJcbiAgICBjb25zdCBuID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnRpbGUpO1xyXG4gICAgdGhpcy5zaGFwZSA9IFJvYWQuZmluZFNoYXBlKG4pO1xyXG4gIH1cclxuXHJcbiAgZHJhd0hvcml6b250YWwoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplLCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgdGlsZVNpemUsIHRpbGVTaXplLzQpO1xyXG4gIH1cclxuXHJcbiAgZHJhd1ZlcnRpY2FsKGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUsIHRpbGVTaXplLzQsIHRpbGVTaXplKTtcclxuICB9XHJcblxyXG4gIGRyYXdUb3AoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7IFxyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUsIHRpbGVTaXplLzQsIDUqdGlsZVNpemUvOCk7XHJcbiAgfVxyXG4gIFxyXG4gIGRyYXdCb3R0b20oY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7IFxyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSArIDMqdGlsZVNpemUvOCwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRpbGVTaXplLzQsIHRpbGVTaXplKTtcclxuICB9XHJcbiAgXHJcbiAgZHJhd0xlZnQoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7IFxyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIDUqdGlsZVNpemUvOCwgdGlsZVNpemUvNCk7XHJcbiAgfVxyXG4gIFxyXG4gIGRyYXdSaWdodChjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHsgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgdGlsZVNpemUvMiwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIDMqdGlsZVNpemUvNCwgdGlsZVNpemUvNCk7XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnI2M0OGIyMyc7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLnNoYXBlKSB7XHJcbiAgICAgIGNhc2UgU2hhcGVzLmlzb2xhdGVkOlxyXG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyB0aWxlU2l6ZS8yLCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIHRpbGVTaXplLzIsIHRpbGVTaXplLzQsIHRpbGVTaXplLzQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIFxyXG4gICAgICBjYXNlIFNoYXBlcy52ZXJ0aWNhbDpcclxuICAgICAgICB0aGlzLmRyYXdWZXJ0aWNhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIFxyXG4gICAgICBjYXNlIFNoYXBlcy5ob3Jpem9udGFsOlxyXG4gICAgICAgIHRoaXMuZHJhd0hvcml6b250YWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIFxyXG4gICAgICBjYXNlIFNoYXBlcy5sZWZ0OlxyXG4gICAgICAgIHRoaXMuZHJhd0xlZnQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMucmlnaHQ6XHJcbiAgICAgICAgdGhpcy5kcmF3UmlnaHQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMudG9wOlxyXG4gICAgICAgIHRoaXMuZHJhd1RvcChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5ib3R0b206XHJcbiAgICAgICAgdGhpcy5kcmF3Qm90dG9tKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmNyb3NzOlxyXG4gICAgICAgIHRoaXMuZHJhd1ZlcnRpY2FsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdIb3Jpem9udGFsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnRvcExlZnQ6XHJcbiAgICAgICAgdGhpcy5kcmF3VG9wKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnRvcFJpZ2h0OlxyXG4gICAgICAgIHRoaXMuZHJhd1RvcChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3UmlnaHQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMuYm90dG9tTGVmdDpcclxuICAgICAgICB0aGlzLmRyYXdCb3R0b20oY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0xlZnQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMuYm90dG9tUmlnaHQ6XHJcbiAgICAgICAgdGhpcy5kcmF3Qm90dG9tKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdSaWdodChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy52ZXJ0aWNhbExlZnQ6XHJcbiAgICAgICAgdGhpcy5kcmF3VmVydGljYWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0xlZnQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMudmVydGljYWxSaWdodDpcclxuICAgICAgICB0aGlzLmRyYXdWZXJ0aWNhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3UmlnaHQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMuaG9yaXpvbnRhbFRvcDpcclxuICAgICAgICB0aGlzLmRyYXdIb3Jpem9udGFsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdUb3AoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMuaG9yaXpvbnRhbEJvdHRvbTpcclxuICAgICAgICB0aGlzLmRyYXdIb3Jpem9udGFsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdCb3R0b20oY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuUm9hZC5yZW1vdmUgPSBmdW5jdGlvbiAoZ3JpZFRpbGU6IFRpbGUsIHJvYWQ6IFJvYWQpIHtcclxuICBncmlkVGlsZS5yb2FkID0gbnVsbDtcclxuXHJcbiAgLy8gIENhc2VzOlxyXG4gIC8vICAgIHNpbmdsZSBuZWlnaGJvdXJpbmcgcm9hZFxyXG4gIC8vICAgICAgcmVtb3ZlIHJvYWQgZnJvbSBuZWlnaGJvdXIgYW5kIGZyb20gbmV0d29ya1xyXG4gIC8vICAgIG11bHRpcGxlIG5laWdoYm91cmluZyByb2Fkc1xyXG4gIC8vICAgICAgcmVtb3ZlIHJvYWQgZnJvbSBuZWlnaGJvdXJzIFxyXG4gIC8vICAgICAgZm9yIGVhY2ggbmVpZ2hib3VyaW5nIG5ldHdvcmsgcmVwcm9jZXNzIGNvbm5lY3Rpdml0eVxyXG4gIC8vICAgIG5laWdoYm91cmluZyBjaXR5XHJcbiAgLy8gICAgICBSZW1vdmUgcm9hZCBmcm9tIG5laWdoYm91cnNcclxuICAvLyAgICAgIHByb2Nlc3MgY29ubmVjdGl2aXR5IHRvIGNoZWNrIGlmIHRoZSBuZXR3b3JrIHNob3VsZCBiZSByZW1vdmVkXHJcbiAgLy8gcm9hZC5uZWlnaGJvdXJzLmZvckVhY2gobmVpZ2hib3VyID0+IHtcclxuICAvLyAgIG5laWdoYm91ci5uZWlnaGJvdXJzID0gbmVpZ2hib3VyLm5laWdoYm91cnMuZmlsdGVyKHggPT4geC5pZCAhPT0gbmVpZ2hib3VyKTtcclxuICAvLyB9KVxyXG59XHJcblxyXG5Sb2FkLmZpbmRDb25uZWN0aXZpdHkgPSBmdW5jdGlvbihyb2Fkcykge1xyXG4gIC8vIElkZWEgaXMgdG8gcGVyZm9ybSBhIHNlcGVyYXRlIGJmcyBpbiBzdGVwIG9uIGVhY2ggcGVhY2Ugb2Ygcm9hZCBhbmQgY2hlY2sgY29ubmVjdGl2aXR5IGF0IGVhY2ggc3RlcFxyXG4gIC8vIElmIHR3byBuZXR3b3JrcyBjb250YWluIHRoZSBzYW1lIG5vZGUgdGhlbiB0aGV5IGFyZSBjb25uZWN0ZWQuXHJcblxyXG4gIC8vIGNvbnN0IHNlYXJjaGVzID0gcm9hZHMubWFwKHggPT4ge1xyXG4gIC8vICAgY29uc3QgdmlzaXRlZCA9IHt9O1xyXG4gIC8vICAgdmlzaXRlZFt4LmlkXSA9IHRydWU7XHJcbiAgLy8gICByZXR1cm4geyBpc0ZpbmlzaGVkOiBmYWxzZSwgZWRnZVNldDogeC5uZWlnaGJvdXJzLCB2aXNpdGVkLCBjb25uZWN0ZWQ6IFtdIH07XHJcbiAgLy8gfSk7XHJcblxyXG4gIC8vIHdoaWxlIChzZWFyY2hlcy5maW5kKHggPT4geC5pc0ZpbmlzaGVkKS5sZW5ndGggPiAwKSB7XHJcbiAgLy8gICBjb25zb2xlLmxvZygnSXRlcmF0aW9uIDEnKTtcclxuICAvLyAgIHNlYXJjaGVzLmZvckVhY2goeCA9PiB4LmZpbmlzaGVkID0gdHJ1ZSk7XHJcbiAgLy8gfVxyXG4gIC8vICBDb250aW51ZSB1bnRpbCBhbGwgc2VhcmNoZXMgYXJlIGNvbXBsZXRlLlxyXG4gIC8vICBUZXN0IGVhY2ggaXRlcmF0aW9uIGFuZCBzdG9wIHNlYXJjaCBpZiBuZWNlc3NhcnkuXHJcbn1cclxuXHJcbi8vICBTYXZlIHN0YXRlIFxyXG4vLyBSb2FkLmluY3JlbWVudGFsQmZzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4vLyB9XHJcblxyXG5cclxuUm9hZC5maW5kU2hhcGUgPSBmdW5jdGlvbiAobmVpZ2hib3VyczogVGlsZVtdKSB7XHJcbiAgY29uc3QgdG9wTmVpZ2hib3VyID0gKG5laWdoYm91cnNbMF0gJiYgKG5laWdoYm91cnNbMF0ucm9hZCB8fCBuZWlnaGJvdXJzWzBdLmNpdHkpKSB8fCBudWxsO1xyXG4gIGNvbnN0IGxlZnROZWlnaGJvdXIgPSAobmVpZ2hib3Vyc1sxXSAmJiAobmVpZ2hib3Vyc1sxXS5yb2FkIHx8IG5laWdoYm91cnNbMV0uY2l0eSkpIHx8IG51bGw7XHJcbiAgY29uc3QgcmlnaHROZWlnaGJvdXIgPSAobmVpZ2hib3Vyc1syXSAmJiAobmVpZ2hib3Vyc1syXS5yb2FkIHx8IG5laWdoYm91cnNbMl0uY2l0eSkpIHx8IG51bGw7XHJcbiAgY29uc3QgYm90dG9tTmVpZ2hib3VyID0gKG5laWdoYm91cnNbM10gJiYgKG5laWdoYm91cnNbM10ucm9hZCB8fCBuZWlnaGJvdXJzWzNdLmNpdHkpKSB8fCBudWxsO1xyXG5cclxuICBsZXQgc2hhcGUgPSBTaGFwZXMuaXNvbGF0ZWQ7XHJcbiAgXHJcbiAgaWYgKHRvcE5laWdoYm91cikge1xyXG4gICAgaWYgKGxlZnROZWlnaGJvdXIpIHtcclxuICAgICAgaWYgKHJpZ2h0TmVpZ2hib3VyICYmIGJvdHRvbU5laWdoYm91cikge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLmNyb3NzO1xyXG4gICAgICAgIC8vIFt0b3BOZWlnaGJvdXIsIGxlZnROZWlnaGJvdXIsIHJpZ2h0TmVpZ2hib3VyLCBib3R0b21OZWlnaGJvdXJdLmZvckVhY2godXBkYXRlUm9hZCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy5ob3Jpem9udGFsVG9wO1xyXG4gICAgICB9IGVsc2UgaWYgKGJvdHRvbU5laWdoYm91cikge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnZlcnRpY2FsTGVmdDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy50b3BMZWZ0O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHJpZ2h0TmVpZ2hib3VyKSB7XHJcbiAgICAgIGlmIChib3R0b21OZWlnaGJvdXIpIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy52ZXJ0aWNhbFJpZ2h0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnRvcFJpZ2h0O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudmVydGljYWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudG9wO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChib3R0b21OZWlnaGJvdXIpIHtcclxuICBpZiAobGVmdE5laWdoYm91cikge1xyXG4gICAgaWYgKHJpZ2h0TmVpZ2hib3VyKSB7XHJcbiAgICAgIHNoYXBlID0gU2hhcGVzLmhvcml6b250YWxCb3R0b207XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaGFwZSA9IFNoYXBlcy5ib3R0b21MZWZ0O1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgIHNoYXBlID0gU2hhcGVzLmJvdHRvbVJpZ2h0O1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzaGFwZSA9IFNoYXBlcy5ib3R0b207XHJcbiAgfVxyXG4gIH0gZWxzZSBpZiAobGVmdE5laWdoYm91cikge1xyXG4gICAgaWYgKHJpZ2h0TmVpZ2hib3VyKSB7XHJcbiAgICAgIHNoYXBlID0gU2hhcGVzLmhvcml6b250YWw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaGFwZSA9IFNoYXBlcy5sZWZ0O1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmlnaHROZWlnaGJvdXIpIHtcclxuICAgIHNoYXBlID0gU2hhcGVzLnJpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHNoYXBlO1xyXG59XHJcblxyXG5Sb2FkLmFkZCA9IGZ1bmN0aW9uICh0aWxlOiBUaWxlKSB7XHJcbiAgaWYgKCF0aWxlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0aWxlLmNpdHkgfHwgdGlsZS5yb2FkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIHRpbGUucm9hZCA9IG5ldyBSb2FkKHRpbGUpO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb2FkOyIsImltcG9ydCBnZW5lcmF0ZUd1aWQgZnJvbSAnLi4vZ2VuZXJhdGVHdWlkJztcclxuaW1wb3J0IHsgZ3JpZFNlcnZpY2UgfSBmcm9tICcuLi9HcmlkL0dyaWRTZXJ2aWNlJztcclxuaW1wb3J0IFJvYWQgZnJvbSAnLi9Sb2FkJztcclxuaW1wb3J0IENpdHkgZnJvbSAnLi9DaXR5JztcclxuXHJcbmNsYXNzIFJvYWROZXR3b3JrIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGNpdGllczogYW55W107XHJcbiAgcm9hZHM6IGFueVtdO1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5pZCA9IGdlbmVyYXRlR3VpZCgpO1xyXG4gICAgdGhpcy5jaXRpZXMgPSBbXTtcclxuICAgIHRoaXMucm9hZHMgPSBbXTtcclxuICB9XHJcblxyXG4gIGFkZFJvYWQocm9hZDogUm9hZCkge1xyXG4gICAgdGhpcy5yb2Fkcy5wdXNoKHJvYWQpO1xyXG4gICAgcm9hZC5yb2FkTmV0d29yayA9IHRoaXM7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBgSWQ6ICR7dGhpcy5pZH0sIENpdGllczogJHt0aGlzLmNpdGllcy5sZW5ndGh9LCBSb2FkczogJHt0aGlzLnJvYWRzLmxlbmd0aH1gO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2l0eShjaXR5OiBDaXR5KSB7XHJcbiAgICB0aGlzLmNpdGllcy5wdXNoKGNpdHkpO1xyXG4gICAgY2l0eS5yb2FkTmV0d29ya3MgPSB0aGlzO1xyXG4gIH1cclxuXHJcbiAgbWVyZ2UobmV0d29ya3M6IFJvYWROZXR3b3JrW10pIHtcclxuICAgIG5ldHdvcmtzLmZvckVhY2gobmV0d29yayA9PiB7XHJcbiAgICAgIG5ldHdvcmsuY2l0aWVzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNpdGllcy5maW5kKChjaXR5OiBDaXR5KSA9PiBjaXR5LmVxdWFscyh4KSkpIHtcclxuICAgICAgICAgIHRoaXMuY2l0aWVzLnB1c2goeCk7XHJcbiAgICAgICAgICB4LnJvYWROZXR3b3JrID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIFxyXG4gICAgICAvLyAgU2hvdWxkIG9wdGltaXNlIC0gc3RvcmUgcm9hZHMgYXMgZGljdGlvbmFyeVxyXG4gICAgICBuZXR3b3JrLnJvYWRzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvYWRzLmZpbmQoKHJvYWQ6IFJvYWQpID0+IHJvYWQuZXF1YWxzKHgpKSkge1xyXG4gICAgICAgICAgdGhpcy5yb2Fkcy5wdXNoKHgpO1xyXG4gICAgICAgICAgeC5yb2FkTmV0d29yayA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgIHRoaXMuZmluZERpc3RhbmNlc0ZvckNpdGllcygpO1xyXG4gIH1cclxuXHJcbiAgZmluZERpc3RhbmNlc0ZvckNpdGllcygpIHtcclxuICAgIC8vICBGb3IgZWFjaCBjaXR5IHRvIGEgYmZzIGFuZCBmaW5kIG5laWdoYm91cnMuXHJcbiAgICB0aGlzLmNpdGllcy5mb3JFYWNoKGNpdHkgPT4ge1xyXG4gICAgICB0aGlzLmZpbmREaXN0YW5jZXMoY2l0eSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBmaW5kRGlzdGFuY2VzKGNpdHk6IENpdHkpIHtcclxuICAgIGNvbnN0IGRpc3RhbmNlcyA9IFtdO1xyXG4gICAgbGV0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKGNpdHkudGlsZSkubWFwKG5vZGUgPT4gKHtub2RlLCBkaXN0YW5jZTogMCB9KSk7XHJcbiAgICBjb25zdCB2aXNpdGVkOiBhbnkgPSB7fTtcclxuICAgIHZpc2l0ZWRbY2l0eS5pZF0gPSB0cnVlO1xyXG5cclxuICAgIHdoaWxlKG5laWdoYm91cnMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIC8vICB2aXNpdCBlYWNoIG5laWdoYm91clxyXG4gICAgICBjb25zdCBuZWlnaGJvdXIgPSBuZWlnaGJvdXJzLnBvcCgpO1xyXG4gICAgICBpZiAobmVpZ2hib3VyLm5vZGUudHlwZSA9PT0gJ2NpdHknKSB7XHJcbiAgICAgICAgZGlzdGFuY2VzLnB1c2goe2NpdHksIGRpc3RhbmNlOiBuZWlnaGJvdXIuZGlzdGFuY2UgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmlzaXRlZFtuZWlnaGJvdXIubm9kZS5pZF0gPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IG5laWdoYm91cnNOZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3VycyhuZWlnaGJvdXIubm9kZSlcclxuICAgICAgICAgICAgLmZpbHRlcih4ID0+ICF2aXNpdGVkW3guaWRdKVxyXG4gICAgICAgICAgLm1hcCh4ID0+ICh7IG5vZGU6IHgsIGRpc3RhbmNlOiBuZWlnaGJvdXIuZGlzdGFuY2UgKyAxIH0pKTtcclxuICAgICAgICBuZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5jb25jYXQobmVpZ2hib3Vyc05laWdoYm91cnMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjaXR5LmRpc3RhbmNlcyA9IGRpc3RhbmNlcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvYWROZXR3b3JrO1xyXG4iLCJpbXBvcnQgVGlsZSBmcm9tIFwiLi4vTWFwL1RpbGVzL1RpbGVcIjtcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gXCIuLi9NYXAvVGlsZXMvVGlsZVR5cGVcIjtcclxuXHJcbmNsYXNzIFVuaXQge1xyXG4gIHRpbGU6IFRpbGU7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHN0YXRpYyBhZGQ6IChzZWxlY3RlZFRpbGU6IFRpbGUpID0+IGJvb2xlYW47XHJcbiAgY29uc3RydWN0b3IodGlsZTogYW55LCBuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMudGlsZSA9IHRpbGU7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNGRjAwMDAnO1xyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSArIHRpbGVTaXplLzQsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgdGlsZVNpemUvNCwgdGlsZVNpemUvMiwgMyp0aWxlU2l6ZS80KTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBVbml0OiAke3RoaXMubmFtZX1gO1xyXG4gIH1cclxufVxyXG5cclxuVW5pdC5hZGQgPSBmdW5jdGlvbihzZWxlY3RlZFRpbGU6IFRpbGUpIHsgIFxyXG4gIGlmICghc2VsZWN0ZWRUaWxlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChzZWxlY3RlZFRpbGUuY2l0eSB8fCBzZWxlY3RlZFRpbGUucm9hZCB8fCBzZWxlY3RlZFRpbGUudW5pdCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAoc2VsZWN0ZWRUaWxlLnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKSByZXR1cm4gZmFsc2U7XHJcbiAgc2VsZWN0ZWRUaWxlLnVuaXQgPSBuZXcgVW5pdChzZWxlY3RlZFRpbGUsICdOZXcgVW5pdCcpO1xyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBVbml0IiwiaW1wb3J0IFBvcCBmcm9tICcuL1BvcCc7XHJcbmltcG9ydCAqIGFzIFJlc291cmNlcyBmcm9tICcuLi9SZXNvdXJjZXMvUmVzb3VyY2VzJztcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGUnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGVUeXBlJztcclxuaW1wb3J0IHsgZ3JpZFNlcnZpY2UgfSBmcm9tICcuLi9HcmlkL0dyaWRTZXJ2aWNlJztcclxuXHJcbmNvbnN0IHJlc291cmNlczogYW55ID0ge307XHJcbnJlc291cmNlc1snZm9vZCddID0geyBhbW91bnQ6IDEsIHJlc291cmNlOiBuZXcgUmVzb3VyY2VzLkZvb2QoKSB9O1xyXG5cclxuY29uc3QgbmVlZHM6ICBhbnkgPSB7fTtcclxubmVlZHNbJ2Zvb2QnXSA9IHsgcmVzb3VyY2U6IG5ldyBSZXNvdXJjZXMuRm9vZCgpLCBhbW91bnQ6IDEgfTtcclxuXHJcbmNvbnN0IHByb2R1Y2VzOiBhbnkgPSBbXTtcclxucHJvZHVjZXNbJ2Zvb2QnXSA9IHsgcmVzb3VyY2U6IG5ldyBSZXNvdXJjZXMuRm9vZCgpLCBhbW91bnQ6IDEuMSB9O1xyXG5cclxuY2xhc3MgR2F0aGVyZXIgZXh0ZW5kcyBQb3Age1xyXG4gIHN0YXRpYyBhZGQ6ICh0aWxlOiBUaWxlLCBlbnRpdGllczogYW55KSA9PiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IFRpbGUsIG51bWJlcjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcih0aWxlLCBudW1iZXIsIHJlc291cmNlcywgbmVlZHMsIHByb2R1Y2VzKTtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgY29udGV4dC5zdHJva2VUZXh0KCdHJywgdGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgdGlsZVNpemUsIHRpbGVTaXplKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBHYXRoZXJlcjogRm9vZDogJHt0aGlzLnJlc291cmNlc1snZm9vZCddLmFtb3VudCB9YDtcclxuICB9XHJcbn1cclxuXHJcbkdhdGhlcmVyLmFkZCA9IGZ1bmN0aW9uKHRpbGU6IFRpbGUsIGVudGl0aWVzOiBhbnkpOiBib29sZWFuIHtcclxuICBpZiAoIXRpbGUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUuY2l0eSB8fCB0aWxlLnJvYWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3QgcG9wID0gbmV3IEdhdGhlcmVyKHRpbGUsIDEpO1xyXG4gIHRpbGUucG9wID0gcG9wO1xyXG4gIGVudGl0aWVzLnBvcHMucHVzaChwb3ApO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2F0aGVyZXI7XHJcbiIsImltcG9ydCBSZXNvdXJjZSBmcm9tIFwiLi4vUmVzb3VyY2VzL1Jlc291cmNlXCI7XHJcbmltcG9ydCBOZWVkcyBmcm9tIFwiLi4vUmVzb3VyY2VzL05lZWRzXCI7XHJcbmltcG9ydCBUaWxlIGZyb20gXCIuLi9NYXAvVGlsZXMvVGlsZVwiO1xyXG5pbXBvcnQgSURyYXdhYmxlIGZyb20gXCIuLi9pbnRlcmZhY2VzL0lEcmF3YWJsZVwiO1xyXG5pbXBvcnQgSVByaW50YWJsZSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JUHJpbnRhYmxlXCI7XHJcblxyXG5jbGFzcyBQb3AgaW1wbGVtZW50cyBJRHJhd2FibGUsIElQcmludGFibGV7XHJcbiAgbnVtYmVyOiBudW1iZXI7XHJcbiAgcmVzb3VyY2VzOiBhbnk7XHJcbiAgbmVlZHM6IGFueTtcclxuICBwcm9kdWNlczogYW55O1xyXG4gIHRpbGU6IFRpbGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IFRpbGUsIG51bWJlcjogbnVtYmVyLCByZXNvdWNlczogUmVzb3VyY2VbXSwgbmVlZHM6IE5lZWRzLCBwcm9kdWNlczogYW55KSB7XHJcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xyXG4gICAgdGhpcy5udW1iZXIgPSBudW1iZXI7XHJcbiAgICB0aGlzLnJlc291cmNlcyA9IHJlc291Y2VzO1xyXG4gICAgdGhpcy5uZWVkcyA9IG5lZWRzO1xyXG4gICAgdGhpcy5wcm9kdWNlcyA9IHByb2R1Y2VzO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5wcm9kdWNlcykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgcmVzb3VyY2UgPSB0aGlzLnJlc291cmNlc1trZXldO1xyXG4gICAgICBjb25zdCBuZWVkcyA9IHRoaXMubmVlZHNba2V5XTtcclxuICAgICAgY29uc3QgcHJvZHVjZXMgPSB0aGlzLnByb2R1Y2VzW2tleV07XHJcblxyXG4gICAgICByZXNvdXJjZS5hbW91bnQgKz0gcHJvZHVjZXMuYW1vdW50IC0gbmVlZHMuYW1vdW50O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgdGlsZVNpemU6IG51bWJlcil7XHJcbiAgICBcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBvcDtcclxuIiwiaW1wb3J0IFJlc291cmNlIGZyb20gXCIuL1Jlc291cmNlXCI7XHJcblxyXG5jbGFzcyBCYXNpY1Rvb2xzIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzaWNUb29scztcclxuIiwiaW1wb3J0IFJlc291cmNlIGZyb20gXCIuL1Jlc291cmNlXCI7XHJcblxyXG5jbGFzcyBGaWJyZSBleHRlbmRzIFJlc291cmNlIHtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpYnJlO1xyXG4iLCJpbXBvcnQgUmVzb3VyY2UgZnJvbSBcIi4vUmVzb3VyY2VcIjtcclxuaW1wb3J0IFJlc291cmNlVHlwZXMgZnJvbSBcIi4vUmVzb3VyY2VUeXBlXCI7XHJcblxyXG5jbGFzcyBGb29kIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoJ2Zvb2QnLCBbUmVzb3VyY2VUeXBlcy5Gb29kXSwgMC4xKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvb2Q7XHJcbiIsImNsYXNzIFJlc291cmNlIHtcclxuICB0eXBlczogYW55O1xyXG4gIGRlY2F5OiBudW1iZXI7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdHlwZXM6IGFueSwgZGVjYXk6IG51bWJlcikge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMudHlwZXMgPSB0eXBlcztcclxuICAgIHRoaXMuZGVjYXkgPSBkZWNheTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShwcm9kdWNlZDogbnVtYmVyLCB1c2VkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IG51bWJlciA9IChwcm9kdWNlZCAtIHVzZWQpO1xyXG4gICAgcmV0dXJuIG51bWJlcjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlc291cmNlOyIsIlxyXG5lbnVtIFJlc291cmNlVHlwZXMge1xyXG4gICdGb29kJyA9ICdGb29kJyxcclxuICAnRnVlbCcgPSAnRnVlbCcsXHJcbiAgJ0luZ3JlZGllbnQnID0gJ0luZ3JlZGllbnQnLFxyXG4gICdUb29sJyA9ICdUb29sJyxcclxuICAnU2hlbHRlcicgPSAnU2hlbHRlcicsXHJcbiAgJ0J1aWxkaW5nTWF0ZXJpYWwnID0gJ0J1aWxkaW5nTWF0ZXJpYWwnXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlc291cmNlVHlwZXM7XHJcbiIsImltcG9ydCBGaWJyZSBmcm9tICcuL0ZpYnJlJztcclxuaW1wb3J0IEJhc2ljVG9vbHMgZnJvbSAnLi9CYXNpY1Rvb2xzJztcclxuaW1wb3J0IEZvb2QgZnJvbSAnLi9Gb29kJztcclxuaW1wb3J0IFdvb2QgZnJvbSAnLi9Xb29kJztcclxuXHJcbmV4cG9ydCB7IEZpYnJlLCBCYXNpY1Rvb2xzLCBGb29kLCBXb29kLCB9XHJcbiIsImltcG9ydCBSZXNvdXJjZSBmcm9tIFwiLi9SZXNvdXJjZVwiO1xyXG5cclxuY2xhc3MgV29vZCBleHRlbmRzIFJlc291cmNlIHtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdvb2Q7XHJcbiIsImZ1bmN0aW9uIGdlbmVyYXRlR3VpZCgpIHtcclxuICByZXR1cm4gYCR7Z2VuZXJhdGVOdW1iZXIoKX0tJHtnZW5lcmF0ZU51bWJlcigpfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlTnVtYmVyKCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVHdWlkO1xyXG4iLCJpbXBvcnQgTWFwIGZyb20gJy4vTWFwL01hcCc7XHJcbmltcG9ydCBQb2ludCBmcm9tICcuL01hcEVudGl0aWVzL1BvaW50JztcclxuXHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5jb25zdCBzaXplID0gNTAwO1xyXG5jb25zdCBib2R5TWFyZ2luID0gODtcclxuXHJcbmNhbnZhcy53aWR0aD1zaXplO1xyXG5jYW52YXMuaGVpZ2h0PXNpemU7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpLmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcbmNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbmNvbnN0IG1hcCA9IG5ldyBNYXAoc2l6ZSwgNTAsIGNvbnRleHQpO1xyXG5tYXAuZHJhdygpO1xyXG5cclxuLy8gIENvbG9yIGluIGNsaWNrZWQgc3F1YXJlXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgbGV0IHsgY2xpZW50WCAsIGNsaWVudFkgfSA9IGU7XHJcbiAgY2xpZW50WCAtPSBib2R5TWFyZ2luO1xyXG4gIGNsaWVudFkgLT0gYm9keU1hcmdpbjtcclxuICBcclxuICBjb25zdCB0aWxlID0gbWFwLmNsaWNrVGlsZShuZXcgUG9pbnQoY2xpZW50WCwgY2xpZW50WSkpO1xyXG5cclxuICBpZiAodGlsZSkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbGVjdGVkVGlsZScpLmlubmVySFRNTCA9IHRpbGUudG9TdHJpbmcoKVxyXG4gICAgICAuc3BsaXQoJycpXHJcbiAgICAgIC5tYXAoeCA9PiB4ID09PSAnXFxuJyA/ICc8YnIgLz4nIDogeCkuam9pbignJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3RlZFRpbGUnKS5pbm5lckhUTUwgPSAnJztcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gIFpvb20gaW4gYW5kIG91dCBhbmQgZHJhZ1xyXG5sZXQgZHJhZ1N0YXRlID0gMDtcclxuY29uc3Qgc3RhcnREcmFnID0gbmV3IFBvaW50KDAsIDApO1xyXG5cclxuY29uc3QgZHJhZ1N0YXRlcyA9IHsgU1RBUlRFRDogMCwgRFJBR0dJTkc6IDEsIEVOREVEOiAyfVxyXG5cclxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcclxuICBkcmFnU3RhdGUgPSBkcmFnU3RhdGVzLlNUQVJURUQ7XHJcbiAgbGV0IHsgY2xpZW50WCAsIGNsaWVudFkgfSA9IGU7XHJcbiAgY2xpZW50WCAtPSBib2R5TWFyZ2luO1xyXG4gIGNsaWVudFkgLT0gYm9keU1hcmdpbjtcclxuXHJcbiAgc3RhcnREcmFnLnggPSBjbGllbnRYO1xyXG4gIHN0YXJ0RHJhZy55ID0gY2xpZW50WTtcclxufSwgZmFsc2UpO1xyXG5cclxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKCkgPT4ge1xyXG4gIGlmIChkcmFnU3RhdGUgPT09IGRyYWdTdGF0ZXMuU1RBUlRFRCkgZHJhZ1N0YXRlID0gZHJhZ1N0YXRlcy5EUkFHR0lORztcclxufSwgZmFsc2UpO1xyXG5cclxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChlKSA9PiB7XHJcbiAgaWYoZHJhZ1N0YXRlID09PSBkcmFnU3RhdGVzLlNUQVJURUQpe1xyXG4gIH1cclxuICBlbHNlIGlmKGRyYWdTdGF0ZSA9PT0gZHJhZ1N0YXRlcy5EUkFHR0lORykge1xyXG4gICAgbGV0IHsgY2xpZW50WCAsIGNsaWVudFkgfSA9IGU7XHJcbiAgICBjbGllbnRYIC09IGJvZHlNYXJnaW47XHJcbiAgICBjbGllbnRZIC09IGJvZHlNYXJnaW47XHJcblxyXG4gICAgY29uc3QgZGlmZlggPSBzdGFydERyYWcueCAtIGNsaWVudFg7XHJcbiAgICBjb25zdCBkaWZmWSA9IHN0YXJ0RHJhZy55IC0gY2xpZW50WTtcclxuXHJcbiAgIC8vIG1hcC5kcmFnKGRpZmZYLCBkaWZmWSk7XHJcbiAgICBzdGFydERyYWcueCA9IDA7XHJcbiAgICBzdGFydERyYWcueSA9IDA7XHJcbiAgfVxyXG4gIGRyYWdTdGF0ZSA9IGRyYWdTdGF0ZXMuRU5ERUQ7XHJcbn0sIGZhbHNlKTtcclxuXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gIGNvbnNvbGUubG9nKGUua2V5Q29kZSk7XHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMzcpIHtcclxuICAgIG1hcC5sZWZ0S2V5KCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSAzOCkge1xyXG4gICAgbWFwLnVwS2V5KCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSAzOSkge1xyXG4gICAgbWFwLnJpZ2h0S2V5KCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA0MCkge1xyXG4gICAgbWFwLmRvd25LZXkoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDEwNykge1xyXG4gICAgbWFwLnpvb21JbigpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTA5KSB7XHJcbiAgICBtYXAuem9vbU91dCgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gODIpIHtcclxuICAgIG1hcC5hZGRSb2FkVG9TZWxlY3RlZFRpbGUoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDY3KSB7XHJcbiAgICBtYXAuYWRkQ2l0eVRvU2VsZWN0ZWRUaWxlKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA4NSkge1xyXG4gICAgbWFwLmFkZFVuaXRUb1NlbGVjdGVkVGlsZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gOCB8fCBlLmtleUNvZGUgPT09IDQ2KSB7XHJcbiAgICBtYXAucmVtb3ZlU2VsZWN0ZWRFbnRpdHkoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICBtYXAuZW5kVHVybigpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gNzEpIHtcclxuICAgIG1hcC5hZGRHYXRoZXJlcigpO1xyXG4gIH1cclxufSk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkQ2l0eScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1hcC5hZGRDaXR5VG9TZWxlY3RlZFRpbGUoKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkUm9hZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1hcC5hZGRSb2FkVG9TZWxlY3RlZFRpbGUoKTtcclxufSk7XHJcblxyXG5cclxuLy8gIEdpdmVuIGFuIGFycmF5IG9mIHNxdWFyZXMgYW5kIGEgdmlldyBwb3J0LCBmaW5kIHRoZSBzcXVhcmVzIGluIHRoZSB2aWV3cG9ydFxyXG4vLyAgWm9vbWluZyBjaGFuZ2VzIGhvdyBsYXJnZSB5b3Ugd2FudCB0byBkcmF3IHRoZSBzcXVhcmVzIGJ1dCBhbHNvIHRoZSB2aWV3cG9ydFxyXG4vLyAgRHJhZ2dpbmcgY2hhbmdlcyB0aGUgdmlld3BvcnQgc3RhcnQuIl0sInNvdXJjZVJvb3QiOiIifQ==