import Resource from "./Resource";
import { ResourceTypes, ResourceNames } from "./ResourceType";

const BasicTools = new Resource(ResourceNames.BasicTools, [ResourceTypes.Tool], 0.1, 10, 1, 1);
export default BasicTools;
