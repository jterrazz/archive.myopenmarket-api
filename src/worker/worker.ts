import throng from 'throng';
import logger from '@services/logger';
import { environment } from '@config';
import { listenForOrderQueue } from '~/worker/jobs/order.job';

const WORKERS = process.env.WEB_CONCURRENCY || 2;

const startWorker = () => {
  logger.info(`starting worker with environment <${environment}>`);

  listenForOrderQueue();
};

throng({ workers: WORKERS, start: startWorker });
