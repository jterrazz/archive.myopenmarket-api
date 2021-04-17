import { orderQueue } from '@services/queue';
import logger from '@services/logger';
import { OrderMessage } from '@entities/messages/order.message';
import { QueueDispatcher } from '~/worker/queue-dispatcher';
import { QueueMessageHandler } from '@entities/messages/queue-message';

class OrderMessageHandler extends OrderMessage implements QueueMessageHandler {
  async consumer() {
    logger.info('handling orders');
  }
}

export const listenForOrderQueue = () => {
  logger.info('listening for order queue');

  const dispatcher = new QueueDispatcher([OrderMessageHandler]);

  orderQueue.process(async (job) => {
    dispatcher.fromJobData(job.data);
  });
};
