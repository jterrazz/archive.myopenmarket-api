import { Middleware } from 'koa';
import { apiConfig } from '@config';
import { EVENTS } from '@services/tracker';

export const getStateController: Middleware = async (ctx, next) => {
  ctx.tracker.track(EVENTS.routes.getApiState);
  ctx.body = {
    version: apiConfig.version,
    state: 'OK',
    env: apiConfig.env,
    time: new Date(),
  };
  await next();
};
