class Resource {
  constructor(types, number, decay) {
    this.types = types;
    this.number = number;
    this.decay = decay;
  }

  update(produced, used) {
    this.number += (produced - used);
    this.number *= this.decay;
  }
}

export default Resource;