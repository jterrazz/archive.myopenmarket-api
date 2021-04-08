import 'reflect-metadata';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import cors from '@koa/cors';
import passport from 'koa-passport';

import { apiConfig } from '@config';
import logger from '@services/logger';
import { userSessionMiddleware } from '@middlewares/authentication';
import { requestMiddleware } from '@middlewares/request';
import { trackerMiddleware } from '@middlewares/tracker';
import { loggerMiddleware } from '@middlewares/logger';
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
  app.use(userSessionMiddleware);
};

const setupApp = async (app) => {
  app.use(requestMiddleware);
  _setupSecurity(app);
  _setupAuthentication(app);
  app.use(bodyParser());
  app.use(loggerMiddleware);
  app.use(trackerMiddleware);
};

export const createApp = async (): Promise<Koa> => {
  logger.info(`starting with environment <${process.env.NODE_ENV}>`);

  const app = new Koa();
  await setupApp(app);

  const router = await buildRouter();
  app.use(router.routes()).use(router.allowedMethods());

  return app;
};
