import { orderQueue } from '@services/queue';
import logger from '@services/logger';
import { OrderMessage } from '@entities/messages/order.message';
import { dispatchJobsToQueue } from '~/worker/dispatcher';

const orderMessageConsumer = async (message: OrderMessage) => {
  logger.info(JSON.stringify(message));
};

export const listenForOrderJobs = async (): Promise<void> => {
  logger.info('listening for order queue');

  await dispatchJobsToQueue(orderQueue, [[OrderMessage, orderMessageConsumer]]);
};
