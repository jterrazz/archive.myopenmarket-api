import { startWorker } from '~/worker/start-worker';
import { workerConfig } from '@config';
import throng from 'throng';

throng({ start: startWorker, workers: workerConfig.concurrency });
