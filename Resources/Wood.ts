import Resource from "./Resource";
import ResourceTypes from "./ResourceType";

const Wood = new Resource('wood', [ResourceTypes.BuildingMaterial, ResourceTypes.Fuel, ResourceTypes.Ingredient], 1.01);

export default Wood;
