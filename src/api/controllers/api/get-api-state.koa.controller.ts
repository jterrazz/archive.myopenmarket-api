import { Middleware } from 'koa';
import { apiConfig, environment } from '@config';

export const getStateController: Middleware = async (ctx) => {
  ctx.tracker.requestGetApiState();

  ctx.body = {
    env: environment,
    state: 'OK',
    time: new Date(),
    version: apiConfig.version,
  };
};
