import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import 'reflect-metadata'; // Needed by type-graphql

import { Logger } from '@tom';
import { databaseConfig } from '@config';
import { buildGraphQlServer } from './api/graphql';
import { errorHandlerMiddleware } from '~/api/rest/middlewares/error-handler';
import { endTrackerMiddleware, startTrackerMiddleware } from '~/api/rest/middlewares/tracker';
import router from './api/rest/router';

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
    logger.info(`Starting app with environment ${process.env.NODE_ENV}`);

    await connectToDatabase();

    const app = new Koa();
    app.use(bodyParser());
    app.use(errorHandlerMiddleware);
    app.use(startTrackerMiddleware);
    app.use(router.routes()).use(router.allowedMethods());
    app.use(endTrackerMiddleware);

    const graphQLServer = await buildGraphQlServer();
    graphQLServer.applyMiddleware({ app });

    logger.info(`App setup is done`);
    return { app };
};

export default setupApp;
