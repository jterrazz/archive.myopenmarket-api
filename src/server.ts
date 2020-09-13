import 'spm-agent-nodejs';

import { apiConfig } from '@config';
import { createApp } from './app';
import { Logger } from '@tom';

const logger = new Logger(__filename);

(async (): Promise<void> => {
    const app = await createApp();

    app.listen(apiConfig.http.port, () => {
        logger.info(`Server is running on port ${apiConfig.http.port}`);
    });
})();
