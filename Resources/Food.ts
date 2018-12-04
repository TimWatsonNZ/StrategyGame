import Resource from "./Resource";
import { ResourceTypes, ResourceNames } from "./ResourceType";

const Food = new Resource(ResourceNames.Food, [ResourceTypes.Food], 1.1, 5, 1, 1);

export default Food;
