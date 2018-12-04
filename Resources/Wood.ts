import Resource from "./Resource";
import { ResourceTypes, ResourceNames } from "./ResourceType";

const Wood = new Resource(ResourceNames.Wood, [ResourceTypes.BuildingMaterial, ResourceTypes.Fuel, ResourceTypes.Ingredient], 1.01, 5, 0.1, 0.1);

export default Wood;
