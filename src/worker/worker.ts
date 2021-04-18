import throng from 'throng';

import logger from '@services/logger';
import { environment, workerConfig } from '@config';
import { listenForOrderJobs } from '~/worker/jobs/order.job';

const startWorker = async () => {
  logger.info(`starting worker with environment <${environment}>`);

  await listenForOrderJobs();
};

throng({ workers: workerConfig.concurrency, start: startWorker });
