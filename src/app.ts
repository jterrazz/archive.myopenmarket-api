import 'reflect-metadata';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import cors from '@koa/cors';
import passport from 'koa-passport';

import { apiConfig } from '@config';
import logger from '@services/logger';
import { requestHandlerMiddleware } from '@middlewares/request-handler';
import { populateCtxWithTracker } from '@middlewares/tracker';
import buildRouter from './router';

const _setupSecurity = (app) => {
  const corsOptions = {
    origin: apiConfig.security.cors,
  };

  app.use(cors(corsOptions));
  app.proxy = true;
};

const _setupAuthentication = (app) => {
  app.keys = [apiConfig.auth.sessionSecret];
  app.use(session({}, app));
  app.use(passport.initialize());
  app.use(passport.session());
};

const setupApp = async (app) => {
  _setupSecurity(app);
  _setupAuthentication(app);
  app.use(requestHandlerMiddleware);
  app.use(bodyParser());
  app.use(populateCtxWithTracker);
};

export const createApp = async (): Promise<Koa> => {
  logger.info(`starting setup with ${process.env.NODE_ENV} environment`);

  const app = new Koa();
  await setupApp(app);

  const router = await buildRouter();
  app.use(router.routes()).use(router.allowedMethods());

  return app;
};
