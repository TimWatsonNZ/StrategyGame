import generateGuid from './generateGuid';

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

  merge(network, entity) {
    network.cities.forEach(x => {
      if (!this.cities.find(city => city.equals(x))) {
        this.cities.push(x);
        x.roadNetwork = this;
      }
    });

    network.roads.forEach(x => {
      if (!this.roads.find(road => road.equals(x))) {
        this.roads.push(x);
        x.roadNetwork = this;
      }
    });

    entity.roadNetwork = this;

    //  For each city to a bfs and find neighbours.
    this.cities.forEach(city => {
      this.findDistances(city);
    });
    console.log();
  }

  findDistances(city) {
    const distances = [];
    let neighbours = city.neighbours.map(node => ({node, distance: 0 }));
    const visited = {};
    visited[city.id] = true;

    while(neighbours.length !== 0) {
      //  visit each neighbour
      const neighbour = neighbours.pop();
      if (neighbour.node.type === 'city') {
        distances.push({city, distance: neighbour.distance });
      } else {
        visited[neighbour.node.id] = true;
        const neighboursNeighbours = neighbour.node.neighbours
          .filter(x => !visited[x.id])
          .map(x => ({ node: x, distance: neighbour.distance + 1 }));
        neighbours = neighbours.concat(neighboursNeighbours);
      }
    }
    city.distances = distances;
  }

  findConnectivity(roads) {
    // Idea is to perform a seperate bfs in step on each peace of road and check connectivity at each step
    // If two networks contain the same node then they are connected.
  }


}

export default RoadNetwork;
