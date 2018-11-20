import Pop from './Pop';
import * as Resources from '../Resources/Resources';
import Tile from '../Map/Tiles/Tile';
import TileType from '../Map/Tiles/TileType';
import { House } from '../Improvement/Improvements';

const resources: any = {};
resources[Resources.Food.name] = { amount: 1, resource: Resources.Food };
resources[Resources.Wood.name] = { amount: 1, resource: Resources.Wood };

const needs:  any = {};
needs[Resources.Food.name] = { resource: Resources.Food, amount: 1 };

const wants: any = {};
wants[Resources.Wood.name] = { resource: Resources.Wood, amount: 0.1 };

const produces: any = [];
produces[Resources.Food.name] = {
  type: 'gather',
  resource: Resources.Food,
  gatherEfficiency: 1
};
produces[Resources.Wood.name] = {
  type: 'gather',
  resource: Resources.Wood,
  gatherEfficiency: 0.25
};

produces[Resources.Wood.name] = {
  type: 'gather',
  resource: Resources.Fibre,
  gatherEfficiency: 0.25
};

const growRequirement: any = { };
growRequirement[Resources.Food.name] = { resource: Resources.Food, amount: 5 };

const improvements = [
  { improvement: House, weight: 1 },
];

class Gatherer extends Pop {
  static add: (tile: Tile, entities: any) => boolean;
  constructor(tile: Tile, number: number) {
    super(tile, number, resources, needs, produces, improvements);
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
  if (!tile) return false;

  if (tile.city || tile.road) return false;

  if (tile.type === TileType.Ocean) return false;

  const pop = new Gatherer(tile, 1);
  tile.pop = pop;
  entities.pops.push(pop);
  return true;
}


export default Gatherer;
