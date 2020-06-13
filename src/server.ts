import app from './app';
import config from '@config';
import { TLogger } from '@tom';

const logger = new TLogger(__filename);

app.listen(config.PORT, () => {
    logger.info(`Server is running on port ${config.PORT}`);
});
