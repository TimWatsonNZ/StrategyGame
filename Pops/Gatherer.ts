import Pop from './Pop';
import * as Resources from '../Resources/Resources';
import Resource from '../Resources/Resource';

class Gatherer extends Pop {
  constructor(number: number, group: any) {
    super(number, group, [], null, null, null, null);
  }
}

const resources: Resource[] = [];
resources[0] = new Resources.Food(1);

const needs: any = {};
needs['food'] = { consumes: 1 };

const produces: any = {};
produces['food'] = { produces: 1.1 };

export default Gatherer;
