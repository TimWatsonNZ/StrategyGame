import Resource from "./Resource";
import { ResourceTypes, ResourceNames } from "./ResourceType";

const Fibre = new Resource(ResourceNames.Fibre, [ResourceTypes.Ingredient], 0.1, 1, 0.1, 0.1);

export default Fibre;
