import { startWorker } from './app';
import { workerConfig } from '@config';
import throng from 'throng';

throng({ start: startWorker, workers: workerConfig.concurrency });
