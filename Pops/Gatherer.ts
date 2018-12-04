import Pop from './Pop';
import * as Resources from '../Resources/Resources';
import Tile from '../Map/Tiles/Tile';
import { House } from '../Improvement/Improvements';
import Priorities from '../Resources/Priorities';
import { ProductionTypes, ResourceNames } from '../Resources/ResourceType';
import PopTypes from './PopTypes';

const resources: any = {};
resources[ResourceNames.Food] = { amount: 1, resource: Resources.Food };
resources[ResourceNames.Wood] = { amount: 0, resource: Resources.Wood };
resources[ResourceNames.BasicTools] = { amount: 1, resource: Resources.BasicTools };
resources[ResourceNames.Fibre] = { amount: 0, resource: Resources.Fibre };

const needs:  any = {};
needs[ResourceNames.Food] = { resource: Resources.Food, amount: 1, priority: Priorities.Critical };
needs[ResourceNames.Wood] = { resource: Resources.Wood, amount: 0, priority: Priorities.Want };
needs[ResourceNames.BasicTools] = { resource: Resources.BasicTools, amount: 0.1, priority: Priorities.Want };
needs[ResourceNames.Fibre] = { resource: Resources.Fibre, amount: 0, priority: Priorities.None };

const desires: any = {};
desires[ResourceNames.Food] = { resource: Resources.Food, amount: 1, };
desires[ResourceNames.Wood] = { resource: Resources.Wood, amount: 0 };
desires[ResourceNames.BasicTools] = { resource: Resources.BasicTools, amount: 1 };
desires[ResourceNames.Fibre] = { resource: Resources.Fibre, amount: 0 };

const produces: any = [];
produces[ResourceNames.Food] = {
  type: ProductionTypes.Gather,
  resource: Resources.Food,
  efficiency: 1,
  efficiencyModifiers: [{ resource: Resources.BasicTools, multiplier: 0.2 }]
};

produces[ResourceNames.Wood] = {
  type: ProductionTypes.Gather,
  resource: Resources.Wood,
  efficiency: 0.25,
  efficiencyModifiers: [{ resource: Resources.BasicTools, multiplier: 0.2 }]
};

produces[ResourceNames.Fibre] = {
  type: ProductionTypes.Gather,
  resource: Resources.Fibre,
  efficiency: 0.25,
  efficiencyModifiers: [{ resource: Resources.BasicTools, multiplier: 0.2 }]
};

const growRequirement: any = { };
growRequirement[ResourceNames.Food] = { resource: Resources.Food, amount: 3 };

const improvements = [
  { improvement: House, weight: 1 },
];

class Gatherer extends Pop {
  static add: (tile: Tile, entities: any) => boolean;
  constructor(tile: Tile, number: number) {
    super(PopTypes.Gatherer, tile, number, resources, needs, produces, improvements, desires);
    this.growRequirement = growRequirement;
  }

  draw(context: CanvasRenderingContext2D, tileSize: number) {
    context.strokeStyle = '#FFFFFF';
    context.strokeText('G', this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + tileSize, tileSize);
  }

  toString() {
    return `Gatherer: Food: ${this.resources['food'].amount }, Wood: ${this.resources['wood'].amount} Tools: ${this.resources['basicTools'].amount} Number: ${this.number}`;
  }
}

Gatherer.add = function(tile: Tile, entities: any): boolean {
  const pop = new Gatherer(tile, 1);

  return Pop.add(tile, entities, pop);
}


export default Gatherer;
