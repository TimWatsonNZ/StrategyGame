import * as Resources from "../Resources/Resources";

const House = {
  name: 'House',
  costs: [
    { resource: Resources.Wood, amount: 10 },
  ],
  maintainence: [
    { resource: Resources.Wood, amount: .25 },
  ],
  effects: {
    fertility: 1.1,
  }
}

export { House };
