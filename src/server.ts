import app from './app';
import config from '@config';
import { TLogger } from '@tom';

const logger = new TLogger(__filename);

app.listen(config.SERVER_PORT, () => {
    logger.info(`Server is running on port ${config.SERVER_PORT}`);
});
