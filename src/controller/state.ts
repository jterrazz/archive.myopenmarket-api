import { Middleware } from 'koa';

import config from '@config';

export const getStateController: Middleware = async (ctx, next) => {
    ctx.body = {
        version: config.API_VERSION,
        state: 'OK',
        time: new Date(),
    };

    await next();
};
