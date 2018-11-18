import Resource from "./Resource";
import ResourceTypes from "./ResourceType";

class Food extends Resource {
  constructor(number: number) {
    super('food', [ResourceTypes.Food], number, 0.1);
  }
}

export default Food;
