import { Middleware } from 'koa';

import { apiConfig } from '../config';

export const getStateController: Middleware = async (ctx, next) => {
    ctx.body = {
        version: apiConfig.version,
        state: 'OK',
        time: new Date(),
    };
    await next();
};
