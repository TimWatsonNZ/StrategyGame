
import RoadNetwork from './RoadNetwork';
import City from './City';
import generateGuid from '../generateGuid';
import { gridService } from '../Grid/GridService';
import Tile from '../Map/Tiles/Tile';
import TileType from '../Map/Tiles/TileType';

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
  type: string;
  id: string;
  tile: Tile;
  shape: any;
  static add: (tile: Tile) => boolean;
  static findShape: any;
  roadNetwork: RoadNetwork;
  static remove: (gridTile: Tile, road: Road) => void;
  static findConnectivity: (roads: any) => void;
  constructor(tile: Tile) {
    this.type = 'road';
    this.id = generateGuid();
    this.tile = tile;

    let neighbours = gridService.findCrossNeighbours(tile);

    this.shape = Road.findShape(neighbours);
    neighbours = neighbours.filter(neighbour => neighbour.city || neighbour.road)
      .map(x => x.road || x.city);

    const neighbouringRoads = neighbours.filter(x => x instanceof Road)
    const neighbouringRoadNetworks = neighbouringRoads.map(x => x.roadNetwork);

    if (neighbouringRoadNetworks.length > 0) {
        this.mergeNetworks(neighbouringRoadNetworks);
    } else {
      this.roadNetwork = new RoadNetwork();
      this.roadNetwork.addRoad(this);
    }

    const neighbouringCities = neighbours.filter(x => x instanceof City);
    neighbouringCities.forEach(city => {
      city.addNetwork(this.roadNetwork);
    });

    neighbouringRoads.forEach(road => {
      road.neighbours.push(this);
      road.shape = Road.findShape(road.neighbours);
    });
  }

  equals(otherRoad: Road) {
    return this.tile.equals(otherRoad.tile);
  }

  toString() {
    return `${this.type}: ${this.shape}`;
  }
  
  mergeNetworks(networks: any[]) {
    const first = networks.pop();
    if (!this.roadNetwork) {
      first.addRoad(this);
      this.roadNetwork = first;
    }
    first.merge(networks);
  }

  updateShape() {
    const n = gridService.findCrossNeighbours(this.tile);
    this.shape = Road.findShape(n);
  }

  drawHorizontal(context: any, tileSize: number) {
    context.fillRect(this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + 3*tileSize/8, tileSize, tileSize/4);
  }

  drawVertical(context: any, tileSize: number) {
    context.fillRect(this.tile.drawingPoint.x * tileSize + 3*tileSize/8, this.tile.drawingPoint.y * tileSize, tileSize/4, tileSize);
  }

  drawTop(context: any, tileSize: number) { 
    context.fillRect(this.tile.drawingPoint.x * tileSize + 3*tileSize/8, this.tile.drawingPoint.y * tileSize, tileSize/4, 5*tileSize/8);
  }
  
  drawBottom(context: any, tileSize: number) { 
    context.fillRect(this.tile.drawingPoint.x * tileSize + 3*tileSize/8, this.tile.drawingPoint.y * tileSize + 3*tileSize/8, tileSize/4, tileSize);
  }
  
  drawLeft(context: any, tileSize: number) { 
    context.fillRect(this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + 3*tileSize/8, 5*tileSize/8, tileSize/4);
  }
  
  drawRight(context: any, tileSize: number) { 
    context.fillRect(this.tile.drawingPoint.x * tileSize + tileSize/2, this.tile.drawingPoint.y * tileSize + 3*tileSize/8, 3*tileSize/4, tileSize/4);
  }

  draw(context: any, tileSize: number) {
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

Road.remove = function (gridTile: Tile, road: Road) {
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
}

Road.findConnectivity = function(roads) {
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
}

//  Save state 
// Road.incrementalBfs = function() {

// }


Road.findShape = function (neighbours: Tile[]) {
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

Road.add = function (tile: Tile) {
  if (!tile) return false;

  if (tile.city || tile.road) return false;

  if (tile.type === TileType.Ocean) return false;

  tile.road = new Road(tile);
  return true;
}

export default Road;