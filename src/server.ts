import { apiConfig } from '@config';
import { createApp } from './app';
import logger from '@services/logger';
import { createConnection } from 'typeorm';
import { setupSentry } from '@services/error/sentry';

const startServer = async () => {
  logger.info('connecting to the database');
  await createConnection();
  logger.info('connected to the database');

  const app = await createApp();
  setupSentry(app);

  app.listen(apiConfig.http.port, () => {
    logger.info(`listening on port ${apiConfig.http.port}`);
  });
};

startServer().then();
