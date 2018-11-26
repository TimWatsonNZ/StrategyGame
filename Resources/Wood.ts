import Resource from "./Resource";
import ResourceTypes from "./ResourceType";

const Wood = new Resource('wood', [ResourceTypes.BuildingMaterial, ResourceTypes.Fuel, ResourceTypes.Ingredient], 1.01, 5, 0.1, 0.1);

export default Wood;
