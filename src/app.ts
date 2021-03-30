import 'reflect-metadata';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import cors from '@koa/cors';
import passport from 'koa-passport';

import Logger from '@services/logger';
import { apiConfig } from '@config';
import { requestHandlerMiddleware } from '~/middlewares/request-handler';
import buildRouter from './router';
import { setupSentry } from '@services/error/sentry';
import { populateCtxWithTracker } from '@middlewares/tracker';

const logger = new Logger(__filename);

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

  setupSentry(app);
  await setupApp(app);

  app.use(router.routes()).use(router.allowedMethods());
  logger.info(`App is ready`);
  return app;
};

export const destroyApp = async () => {
  // await mongoose.connection.close();
};
