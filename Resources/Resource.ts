class Resource {
  types: any;
  decay: number;
  name: string;
  constructor(name: string, types: any, decay: number) {
    this.name = name;
    this.types = types;
    this.decay = decay;
  }

  update(produced: number, used: number) {
    const number = (produced - used);
    return number;
  }
}

export default Resource;