import Resource from "../Resources/Resource";
import Needs from "../Resources/Needs";
import Tile from "../Map/Tiles/Tile";
import IDrawable from "../interfaces/IDrawable";
import IPrintable from "../interfaces/IPrintable";
import TileType from "../Map/Tiles/TileType";
import { gridService } from "../Grid/GridService";

class Pop implements IDrawable, IPrintable{
  number: number;
  resources: any;
  previousResources: any;
  needs: any;
  produces: any;
  tile: Tile;
  growRequirement: any;
  fertility: number;
  improvements: any;
  type: string;
  maintainence: any;
  production: any;
  popNeeds: any;
  desires: any;
  health: number;

  static add: (tile: Tile, entities: any, pop: Pop) => boolean;

  constructor(type: string, tile: Tile, number: number, resouces: Resource[], needs: Needs, produces: any, improvements: any, desires: any) {
    this.type = type;
    this.tile = tile;
    this.number = number;
    this.resources = resouces;
    this.needs = needs;
    this.produces = produces;
    this.fertility = 0.2;
    this.health = 0.05;
    this.improvements = improvements;

    this.production = {};
    this.popNeeds = {};
    this.desires = desires;
  }

  //  Work out how much each pop produces
  //  Work out how much they are willing to give up.
  //  Pool this amount.
  //  Redistribute among types.
  grow() {
    
    if ( this.resources['food'].amount > this.previousResources['food'].amount && this.resources['food'].amount >= (this.growRequirement['food'] && this.growRequirement['food'].amount)) {
      const increase = this.resources['food'].amount/this.previousResources['food'].amount * this.fertility * this.resources['food'].amount/this.growRequirement['food'].amount;
      this.number += increase;
    }
    
    if (this.resources['food'].amount <= 0 && this.needs['food'].amount) {
      this.number -= (1 - this.health) * this.number;
    }

    this.number *= (1 - this.health);
  }

  update(resources: any) {
    this.previousResources = JSON.parse(JSON.stringify(this.resources));
    Object.keys(this.resources).forEach((key: string) => {
      const resource = this.resources[key];
      const produces = this.produces[key] || { amount: 0 };
      const carryingPop = 1 + this.number/25

      let gatheredAmount = 0;
      if (produces.type === 'gather') {
        gatheredAmount = produces.efficiency * this.number * this.tile.resources[key].amount;
      }

      if (produces.type === 'craft') {
        const maxProduced = Object.keys(this.produces[key].requires)
          .map((k: string) => {
            return this.number > 0 ? Math.floor(this.resources[k].amount / (this.produces[key].requires[k] * this.number)) : 0;
          });
          
        gatheredAmount = maxProduced.reduce((min: number, current: any) => {
          return current < min ? current : min;
        }, Number.MAX_SAFE_INTEGER)

        gatheredAmount = gatheredAmount > 0 ? gatheredAmount : 0;
      }

      const produced = gatheredAmount ? gatheredAmount/carryingPop : 0;

      const needs = this.needs[key] ? this.needs[key].amount * this.number : 0;

      resource.amount += produced - needs;
      resource.amount = resource.amount > 0 ? resource.amount : 0;
      
      if (!resources[key]) {
        resources[key] = {
          amount: 0,
          desire: 0,
          value: this.resources[key].resource.baseValue,
          type: key,
          maxValue: this.resources[key].resource.maxValue,
          needType: this.needs[key].type }; 
      }
      const diff = Math.floor(resource.amount - this.desires[key].amount * this.number);
      resources[key].amount += diff;
    });

    this.grow();
  }

  updateDesires() {
    Object.keys(this.desires).forEach((key: string) => {
      //  if resource they have minus what they need 
    });
  }

  produce() {
    
  }

  improveTile() {
    this.improvements.forEach((i: any) => {
      const costs = i.improvement.costs;
      
      let afforable = costs.reduce((isAffordable: boolean, current: any) => {
        const key = current.resource.name;
        if (this.resources[key].amount >= current.amount * 1.5) {
          return true;
        }
        return false;
      }, true);

      if (afforable) {
        if (!this.tile.improvements.find((x: any) => x.name === i.improvement.name)) {
          this.tile.improvements.push(i.improvement);
          this.fertility *= i.improvement.effects.fertility;

          i.maintainence.forEach((maintain: any) => {
            if (this.maintainence[maintain.resource.name]) {
              this.maintainence[maintain.resource.name] += maintain.amount;
            } else {
              this.maintainence[maintain.resource.name] = maintain.amount;
            }
          });
        }
      }
    });
  }

  draw(context: CanvasRenderingContext2D, tileSize: number){
    
  }
}
Pop.add = function(tile: Tile, entities: any, pop: Pop): boolean {
  if (!tile) return false;

  if (tile.city || tile.road) return false;

  if (tile.type === TileType.Ocean) return false;

  const neighbours = gridService.getNeighbours(tile, false, false)
    .filter(x => x.city).map(x => x.city);

  Object.keys(pop.resources).forEach((key: string) => {
    pop.resources[key].amount = pop.resources[key].amount * pop.number;
  });

  if (neighbours.length === 0) return false;
  const city = neighbours[0];
  city.pops.push(pop);
  tile.pop = pop;
  entities.pops.push(pop);

  if (!city.resources[pop.type]) {
    city.resources[pop.type] = {};
  }

  return true;
}

export default Pop;
