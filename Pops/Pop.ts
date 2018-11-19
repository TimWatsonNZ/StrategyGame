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
      const needs = this.needs[key];
      const produces = this.produces[key];

      resource.amount += produces.amount - needs.amount;
    });
  }

  draw(context: CanvasRenderingContext2D, tileSize: number){
    
  }
}

export default Pop;
