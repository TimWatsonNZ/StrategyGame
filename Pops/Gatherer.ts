import Pop from './Pop';
import * as Resources from '../Resources/Resources';

class Gatherer extends Pop {
  constructor(number: number, group: any) {
    super(number, group, [], null, null, null, null);
  }
}

// const needs = {};
// needs[`${Resources.Food}`] = { consumes: 1 };

const produces = {};
// produces[`${Resources.Food}`] = 

export default Gatherer;
