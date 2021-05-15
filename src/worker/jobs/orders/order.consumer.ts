import { OrderMessage } from '@entities/messages/orders/order.message';
import logger from '@services/logger';

export const orderMessageConsumer = async (message: OrderMessage) => {
  logger.info(JSON.stringify(message));
};
