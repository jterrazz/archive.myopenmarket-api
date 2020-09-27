if (process.env.MONITORING_TOKEN) {
    require('spm-agent-nodejs'); // Sematext automated tracking
}

import { apiConfig } from '@config';
import { createApp } from './app';
import Logger from '@services/logger';

const logger = new Logger(__filename);

const startServer = async () => {
    const app = await createApp();

    app.listen(apiConfig.http.port, () => {
        logger.info(`Server is running on port ${apiConfig.http.port}`);
    });
};

startServer().then();
