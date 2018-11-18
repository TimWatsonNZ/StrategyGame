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
    moveUnit(unit, neighbour) {
        const originalTile = unit.tile;
        unit.tile = this.grid()[neighbour.point.y][neighbour.point.x];
        this.grid()[neighbour.point.y][neighbour.point.x].unit = unit;
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
        this.viewPortEnd = new _MapEntities_Point__WEBPACK_IMPORTED_MODULE_0__["default"](this.viewPortOrigin.x + this.zoomLevel, this.viewPortOrigin.y + this.zoomLevel);
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
    removeSelectedEntity() {
        if (!this.selectedEntity) {
            return;
        }
        const tile = this.selectedEntity.tile;
        const gridTile = this.grid()[tile.point.y][tile.point.x];
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
        const unitDetails = this.unit ? this.unit.toString() : '';
        return `${tileDetails} ${cityDetails} ${roadDetails} ${unitDetails}`;
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vR3JpZC9HcmlkU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9HcmlkL01hcEdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly8vLi9NYXAvTWFwLnRzIiwid2VicGFjazovLy8uL01hcC9UaWxlcy9UaWxlLnRzIiwid2VicGFjazovLy8uL01hcC9UaWxlcy9UaWxlVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9NYXBFbnRpdGllcy9DaXR5LnRzIiwid2VicGFjazovLy8uL01hcEVudGl0aWVzL1BvaW50LnRzIiwid2VicGFjazovLy8uL01hcEVudGl0aWVzL1JvYWQudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwRW50aXRpZXMvUm9hZE5ldHdvcmsudHMiLCJ3ZWJwYWNrOi8vLy4vTWFwRW50aXRpZXMvVW5pdC50cyIsIndlYnBhY2s6Ly8vLi9nZW5lcmF0ZUd1aWQuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFD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UUFBUSxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEksQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFZLEVBQUUsUUFBZ0I7UUFDcEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBQyxRQUFRLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUUsUUFBUSxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RJLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBWSxFQUFFLFFBQWdCO1FBQ3ZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBQyxRQUFRLEdBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakosQ0FBQztJQUVELFFBQVEsQ0FBQyxPQUFZLEVBQUUsUUFBZ0I7UUFDckMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxHQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RJLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBWSxFQUFFLFFBQWdCO1FBQ3RDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxHQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25KLENBQUM7SUFFRCxJQUFJLENBQUMsT0FBWSxFQUFFLFFBQWdCO1FBQ2pDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBRTlCLFFBQVEsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNsQixLQUFLLE1BQU0sQ0FBQyxRQUFRO2dCQUNsQixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsUUFBUSxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFDLENBQUMsRUFBRSxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdJLE1BQU07WUFFUixLQUFLLE1BQU0sQ0FBQyxRQUFRO2dCQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDckMsTUFBTTtZQUVSLEtBQUssTUFBTSxDQUFDLFVBQVU7Z0JBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNO1lBRVIsS0FBSyxNQUFNLENBQUMsSUFBSTtnQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUVSLEtBQUssTUFBTSxDQUFDLEtBQUs7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07WUFFUixLQUFLLE1BQU0sQ0FBQyxHQUFHO2dCQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNO1lBRVIsS0FBSyxNQUFNLENBQUMsTUFBTTtnQkFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLE1BQU07WUFFUixLQUFLLE1BQU0sQ0FBQyxLQUFLO2dCQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDdkMsTUFBTTtZQUVSLEtBQUssTUFBTSxDQUFDLE9BQU87Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUVSLEtBQUssTUFBTSxDQUFDLFFBQVE7Z0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEMsTUFBTTtZQUVSLEtBQUssTUFBTSxDQUFDLFVBQVU7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUVSLEtBQUssTUFBTSxDQUFDLFdBQVc7Z0JBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEMsTUFBTTtZQUVSLEtBQUssTUFBTSxDQUFDLFlBQVk7Z0JBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUVSLEtBQUssTUFBTSxDQUFDLGFBQWE7Z0JBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEMsTUFBTTtZQUVSLEtBQUssTUFBTSxDQUFDLGFBQWE7Z0JBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtZQUVSLEtBQUssTUFBTSxDQUFDLGdCQUFnQjtnQkFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsUUFBYyxFQUFFLElBQVU7SUFDaEQsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFFckIsVUFBVTtJQUNWLDhCQUE4QjtJQUM5QixtREFBbUQ7SUFDbkQsaUNBQWlDO0lBQ2pDLG9DQUFvQztJQUNwQyw0REFBNEQ7SUFDNUQsdUJBQXVCO0lBQ3ZCLG1DQUFtQztJQUNuQyxzRUFBc0U7SUFDdEUseUNBQXlDO0lBQ3pDLGlGQUFpRjtJQUNqRixLQUFLO0FBQ1AsQ0FBQztBQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFTLEtBQUs7SUFDcEMsc0dBQXNHO0lBQ3RHLGlFQUFpRTtJQUVqRSxvQ0FBb0M7SUFDcEMsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQixpRkFBaUY7SUFDakYsTUFBTTtJQUVOLHdEQUF3RDtJQUN4RCxnQ0FBZ0M7SUFDaEMsOENBQThDO0lBQzlDLElBQUk7SUFDSiw2Q0FBNkM7SUFDN0MscURBQXFEO0FBQ3ZELENBQUM7QUFFRCxlQUFlO0FBQ2YscUNBQXFDO0FBRXJDLElBQUk7QUFHSixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsVUFBa0I7SUFDM0MsTUFBTSxZQUFZLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUMzRixNQUFNLGFBQWEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQzVGLE1BQU0sY0FBYyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDN0YsTUFBTSxlQUFlLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUU5RixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBRTVCLElBQUksWUFBWSxFQUFFO1FBQ2hCLElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQUksY0FBYyxJQUFJLGVBQWUsRUFBRTtnQkFDckMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3JCLHNGQUFzRjthQUN2RjtpQkFBTSxJQUFJLGNBQWMsRUFBRTtnQkFDekIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxlQUFlLEVBQUU7Z0JBQzFCLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ3hCO1NBQ0Y7YUFBTSxJQUFJLGNBQWMsRUFBRTtZQUN6QixJQUFJLGVBQWUsRUFBRTtnQkFDbkIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDekI7U0FDRjthQUFNO1lBQ0wsSUFBSSxlQUFlLEVBQUU7Z0JBQ25CLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ3BCO1NBQ0Y7S0FDRjtTQUFNLElBQUksZUFBZSxFQUFFO1FBQzVCLElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQUksY0FBYyxFQUFFO2dCQUNsQixLQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO2FBQzNCO1NBQ0Y7YUFBTSxJQUFJLGNBQWMsRUFBRTtZQUN6QixLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUM1QjthQUFNO1lBQ0wsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDdkI7S0FDQTtTQUFNLElBQUksYUFBYSxFQUFFO1FBQ3hCLElBQUksY0FBYyxFQUFFO1lBQ2xCLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQzNCO2FBQU07WUFDTCxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNyQjtLQUNGO1NBQU0sSUFBSSxjQUFjLEVBQUU7UUFDekIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDdEI7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsSUFBVTtJQUM3QixJQUFJLENBQUMsSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXhCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXpDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSywyREFBUSxDQUFDLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUUvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVjLG1FQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNsVHBCO0FBQUE7QUFBQTtBQUEyQztBQUNPO0FBSWxELE1BQU0sV0FBVztJQUlmO1FBQ0UsSUFBSSxDQUFDLEVBQUUsR0FBRyw2REFBWSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFVO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxPQUFPLElBQUksQ0FBQyxFQUFFLGFBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLFlBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0RixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVU7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUF1QjtRQUMzQixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2lCQUN0QjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsK0NBQStDO1lBQy9DLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2lCQUN0QjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLCtDQUErQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUdELGFBQWEsQ0FBQyxJQUFVO1FBQ3RCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLFVBQVUsR0FBRyw2REFBVyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsTUFBTSxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRXhCLE9BQU0sVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDN0Isd0JBQXdCO1lBQ3hCLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNuQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDdkQ7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNsQyxNQUFNLG9CQUFvQixHQUFHLDZEQUFXLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztxQkFDdkUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDdEQ7U0FDRjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Q0FDRjtBQUVjLDBFQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNoRjNCO0FBQUE7QUFBNkM7QUFFN0MsTUFBTSxJQUFJO0lBSVIsWUFBWSxJQUFTLEVBQUUsSUFBWTtRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQVksRUFBRSxRQUFnQjtRQUNqQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM5QixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsUUFBUSxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pKLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUFFRCxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVMsWUFBa0I7SUFDcEMsSUFBSSxDQUFDLFlBQVk7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVoQyxJQUFJLFlBQVksQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRTlFLElBQUksWUFBWSxDQUFDLElBQUksS0FBSywyREFBUSxDQUFDLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN2RCxZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUV2RCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFDYyxtRUFBSTs7Ozs7Ozs7Ozs7OztBQ2hDbkI7QUFBQTtBQUNBLFlBQVksaUJBQWlCLEdBQUcsaUJBQWlCO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTs7QUFFZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDUjVCO0FBQUE7QUFBQTtBQUE0QjtBQUNZOztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQixnREFBRztBQUNuQjs7QUFFQTtBQUNBO0FBQ0EsT0FBTyxvQkFBb0I7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0Esc0JBQXNCLDBEQUFLOztBQUUzQixvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQSxPQUFPLG9CQUFvQjtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0Esd0MiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgUG9pbnQgZnJvbSAnLi4vTWFwRW50aXRpZXMvUG9pbnQnO1xyXG5pbXBvcnQgbWFwR2VuZXJhdG9yIGZyb20gJy4vTWFwR2VuZXJhdG9yJztcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGUnO1xyXG5cclxuY2xhc3MgR3JpZFNlcnZpY2Uge1xyXG4gIGdyaWRTaXplOiBudW1iZXI7XHJcbiAgZ3JpZDogYW55W107XHJcbiAgY29uc3RydWN0b3IoZ3JpZFNpemU6IG51bWJlcikge1xyXG4gICAgdGhpcy5ncmlkU2l6ZSA9IGdyaWRTaXplO1xyXG4gICAgdGhpcy5ncmlkID0gW107XHJcbiAgfVxyXG5cclxuICBjcmVhdGVNYXAoKSB7XHJcbiAgICB0aGlzLmdyaWQgPSBtYXBHZW5lcmF0b3IuZ2VuZXJhdGUodGhpcy5ncmlkU2l6ZSk7XHJcbiAgfVxyXG5cclxuICAvLyAgdG9kbyAtIGNoYW5nZSB0aGVzZSB0byBwb2ludHNcclxuICBjcmVhdGVDbGlwcGVkR3JpZCh2aWV3UG9ydE9yaWdpbjogYW55LCB2aWV3UG9ydEVuZDogYW55KSB7XHJcbiAgICBjb25zdCBuZXdncmlkID0gW107XHJcbiAgICBjb25zdCBzdGFydFBvaW50ID0gbmV3IFBvaW50KHZpZXdQb3J0T3JpZ2luLngsIHZpZXdQb3J0T3JpZ2luLnkpO1xyXG4gICAgY29uc3QgZW5kUG9pbnQgPSBuZXcgUG9pbnQodmlld1BvcnRFbmQueCwgdmlld1BvcnRFbmQueSk7XHJcbiAgICBcclxuICAgIGZvciAobGV0IHkgPSBzdGFydFBvaW50Lnk7eSA8PSBlbmRQb2ludC55O3krKykge1xyXG4gICAgICBjb25zdCBuZXdyb3cgPSBbXTtcclxuICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkW3ldO1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IHN0YXJ0UG9pbnQueDsgeCA8PSBlbmRQb2ludC54OyB4KyspIHtcclxuICAgICAgICBjb25zdCB0aWxlID0gcm93W3hdO1xyXG5cclxuICAgICAgICAgIGlmICh0aWxlICYmIHRpbGUucG9pbnQpIHtcclxuICAgICAgICAgICAgdGlsZS5kcmF3aW5nUG9pbnQgPSBuZXcgUG9pbnQodGlsZS5wb2ludC54LCB0aWxlLnBvaW50LnkpO1xyXG4gICAgICAgICAgICB0aWxlLmRyYXdpbmdQb2ludC54ID0geCAtIHN0YXJ0UG9pbnQueDtcclxuICAgICAgICAgICAgdGlsZS5kcmF3aW5nUG9pbnQueSA9IHkgLSBzdGFydFBvaW50Lnk7XHJcbiAgICAgICAgICAgIG5ld3Jvdy5wdXNoKHRpbGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSAgXHJcbiAgICAgIG5ld2dyaWQucHVzaChuZXdyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld2dyaWQ7XHJcbiAgfVxyXG4gIFxyXG4gIHRpbGVUb0luZGV4ICh0aWxlOiBUaWxlKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRpbGUucG9pbnQueCwgdGlsZS5wb2ludC55KTtcclxuICB9XHJcblxyXG4gIGdldFJlZ2lvbihpbmRleDogYW55LCByYWRpdXM6IG51bWJlcikge1xyXG4gICAgY29uc3QgZGVsdGFzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgeD0wO3g8cmFkaXVzKjIrMTt4KyspIHtcclxuICAgICAgZm9yIChsZXQgeT0wO3kgPCByYWRpdXMqMisxOyB5KyspIHtcclxuICAgICAgICBkZWx0YXMucHVzaCh7IHg6IHggLSAxLCB5OiB5IC0xIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmVpZ2hib3VyczogYW55W10gPSBbXTtcclxuICAgIGRlbHRhcy5mb3JFYWNoKGRlbHRhID0+IHtcclxuICAgICAgY29uc3QgaW5kZXhYID0gaW5kZXgueCArIGRlbHRhLng7XHJcbiAgICAgIGNvbnN0IGluZGV4WSA9IGluZGV4LnkgKyBkZWx0YS55O1xyXG5cclxuICAgICAgaWYgKGluZGV4WCA8IDAgfHwgaW5kZXhYID4gdGhpcy5ncmlkLmxlbmd0aC0xIHx8XHJcbiAgICAgICAgICBpbmRleFkgPCAwIHx8IGluZGV4WSA+IHRoaXMuZ3JpZC5sZW5ndGgtMSkge1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5laWdoYm91cnMucHVzaCh0aGlzLmdyaWRbaW5kZXhZXVtpbmRleFhdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5laWdoYm91cnM7XHJcbiAgfVxyXG5cclxuICBnZXROZWlnaGJvdXJzKGluZGV4OiBQb2ludCwgcHJlc2VydmVPcmRlciA9IGZhbHNlLCBub0RpYWdvbmFscyA9IGZhbHNlLCBpbnB1dEdyaWQ6IGFueSA9IG51bGwpIHtcclxuICAgIGxldCBncmlkID0gaW5wdXRHcmlkID8gaW5wdXRHcmlkIDogdGhpcy5ncmlkO1xyXG4gICAgY29uc3QgdGlsZSA9IGdyaWRbaW5kZXgueV1baW5kZXgueF07XHJcbiAgICBjb25zdCBhbGxEZWx0YXMgPSBbXHJcbiAgICAgIHsgeDotMSwgeTogLTEgfSwge3g6IDAsIHk6IC0xfSwgIHsgeDogMSwgeTogLTF9LFxyXG4gICAgICB7IHg6LTEsIHk6ICAwIH0sICAgICAgICAgICAgICAsICB7IHg6IDEsIHk6ICAwfSxcclxuICAgICAgeyB4Oi0xLCB5OiAgMSB9LCB7eDogMCwgeTogIDEgfSwgeyB4OiAxLCB5OiAgMX0sXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IG5vRGlhZ29uYWxzRGVsdGFzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAsIHsgeDogMCwgeTogLTEgfSwgIFxyXG4gICAgICB7IHg6LTEsIHk6ICAwIH0sICAgICAgICAgICAgICAsICB7IHg6IDEsIHk6ICAwfSxcclxuICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIHk6ICAxIH0sXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IG5laWdoYm91cnM6IGFueVtdID0gW107XHJcbiAgICBpZiAoIXRpbGUpIHtcclxuICAgICAgcmV0dXJuIG5laWdoYm91cnM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVsdGFzID0gbm9EaWFnb25hbHMgPyBub0RpYWdvbmFsc0RlbHRhcyA6IGFsbERlbHRhcztcclxuICAgIGRlbHRhcy5mb3JFYWNoKGRlbHRhID0+IHtcclxuICAgICAgY29uc3QgaW5kZXhYID0gaW5kZXgueCArIGRlbHRhLng7XHJcbiAgICAgIGNvbnN0IGluZGV4WSA9IGluZGV4LnkgKyBkZWx0YS55O1xyXG5cclxuICAgICAgaWYgKGluZGV4WCA8IDAgfHwgaW5kZXhYID4gZ3JpZC5sZW5ndGgtMSB8fFxyXG4gICAgICAgICAgaW5kZXhZIDwgMCB8fCBpbmRleFkgPiBncmlkLmxlbmd0aC0xKSB7XHJcbiAgICAgICAgICBpZiAocHJlc2VydmVPcmRlcikgbmVpZ2hib3Vycy5wdXNoKG51bGwpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5laWdoYm91cnMucHVzaChncmlkW2luZGV4WV1baW5kZXhYXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBuZWlnaGJvdXJzO1xyXG4gIH1cclxuXHJcbiAgZmluZFNlbGVjdGVkVGlsZUNyb3NzTmVpZ2hib3Vycyh0aWxlOiBUaWxlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRpbGUpO1xyXG4gIH1cclxuXHJcbiAgZmluZENyb3NzTmVpZ2hib3Vycyh0aWxlOiBUaWxlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXROZWlnaGJvdXJzKHRoaXMudGlsZVRvSW5kZXgodGlsZSksIGZhbHNlLCB0cnVlKTtcclxuICB9XHJcbn1cclxuXHJcbmxldCBncmlkU2VydmljZTogR3JpZFNlcnZpY2UgPSBudWxsO1xyXG5mdW5jdGlvbiBncmlkU2VydmljZUluaXQoZ3JpZFNpemU6IG51bWJlcikge1xyXG4gIGdyaWRTZXJ2aWNlID0gbmV3IEdyaWRTZXJ2aWNlKGdyaWRTaXplKTtcclxufVxyXG5cclxuZXhwb3J0IHsgZ3JpZFNlcnZpY2UsIGdyaWRTZXJ2aWNlSW5pdCB9O1xyXG4iLCJpbXBvcnQgeyBncmlkU2VydmljZSB9IGZyb20gJy4vR3JpZFNlcnZpY2UnO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZSc7XHJcbmltcG9ydCBQb2ludCBmcm9tICcuLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZVR5cGUnO1xyXG5cclxuY2xhc3MgTWFwR2VuZXJhdG9yIHtcclxuXHJcbiAgZ2VuZXJhdGUoZ3JpZFNpemU6IG51bWJlcikge1xyXG4gICAgbGV0IGdyaWQ6IFRpbGVbXVtdID0gW11cclxuICAgIGZvcihsZXQgaD0wO2g8Z3JpZFNpemU7aCsrKSB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xyXG4gICAgICBmb3IobGV0IHc9MDt3PGdyaWRTaXplO3crKykge1xyXG4gICAgICAgIHJvdy5wdXNoKG5ldyBUaWxlKG5ldyBQb2ludCh3LCBoKSwgVGlsZVR5cGUuTm9uZSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGdyaWQucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBzZWVkVGlsZUNvdW50ID0gODA7XHJcbiAgICBmb3IgKGxldCBpPTA7aSA8IHNlZWRUaWxlQ291bnQ7aSsrKSB7XHJcbiAgICAgIGNvbnN0IHJhbmRvbVRpbGUgPSBncmlkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdyaWQubGVuZ3RoKV1bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JpZC5sZW5ndGgpXTtcclxuICAgICAgcmFuZG9tVGlsZS50eXBlID0gVGlsZVR5cGUuR3Jhc3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdyaWRbTWF0aC5yb3VuZChncmlkLmxlbmd0aC8yKV1bTWF0aC5yb3VuZChncmlkLmxlbmd0aC8yKV0udHlwZSA9IFRpbGVUeXBlLkdyYXNzO1xyXG4gICAgICBcclxuICAgIGdyaWQgPSB0aGlzLmRmYShncmlkU2l6ZSwgZ3JpZCwgdGhpcy5ncm93R3Jhc3MpO1xyXG4gICAgZ3JpZCA9IHRoaXMuZGZhKGdyaWRTaXplLCBncmlkLCB0aGlzLmdyb3dHcmFzcyk7XHJcbiAgICB0aGlzLmZsb29kRmlsbChncmlkLCBncmlkW01hdGgucm91bmQoZ3JpZC5sZW5ndGgvMildW01hdGgucm91bmQoZ3JpZC5sZW5ndGgvMildKTtcclxuXHJcbiAgICBncmlkID0gdGhpcy5kZmEoZ3JpZFNpemUsIGdyaWQsIHRoaXMuc21vb3RoUnVsZSk7XHJcbiAgICBncmlkID0gdGhpcy5kZmEoZ3JpZFNpemUsIGdyaWQsIHRoaXMuc21vb3RoUnVsZSk7XHJcblxyXG4gICAgdGhpcy5maWxsSW5Ib2xlcyhncmlkKTtcclxuXHJcbiAgICByZXR1cm4gZ3JpZDtcclxuICB9XHJcblxyXG4gIGZsb29kRmlsbChncmlkOiBUaWxlW11bXSwgc3RhcnQ6IFRpbGUpIHtcclxuICAgIGNvbnN0IHN0YWNrID0gW3N0YXJ0XTtcclxuXHJcbiAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCB0aWxlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgIGNvbnN0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5nZXROZWlnaGJvdXJzKGdyaWRTZXJ2aWNlLnRpbGVUb0luZGV4KHRpbGUpLCBmYWxzZSwgZmFsc2UsIGdyaWQpO1xyXG4gICAgICBjb25zdCB3YXRlck5laWdoYm91cnMgPSBuZWlnaGJvdXJzLmZpbHRlcih4ID0+IHgudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pLmxlbmd0aDtcclxuICAgICAgY29uc3QgZ3Jhc3NOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLkdyYXNzKS5sZW5ndGg7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKHdhdGVyTmVpZ2hib3VycyArIGdyYXNzTmVpZ2hib3VycykpID4gd2F0ZXJOZWlnaGJvdXJzKSB7XHJcbiAgICAgICAgdGlsZS50eXBlID0gVGlsZVR5cGUuR3Jhc3M7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGlsZS50eXBlID0gVGlsZVR5cGUuT2NlYW47XHJcbiAgICAgIH1cclxuICAgICAgbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLk5vbmUpLmZvckVhY2goeCA9PiBzdGFjay5wdXNoKHgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRmYSAoZ3JpZFNpemU6IG51bWJlciwgZ3JpZDogVGlsZVtdW10sIHJ1bGU6IGFueSkge1xyXG4gICAgY29uc3QgbmV3R3JpZCA9IFtdO1xyXG5cclxuICAgIGZvcihsZXQgaD0wO2ggPCBncmlkU2l6ZTtoKyspIHtcclxuICAgICAgY29uc3QgbmV3Um93ID0gW107XHJcbiAgICAgIGZvcihsZXQgdz0wO3cgPCBncmlkU2l6ZTt3KyspIHtcclxuICAgICAgICBjb25zdCB0aWxlID0gZ3JpZFtoXVt3XTtcclxuICAgICAgICBjb25zdCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZ2V0TmVpZ2hib3VycyhncmlkU2VydmljZS50aWxlVG9JbmRleCh0aWxlKSwgZmFsc2UsIGZhbHNlLCBncmlkKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd2F0ZXJOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgZ3Jhc3NOZWlnaGJvdXJzID0gbmVpZ2hib3Vycy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09IFRpbGVUeXBlLkdyYXNzKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvcHkgPSBUaWxlLmNvcHkodGlsZSk7XHJcbiAgICAgICAgY29weS50eXBlID0gcnVsZShjb3B5LCB3YXRlck5laWdoYm91cnMsIGdyYXNzTmVpZ2hib3Vycyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbmV3Um93LnB1c2goY29weSk7XHJcbiAgICAgIH1cclxuICAgICAgbmV3R3JpZC5wdXNoKG5ld1Jvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3R3JpZDtcclxuICB9XHJcblxyXG4gIHNtb290aFJ1bGUgKHRpbGU6IFRpbGUsIHdhdGVyTmVpZ2hib3VyczogbnVtYmVyLCBncmFzc05laWdoYm91cnM6IG51bWJlcikge1xyXG4gICAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4gJiYgZ3Jhc3NOZWlnaGJvdXJzID4gMykge1xyXG4gICAgICByZXR1cm4gVGlsZVR5cGUuR3Jhc3M7XHJcbiAgICB9XHJcbiAgICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5HcmFzcyAmJiB3YXRlck5laWdoYm91cnMgPiA3KSB7XHJcbiAgICAgIHJldHVybiBUaWxlVHlwZS5PY2VhbjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aWxlLnR5cGU7XHJcbiAgfVxyXG5cclxuICBncm93R3Jhc3MgKHRpbGU6IFRpbGUsIHdhdGVyTmVpZ2hib3VyczogbnVtYmVyLCBncmFzc05laWdoYm91cnM6IG51bWJlcikge1xyXG4gICAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4gJiYgZ3Jhc3NOZWlnaGJvdXJzID4gMCkge1xyXG4gICAgICByZXR1cm4gVGlsZVR5cGUuR3Jhc3M7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGlsZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgZmlsbEluSG9sZXMoZ3JpZDogVGlsZVtdW10pIHtcclxuICAgIGZvcihsZXQgeSA9IDA7IHkgPCBncmlkLmxlbmd0aDsgeSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgZ3JpZFt5XS5sZW5ndGg7IGgrKykge1xyXG4gICAgICAgIGlmIChncmlkW3ldW2hdLnR5cGUgPT09IFRpbGVUeXBlLk5vbmUpIHtcclxuICAgICAgICAgIGdyaWRbeV1baF0udHlwZSA9IFRpbGVUeXBlLk9jZWFuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IE1hcEdlbmVyYXRvcigpOyIsImltcG9ydCBQb2ludCBmcm9tICcuLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCBDaXR5IGZyb20gJy4uL01hcEVudGl0aWVzL0NpdHknO1xyXG5pbXBvcnQgVW5pdCBmcm9tICcuLi9NYXBFbnRpdGllcy9Vbml0JztcclxuaW1wb3J0IHsgZ3JpZFNlcnZpY2UsIGdyaWRTZXJ2aWNlSW5pdCB9IGZyb20gJy4uL0dyaWQvR3JpZFNlcnZpY2UnO1xyXG5pbXBvcnQgUm9hZCBmcm9tICcuLi9NYXBFbnRpdGllcy9Sb2FkJztcclxuaW1wb3J0IFRpbGVUeXBlIGZyb20gJy4vVGlsZXMvVGlsZVR5cGUnO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuL1RpbGVzL1RpbGUnO1xyXG5cclxuY2xhc3MgTWFwIHtcclxuICBjb250ZXh0OiBhbnk7XHJcbiAgc2l6ZTogbnVtYmVyO1xyXG4gIHRpbGVOdW1iZXI6IG51bWJlcjtcclxuICB2aWV3UG9ydE9yaWdpbjogUG9pbnQ7XHJcbiAgc2VsZWN0ZWRUaWxlOiBUaWxlO1xyXG4gIHNlbGVjdGVkRW50aXR5OiBhbnk7XHJcbiAgem9vbUxldmVsOiBudW1iZXI7XHJcbiAgb3JpZ2luOiBQb2ludDtcclxuICB2aWV3UG9ydEVuZDogUG9pbnQ7XHJcbiAgdGlsZVNpemU6IG51bWJlcjtcclxuICBjbGlwcGVkR3JpZDogYW55W107XHJcbiAgdmlld1BvcnRTaXplOiBudW1iZXI7XHJcbiAgXHJcbiAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyLCB0aWxlTnVtYmVyOiBudW1iZXIsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgLy8gIERyYXcgZ3JpZCBvZiBzcXVhcmVzXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIHRoaXMudGlsZU51bWJlciA9IHRpbGVOdW1iZXI7XHJcbiAgICB0aGlzLnZpZXdQb3J0T3JpZ2luID0gbmV3IFBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5vcmlnaW4gPSBuZXcgUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGlsZSA9IG51bGw7XHJcbiAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcclxuXHJcbiAgICBncmlkU2VydmljZUluaXQodGhpcy50aWxlTnVtYmVyKTtcclxuICAgIGdyaWRTZXJ2aWNlLmNyZWF0ZU1hcCgpO1xyXG5cclxuICAgIHRoaXMuY2xpcHBlZEdyaWQgPSBbXTtcclxuICAgIHRoaXMudmlld1BvcnRTaXplID0gc2l6ZTsgLy8gIGhvdyBsYXJnZSB0aGUgdmlldyBwb3J0IGlzXHJcbiAgICB0aGlzLnpvb21MZXZlbCA9IDQwOyAgLy8gIGhvdyBtYW55IFRpbGVzIGFyZSBpbiB2aWV3IHBvcnRcclxuICAgIHRoaXMudmlld1BvcnRFbmQgPSBuZXcgUG9pbnQodGhpcy52aWV3UG9ydE9yaWdpbi54ICsgIHRoaXMuem9vbUxldmVsLCB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyAgdGhpcy56b29tTGV2ZWwpO1xyXG4gICAgIFxyXG4gICAgdGhpcy5jbGlwcGVkR3JpZCA9IGdyaWRTZXJ2aWNlLmNyZWF0ZUNsaXBwZWRHcmlkKHRoaXMudmlld1BvcnRPcmlnaW4sIHRoaXMudmlld1BvcnRFbmQpO1xyXG4gICAgdGhpcy50aWxlU2l6ZSA9IHRoaXMudmlld1BvcnRTaXplIC8gdGhpcy56b29tTGV2ZWw7IC8vICBzaG91bGQgYmUgdmlldyBwb3J0IHNpemUgLyB2aWV3IHBvcnQgY29udGVudCBzaXplXHJcbiAgfVxyXG5cclxuICBncmlkKCkge1xyXG4gICAgcmV0dXJuIGdyaWRTZXJ2aWNlLmdyaWQ7XHJcbiAgfVxyXG5cclxuICBjbGlja1RpbGUocG9pbnQ6IFBvaW50KSB7XHJcbiAgICBjb25zdCB0aWxlWCA9IE1hdGguZmxvb3IocG9pbnQueCAvIHRoaXMudGlsZVNpemUpO1xyXG4gICAgY29uc3QgdGlsZVkgPSBNYXRoLmZsb29yKHBvaW50LnkgLyB0aGlzLnRpbGVTaXplKTtcclxuXHJcbiAgICBjb25zdCB0aWxlID0gdGhpcy5jbGlwcGVkR3JpZFt0aWxlWV0gJiYgdGhpcy5jbGlwcGVkR3JpZFt0aWxlWV1bdGlsZVhdO1xyXG5cclxuICAgIGlmICh0aWxlKSB7ICBcclxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUaWxlKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRpbGUuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGlsZS51bml0IHx8IHRpbGUucm9hZCB8fCB0aWxlLmNpdHkpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gdGlsZS51bml0IHx8IHRpbGUucm9hZCB8fCB0aWxlLmNpdHk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEVudGl0eSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZWxlY3RlZFRpbGUgPSB0aWxlO1xyXG4gICAgICB0aWxlLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRpbGU7XHJcbiAgfVxyXG5cclxuICBkcmFnKGRpZmZYOiBudW1iZXIsIGRpZmZZOiBudW1iZXIpIHtcclxuXHJcbiAgICBjb25zdCBtaW5EcmFnID0gMTtcclxuICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPiBtaW5EcmFnIHx8IE1hdGguYWJzKGRpZmZZKSA+IG1pbkRyYWcpIHtcclxuICAgICAgaWYgKGRpZmZYID4gMCkge1xyXG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIE1hdGgucm91bmQoZGlmZlgpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCA9IE1hdGgubWluKHN1bSwgdGhpcy50aWxlTnVtYmVyKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0RW5kLnggPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyB0aGlzLnpvb21MZXZlbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBzdW0gPSB0aGlzLnZpZXdQb3J0T3JpZ2luLnggKyBNYXRoLnJvdW5kKGRpZmZYKTtcclxuICAgICAgICB0aGlzLnZpZXdQb3J0T3JpZ2luLnggPSBNYXRoLm1heChzdW0sIDApO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIHRoaXMuem9vbUxldmVsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGlmZlkgPiAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy52aWV3UG9ydE9yaWdpbi55ICsgTWF0aC5yb3VuZChkaWZmWSk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55ID0gTWF0aC5taW4oc3VtLCB0aGlzLnRpbGVOdW1iZXIpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueSArIHRoaXMuem9vbUxldmVsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMudmlld1BvcnRPcmlnaW4ueCArIE1hdGgucm91bmQoZGlmZlkpO1xyXG4gICAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueSA9IE1hdGgubWF4KHN1bSwgMCk7XHJcbiAgICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55ID0gdGhpcy52aWV3UG9ydE9yaWdpbi55ICsgdGhpcy56b29tTGV2ZWw7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZVVuaXQodW5pdDogVW5pdCwgbmVpZ2hib3VyOiBUaWxlKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbFRpbGUgPSB1bml0LnRpbGU7XHJcbiAgICB1bml0LnRpbGUgPSB0aGlzLmdyaWQoKVtuZWlnaGJvdXIucG9pbnQueV1bbmVpZ2hib3VyLnBvaW50LnhdO1xyXG4gICAgdGhpcy5ncmlkKClbbmVpZ2hib3VyLnBvaW50LnldW25laWdoYm91ci5wb2ludC54XS51bml0ID0gdW5pdDtcclxuICAgIG9yaWdpbmFsVGlsZS51bml0ID0gbnVsbDtcclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxuXHJcblxyXG4gIGxlZnRLZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5TGVmdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5MZWZ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByaWdodEtleSgpe1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbnRpdHkgJiYgdGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIFVuaXQpIHtcclxuICAgICAgdGhpcy5lbnRpdHlSaWdodCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5SaWdodCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBLZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5VXAoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuVXAoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvd25LZXkoKXtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5ICYmIHRoaXMuc2VsZWN0ZWRFbnRpdHkgaW5zdGFuY2VvZiBVbml0KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5RG93bigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5Eb3duKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbnRpdHlMZWZ0KCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGUpWzFdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gJ3dhdGVyJykge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGVudGl0eVJpZ2h0KCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGUpWzJdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gJ3dhdGVyJykge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGVudGl0eVVwKCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGUpWzBdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gJ3dhdGVyJykge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbnRpdHlEb3duKCkge1xyXG4gICAgY29uc3QgbmVpZ2hib3VyID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3Vycyh0aGlzLnNlbGVjdGVkRW50aXR5LlRpbGUpWzNdO1xyXG4gICAgaWYgKG5laWdoYm91ciAmJiBuZWlnaGJvdXIudHlwZSAhPT0gJ3dhdGVyJykge1xyXG4gICAgICB0aGlzLm1vdmVVbml0KHRoaXMuc2VsZWN0ZWRFbnRpdHksIG5laWdoYm91cik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYW5MZWZ0KCkge1xyXG4gICAgaWYgKHRoaXMudmlld1BvcnRPcmlnaW4ueCA+IDApIHtcclxuICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi54LS07XHJcbiAgICAgIHRoaXMudmlld1BvcnRFbmQueC0tO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhblJpZ2h0KCkge1xyXG4gICAgaWYgKHRoaXMudmlld1BvcnRPcmlnaW4ueCArIHRoaXMuem9vbUxldmVsIDwgdGhpcy50aWxlTnVtYmVyKSB7XHJcbiAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueCsrO1xyXG4gICAgICB0aGlzLnZpZXdQb3J0RW5kLngrKztcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYW5VcCgpIHtcclxuICAgIGlmICh0aGlzLnZpZXdQb3J0T3JpZ2luLnkgPiAwKSB7XHJcbiAgICAgIHRoaXMudmlld1BvcnRPcmlnaW4ueS0tO1xyXG4gICAgICB0aGlzLnZpZXdQb3J0RW5kLnktLTtcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7ICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhbkRvd24oKSB7XHJcbiAgICBpZiAodGhpcy52aWV3UG9ydE9yaWdpbi55ICsgdGhpcy56b29tTGV2ZWwgPCB0aGlzLnRpbGVOdW1iZXIpIHtcclxuICAgICAgdGhpcy52aWV3UG9ydE9yaWdpbi55Kys7XHJcbiAgICAgIHRoaXMudmlld1BvcnRFbmQueSsrO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHpvb21PdXQoKSB7XHJcbiAgICBpZiAodGhpcy56b29tTGV2ZWwgPCAxMDApIHtcclxuICAgICAgdGhpcy56b29tTGV2ZWwrKztcclxuICAgICAgdGhpcy56b29tKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB6b29tSW4oKSB7XHJcbiAgICBpZiAodGhpcy56b29tTGV2ZWwgPiAxKSB7XHJcbiAgICAgIHRoaXMuem9vbUxldmVsLS07XHJcbiAgICAgIHRoaXMuem9vbSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgem9vbSgpIHtcclxuICAgIHRoaXMudmlld1BvcnRFbmQgPSBuZXcgUG9pbnQodGhpcy52aWV3UG9ydE9yaWdpbi54ICsgIHRoaXMuem9vbUxldmVsLCB0aGlzLnZpZXdQb3J0T3JpZ2luLnkgKyAgdGhpcy56b29tTGV2ZWwpO1xyXG4gICAgdGhpcy50aWxlU2l6ZSA9IHRoaXMudmlld1BvcnRTaXplIC8gdGhpcy56b29tTGV2ZWw7XHJcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVZpZXcoKSB7XHJcbiAgICB0aGlzLmNsaXBwZWRHcmlkID0gZ3JpZFNlcnZpY2UuY3JlYXRlQ2xpcHBlZEdyaWQodGhpcy52aWV3UG9ydE9yaWdpbiwgdGhpcy52aWV3UG9ydEVuZCk7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCd1cGRhdGUnKTtcclxuICB9XHJcblxyXG4gIGRyYXcoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XHJcblxyXG4gICAgZm9yKGxldCBoPTA7aDx0aGlzLmNsaXBwZWRHcmlkLmxlbmd0aDtoKyspIHtcclxuICAgICAgZm9yKGxldCB3PTA7dzx0aGlzLmNsaXBwZWRHcmlkW2hdLmxlbmd0aDt3KyspIHtcclxuICAgICAgICBjb25zdCB0aWxlID0gdGhpcy5jbGlwcGVkR3JpZFtoXVt3XTtcclxuICAgICAgICBpZiAodGlsZSAmJiAodGlsZS5kcmF3aW5nUG9pbnQueCkgPD0gdGhpcy52aWV3UG9ydEVuZC54ICYmICh0aWxlLmRyYXdpbmdQb2ludC54KSA+PSAwICYmICh0aWxlLmRyYXdpbmdQb2ludC55KSA+PSAwICYmIHRpbGUuZHJhd2luZ1BvaW50LnkgPD0gdGhpcy52aWV3UG9ydEVuZC55KSB7XHJcbiAgICAgICAgICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5HcmFzcykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyMwMEZGMDAnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRpbGUudHlwZSA9PT0gVGlsZVR5cGUuT2NlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMEZGJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk5vbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjRkZGRkZGJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aWxlLmRyYXdpbmdQb2ludC54ICogdGhpcy50aWxlU2l6ZSwgdGlsZS5kcmF3aW5nUG9pbnQueSAqIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG5cclxuICAgICAgICAgIGlmICh0aWxlLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QodGlsZS5kcmF3aW5nUG9pbnQueCAqIHRoaXMudGlsZVNpemUsIHRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gJyNGRkZGRkYnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aWxlLmNpdHkpIHtcclxuICAgICAgICAgICAgdGlsZS5jaXR5LmRyYXcodGhpcy5jb250ZXh0LCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGlsZS5yb2FkKSB7XHJcbiAgICAgICAgICAgIHRpbGUucm9hZC5kcmF3KHRoaXMuY29udGV4dCwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRpbGUudW5pdCkge1xyXG4gICAgICAgICAgICB0aWxlLnVuaXQuZHJhdyh0aGlzLmNvbnRleHQsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkVW5pdFRvU2VsZWN0ZWRUaWxlKCkge1xyXG4gICAgaWYgKFVuaXQuYWRkKHRoaXMuc2VsZWN0ZWRUaWxlKSkge1xyXG4gICAgICB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFJvYWRUb1NlbGVjdGVkVGlsZSgpIHtcclxuICAgIGlmIChSb2FkLmFkZCh0aGlzLnNlbGVjdGVkVGlsZSkpIHtcclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRDaXR5VG9TZWxlY3RlZFRpbGUoKSB7XHJcbiAgICBpZiAoQ2l0eS5hZGQodGhpcy5zZWxlY3RlZFRpbGUpKSB7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlU2VsZWN0ZWRFbnRpdHkoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRFbnRpdHkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRpbGUgPSB0aGlzLnNlbGVjdGVkRW50aXR5LnRpbGU7XHJcbiAgICBjb25zdCBncmlkVGlsZSA9IHRoaXMuZ3JpZCgpW3RpbGUucG9pbnQueV1bdGlsZS5wb2ludC54XTtcclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIFVuaXQpIHtcclxuICAgICAgZ3JpZFRpbGUudW5pdCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmVpZ2hib3VycyA9IHRoaXMuc2VsZWN0ZWRFbnRpdHkubmVpZ2hib3VycztcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5IGluc3RhbmNlb2YgUm9hZCkge1xyXG4gICAgICAvLyAgRm9yIGVhY2ggbmVpZ2hib3VyIGRvIGEgY29ubmVjdGl2aXR5IGNoZWNrIGFuZCB1cGRhdGUgY29ubmVjdGVkbmVzc1xyXG4gICAgICAvLyAgVXBkYXRlIG5ldHdvcmtzIHJvYWRzLlxyXG4gICAgICBSb2FkLnJlbW92ZShncmlkVGlsZSwgdGhpcy5zZWxlY3RlZEVudGl0eSk7XHJcbiAgICAgIC8vICBGaW5kIG5ldHdvcmsgdGhhdCB0aGUgcm9hZCBpcyBjb25uZWN0ZWQgdG8gYW5kIGl0J3MgbmVpZ2hib3VycyBhbmQgcmVtb3ZlXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSBpbnN0YW5jZW9mIENpdHkpIHtcclxuICAgICAgQ2l0eS5yZW1vdmUoZ3JpZFRpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSBudWxsO1xyXG4gICAgdGhpcy5kcmF3KCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXA7XHJcbiIsImltcG9ydCBQb2ludCBmcm9tICcuLi8uLi9NYXBFbnRpdGllcy9Qb2ludCc7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tICcuL1RpbGVUeXBlJztcclxuaW1wb3J0IFVuaXQgZnJvbSAnLi4vLi4vTWFwRW50aXRpZXMvVW5pdCc7XHJcbmltcG9ydCBDaXR5IGZyb20gJy4uLy4uL01hcEVudGl0aWVzL0NpdHknO1xyXG5cclxuY2xhc3MgVGlsZSB7XHJcbiAgcG9pbnQ6IFBvaW50O1xyXG4gIHNlbGVjdGVkOiBib29sZWFuO1xyXG4gIHR5cGU6IFRpbGVUeXBlO1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY2l0eTogQ2l0eTtcclxuICByb2FkOiBhbnk7XHJcbiAgdW5pdDogVW5pdDtcclxuICBkcmF3aW5nUG9pbnQ6IFBvaW50O1xyXG4gIHN0YXRpYyBjb3B5OiAodGlsZTogVGlsZSwgdHlwZT86IGFueSkgPT4gVGlsZTtcclxuICBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQsIHR5cGU6IFRpbGVUeXBlKSB7XHJcbiAgICB0aGlzLnBvaW50ID0gUG9pbnQuY29weShwb2ludCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmlkID0gYCR7cG9pbnQueH0tJHtwb2ludC55fWA7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gIH1cclxuXHJcbiAgZXF1YWxzKG90aGVyVGlsZTogVGlsZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9pbnQuZXF1YWxzKG90aGVyVGlsZS5wb2ludCk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIGNvbnN0IHRpbGVEZXRhaWxzID0gYCR7dGhpcy5wb2ludC54fSwgJHt0aGlzLnBvaW50Lnl9LCAke3RoaXMudHlwZX1gO1xyXG4gICAgbGV0IGNpdHlEZXRhaWxzID0gJyc7XHJcbiAgICBpZiAodGhpcy5jaXR5KSB7XHJcbiAgICAgIGNpdHlEZXRhaWxzID0gdGhpcy5jaXR5LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBsZXQgcm9hZERldGFpbHMgPSAnJztcclxuICAgIGlmICh0aGlzLnJvYWQpIHtcclxuICAgICAgcm9hZERldGFpbHMgPSBgJHt0aGlzLnJvYWQudG9TdHJpbmcoKX1cXG4ke3RoaXMucm9hZC5yb2FkTmV0d29yay50b1N0cmluZygpfWBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1bml0RGV0YWlscyA9IHRoaXMudW5pdCA/IHRoaXMudW5pdC50b1N0cmluZygpIDogJyc7XHJcbiAgICByZXR1cm4gYCR7dGlsZURldGFpbHN9ICR7Y2l0eURldGFpbHN9ICR7cm9hZERldGFpbHN9ICR7dW5pdERldGFpbHN9YDtcclxuICB9XHJcbn1cclxuXHJcblRpbGUuY29weSA9IGZ1bmN0aW9uICh0aWxlOiBUaWxlLCB0eXBlID0gbnVsbCkge1xyXG4gIGxldCBjb3B5O1xyXG4gIGlmICghdHlwZSkge1xyXG4gICAgY29weSA9IG5ldyBUaWxlKHRpbGUucG9pbnQsIHRpbGUudHlwZSk7XHJcbiAgICBjb3B5LnNlbGVjdGVkID0gY29weS5zZWxlY3RlZDtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb3B5O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaWxlO1xyXG4iLCJlbnVtIFRpbGVUeXBlIHtcclxuICBOb25lID0gJ05vbmUnLFxyXG4gIEdyYXNzID0gJ0dyYXNzJyxcclxuICBGb3Jlc3QgPSAnRm9yZXN0JyxcclxuICBPY2VhbiA9ICdPY2VhbicsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpbGVUeXBlO1xyXG4iLCJcclxuaW1wb3J0IGdlbmVyYXRlR3VpZCBmcm9tICcuLi9nZW5lcmF0ZUd1aWQnO1xyXG5pbXBvcnQgeyBncmlkU2VydmljZSB9IGZyb20gJy4uL0dyaWQvR3JpZFNlcnZpY2UnO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZSc7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tICcuLi9NYXAvVGlsZXMvVGlsZVR5cGUnO1xyXG5cclxuY2xhc3MgQ2l0eSB7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgdGlsZTogVGlsZTtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgcG9wdWxhdGlvbjogbnVtYmVyO1xyXG4gIGRpc3RhbmNlczogYW55W107XHJcbiAgc3RhdGljIGFkZDogKHRpbGU6IFRpbGUpID0+IGJvb2xlYW47XHJcbiAgcm9hZE5ldHdvcmtzOiBhbnk7XHJcbiAgc3RhdGljIHJlbW92ZTogKGdyaWRUaWxlOiBUaWxlKSA9PiB2b2lkO1xyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IFRpbGUsIG5hbWU6IHN0cmluZywgcG9wdWxhdGlvbjogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnR5cGUgPSAnY2l0eSc7XHJcbiAgICB0aGlzLmlkID0gZ2VuZXJhdGVHdWlkKCk7XHJcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMucG9wdWxhdGlvbiA9IHBvcHVsYXRpb247XHJcblxyXG4gICAgdGhpcy5kaXN0YW5jZXMgPSBbXTtcclxuXHJcbiAgICBsZXQgbmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnModGlsZSlcclxuICAgICAgLmZpbHRlcigobmVpZ2hib3VyOiBhbnkpID0+IG5laWdoYm91ci5jaXR5IHx8IG5laWdoYm91ci5yb2FkKVxyXG4gICAgICAubWFwKHggPT4geC5yb2FkIHx8IHguY2l0eSk7XHJcblxyXG4gICAgdGhpcy5yb2FkTmV0d29ya3MgPSBbXTtcclxuICAgIFxyXG4gICAgbmVpZ2hib3Vycy5mb3JFYWNoKChuZWlnaGJvdXI6IGFueSkgPT4ge1xyXG4gICAgICBpZiAobmVpZ2hib3VyLnR5cGUgPT09ICdyb2FkJykge1xyXG4gICAgICAgIHRoaXMuYWRkTmV0d29yayhuZWlnaGJvdXIucm9hZE5ldHdvcmspO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBuZWlnaGJvdXJzLmZpbHRlcigoeDogYW55KSA9PiB4ICYmIHgucm9hZCkuZm9yRWFjaCgobmVpZ2hib3VyOiBhbnkpID0+IHtcclxuICAgICAgbmVpZ2hib3VyLnJvYWQudXBkYXRlU2hhcGUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXF1YWxzKG90aGVyQ2l0eTogYW55KSB7XHJcbiAgICByZXR1cm4gb3RoZXJDaXR5LmlkID09PSB0aGlzLmlkO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgY29uc3QgYmFzZVggPSB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZTtcclxuICAgIGNvbnN0IGJhc2VZID0gdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemU7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KGJhc2VYLCAgYmFzZVkgKyB0aWxlU2l6ZS8yLCB0aWxlU2l6ZS80LCB0aWxlU2l6ZS8yKTtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoYmFzZVggKyB0aWxlU2l6ZS80LCAgYmFzZVkgKyB0aWxlU2l6ZS80LCB0aWxlU2l6ZS8yLCAzKnRpbGVTaXplLzQpO1xyXG4gICAgY29udGV4dC5maWxsUmVjdChiYXNlWCArIDMqdGlsZVNpemUvNCwgIGJhc2VZICsgdGlsZVNpemUvMiwgdGlsZVNpemUvNCwgdGlsZVNpemUvMik7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIGNvbnN0IGRpc3RhbmNlcyA9IHRoaXMuZGlzdGFuY2VzLm1hcCh4ID0+IGBJZDogJHt4LmNpdHkuaWR9IGRpc3RhbmNlOiAke3guZGlzdGFuY2V9XFxuYCk7XHJcbiAgICByZXR1cm4gYCR7dGhpcy5pZH06ICR7dGhpcy5wb3B1bGF0aW9ufVxcbiAke2Rpc3RhbmNlc31gO1xyXG4gIH1cclxuXHJcbiAgYWRkTmV0d29yayhuZXR3b3JrOiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5yb2FkTmV0d29ya3Muc29tZSgoeDogYW55KSA9PiB4LmlkID09PSBuZXR3b3JrLmlkKSkge1xyXG4gICAgICB0aGlzLnJvYWROZXR3b3Jrcy5wdXNoKG5ldHdvcmspO1xyXG4gICAgICBuZXR3b3JrLmNpdGllcy5wdXNoKHRoaXMpO1xyXG4gICAgICBuZXR3b3JrLmZpbmREaXN0YW5jZXNGb3JDaXRpZXMoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkNpdHkucmVtb3ZlID0gZnVuY3Rpb24oZ3JpZFRpbGU6IFRpbGUpIHtcclxuICBcclxuICBncmlkVGlsZS5jaXR5ID0gbnVsbDtcclxuICAvLyAgUmVtb3ZlIGZyb20gbmVpZ2hib3VyaW5nIHJvYWRuZXR3b3JrcyBhbmQgcmVjYWxjdWxhdGUgbmV0d29ya3NcclxufVxyXG5cclxuQ2l0eS5hZGQgPSBmdW5jdGlvbih0aWxlOiBUaWxlKSB7XHJcbiAgaWYgKCF0aWxlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0aWxlLmNpdHkgfHwgdGlsZS5yb2FkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0aWxlLnR5cGUgPT09IFRpbGVUeXBlLk9jZWFuKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGNvbnN0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5nZXRSZWdpb24odGlsZS5wb2ludCwgMik7XHJcblxyXG4gIGlmIChuZWlnaGJvdXJzLmZpbHRlcigoeDogYW55KSA9PiB4LmNpdHkpLmxlbmd0aCA+IDApIHJldHVybiBmYWxzZTtcclxuICB0aWxlLmNpdHkgPSBuZXcgQ2l0eSh0aWxlLCAnTmV3IENpdHknLCAxKTtcclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENpdHkiLCJcclxuY2xhc3MgUG9pbnQge1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgc3RhdGljIGNvcHk6IChwb2ludDogUG9pbnQpID0+IFBvaW50O1xyXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICB9XHJcblxyXG4gIGVxdWFscyhvdGhlclBvaW50OiBQb2ludCkge1xyXG4gICAgcmV0dXJuIHRoaXMueCA9PT0gb3RoZXJQb2ludC54ICYmIHRoaXMueSA9PT0gb3RoZXJQb2ludC55O1xyXG4gIH1cclxufVxyXG5cclxuUG9pbnQuY29weSA9IGZ1bmN0aW9uKHBvaW50OiBQb2ludCkge1xyXG4gIHJldHVybiBuZXcgUG9pbnQocG9pbnQueCwgcG9pbnQueSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBvaW50OyIsIlxyXG5pbXBvcnQgUm9hZE5ldHdvcmsgZnJvbSAnLi9Sb2FkTmV0d29yayc7XHJcbmltcG9ydCBDaXR5IGZyb20gJy4vQ2l0eSc7XHJcbmltcG9ydCBnZW5lcmF0ZUd1aWQgZnJvbSAnLi4vZ2VuZXJhdGVHdWlkJztcclxuaW1wb3J0IHsgZ3JpZFNlcnZpY2UgfSBmcm9tICcuLi9HcmlkL0dyaWRTZXJ2aWNlJztcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGUnO1xyXG5pbXBvcnQgVGlsZVR5cGUgZnJvbSAnLi4vTWFwL1RpbGVzL1RpbGVUeXBlJztcclxuXHJcbmNvbnN0IFNoYXBlcyA9IHtcclxuICBpc29sYXRlZDogJ2lzb2xhdGVkJyxcclxuICB0b3A6ICd0b3AnLFxyXG4gIGxlZnQ6ICdsZWZ0JyxcclxuICBib3R0b206ICdib3R0b20nLFxyXG4gIHJpZ2h0OiAncmlnaHQnLFxyXG4gIHZlcnRpY2FsOiAndmVydGljYWwnLFxyXG4gIGhvcml6b250YWw6ICdob3Jpem9udGFsJyxcclxuICB0b3BSaWdodDogJ3RvcFJpZ2h0JyxcclxuICB0b3BMZWZ0OiAndG9wTGVmdCcsXHJcbiAgYm90dG9tUmlnaHQ6ICdib3R0b21SaWdodCcsXHJcbiAgYm90dG9tTGVmdDogJ2JvdHRvbUxlZnQnLFxyXG4gIGhvcml6b250YWxCb3R0b206ICdob3Jpem9udGFsQm90dG9tJyxcclxuICBob3Jpem9udGFsVG9wOiAnaG9yaXpvbnRhbFRvcCcsXHJcbiAgdmVydGljYWxMZWZ0OiAndmVydGljYWxMZWZ0JyxcclxuICB2ZXJ0aWNhbFJpZ2h0OiAndmVydGljYWxSaWdodCcsXHJcbiAgY3Jvc3M6ICdjcm9zcydcclxufTtcclxuXHJcblxyXG5jbGFzcyBSb2FkIHtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgaWQ6IHN0cmluZztcclxuICB0aWxlOiBUaWxlO1xyXG4gIHNoYXBlOiBhbnk7XHJcbiAgc3RhdGljIGFkZDogKHRpbGU6IFRpbGUpID0+IGJvb2xlYW47XHJcbiAgc3RhdGljIGZpbmRTaGFwZTogYW55O1xyXG4gIHJvYWROZXR3b3JrOiBSb2FkTmV0d29yaztcclxuICBzdGF0aWMgcmVtb3ZlOiAoZ3JpZFRpbGU6IFRpbGUsIHJvYWQ6IFJvYWQpID0+IHZvaWQ7XHJcbiAgc3RhdGljIGZpbmRDb25uZWN0aXZpdHk6IChyb2FkczogYW55KSA9PiB2b2lkO1xyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IFRpbGUpIHtcclxuICAgIHRoaXMudHlwZSA9ICdyb2FkJztcclxuICAgIHRoaXMuaWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuICAgIHRoaXMudGlsZSA9IHRpbGU7XHJcblxyXG4gICAgbGV0IG5laWdoYm91cnMgPSBncmlkU2VydmljZS5maW5kQ3Jvc3NOZWlnaGJvdXJzKHRpbGUpO1xyXG5cclxuICAgIHRoaXMuc2hhcGUgPSBSb2FkLmZpbmRTaGFwZShuZWlnaGJvdXJzKTtcclxuICAgIG5laWdoYm91cnMgPSBuZWlnaGJvdXJzLmZpbHRlcihuZWlnaGJvdXIgPT4gbmVpZ2hib3VyLmNpdHkgfHwgbmVpZ2hib3VyLnJvYWQpXHJcbiAgICAgIC5tYXAoeCA9PiB4LnJvYWQgfHwgeC5jaXR5KTtcclxuXHJcbiAgICBjb25zdCBuZWlnaGJvdXJpbmdSb2FkcyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geCBpbnN0YW5jZW9mIFJvYWQpXHJcbiAgICBjb25zdCBuZWlnaGJvdXJpbmdSb2FkTmV0d29ya3MgPSBuZWlnaGJvdXJpbmdSb2Fkcy5tYXAoeCA9PiB4LnJvYWROZXR3b3JrKTtcclxuXHJcbiAgICBpZiAobmVpZ2hib3VyaW5nUm9hZE5ldHdvcmtzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLm1lcmdlTmV0d29ya3MobmVpZ2hib3VyaW5nUm9hZE5ldHdvcmtzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmsgPSBuZXcgUm9hZE5ldHdvcmsoKTtcclxuICAgICAgdGhpcy5yb2FkTmV0d29yay5hZGRSb2FkKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5laWdoYm91cmluZ0NpdGllcyA9IG5laWdoYm91cnMuZmlsdGVyKHggPT4geCBpbnN0YW5jZW9mIENpdHkpO1xyXG4gICAgbmVpZ2hib3VyaW5nQ2l0aWVzLmZvckVhY2goY2l0eSA9PiB7XHJcbiAgICAgIGNpdHkuYWRkTmV0d29yayh0aGlzLnJvYWROZXR3b3JrKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG5laWdoYm91cmluZ1JvYWRzLmZvckVhY2gocm9hZCA9PiB7XHJcbiAgICAgIHJvYWQubmVpZ2hib3Vycy5wdXNoKHRoaXMpO1xyXG4gICAgICByb2FkLnNoYXBlID0gUm9hZC5maW5kU2hhcGUocm9hZC5uZWlnaGJvdXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXF1YWxzKG90aGVyUm9hZDogUm9hZCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGlsZS5lcXVhbHMob3RoZXJSb2FkLnRpbGUpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYCR7dGhpcy50eXBlfTogJHt0aGlzLnNoYXBlfWA7XHJcbiAgfVxyXG4gIFxyXG4gIG1lcmdlTmV0d29ya3MobmV0d29ya3M6IGFueVtdKSB7XHJcbiAgICBjb25zdCBmaXJzdCA9IG5ldHdvcmtzLnBvcCgpO1xyXG4gICAgaWYgKCF0aGlzLnJvYWROZXR3b3JrKSB7XHJcbiAgICAgIGZpcnN0LmFkZFJvYWQodGhpcyk7XHJcbiAgICAgIHRoaXMucm9hZE5ldHdvcmsgPSBmaXJzdDtcclxuICAgIH1cclxuICAgIGZpcnN0Lm1lcmdlKG5ldHdvcmtzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNoYXBlKCkge1xyXG4gICAgY29uc3QgbiA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnModGhpcy50aWxlKTtcclxuICAgIHRoaXMuc2hhcGUgPSBSb2FkLmZpbmRTaGFwZShuKTtcclxuICB9XHJcblxyXG4gIGRyYXdIb3Jpem9udGFsKGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikge1xyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRpbGVTaXplLCB0aWxlU2l6ZS80KTtcclxuICB9XHJcblxyXG4gIGRyYXdWZXJ0aWNhbChjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplLCB0aWxlU2l6ZS80LCB0aWxlU2l6ZSk7XHJcbiAgfVxyXG5cclxuICBkcmF3VG9wKGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikgeyBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplLCB0aWxlU2l6ZS80LCA1KnRpbGVTaXplLzgpO1xyXG4gIH1cclxuICBcclxuICBkcmF3Qm90dG9tKGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikgeyBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyAzKnRpbGVTaXplLzgsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCB0aWxlU2l6ZS80LCB0aWxlU2l6ZSk7XHJcbiAgfVxyXG4gIFxyXG4gIGRyYXdMZWZ0KGNvbnRleHQ6IGFueSwgdGlsZVNpemU6IG51bWJlcikgeyBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCA1KnRpbGVTaXplLzgsIHRpbGVTaXplLzQpO1xyXG4gIH1cclxuICBcclxuICBkcmF3UmlnaHQoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7IFxyXG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnggKiB0aWxlU2l6ZSArIHRpbGVTaXplLzIsIHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueSAqIHRpbGVTaXplICsgMyp0aWxlU2l6ZS84LCAzKnRpbGVTaXplLzQsIHRpbGVTaXplLzQpO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjb250ZXh0OiBhbnksIHRpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNjNDhiMjMnO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5zaGFwZSkge1xyXG4gICAgICBjYXNlIFNoYXBlcy5pc29sYXRlZDpcclxuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMudGlsZS5kcmF3aW5nUG9pbnQueCAqIHRpbGVTaXplICsgdGlsZVNpemUvMiwgdGhpcy50aWxlLmRyYXdpbmdQb2ludC55ICogdGlsZVNpemUgKyB0aWxlU2l6ZS8yLCB0aWxlU2l6ZS80LCB0aWxlU2l6ZS80KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBcclxuICAgICAgY2FzZSBTaGFwZXMudmVydGljYWw6XHJcbiAgICAgICAgdGhpcy5kcmF3VmVydGljYWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBcclxuICAgICAgY2FzZSBTaGFwZXMuaG9yaXpvbnRhbDpcclxuICAgICAgICB0aGlzLmRyYXdIb3Jpem9udGFsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBcclxuICAgICAgY2FzZSBTaGFwZXMubGVmdDpcclxuICAgICAgICB0aGlzLmRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnJpZ2h0OlxyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnRvcDpcclxuICAgICAgICB0aGlzLmRyYXdUb3AoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMuYm90dG9tOlxyXG4gICAgICAgIHRoaXMuZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy5jcm9zczpcclxuICAgICAgICB0aGlzLmRyYXdWZXJ0aWNhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy50b3BMZWZ0OlxyXG4gICAgICAgIHRoaXMuZHJhd1RvcChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3TGVmdChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFNoYXBlcy50b3BSaWdodDpcclxuICAgICAgICB0aGlzLmRyYXdUb3AoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmJvdHRvbUxlZnQ6XHJcbiAgICAgICAgdGhpcy5kcmF3Qm90dG9tKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmJvdHRvbVJpZ2h0OlxyXG4gICAgICAgIHRoaXMuZHJhd0JvdHRvbShjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3UmlnaHQoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBTaGFwZXMudmVydGljYWxMZWZ0OlxyXG4gICAgICAgIHRoaXMuZHJhd1ZlcnRpY2FsKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmRyYXdMZWZ0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLnZlcnRpY2FsUmlnaHQ6XHJcbiAgICAgICAgdGhpcy5kcmF3VmVydGljYWwoY29udGV4dCwgdGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JpZ2h0KGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmhvcml6b250YWxUb3A6XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3VG9wKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgU2hhcGVzLmhvcml6b250YWxCb3R0b206XHJcbiAgICAgICAgdGhpcy5kcmF3SG9yaXpvbnRhbChjb250ZXh0LCB0aWxlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3Qm90dG9tKGNvbnRleHQsIHRpbGVTaXplKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblJvYWQucmVtb3ZlID0gZnVuY3Rpb24gKGdyaWRUaWxlOiBUaWxlLCByb2FkOiBSb2FkKSB7XHJcbiAgZ3JpZFRpbGUucm9hZCA9IG51bGw7XHJcblxyXG4gIC8vICBDYXNlczpcclxuICAvLyAgICBzaW5nbGUgbmVpZ2hib3VyaW5nIHJvYWRcclxuICAvLyAgICAgIHJlbW92ZSByb2FkIGZyb20gbmVpZ2hib3VyIGFuZCBmcm9tIG5ldHdvcmtcclxuICAvLyAgICBtdWx0aXBsZSBuZWlnaGJvdXJpbmcgcm9hZHNcclxuICAvLyAgICAgIHJlbW92ZSByb2FkIGZyb20gbmVpZ2hib3VycyBcclxuICAvLyAgICAgIGZvciBlYWNoIG5laWdoYm91cmluZyBuZXR3b3JrIHJlcHJvY2VzcyBjb25uZWN0aXZpdHlcclxuICAvLyAgICBuZWlnaGJvdXJpbmcgY2l0eVxyXG4gIC8vICAgICAgUmVtb3ZlIHJvYWQgZnJvbSBuZWlnaGJvdXJzXHJcbiAgLy8gICAgICBwcm9jZXNzIGNvbm5lY3Rpdml0eSB0byBjaGVjayBpZiB0aGUgbmV0d29yayBzaG91bGQgYmUgcmVtb3ZlZFxyXG4gIC8vIHJvYWQubmVpZ2hib3Vycy5mb3JFYWNoKG5laWdoYm91ciA9PiB7XHJcbiAgLy8gICBuZWlnaGJvdXIubmVpZ2hib3VycyA9IG5laWdoYm91ci5uZWlnaGJvdXJzLmZpbHRlcih4ID0+IHguaWQgIT09IG5laWdoYm91cik7XHJcbiAgLy8gfSlcclxufVxyXG5cclxuUm9hZC5maW5kQ29ubmVjdGl2aXR5ID0gZnVuY3Rpb24ocm9hZHMpIHtcclxuICAvLyBJZGVhIGlzIHRvIHBlcmZvcm0gYSBzZXBlcmF0ZSBiZnMgaW4gc3RlcCBvbiBlYWNoIHBlYWNlIG9mIHJvYWQgYW5kIGNoZWNrIGNvbm5lY3Rpdml0eSBhdCBlYWNoIHN0ZXBcclxuICAvLyBJZiB0d28gbmV0d29ya3MgY29udGFpbiB0aGUgc2FtZSBub2RlIHRoZW4gdGhleSBhcmUgY29ubmVjdGVkLlxyXG5cclxuICAvLyBjb25zdCBzZWFyY2hlcyA9IHJvYWRzLm1hcCh4ID0+IHtcclxuICAvLyAgIGNvbnN0IHZpc2l0ZWQgPSB7fTtcclxuICAvLyAgIHZpc2l0ZWRbeC5pZF0gPSB0cnVlO1xyXG4gIC8vICAgcmV0dXJuIHsgaXNGaW5pc2hlZDogZmFsc2UsIGVkZ2VTZXQ6IHgubmVpZ2hib3VycywgdmlzaXRlZCwgY29ubmVjdGVkOiBbXSB9O1xyXG4gIC8vIH0pO1xyXG5cclxuICAvLyB3aGlsZSAoc2VhcmNoZXMuZmluZCh4ID0+IHguaXNGaW5pc2hlZCkubGVuZ3RoID4gMCkge1xyXG4gIC8vICAgY29uc29sZS5sb2coJ0l0ZXJhdGlvbiAxJyk7XHJcbiAgLy8gICBzZWFyY2hlcy5mb3JFYWNoKHggPT4geC5maW5pc2hlZCA9IHRydWUpO1xyXG4gIC8vIH1cclxuICAvLyAgQ29udGludWUgdW50aWwgYWxsIHNlYXJjaGVzIGFyZSBjb21wbGV0ZS5cclxuICAvLyAgVGVzdCBlYWNoIGl0ZXJhdGlvbiBhbmQgc3RvcCBzZWFyY2ggaWYgbmVjZXNzYXJ5LlxyXG59XHJcblxyXG4vLyAgU2F2ZSBzdGF0ZSBcclxuLy8gUm9hZC5pbmNyZW1lbnRhbEJmcyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gfVxyXG5cclxuXHJcblJvYWQuZmluZFNoYXBlID0gZnVuY3Rpb24gKG5laWdoYm91cnM6IFRpbGVbXSkge1xyXG4gIGNvbnN0IHRvcE5laWdoYm91ciA9IChuZWlnaGJvdXJzWzBdICYmIChuZWlnaGJvdXJzWzBdLnJvYWQgfHwgbmVpZ2hib3Vyc1swXS5jaXR5KSkgfHwgbnVsbDtcclxuICBjb25zdCBsZWZ0TmVpZ2hib3VyID0gKG5laWdoYm91cnNbMV0gJiYgKG5laWdoYm91cnNbMV0ucm9hZCB8fCBuZWlnaGJvdXJzWzFdLmNpdHkpKSB8fCBudWxsO1xyXG4gIGNvbnN0IHJpZ2h0TmVpZ2hib3VyID0gKG5laWdoYm91cnNbMl0gJiYgKG5laWdoYm91cnNbMl0ucm9hZCB8fCBuZWlnaGJvdXJzWzJdLmNpdHkpKSB8fCBudWxsO1xyXG4gIGNvbnN0IGJvdHRvbU5laWdoYm91ciA9IChuZWlnaGJvdXJzWzNdICYmIChuZWlnaGJvdXJzWzNdLnJvYWQgfHwgbmVpZ2hib3Vyc1szXS5jaXR5KSkgfHwgbnVsbDtcclxuXHJcbiAgbGV0IHNoYXBlID0gU2hhcGVzLmlzb2xhdGVkO1xyXG4gIFxyXG4gIGlmICh0b3BOZWlnaGJvdXIpIHtcclxuICAgIGlmIChsZWZ0TmVpZ2hib3VyKSB7XHJcbiAgICAgIGlmIChyaWdodE5laWdoYm91ciAmJiBib3R0b21OZWlnaGJvdXIpIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy5jcm9zcztcclxuICAgICAgICAvLyBbdG9wTmVpZ2hib3VyLCBsZWZ0TmVpZ2hib3VyLCByaWdodE5laWdoYm91ciwgYm90dG9tTmVpZ2hib3VyXS5mb3JFYWNoKHVwZGF0ZVJvYWQpO1xyXG4gICAgICB9IGVsc2UgaWYgKHJpZ2h0TmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMuaG9yaXpvbnRhbFRvcDtcclxuICAgICAgfSBlbHNlIGlmIChib3R0b21OZWlnaGJvdXIpIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy52ZXJ0aWNhbExlZnQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudG9wTGVmdDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgICBpZiAoYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgICAgICAgc2hhcGUgPSBTaGFwZXMudmVydGljYWxSaWdodDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaGFwZSA9IFNoYXBlcy50b3BSaWdodDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGJvdHRvbU5laWdoYm91cikge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnZlcnRpY2FsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNoYXBlID0gU2hhcGVzLnRvcDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoYm90dG9tTmVpZ2hib3VyKSB7XHJcbiAgaWYgKGxlZnROZWlnaGJvdXIpIHtcclxuICAgIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgICBzaGFwZSA9IFNoYXBlcy5ob3Jpem9udGFsQm90dG9tO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hhcGUgPSBTaGFwZXMuYm90dG9tTGVmdDtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJpZ2h0TmVpZ2hib3VyKSB7XHJcbiAgICBzaGFwZSA9IFNoYXBlcy5ib3R0b21SaWdodDtcclxuICB9IGVsc2Uge1xyXG4gICAgc2hhcGUgPSBTaGFwZXMuYm90dG9tO1xyXG4gIH1cclxuICB9IGVsc2UgaWYgKGxlZnROZWlnaGJvdXIpIHtcclxuICAgIGlmIChyaWdodE5laWdoYm91cikge1xyXG4gICAgICBzaGFwZSA9IFNoYXBlcy5ob3Jpem9udGFsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hhcGUgPSBTaGFwZXMubGVmdDtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJpZ2h0TmVpZ2hib3VyKSB7XHJcbiAgICBzaGFwZSA9IFNoYXBlcy5yaWdodDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzaGFwZTtcclxufVxyXG5cclxuUm9hZC5hZGQgPSBmdW5jdGlvbiAodGlsZTogVGlsZSkge1xyXG4gIGlmICghdGlsZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAodGlsZS5jaXR5IHx8IHRpbGUucm9hZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAodGlsZS50eXBlID09PSBUaWxlVHlwZS5PY2VhbikgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB0aWxlLnJvYWQgPSBuZXcgUm9hZCh0aWxlKTtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm9hZDsiLCJpbXBvcnQgZ2VuZXJhdGVHdWlkIGZyb20gJy4uL2dlbmVyYXRlR3VpZCc7XHJcbmltcG9ydCB7IGdyaWRTZXJ2aWNlIH0gZnJvbSAnLi4vR3JpZC9HcmlkU2VydmljZSc7XHJcbmltcG9ydCBSb2FkIGZyb20gJy4vUm9hZCc7XHJcbmltcG9ydCBDaXR5IGZyb20gJy4vQ2l0eSc7XHJcblxyXG5jbGFzcyBSb2FkTmV0d29yayB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjaXRpZXM6IGFueVtdO1xyXG4gIHJvYWRzOiBhbnlbXTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuICAgIHRoaXMuY2l0aWVzID0gW107XHJcbiAgICB0aGlzLnJvYWRzID0gW107XHJcbiAgfVxyXG5cclxuICBhZGRSb2FkKHJvYWQ6IFJvYWQpIHtcclxuICAgIHRoaXMucm9hZHMucHVzaChyb2FkKTtcclxuICAgIHJvYWQucm9hZE5ldHdvcmsgPSB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYElkOiAke3RoaXMuaWR9LCBDaXRpZXM6ICR7dGhpcy5jaXRpZXMubGVuZ3RofSwgUm9hZHM6ICR7dGhpcy5yb2Fkcy5sZW5ndGh9YDtcclxuICB9XHJcblxyXG4gIGFkZENpdHkoY2l0eTogQ2l0eSkge1xyXG4gICAgdGhpcy5jaXRpZXMucHVzaChjaXR5KTtcclxuICAgIGNpdHkucm9hZE5ldHdvcmtzID0gdGhpcztcclxuICB9XHJcblxyXG4gIG1lcmdlKG5ldHdvcmtzOiBSb2FkTmV0d29ya1tdKSB7XHJcbiAgICBuZXR3b3Jrcy5mb3JFYWNoKG5ldHdvcmsgPT4ge1xyXG4gICAgICBuZXR3b3JrLmNpdGllcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5jaXRpZXMuZmluZCgoY2l0eTogQ2l0eSkgPT4gY2l0eS5lcXVhbHMoeCkpKSB7XHJcbiAgICAgICAgICB0aGlzLmNpdGllcy5wdXNoKHgpO1xyXG4gICAgICAgICAgeC5yb2FkTmV0d29yayA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICBcclxuICAgICAgLy8gIFNob3VsZCBvcHRpbWlzZSAtIHN0b3JlIHJvYWRzIGFzIGRpY3Rpb25hcnlcclxuICAgICAgbmV0d29yay5yb2Fkcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5yb2Fkcy5maW5kKChyb2FkOiBSb2FkKSA9PiByb2FkLmVxdWFscyh4KSkpIHtcclxuICAgICAgICAgIHRoaXMucm9hZHMucHVzaCh4KTtcclxuICAgICAgICAgIHgucm9hZE5ldHdvcmsgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICB0aGlzLmZpbmREaXN0YW5jZXNGb3JDaXRpZXMoKTtcclxuICB9XHJcblxyXG4gIGZpbmREaXN0YW5jZXNGb3JDaXRpZXMoKSB7XHJcbiAgICAvLyAgRm9yIGVhY2ggY2l0eSB0byBhIGJmcyBhbmQgZmluZCBuZWlnaGJvdXJzLlxyXG4gICAgdGhpcy5jaXRpZXMuZm9yRWFjaChjaXR5ID0+IHtcclxuICAgICAgdGhpcy5maW5kRGlzdGFuY2VzKGNpdHkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZmluZERpc3RhbmNlcyhjaXR5OiBDaXR5KSB7XHJcbiAgICBjb25zdCBkaXN0YW5jZXMgPSBbXTtcclxuICAgIGxldCBuZWlnaGJvdXJzID0gZ3JpZFNlcnZpY2UuZmluZENyb3NzTmVpZ2hib3VycyhjaXR5LnRpbGUpLm1hcChub2RlID0+ICh7bm9kZSwgZGlzdGFuY2U6IDAgfSkpO1xyXG4gICAgY29uc3QgdmlzaXRlZDogYW55ID0ge307XHJcbiAgICB2aXNpdGVkW2NpdHkuaWRdID0gdHJ1ZTtcclxuXHJcbiAgICB3aGlsZShuZWlnaGJvdXJzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAvLyAgdmlzaXQgZWFjaCBuZWlnaGJvdXJcclxuICAgICAgY29uc3QgbmVpZ2hib3VyID0gbmVpZ2hib3Vycy5wb3AoKTtcclxuICAgICAgaWYgKG5laWdoYm91ci5ub2RlLnR5cGUgPT09ICdjaXR5Jykge1xyXG4gICAgICAgIGRpc3RhbmNlcy5wdXNoKHtjaXR5LCBkaXN0YW5jZTogbmVpZ2hib3VyLmRpc3RhbmNlIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZpc2l0ZWRbbmVpZ2hib3VyLm5vZGUuaWRdID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBuZWlnaGJvdXJzTmVpZ2hib3VycyA9IGdyaWRTZXJ2aWNlLmZpbmRDcm9zc05laWdoYm91cnMobmVpZ2hib3VyLm5vZGUpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiAhdmlzaXRlZFt4LmlkXSlcclxuICAgICAgICAgIC5tYXAoeCA9PiAoeyBub2RlOiB4LCBkaXN0YW5jZTogbmVpZ2hib3VyLmRpc3RhbmNlICsgMSB9KSk7XHJcbiAgICAgICAgbmVpZ2hib3VycyA9IG5laWdoYm91cnMuY29uY2F0KG5laWdoYm91cnNOZWlnaGJvdXJzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2l0eS5kaXN0YW5jZXMgPSBkaXN0YW5jZXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb2FkTmV0d29yaztcclxuIiwiaW1wb3J0IFRpbGUgZnJvbSBcIi4uL01hcC9UaWxlcy9UaWxlXCI7XHJcbmltcG9ydCBUaWxlVHlwZSBmcm9tIFwiLi4vTWFwL1RpbGVzL1RpbGVUeXBlXCI7XHJcblxyXG5jbGFzcyBVbml0IHtcclxuICB0aWxlOiBUaWxlO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBzdGF0aWMgYWRkOiAoc2VsZWN0ZWRUaWxlOiBUaWxlKSA9PiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKHRpbGU6IGFueSwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIGRyYXcoY29udGV4dDogYW55LCB0aWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjRkYwMDAwJztcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy50aWxlLmRyYXdpbmdQb2ludC54ICogdGlsZVNpemUgKyB0aWxlU2l6ZS80LCB0aGlzLnRpbGUuZHJhd2luZ1BvaW50LnkgKiB0aWxlU2l6ZSArIHRpbGVTaXplLzQsIHRpbGVTaXplLzIsIDMqdGlsZVNpemUvNCk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBgVW5pdDogJHt0aGlzLm5hbWV9YDtcclxuICB9XHJcbn1cclxuXHJcblVuaXQuYWRkID0gZnVuY3Rpb24oc2VsZWN0ZWRUaWxlOiBUaWxlKSB7ICBcclxuICBpZiAoIXNlbGVjdGVkVGlsZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAoc2VsZWN0ZWRUaWxlLmNpdHkgfHwgc2VsZWN0ZWRUaWxlLnJvYWQgfHwgc2VsZWN0ZWRUaWxlLnVuaXQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKHNlbGVjdGVkVGlsZS50eXBlID09PSBUaWxlVHlwZS5PY2VhbikgcmV0dXJuIGZhbHNlO1xyXG4gIHNlbGVjdGVkVGlsZS51bml0ID0gbmV3IFVuaXQoc2VsZWN0ZWRUaWxlLCAnTmV3IFVuaXQnKTtcclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVW5pdCIsImZ1bmN0aW9uIGdlbmVyYXRlR3VpZCgpIHtcclxuICByZXR1cm4gYCR7Z2VuZXJhdGVOdW1iZXIoKX0tJHtnZW5lcmF0ZU51bWJlcigpfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlTnVtYmVyKCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVHdWlkO1xyXG4iLCJpbXBvcnQgTWFwIGZyb20gJy4vTWFwL01hcCc7XHJcbmltcG9ydCBQb2ludCBmcm9tICcuL01hcEVudGl0aWVzL1BvaW50JztcclxuXHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5jb25zdCBzaXplID0gNTAwO1xyXG5jb25zdCBib2R5TWFyZ2luID0gODtcclxuXHJcbmNhbnZhcy53aWR0aD1zaXplO1xyXG5jYW52YXMuaGVpZ2h0PXNpemU7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpLmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcbmNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbmNvbnN0IG1hcCA9IG5ldyBNYXAoc2l6ZSwgNTAsIGNvbnRleHQpO1xyXG5tYXAuZHJhdygpO1xyXG5cclxuLy8gIENvbG9yIGluIGNsaWNrZWQgc3F1YXJlXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgbGV0IHsgY2xpZW50WCAsIGNsaWVudFkgfSA9IGU7XHJcbiAgY2xpZW50WCAtPSBib2R5TWFyZ2luO1xyXG4gIGNsaWVudFkgLT0gYm9keU1hcmdpbjtcclxuICBcclxuICBjb25zdCB0aWxlID0gbWFwLmNsaWNrVGlsZShjbGllbnRYLCBjbGllbnRZKTtcclxuXHJcbiAgaWYgKHRpbGUpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3RlZFRpbGUnKS5pbm5lckhUTUwgPSB0aWxlLnRvU3RyaW5nKClcclxuICAgICAgLnNwbGl0KCcnKVxyXG4gICAgICAubWFwKHggPT4geCA9PT0gJ1xcbicgPyAnPGJyIC8+JyA6IHgpLmpvaW4oJycpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0ZWRUaWxlJykuaW5uZXJIVE1MID0gJyc7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vICBab29tIGluIGFuZCBvdXQgYW5kIGRyYWdcclxubGV0IGRyYWdTdGF0ZSA9IDA7XHJcbmNvbnN0IHN0YXJ0RHJhZyA9IG5ldyBQb2ludCgwLCAwKTtcclxuXHJcbmNvbnN0IGRyYWdTdGF0ZXMgPSB7IFNUQVJURUQ6IDAsIERSQUdHSU5HOiAxLCBFTkRFRDogMn1cclxuXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XHJcbiAgZHJhZ1N0YXRlID0gZHJhZ1N0YXRlcy5TVEFSVEVEO1xyXG4gIGxldCB7IGNsaWVudFggLCBjbGllbnRZIH0gPSBlO1xyXG4gIGNsaWVudFggLT0gYm9keU1hcmdpbjtcclxuICBjbGllbnRZIC09IGJvZHlNYXJnaW47XHJcblxyXG4gIHN0YXJ0RHJhZy54ID0gY2xpZW50WDtcclxuICBzdGFydERyYWcueSA9IGNsaWVudFk7XHJcbn0sIGZhbHNlKTtcclxuXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsICgpID0+IHtcclxuICBpZiAoZHJhZ1N0YXRlID09PSBkcmFnU3RhdGVzLlNUQVJURUQpIGRyYWdTdGF0ZSA9IGRyYWdTdGF0ZXMuRFJBR0dJTkc7XHJcbn0sIGZhbHNlKTtcclxuXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZSkgPT4ge1xyXG4gIGlmKGRyYWdTdGF0ZSA9PT0gZHJhZ1N0YXRlcy5TVEFSVEVEKXtcclxuICB9XHJcbiAgZWxzZSBpZihkcmFnU3RhdGUgPT09IGRyYWdTdGF0ZXMuRFJBR0dJTkcpIHtcclxuICAgIGxldCB7IGNsaWVudFggLCBjbGllbnRZIH0gPSBlO1xyXG4gICAgY2xpZW50WCAtPSBib2R5TWFyZ2luO1xyXG4gICAgY2xpZW50WSAtPSBib2R5TWFyZ2luO1xyXG5cclxuICAgIGNvbnN0IGRpZmZYID0gc3RhcnREcmFnLnggLSBjbGllbnRYO1xyXG4gICAgY29uc3QgZGlmZlkgPSBzdGFydERyYWcueSAtIGNsaWVudFk7XHJcblxyXG4gICAvLyBtYXAuZHJhZyhkaWZmWCwgZGlmZlkpO1xyXG4gICAgc3RhcnREcmFnLnggPSAwO1xyXG4gICAgc3RhcnREcmFnLnkgPSAwO1xyXG4gIH1cclxuICBkcmFnU3RhdGUgPSBkcmFnU3RhdGVzLkVOREVEO1xyXG59LCBmYWxzZSk7XHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICBjb25zb2xlLmxvZyhlLmtleUNvZGUpO1xyXG4gIGlmIChlLmtleUNvZGUgPT09IDM3KSB7XHJcbiAgICBtYXAubGVmdEtleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMzgpIHtcclxuICAgIG1hcC51cEtleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgIG1hcC5yaWdodEtleSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gNDApIHtcclxuICAgIG1hcC5kb3duS2V5KCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSAxMDcpIHtcclxuICAgIG1hcC56b29tSW4oKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDEwOSkge1xyXG4gICAgbWFwLnpvb21PdXQoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDgyKSB7XHJcbiAgICBtYXAuYWRkUm9hZFRvU2VsZWN0ZWRUaWxlKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5rZXlDb2RlID09PSA2Nykge1xyXG4gICAgbWFwLmFkZENpdHlUb1NlbGVjdGVkVGlsZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGUua2V5Q29kZSA9PT0gODUpIHtcclxuICAgIG1hcC5hZGRVbml0VG9TZWxlY3RlZFRpbGUoKTtcclxuICB9XHJcblxyXG4gIGlmIChlLmtleUNvZGUgPT09IDggfHwgZS5rZXlDb2RlID09PSA0Nikge1xyXG4gICAgbWFwLnJlbW92ZVNlbGVjdGVkRW50aXR5KCk7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKGUua2V5Q29kZSk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZENpdHknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtYXAuYWRkQ2l0eVRvU2VsZWN0ZWRUaWxlKCk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZFJvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtYXAuYWRkUm9hZFRvU2VsZWN0ZWRUaWxlKCk7XHJcbn0pO1xyXG5cclxuXHJcbi8vICBHaXZlbiBhbiBhcnJheSBvZiBzcXVhcmVzIGFuZCBhIHZpZXcgcG9ydCwgZmluZCB0aGUgc3F1YXJlcyBpbiB0aGUgdmlld3BvcnRcclxuLy8gIFpvb21pbmcgY2hhbmdlcyBob3cgbGFyZ2UgeW91IHdhbnQgdG8gZHJhdyB0aGUgc3F1YXJlcyBidXQgYWxzbyB0aGUgdmlld3BvcnRcclxuLy8gIERyYWdnaW5nIGNoYW5nZXMgdGhlIHZpZXdwb3J0IHN0YXJ0LiJdLCJzb3VyY2VSb290IjoiIn0=