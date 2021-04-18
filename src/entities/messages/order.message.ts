import { ProductOrderMessage } from './order-product.message';
import { QueueMessage } from './queue-message';

export class OrderMessage extends QueueMessage {
  static identifier = 'order:1';

  constructor(productOrders: ProductOrderMessage[]) {
    super({
      delivery: {
        address: {},
        mode: '',
        payment: 1200,
      },
      productOrders,
    });
  }
}
