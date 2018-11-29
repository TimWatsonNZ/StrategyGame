import Pop from './Pop';
import * as Resources from '../Resources/Resources';
import Tile from '../Map/Tiles/Tile';
import TileType from '../Map/Tiles/TileType';
import { House } from '../Improvement/Improvements';

const resources: any = {};
resources[Resources.Food.name] = { amount: 1, resource: Resources.Food };
resources[Resources.Wood.name] = { amount: 0, resource: Resources.Wood };
resources[Resources.BasicTools.name] = { amount: 0, resource: Resources.BasicTools };
resources[Resources.Fibre.name] = { amount: 0, resource: Resources.Fibre };

const needs:  any = {};
needs[Resources.Food.name] = { resource: Resources.Food, amount: 1, type: 'critical' };
needs[Resources.Wood.name] = { resource: Resources.Wood, amount: 0, type: 'want' };
needs[Resources.BasicTools.name] = { resource: Resources.BasicTools, amount: 0.1, type: 'want' };
needs[Resources.Fibre.name] = { resource: Resources.Fibre, amount: 0, type: 'none' };

const desires: any = {};
desires[Resources.Food.name] = { resource: Resources.Food, amount: 1, };
desires[Resources.Wood.name] = { resource: Resources.Wood, amount: 0 };
desires[Resources.BasicTools.name] = { resource: Resources.BasicTools, amount: 1 };
desires[Resources.Fibre.name] = { resource: Resources.Fibre, amount: 0 };

const produces: any = [];
produces[Resources.Food.name] = {
  type: 'gather',
  resource: Resources.Food,
  efficiency: 1
};
produces[Resources.Wood.name] = {
  type: 'gather',
  resource: Resources.Wood,
  efficiency: 0.25
};

produces[Resources.Fibre.name] = {
  type: 'gather',
  resource: Resources.Fibre,
  efficiency: 0.25
};

const growRequirement: any = { };
growRequirement[Resources.Food.name] = { resource: Resources.Food, amount: 3 };

const improvements = [
  { improvement: House, weight: 1 },
];

class Gatherer extends Pop {
  static add: (tile: Tile, entities: any) => boolean;
  constructor(tile: Tile, number: number) {
    super('Gatherer', tile, number, resources, needs, produces, improvements, desires);
    this.growRequirement = growRequirement;
  }

  draw(context: CanvasRenderingContext2D, tileSize: number) {
    context.strokeStyle = '#FFFFFF';
    context.strokeText('G', this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + tileSize, tileSize);
  }

  toString() {
    return `Gatherer: Food: ${this.resources['food'].amount }, Wood: ${this.resources['wood'].amount} Number: ${this.number}`;
  }
}

Gatherer.add = function(tile: Tile, entities: any): boolean {
  const pop = new Gatherer(tile, 1);

  return Pop.add(tile, entities, pop);
}


export default Gatherer;
