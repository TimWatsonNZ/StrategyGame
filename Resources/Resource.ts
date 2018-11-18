class Resource {
  types: any;
  number: number;
  decay: number;
  name: string;
  constructor(name: string, types: any, number: number, decay: number) {
    this.name = name;
    this.types = types;
    this.number = number;
    this.decay = decay;
  }

  update(produced: number, used: number) {
    this.number += (produced - used);
    this.number *= this.decay;
  }
}

export default Resource;