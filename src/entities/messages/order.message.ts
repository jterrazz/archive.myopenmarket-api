import { QueueMessage } from './queue-message';
import { ProductOrderMessage } from './order-product.message';

export class OrderMessage extends QueueMessage {
  static identifier = 'order:1';

  constructor(productOrders: ProductOrderMessage[]) {
    super({
      productOrders,
      delivery: {
        address: {},
        mode: '',
        payment: 1200,
      },
    });
  }
}
