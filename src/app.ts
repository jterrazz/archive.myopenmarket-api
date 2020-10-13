import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import session from 'koa-session';
import cors from '@koa/cors';
import passport from 'koa-passport';

import buildGraphqlServer from '~/api/graphql/index';
import Logger from '@services/logger';
import { apiConfig, databaseConfig } from '@config';
import { requestHandlerMiddleware } from '~/middlewares/request-handler';
import buildRouter from './api/rest/router';
import { setupSentry } from '@services/error/sentry';
import { populateCtxWithTracker } from '@middlewares/tracker';

const logger = new Logger(__filename);

const setupDatabase = async () => {
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

/**
 * @description Middlewares are shared between graphql and rest requests
 */
const setupApp = async (app) => {
    const corsOptions = {
        origin: apiConfig.security.cors,
    };

    app.use(cors(corsOptions));
    app.proxy = true;
    app.use(requestHandlerMiddleware);
    app.use(bodyParser());
    app.keys = [apiConfig.auth.sessionSecret];
    app.use(session({}, app));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(populateCtxWithTracker);
};

export const createApp = async (): Promise<Koa> => {
    logger.info(`App is starting with ${process.env.NODE_ENV} environment`);

    const app = new Koa();
    const router = await buildRouter();
    const graphQLServer = await buildGraphqlServer();

    await setupDatabase();
    setupSentry(app);
    await setupApp(app);

    graphQLServer.applyMiddleware({ app });
    app.use(router.routes()).use(router.allowedMethods());
    logger.info(`App is ready`);
    return app;
};

export const destroyApp = async () => {
    await mongoose.connection.close();
};
