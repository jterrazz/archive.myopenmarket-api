export default class Queue {
  name: string;
  processFn: any;
  constructor(name) {
    this.name = name;
    this.processFn = {};
  }

  process = (identifier, fn) => {
    console.log(`Registered function ${this.name}`);
    this.processFn[identifier] = fn;
  };

  add = (identifier, data) => {
    console.log(`Running ${this.name}`);
    return this.processFn[identifier]({ data });
  };
}

export const orderQueue = new Queue('order');
export const emailQueue = new Queue('email');
