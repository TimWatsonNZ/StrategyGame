import generateGuid from '../generateGuid';
import { gridService } from '../Grid/GridService';
import Road from './Road';
import City from './City';
import EntityTypes from './EntityTypes';

class RoadNetwork {
  id: string;
  cities: any[];
  roads: any[];
  constructor() {
    this.id = generateGuid();
    this.cities = [];
    this.roads = [];
  }

  addRoad(road: Road) {
    this.roads.push(road);
    road.roadNetwork = this;
  }

  toString() {
    return `Id: ${this.id}, Cities: ${this.cities.length}, Roads: ${this.roads.length}`;
  }

  addCity(city: City) {
    this.cities.push(city);
    city.roadNetworks = this;
  }

  merge(networks: RoadNetwork[]) {
    networks.forEach(network => {
      network.cities.forEach(x => {
        if (!this.cities.find((city: City) => city.equals(x))) {
          this.cities.push(x);
          x.roadNetwork = this;
        }
      });
  
      //  Should optimise - store roads as dictionary
      network.roads.forEach(x => {
        if (!this.roads.find((road: Road) => road.equals(x))) {
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


  findDistances(city: City) {
    const distances = [];
    let neighbours = gridService.findCrossNeighbours(city.tile).map(node => ({node, distance: 0 }));
    const visited: any = {};
    visited[city.id] = true;

    while(neighbours.length !== 0) {
      //  visit each neighbour
      const neighbour = neighbours.pop();
      if (neighbour.node.type === EntityTypes.City) {
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
