import { Middleware } from 'koa';
import Tracker from '@services/tracker';

export const trackerMiddleware: Middleware = (ctx, next) => {
  ctx.tracker = new Tracker(ctx);
  return next();
};
