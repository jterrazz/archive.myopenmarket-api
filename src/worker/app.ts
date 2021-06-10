import { environment } from '@config';
import { startConsumers } from '~/worker/jobs/start-consumers';
import logger from '@services/logger';

export const startWorker = async (): Promise<void> => {
  logger.info(`starting worker with environment <${environment}>`);

  await startConsumers();
};
