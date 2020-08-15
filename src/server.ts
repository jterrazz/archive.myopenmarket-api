import setupApp from './app';
import { apiConfig } from '@config';
import { Logger } from '@tom';

const logger = new Logger(__filename);

(async (): Promise<void> => {
    const { app } = await setupApp();

    app.listen(apiConfig.http.port, () => {
        logger.info(`Server is running on port ${apiConfig.http.port}`);
    });
})();
