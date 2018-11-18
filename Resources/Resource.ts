class Resource {
  types: any;
  number: number;
  decay: number;
  constructor(types: any, number: number, decay: number) {
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