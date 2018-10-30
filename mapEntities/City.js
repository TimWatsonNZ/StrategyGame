import Cell from './Cell';
import generateGuid from '../generateGuid';

class City {
  constructor(cell, name, population, neighbours) {
    this.type = 'city';
    this.id = generateGuid();
    this.cell = cell;
    this.name = name;
    this.population = population;

    this.distances = [];

    this.neighbours = neighbours.filter(neighbour => neighbour.city || neighbour.road)
      .map(x => x.road || x.city);

    
    this.neighbours.forEach(n => {
      n.neighbours.push(this);
    });
  

    this.roadNetworks = [];
    
    this.neighbours.forEach(neighbour => {
      if (neighbour.type === 'road') {
        this.addNetwork(neighbour.roadNetwork);
      }
    });
  }

  equals(otherCity) {
    return otherCity.id === this.id;
  }

  draw(context, cellSize) {
    context.fillStyle = '#000000';
    const baseX = this.cell.drawingPoint.x * cellSize;
    const baseY = this.cell.drawingPoint.y * cellSize;
    context.fillRect(baseX,  baseY + cellSize/2, cellSize/4, cellSize/2);
    context.fillRect(baseX + cellSize/4,  baseY + cellSize/4, cellSize/2, 3*cellSize/4);
    context.fillRect(baseX + 3*cellSize/4,  baseY + cellSize/2, cellSize/4, cellSize/2);
  }

  toString() {
    const distances = this.distances.map(x => `Id: ${x.city.id} distance: ${x.distance}\n`);
    return `${this.id}: ${this.population}\n ${distances}`;
  }

  addNetwork(network) {
    if (!this.roadNetworks.some(x => x.id === network.id)) {
      this.roadNetworks.push(network);
      network.cities.push(this);
      network.findDistancesForCities();
    }
  }
}

export default City