class Resource {
  types: any;
  decay: number;
  name: string;
  maxValue: number;
  minValue: number;
  baseValue: number;
  constructor(name: string, types: any, decay: number, maxValue: number, minValue: number, baseValue: number) {
    this.name = name;
    this.types = types;
    this.decay = decay;
    this.maxValue = maxValue;
    this.minValue = minValue;
    this.baseValue = baseValue;
  }

  update(produced: number, used: number) {
    const number = (produced - used);
    return number;
  }
}

export default Resource;