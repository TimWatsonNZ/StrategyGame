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
    return `Cities: ${this.cities.length}, Roads: ${this.roads.length}`;
  }

  addCity(city) {
    this.cities.push(city);
    city.roadNetwork = this;
  }

  merge(network) {
    network.cities.forEach(x => {
      if (!this.cities.find(city => city.equals(x))) {
        this.cities.push(x);
      }
    });

    network.roads.forEach(x => {
      if (!this.roads.find(road => road.equals(x))) {
        this.roads.push(x);
      }
    });
  }
}

export default RoadNetwork;
