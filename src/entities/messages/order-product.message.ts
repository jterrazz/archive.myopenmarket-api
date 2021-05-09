import { QueueMessage } from './queue-message';

export class ProductOrderMessage extends QueueMessage {
  data: unknown;

  constructor() {
    super({
      productId: 12,
      quantity: 12,
    });
  }
}
