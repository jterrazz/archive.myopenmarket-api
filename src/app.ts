import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm';
import 'reflect-metadata'; // Required by typeorm

import { buildGraphQlServer } from '@controllers/graphql';
import { errorHandlerMiddleware } from './middlewares/error-handler';
import router from './router';
import ormconfig from './config/typeorm';
import { Logger } from '@tom';
import { endTrackerMiddleware, startTrackerMiddleware } from '~/middlewares/tracker';

const logger = new Logger(__filename);

const setupApp = async (): Promise<any> => {
    const app = new Koa();

    // Database
    const connection = await createConnection(ormconfig);
    logger.info('API is connected to the database');

    // App setup
    app.use(bodyParser());
    app.use(errorHandlerMiddleware);
    app.use(startTrackerMiddleware);
    app.use(router.routes()).use(router.allowedMethods());
    app.use(endTrackerMiddleware);

    const graphQLServer = await buildGraphQlServer();
    graphQLServer.applyMiddleware({ app });

    return { app, connection };
};
export default setupApp;
