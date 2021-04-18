import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import passport from 'koa-passport';
import session from 'koa-session';

import { apiConfig } from '@config';
import { loggerMiddleware } from '@middlewares/logger';
import { requestMiddleware } from '@middlewares/request';
import { trackerMiddleware } from '@middlewares/tracker';
import { userSessionMiddleware } from '@middlewares/authentication';
import buildRouter from './router';
import logger from '@services/logger';

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

const setupApp = (app) => {
  app.use(requestMiddleware);
  _setupSecurity(app);
  _setupAuthentication(app);
  app.use(bodyParser());
  app.use(loggerMiddleware);
  app.use(trackerMiddleware);
};

export const createApp = (): Koa => {
  logger.info(`starting app with environment <${process.env.NODE_ENV}>`);

  const app = new Koa();
  setupApp(app);

  const router = buildRouter();
  app.use(router.routes()).use(router.allowedMethods());

  return app;
};
