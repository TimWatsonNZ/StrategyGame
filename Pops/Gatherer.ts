import Pop from './Pop';
import * as Resources from '../Resources/Resources';
import Tile from '../Map/Tiles/Tile';
import TileType from '../Map/Tiles/TileType';
import { gridService } from '../Grid/GridService';

const resources: any = {};
resources['food'] = { amount: 1, resource: Resources.Food };

const needs:  any = {};
needs['food'] = { resource: Resources.Food, amount: 1 };

const produces: any = [];
produces['food'] = { resource: Resources.Food, gatherEfficiency: 1 };

const growRequirement: any = { };
growRequirement['food'] = { resource: Resources.Food, amount: 5 };

class Gatherer extends Pop {
  static add: (tile: Tile, entities: any) => boolean;
  constructor(tile: Tile, number: number) {
    super(tile, number, resources, needs, produces);
    this.growRequirement = growRequirement;
  }

  draw(context: CanvasRenderingContext2D, tileSize: number) {
    context.strokeStyle = '#FFFFFF';
    context.strokeText('G', this.tile.drawingPoint.x * tileSize, this.tile.drawingPoint.y * tileSize + tileSize, tileSize);
  }

  toString() {
    return `Gatherer: Food: ${this.resources['food'].amount }, Number: ${this.number}`;
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
