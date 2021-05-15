export default class Queue {
  name: string;
  processFn: any;

  constructor(name) {
    this.name = name;
    this.processFn = {};
  }

  process = (identifier, fn) => {
    console.log(`registered function ${this.name}`);
    this.processFn[identifier] = fn;
  };

  add = (identifier, data) => {
    if (!identifier || !data) {
      throw new Error('an identifier or data parameter is missing when creating the job');
    }
    return this.processFn[identifier]({ data });
  };
}

export const orderQueue = new Queue('order');
export const emailQueue = new Queue('email');
