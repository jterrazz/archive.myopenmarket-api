import { orderQueue } from '@services/queue';
import logger from '@services/logger';
import { OrderMessage } from '@entities/messages/order.message';
import { MessageDispatcher } from '~/worker/message-dispatcher';

const orderMessageConsumer = async (message: OrderMessage) => {
  logger.info(JSON.stringify(message));
};

export const listenForOrderQueue = () => {
  logger.info('listening for order queue');

  const messageDispatcher = new MessageDispatcher([[OrderMessage, orderMessageConsumer]]);

  orderQueue.process(async (job) => {
    await messageDispatcher.fromJobData(job.data);
  });
};
