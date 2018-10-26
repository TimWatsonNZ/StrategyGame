import Cell from './Cell';
import generateGuid from './generateGuid';
import RoadNetwork from './RoadNetwork';
class City {
  constructor(cell, name, population, neighbours) {
    this.id = generateGuid();
    this.cell = cell;
    this.name = name;
    this.population = population;

    this.neigbours = neighbours.filter(neighbour => neighbour.city || neighbour.road);

    this.roadNetwork = new RoadNetwork(this);
    this.roadNetwork.addCity(this);

    this.neigbours.forEach(neighbour => {
      if (neighbour.road) {
        this.mergeNetworks(neighbour.road);
      }
    });
  }

  mergeNetworks(otherRoad) {
    if (otherRoad.roadNetwork.id !== this.roadNetwork.id) {
      otherRoad.roadNetwork.merge(this.roadNetwork);
      this.roadNetwork = otherRoad.roadNetwork;
    }
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
    return `${this.name}: ${this.population}`;
  }
}

export default City