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
  needs: any;
  produces: any;
  tile: Tile;
  growRequirement: any;
  fertility: number;
  improvements: any;
  type: string;
  
  static add: (tile: Tile, entities: any, pop: Pop) => boolean;

  constructor(type: string, tile: Tile, number: number, resouces: Resource[], needs: Needs, produces: any, improvements: any) {
    this.type = type;
    this.tile = tile;
    this.number = number;
    this.resources = resouces;
    this.needs = needs;
    this.produces = produces;
    this.fertility = 1;
    this.improvements = improvements;
  }

  update() {
    
    const maintainence = this.tile.improvements.reduce((current: any, i: any) => current.concat(i.maintainence), [])
      .reduce((collection: any, current: any) => {
        if (collection[current.resource.name]) {
          collection[current.resource.name].amount += current.amount;
        } else {
          collection[current.resource.name] = { amount: current.amount };
        }
        return collection;
      }, {});

    Object.keys(this.produces).forEach((key: string) => {
      const resource = this.resources[key];
      const produces = this.produces[key] || { amount: 0 };
      const carryingPop = 1 + this.number/25

      let gatheredAmount = (produces.gatherEfficiency * this.tile.resources[key].amount * this.number);
      gatheredAmount = gatheredAmount/carryingPop;

      resource.amount += gatheredAmount;

      if (resource.amount >= (this.growRequirement[key] && this.growRequirement[key].amount)) {
        this.number += Math.round(this.fertility * resource.amount/this.growRequirement[key].amount);
        resource.amount -= this.growRequirement[key].amount;
      }

      if (resource.amount <= 0 && this.growRequirement[key]) {
        this.number--;
      }

      this.improveTile();
      console.log(`Number: ${this.number} Food: ${this.resources['food'].amount} Wood: ${this.resources['wood'].amount}`);
    });

    Object.keys(this.needs).forEach((key: string) => {
      const resource = this.resources[key];
      const needs = this.needs[key];

      resource.amount -= needs.amount * this.number;
      resource.amount += resource.amount * (1 - resource.resource.decay);
      resource.amount -= maintainence[key] ? maintainence[key].amount : 0;
    });
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

  if (neighbours.length === 0) return false;

  neighbours[0].pops.push(pop);
  tile.pop = pop;
  entities.pops.push(pop);
  return true;
}

export default Pop;
