import Pop from './Pop';
import * as Resources from '../Resources/Resources';
import Tile from '../Map/Tiles/Tile';
import { House } from '../Improvement/Improvements';
import Priorities from '../Resources/Priorities';
import { ResourceNames } from '../Resources/ResourceType';
import PopTypes from './PopTypes';

const resources: any = {};
resources[ResourceNames.Food] = { amount: 1, resource: Resources.Food };
resources[ResourceNames.Wood] = { amount: 1, resource: Resources.Wood, };
resources[ResourceNames.Fibre] = { amount: 1, resource: Resources.Fibre };
resources[ResourceNames.BasicTools] = { amount: 2, resource: Resources.BasicTools };

const needs:  any = {};
needs[ResourceNames.Food] = { resource: Resources.Food, amount: 1, priority: Priorities.Critical };
needs[ResourceNames.Wood] = { resource: Resources.Wood, amount: 0.1, priority: Priorities.Working };
needs[ResourceNames.Fibre] = { resource: Resources.Fibre, amount: 0.1, priority: Priorities.Working };
needs[ResourceNames.BasicTools] = { resource: Resources.BasicTools, amount: 0.1, priority: Priorities.Want };

const desires: any = {};
desires[ResourceNames.Food] = { resource: Resources.Food, amount: 5 };
desires[ResourceNames.Wood] = { resource: Resources.Wood, amount: 1.5 };
desires[ResourceNames.BasicTools] = { resource: Resources.BasicTools, amount: 1.5 };
desires[ResourceNames.Fibre] = { resource: Resources.Fibre, amount: 1.5 };

//  multiply

const produces: any = {};

produces[ResourceNames.BasicTools] = { 
  type: 'craft',
  resource: Resources.BasicTools,
  efficiency: 1,
  requires:
    {
      [ResourceNames.Wood]: 1,
      [ResourceNames.Fibre]: 1,
    },
  efficiencyModifiers: [{ resource: Resources.BasicTools, multiplier: 0.2 }],
  output: 1,
};

const growRequirement: any = { };
growRequirement[ResourceNames.Food] = { resource: Resources.Food, amount: 5 };

const improvements = [
  { improvement: House, weight: 1 },
];

class Craftsperson extends Pop {
  static add: (tile: Tile, entities: any) => boolean;
  constructor(tile: Tile, number: number) {
    super(PopTypes.Crafter, tile, number, resources, needs, produces, improvements, desires);
    this.growRequirement = growRequirement;
  }

  draw(context: CanvasRenderingContext2D, tileSize: number) {
    context.strokeStyle = '#FF0000';
    context.strokeText('C', this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + tileSize, tileSize);
  }

  toString() {
    return `Craftsperson: Food: ${this.resources['food'].amount }, Wood: ${this.resources['wood'].amount} Tools ${this.resources['basicTools'].amount } Number: ${this.number}`;
  }
}

Craftsperson.add = function(tile: Tile, entities: any): boolean {
  const pop = new Craftsperson(tile, 1);

  return Pop.add(tile, entities, pop);
}


export default Craftsperson;
