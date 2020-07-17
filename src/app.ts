import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm';
import 'reflect-metadata'; // Required by typeorm

import { buildGraphQlServer } from '~/controller/graphql';
import { errorHandlerMiddleware } from './middleware/error-handler';
import router from './router';
import ormconfig from './config/typeorm';
import { TLogger } from '@tom';

const logger = new TLogger(__filename);

const setupApp = async (): Promise<Koa> => {
    const app = new Koa();

    // Database
    await createConnection(ormconfig);
    logger.info('API is connected to the database');

    // App setup
    app.use(bodyParser());
    app.use(errorHandlerMiddleware);
    app.use(router.routes()).use(router.allowedMethods());
    const graphQLServer = await buildGraphQlServer();
    graphQLServer.applyMiddleware({ app });

    return app;
};

export default setupApp;
