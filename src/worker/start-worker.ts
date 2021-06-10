import { connectDatabase } from '@services/database';
import { startWorker } from './app';
import { workerConfig } from '@config';
import logger from '@services/logger';
import throng from 'throng';

connectDatabase()
  .then(() => {
    throng({ start: startWorker, workers: workerConfig.concurrency });
  })
  .catch(logger.error);
