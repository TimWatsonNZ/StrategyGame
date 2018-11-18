import Resource from "../Resources/Resource";
import Needs from "../Resources/Needs";

class Pop {
  number: number;
  group: any;
  resources: Resource[];
  needs: Needs;
  produces: any;
  contentment: any;

  constructor(number: number, group: any, resouces: Resource[], needs: Needs, produces: any, contentment: any, strata: any) {
    this.number = number;
    this.group = group;
    this.resources = resouces;
    this.needs = needs;
    this.produces = produces;
    this.contentment = contentment;
  }

  update() {
    
  }
}

export default Pop;
