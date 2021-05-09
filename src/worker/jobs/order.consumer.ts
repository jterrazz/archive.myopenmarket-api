import { OrderMessage } from '@entities/messages/order.message';
import { dispatchJobsToQueue } from '~/worker/job-dispatcher';
import { orderQueue } from '@services/queue';
import logger from '@services/logger';

const orderMessageConsumer = async (message: OrderMessage) => {
  logger.info(JSON.stringify(message));
};

export const consumeOrderJobs = async (): Promise<void> => {
  logger.info('listening for order queue');

  await dispatchJobsToQueue(orderQueue, [[OrderMessage, orderMessageConsumer]]);
};
