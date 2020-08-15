import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import session from 'koa-session';
import passport from 'koa-passport';

import { Logger } from '@tom';
import { apiConfig, databaseConfig } from '@config';
import { requestHandlerMiddleware } from '~/middlewares/request-handler';
import router from './router';
import { setupSentry } from '@services/sentry';

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
    setupSentry(app);

    app.use(bodyParser());
    app.keys = [apiConfig.auth.sessionSecret];
    app.use(session({}, app));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(requestHandlerMiddleware);
    app.use(router.routes()).use(router.allowedMethods());

    logger.info(`App is ready`);
    return { app };
};

export default setupApp;
