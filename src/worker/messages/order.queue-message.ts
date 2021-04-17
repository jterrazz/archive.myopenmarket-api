import { QueueMessage } from '~/worker/messages/queue-message';
import { ProductOrderQueueMessage } from '~/worker/messages/order-product.queue-message';

export class OrderQueueMessage extends QueueMessage {
  constructor(productOrders: ProductOrderQueueMessage[]) {
    super(1, {
      productOrders,
      delivery: {
        address: {},
        mode: '',
        payment: 1200,
      },
    });
  }
}
