import { apiConfig } from '@config';
import { connectToDatabase } from '@services/database';
import { createApp } from './app';
import { setupSentry } from '@services/sentry';
import logger from '@services/logger';

const startServer = async () => {
  await connectToDatabase();

  const app = createApp();

  setupSentry(app);

  app.listen(apiConfig.http.port, () => {
    logger.info(`listening on port ${apiConfig.http.port}`);
  });
};

startServer().then().catch(logger.error);
