import { Middleware } from 'koa';

import { apiConfig, environment } from '@config';

/**
 * Koa controllers
 */

export const getStateController: Middleware = async (ctx) => {
  ctx.tracker.requestGetApiState();

  ctx.body = {
    version: apiConfig.version,
    state: 'OK',
    env: environment,
    time: new Date(),
  };
};
