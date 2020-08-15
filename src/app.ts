import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import { Logger } from '@tom';
import { databaseConfig } from '@config';
import { errorHandlerMiddleware } from '~/middlewares/error-handler';
import { endTrackerMiddleware, startTrackerMiddleware } from '~/middlewares/tracker';
import router from './router';

const logger = new Logger(__filename);

const connectToDatabase = async () => {
    const db = mongoose.connection;
    db.on('error', (err) => {
        logger.error('App failed to connect to the database');
        logger.error(err);
    });
    db.once('open', () => {
        logger.info('App is connected to the database');
    });
    await mongoose.connect(databaseConfig.mongo.url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const setupApp = async (): Promise<any> => {
    logger.info(`App is starting with ${process.env.NODE_ENV} environment`);

    await connectToDatabase();

    const app = new Koa();
    app.use(bodyParser());
    app.use(errorHandlerMiddleware);
    app.use(startTrackerMiddleware);
    app.use(router.routes()).use(router.allowedMethods());
    app.use(endTrackerMiddleware);

    logger.info(`App is ready`);
    return { app };
};

export default setupApp;
