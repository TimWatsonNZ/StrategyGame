import './Pop';
import Resources from '../Resources/Resources';

class Gatherer extends Pop {
  constructor(number, group) {
    this.number = number;
    this.group = group;
  }
}

const needs = {};
needs[`${Resources.Food}`] = { consumes: 1 };

const produces = {};
// produces[`${Resources.Food}`] = 

export default Gatherer;
