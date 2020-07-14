import setupApp from './app';
import config from '@config';
import { TLogger } from '@tom';

const logger = new TLogger(__filename);

(async (): Promise<void> => {
    const app = await setupApp();

    app.listen(config.PORT, () => {
        logger.info(`Server is running on port ${config.PORT}`);
    });
})();
