import '~/services/elastic-apm'; // Must be first to monitor supported packages
import setupApp from './app';
import { apiConfig } from './config';
import { TLogger } from '@tom';
const logger = new TLogger(__filename);

(async (): Promise<void> => {
    const { app } = await setupApp();

    app.listen(apiConfig.http.port, () => {
        logger.info(`Server is running on port ${apiConfig.http.port}`);
    });
})();
