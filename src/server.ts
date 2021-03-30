import { apiConfig } from '@config';
import { createApp } from './app';
import Logger from '@services/logger';
import { createConnection } from 'typeorm';

const logger = new Logger(__filename);

const startServer = async () => {
  await createConnection();
  logger.info('App is connected to the database');

  const app = await createApp();

  app.listen(apiConfig.http.port, () => {
    logger.info(`Server is running on port ${apiConfig.http.port}`);
  });
};

startServer().then();
