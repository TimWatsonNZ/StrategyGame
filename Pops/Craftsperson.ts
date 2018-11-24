import Pop from './Pop';
import * as Resources from '../Resources/Resources';
import Tile from '../Map/Tiles/Tile';
import TileType from '../Map/Tiles/TileType';
import { House } from '../Improvement/Improvements';

const resources: any = {};
resources[Resources.Food.name] = { amount: 1, resource: Resources.Food };
resources[Resources.Wood.name] = { amount: 1, resource: Resources.Wood };
resources[Resources.Fibre.name] = { amount: 1, resource: Resources.Fibre };
resources[Resources.BasicTools.name] = { amount: 1, resource: Resources.BasicTools };

const needs:  any = {};
needs[Resources.Food.name] = { resource: Resources.Food, amount: 1 };
needs[Resources.Wood.name] = { resource: Resources.Wood, amount: 0.1 };
needs[Resources.Fibre.name] = { resource: Resources.Fibre, amount: 0.1, };
needs[Resources.BasicTools.name] = { resource: Resources.BasicTools, amount: 0.1, };

const desires: any = {};
desires[Resources.Food.name] = { resource: Resources.Food, amount: 5 };
desires[Resources.Wood.name] = { resource: Resources.Wood, amount: 1.5 };
desires[Resources.BasicTools.name] = { resource: Resources.BasicTools, amount: 1.5 };
desires[Resources.Fibre.name] = { resource: Resources.Fibre, amount: 1.5 };

//  multiply

const produces: any = {};

produces[Resources.BasicTools.name] = { 
  type: 'craft',
  resource: Resources.BasicTools,
  efficiency: 1,
  requires:
    {
      [Resources.Wood.name]: 1,
      [Resources.Fibre.name]: 1,
    },
  output: 1,
};

const growRequirement: any = { };
growRequirement[Resources.Food.name] = { resource: Resources.Food, amount: 5 };

const improvements = [
  { improvement: House, weight: 1 },
];

class Craftsperson extends Pop {
  static add: (tile: Tile, entities: any) => boolean;
  constructor(tile: Tile, number: number) {
    super('Craftsperson', tile, number, resources, needs, produces, improvements, desires);
    this.growRequirement = growRequirement;
  }

  draw(context: CanvasRenderingContext2D, tileSize: number) {
    context.strokeStyle = '#FF0000';
    context.strokeText('C', this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + tileSize, tileSize);
  }

  toString() {
    return `Craftsperson: Food: ${this.resources['food'].amount }, Wood: ${this.resources['wood'].amount} Number: ${this.number}`;
  }
}

Craftsperson.add = function(tile: Tile, entities: any): boolean {
  const pop = new Craftsperson(tile, 1);

  return Pop.add(tile, entities, pop);
}


export default Craftsperson;
