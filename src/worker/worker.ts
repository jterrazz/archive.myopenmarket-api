import throng from 'throng';

import { environment, workerConfig } from '@config';
import { listenForOrderJobs } from '~/worker/jobs/order.job';
import logger from '@services/logger';

const startWorker = async () => {
  logger.info(`starting worker with environment <${environment}>`);

  await listenForOrderJobs();
};

throng({ start: startWorker, workers: workerConfig.concurrency });
