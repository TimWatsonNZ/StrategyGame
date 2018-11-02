import Tile from '../map/Tiles/Tile';
import generateGuid from '../generateGuid';
import { gridService } from '../Grid/GridService';

class City {
  constructor(tile, name, population, neighbours) {
    this.type = 'city';
    this.id = generateGuid();
    this.tile = tile;
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
  const neighbours = gridService.findSelectedTileCrossNeighbours(selectedTile);
  selectedTile.city = new City(selectedTile, 'New City', 1, neighbours);

  //   TODO - move this into road.
  neighbours.filter(x => x && x.road).forEach(neighbour => {
    const n = gridService.findCrossNeighbours(gridService.tileToIndex(neighbour));
    neighbour.road.shape = Road.findShape(n);
  });

  return true;
}

export default City