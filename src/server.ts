import { createConnection } from 'typeorm';

import { createApp } from './app';
import { apiConfig } from '@config';
import logger from '@services/logger';
import { setupSentry } from '@services/sentry';

const startServer = async () => {
  logger.info('connecting to database');
  await createConnection();
  logger.info('connected to database');

  const app = createApp();
  setupSentry(app);

  app.listen(apiConfig.http.port, () => {
    logger.info(`listening on port ${apiConfig.http.port}`);
  });
};

startServer()
  .then()
  .catch((e) => logger.error(e));
