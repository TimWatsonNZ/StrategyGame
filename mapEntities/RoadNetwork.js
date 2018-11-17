import generateGuid from '../generateGuid';
import { gridService } from '../Grid/GridService';

class RoadNetwork {
  constructor(road = null, city = null) {
    this.id = generateGuid();
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
    let neighbours = gridService.findCrossNeighbours(city.tile).map(node => ({node, distance: 0 }));
    const visited = {};
    visited[city.id] = true;

    while(neighbours.length !== 0) {
      //  visit each neighbour
      const neighbour = neighbours.pop();
      if (neighbour.node.type === 'city') {
        distances.push({city, distance: neighbour.distance });
      } else {
        visited[neighbour.node.id] = true;
        const neighboursNeighbours = gridService.findCrossNeighbours(neighbour.node)
            .filter(x => !visited[x.id])
          .map(x => ({ node: x, distance: neighbour.distance + 1 }));
        neighbours = neighbours.concat(neighboursNeighbours);
      }
    }
    city.distances = distances;
  }
}

export default RoadNetwork;
