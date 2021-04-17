import { QueueMessage } from './queue-message';

export class ProductOrderMessage extends QueueMessage {
  constructor() {
    super(1, {
      productId: 12,
      quantity: 12,
    });
  }
}
