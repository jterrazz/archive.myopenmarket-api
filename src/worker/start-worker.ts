import { consumeOrderJobs } from '~/worker/jobs/order.consumer';
import { environment } from '@config';
import logger from '@services/logger';

export const startWorker = async (): Promise<void> => {
  logger.info(`starting worker with environment <${environment}>`);

  await consumeOrderJobs();
};
