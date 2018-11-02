
import RoadNetwork from './RoadNetwork';
import City from './City';
import generateGuid from '../generateGuid';
import { gridService } from '../Grid/GridService';

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
  constructor(cell, neighbours) {
    this.type = 'road';
    this.id = generateGuid();
    this.cell = cell;
    this.shape = Road.findShape(neighbours);
    this.neighbours = neighbours.filter(neighbour => neighbour.city || neighbour.road)
      .map(x => x.road || x.city);

    this.neighbours.forEach(n => {
      n.neighbours.push(this);
    });

    const neighbouringRoads = this.neighbours.filter(x => x instanceof Road)
    const neighbouringRoadNetworks = neighbouringRoads.map(x => x.roadNetwork);

    if (neighbouringRoadNetworks.length > 0) {
        this.mergeNetworks(neighbouringRoadNetworks);
    } else {
      this.roadNetwork = new RoadNetwork(this);
      this.roadNetwork.addRoad(this);
    }

    const neighbouringCities = this.neighbours.filter(x => x instanceof City);
    neighbouringCities.forEach(city => {
      city.addNetwork(this.roadNetwork);
    });

    neighbouringRoads.forEach(road => {
      road.neighbours.push(this);
      road.shape = Road.findShape(road.neighbours);
    });
  }

  equals(otherRoad) {
    return this.cell.equals(otherRoad.cell);
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

  drawHorizontal(context, cellSize) {
    context.fillRect(this.cell.drawingPoint.x * cellSize, this.cell.drawingPoint.y * cellSize + 3*cellSize/8, cellSize, cellSize/4);
  }

  drawVertical(context, cellSize) {
    context.fillRect(this.cell.drawingPoint.x * cellSize + 3*cellSize/8, this.cell.drawingPoint.y * cellSize, cellSize/4, cellSize);
  }

  drawTop(context, cellSize) { 
    context.fillRect(this.cell.drawingPoint.x * cellSize + 3*cellSize/8, this.cell.drawingPoint.y * cellSize, cellSize/4, 5*cellSize/8);
  }
  
  drawBottom(context, cellSize) { 
    context.fillRect(this.cell.drawingPoint.x * cellSize + 3*cellSize/8, this.cell.drawingPoint.y * cellSize + 3*cellSize/8, cellSize/4, cellSize);
  }
  
  drawLeft(context, cellSize) { 
    context.fillRect(this.cell.drawingPoint.x * cellSize, this.cell.drawingPoint.y * cellSize + 3*cellSize/8, 5*cellSize/8, cellSize/4);
  }
  
  drawRight(context, cellSize) { 
    context.fillRect(this.cell.drawingPoint.x * cellSize + cellSize/2, this.cell.drawingPoint.y * cellSize + 3*cellSize/8, 3*cellSize/4, cellSize/4);
  }

  draw(context, cellSize) {
    context.fillStyle = '#c48b23';

    switch (this.shape) {
      case Shapes.isolated:
        context.fillRect(this.cell.drawingPoint.x * cellSize + cellSize/2, this.cell.drawingPoint.y * cellSize + cellSize/2, cellSize/4, cellSize/4);
        break;
        
      case Shapes.vertical:
        this.drawVertical(context, cellSize);
        break;
      
      case Shapes.horizontal:
        this.drawHorizontal(context, cellSize);
        break;
        
      case Shapes.left:
        this.drawLeft(context, cellSize);
        break;

      case Shapes.right:
        this.drawRight(context, cellSize);
        break;

      case Shapes.top:
        this.drawTop(context, cellSize);
        break;

      case Shapes.bottom:
        this.drawBottom(context, cellSize);
        break;

      case Shapes.cross:
        this.drawVertical(context, cellSize);
        this.drawHorizontal(context, cellSize);
        break;

      case Shapes.topLeft:
        this.drawTop(context, cellSize);
        this.drawLeft(context, cellSize);
        break;

      case Shapes.topRight:
        this.drawTop(context, cellSize);
        this.drawRight(context, cellSize);
        break;

      case Shapes.bottomLeft:
        this.drawBottom(context, cellSize);
        this.drawLeft(context, cellSize);
        break;

      case Shapes.bottomRight:
        this.drawBottom(context, cellSize);
        this.drawRight(context, cellSize);
        break;

      case Shapes.verticalLeft:
        this.drawVertical(context, cellSize);
        this.drawLeft(context, cellSize);
        break;

      case Shapes.verticalRight:
        this.drawVertical(context, cellSize);
        this.drawRight(context, cellSize);
        break;

      case Shapes.horizontalTop:
        this.drawHorizontal(context, cellSize);
        this.drawTop(context, cellSize);
        break;

      case Shapes.horizontalBottom:
        this.drawHorizontal(context, cellSize);
        this.drawBottom(context, cellSize);
        break;
    }
  }
}

Road.remove = function (gridCell, road) {
  gridCell.road = null;

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

Road.add = function (cell) {
  if (!cell) return false;

  if (cell.city || cell.road) return false;

  if (cell.type === 'water') return false;

  const neighbours = gridService.findSelectedCellCrossNeighbours(cell);

  cell.road = new Road(cell, neighbours);
  return true;
}

export default Road;