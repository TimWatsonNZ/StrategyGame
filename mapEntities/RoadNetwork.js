import generateGuid from '../generateGuid';

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
  incrementalBfs() {

  }

}

export default RoadNetwork;
