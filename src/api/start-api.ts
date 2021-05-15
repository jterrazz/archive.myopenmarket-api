import '@services/apm';
import { apiConfig } from '@config';
import { connectToDatabase } from '@services/database';
import { createApp } from './app';
import logger from '@services/logger';

const startAPI = async () => {
  await connectToDatabase();

  const app = createApp();

  app.listen(apiConfig.http.port, () => {
    logger.info(`listening on port ${apiConfig.http.port}`);
  });
};

startAPI().then().catch(logger.error);
