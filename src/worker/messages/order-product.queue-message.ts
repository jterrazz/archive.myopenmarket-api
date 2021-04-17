import { QueueMessage } from '~/worker/messages/queue-message';

export class ProductOrderQueueMessage extends QueueMessage {
  constructor() {
    super(1, {
      productId: 12,
      quantity: 12,
    });
  }
}
