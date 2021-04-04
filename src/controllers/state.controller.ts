import { Middleware } from 'koa';

import { apiConfig } from '@config';

export const getStateController: Middleware = async (ctx) => {
  ctx.tracker.requestGetApiState();

  ctx.body = {
    version: apiConfig.version,
    state: 'OK',
    env: apiConfig.env,
    time: new Date(),
  };
};
