import Resource from "./Resource";
import ResourceTypes from "./ResourceType";

class Food extends Resource {
  constructor() {
    super('food', [ResourceTypes.Food], 0.1);
  }
}

export default Food;
