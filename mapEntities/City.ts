
import generateGuid from '../generateGuid';
import { gridService } from '../Grid/GridService';
import Tile from '../Map/Tiles/Tile';
import TileType from '../Map/Tiles/TileType';

class City {
  type: string;
  id: string;
  tile: Tile;
  name: string;
  population: number;
  distances: any[];
  static add: (tile: Tile) => boolean;
  roadNetworks: any;
  static remove: (gridTile: Tile) => void;
  constructor(tile: Tile, name: string, population: number) {
    this.type = 'city';
    this.id = generateGuid();
    this.tile = tile;
    this.name = name;
    this.population = population;

    this.distances = [];

    let neighbours = gridService.findCrossNeighbours(tile)
      .filter((neighbour: any) => neighbour.city || neighbour.road)
      .map(x => x.road || x.city);

    this.roadNetworks = [];
    
    neighbours.forEach((neighbour: any) => {
      if (neighbour.type === 'road') {
        this.addNetwork(neighbour.roadNetwork);
      }
    });

    neighbours.filter((x: any) => x && x.road).forEach((neighbour: any) => {
      neighbour.road.updateShape();
    });
  }

  equals(otherCity: any) {
    return otherCity.id === this.id;
  }

  draw(context: any, tileSize: number) {
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

  addNetwork(network: any) {
    if (!this.roadNetworks.some((x: any) => x.id === network.id)) {
      this.roadNetworks.push(network);
      network.cities.push(this);
      network.findDistancesForCities();
    }
  }
}

City.remove = function(gridTile: Tile) {
  
  gridTile.city = null;
  //  Remove from neighbouring roadnetworks and recalculate networks
}

City.add = function(tile: Tile) {
  if (!tile) return false;

  if (tile.city || tile.road) return false;

  if (tile.type === TileType.Ocean) return false;

  const neighbours = gridService.getRegion(tile.point, 2);

  if (neighbours.filter((x: any) => x.city).length > 0) return false;
  tile.city = new City(tile, 'New City', 1);

  return true;
}

export default City