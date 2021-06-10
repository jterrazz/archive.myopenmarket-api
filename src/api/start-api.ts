import '@services/apm';
import { apiConfig } from '@config';
import { connectDatabase } from '@services/database';
import { createApp } from './app';
import logger from '@services/logger';

connectDatabase()
  .then(() => {
    const app = createApp();

    app.listen(apiConfig.http.port, () => {
      logger.info(`listening on port ${apiConfig.http.port}`);
    });
  })
  .catch(logger.error);
