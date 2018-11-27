
import generateGuid from '../generateGuid';
import { gridService } from '../Grid/GridService';
import Tile from '../Map/Tiles/Tile';
import TileType from '../Map/Tiles/TileType';
import Pop from '../Pops/Pop';
import * as Resources from '../Resources/Resources';

class City {
  type: string;
  id: string;
  tile: Tile;
  name: string;
  population: number;
  distances: any[];
  static add: (tile: Tile, entities: any) => boolean;
  roadNetworks: any;
  pops: Pop[];
  resources: any;
  
  supplyAndDemand: any = {};
  static remove: (gridTile: Tile) => void;

  constructor(tile: Tile, name: string, population: number) {
    this.type = 'city';
    this.id = generateGuid();
    this.tile = tile;
    this.name = name;
    this.population = population;
    this.pops = [];
    this.distances = [];

    this.resources = {};

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
 
    context.strokeStyle = '#000000';
    context.strokeRect((this.tile.drawingPoint.x - 1) * tileSize, (this.tile.drawingPoint.y - 1) * tileSize, tileSize*3, tileSize*3);
    context.strokeStyle = '#FFFFFF';
  }

  toString() {
    const distances = this.distances.map(x => `Id: ${x.city.id} distance: ${x.distance}\n`);
    const pops = this.pops.map(x => `${x.type}, ${x.number}`).join(', ');
    const resources = JSON.stringify(this.resources);
    return `${this.id}: ${this.population}\n ${distances} ${pops} ${resources}`;
  }

  addNetwork(network: any) {
    if (!this.roadNetworks.some((x: any) => x.id === network.id)) {
      this.roadNetworks.push(network);
      network.cities.push(this);
      network.findDistancesForCities();
    }
  }

  update() {
    Object.keys(this.resources).forEach((key:any) => {
      Object.keys(this.resources[key]).forEach((k2: any) => {
        this.resources[key][k2].desire = 0;
        this.resources[key][k2].amount = 0;
      })
    });

    this.pops.forEach(pop => {
      const type = pop.type;
      //  gather resources
      pop.update(this.resources[type]);
    });

    Object.keys(this.supplyAndDemand).forEach((x: any) => {
      this.supplyAndDemand[x].supply = 0;
      this.supplyAndDemand[x].demand = 0;
    });

    //  work out supply and demand
    Object.keys(this.resources).forEach((popKey: string) => {
      Object.keys(this.resources[popKey]).forEach((resourceKey: string) => {
        const resource = this.resources[popKey][resourceKey]
        if (!this.supplyAndDemand[resourceKey]) {
          this.supplyAndDemand[resourceKey] = { supply: 0, demand: 0, value: resource.value, maxValue: this.resources[popKey][resourceKey].maxValue };
        }
        this.supplyAndDemand[resourceKey].demand += resource.amount < 0 ? Math.abs(resource.amount) : 0;
        this.supplyAndDemand[resourceKey].supply += resource.amount > 0 ? Math.abs(resource.amount) : 0
      });
    });

    Object.keys(this.supplyAndDemand).forEach((x: any) => {
      if (this.supplyAndDemand[x].supply > this.supplyAndDemand[x].demand) {
        this.supplyAndDemand[x].value *= 0.9;
      } else if (this.supplyAndDemand[x].supply < this.supplyAndDemand[x].demand){
        this.supplyAndDemand[x].value *= 1.1;
        this.supplyAndDemand[x].value = this.supplyAndDemand[x].value > this.supplyAndDemand[x].maxValue ? 
        this.supplyAndDemand[x].maxValue : this.supplyAndDemand[x].value;
      }
    });
    console.log(JSON.stringify(this.supplyAndDemand));

    const buying: any = {}; //  keys of resource types;
    const selling: any = {};
    Object.keys(this.resources).forEach((popKey: string) => {
      const pop = this.resources[popKey];

      Object.keys(pop)
        .filter((resourceKey: string) => pop[resourceKey].amount > 0)
        .forEach((resourceKey: string) => {
          if (!buying[resourceKey]) {
            buying[resourceKey] = [];
          }
          buying[resourceKey].push({ popKey, amount: Math.abs(pop[resourceKey].amount ) });
          
        });

      Object.keys(pop)
        .filter((resourceKey: string) => pop[resourceKey].amount < 0)
        .forEach((resourceKey: any) => {
          if (!selling[resourceKey]) {
            selling[resourceKey] = [];
          }
          selling[resourceKey].push({ popKey, amount: Math.abs(pop[resourceKey].amount) });
        });
        
    });

    // Object.keys(transactions).forEach((resourceKey: any) => {
    //   //  match with 
    // });
    console.log(JSON.stringify(buying));
    console.log();
    console.log(JSON.stringify(selling));
    //  each popgroup work out how much value they can sell
    

    //  adjust values
    //  do trades

    //  work out desires
    //  work out trades
    //  redistribute resources

    //   Object.keys(pop.resources).forEach((resourceKey: string) => {
    //     if (this.resources[resourceKey]) {
    //       this.resources[resourceKey].amount += pop.resources[resourceKey].amount;
    //       pop.resources[resourceKey].amount = 0;
    //     } else {
    //       this.resources[resourceKey] = { amount: pop.resources[resourceKey].amount };
    //       pop.resources[resourceKey].amount = 0;
    //     }
    //   });
  }
}

City.remove = function(gridTile: Tile) {
  
  gridTile.city = null;
  //  Remove from neighbouring roadnetworks and recalculate networks
}

City.add = function(tile: Tile, entities: any) {
  if (!tile) return false;

  if (tile.city || tile.road) return false;

  if (tile.type === TileType.Ocean) return false;

  const neighbours = gridService.getRegion(tile.point, 2);

  if (neighbours.filter((x: any) => x.city).length > 0) return false;
  const city = new City(tile, 'New City', 1);
  tile.city = city;
  entities.cities.push(city);
  return true;
}

export default City