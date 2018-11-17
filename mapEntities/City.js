
import generateGuid from '../generateGuid';
import { gridService } from '../Grid/GridService';

class City {
  constructor(tile, name, population) {
    this.type = 'city';
    this.id = generateGuid();
    this.tile = tile;
    this.name = name;
    this.population = population;

    this.distances = [];

    let neighbours = gridService.findCrossNeighbours(tile)
      .filter(neighbour => neighbour.city || neighbour.road)
      .map(x => x.road || x.city);

    this.roadNetworks = [];
    
    neighbours.forEach(neighbour => {
      if (neighbour.type === 'road') {
        this.addNetwork(neighbour.roadNetwork);
      }
    });

    neighbours.filter(x => x && x.road).forEach(neighbour => {
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
    context.fillRect(baseX,  baseY + tileSize/2, tileSize/4, tileSize/2);
    context.fillRect(baseX + tileSize/4,  baseY + tileSize/4, tileSize/2, 3*tileSize/4);
    context.fillRect(baseX + 3*tileSize/4,  baseY + tileSize/2, tileSize/4, tileSize/2);
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

City.remove = function(gridTile) {
  
  gridTile.city = null;
  //  Remove from neighbouring roadnetworks and recalculate networks
}

City.add = function(selectedTile) {
  if (!selectedTile) return false;

  if (selectedTile.city || selectedTile.road) return false;

  if (selectedTile.type === 'water') return false;
  selectedTile.city = new City(selectedTile, 'New City', 1);

  return true;
}

export default City