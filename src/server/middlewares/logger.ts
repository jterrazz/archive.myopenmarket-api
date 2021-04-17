import { Middleware } from 'koa';
import logger from '@services/logger';

export const loggerMiddleware: Middleware = (ctx, next) => {
  ctx.logger = logger;
  return next();
};
