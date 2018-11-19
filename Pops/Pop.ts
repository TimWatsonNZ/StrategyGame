import Resource from "../Resources/Resource";
import Needs from "../Resources/Needs";
import Tile from "../Map/Tiles/Tile";
import IDrawable from "../interfaces/IDrawable";
import IPrintable from "../interfaces/IPrintable";

class Pop implements IDrawable, IPrintable{
  number: number;
  resources: any;
  needs: any;
  produces: any;
  tile: Tile;
  growRequirement: any;

  constructor(tile: Tile, number: number, resouces: Resource[], needs: Needs, produces: any) {
    this.tile = tile;
    this.number = number;
    this.resources = resouces;
    this.needs = needs;
    this.produces = produces;
  }

  update() {
    Object.keys(this.produces).forEach((key: string) => {
      const resource = this.resources[key];
      const needs = this.needs[key] || { amount: 0 };
      const produces = this.produces[key] || { amount: 0 };
      const carryingPop = this.number * this.number * 0.05 * this.tile.resources[key].amount;

      let gatheredAmount = (produces.gatherEfficiency * this.tile.resources[key].amount * this.number);
      gatheredAmount = gatheredAmount - carryingPop <= 0 ? 0 : gatheredAmount - carryingPop;

      resource.amount += gatheredAmount - needs.amount * this.number;
      resource.amount += resource.amount * (1 - resource.resource.decay);

      if (resource.amount >= (this.growRequirement[key] && this.growRequirement[key].amount)) {
        this.number++;
        resource.amount -= this.growRequirement[key].amount;
      }

      if (resource.amount <= 0 && this.growRequirement[key]) {
        this.number--;
      }

      console.log(`Number: ${this.number} Food: ${this.resources['food'].amount} Wood: ${this.resources['wood'].amount}`);
    });
  }

  draw(context: CanvasRenderingContext2D, tileSize: number){
    
  }
}

export default Pop;
