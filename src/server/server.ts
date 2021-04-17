import { createApp } from './app';
import { apiConfig } from '@config';
import logger from '@services/logger';
import { setupSentry } from '@services/sentry';
import { connectToDatabase } from '@services/database';

const startServer = async () => {
  await connectToDatabase();

  const app = createApp();

  setupSentry(app);

  app.listen(apiConfig.http.port, () => {
    logger.info(`listening on port ${apiConfig.http.port}`);
  });
};

startServer().then().catch(logger.error);
