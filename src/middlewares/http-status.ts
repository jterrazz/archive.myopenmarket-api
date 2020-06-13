import Koa from 'koa';

import { getStatusText } from '@tom/tom_status';

export const setStatusMessageMiddleware: Koa.Middleware = async (ctx, next) => {
    ctx.message = ctx.messageInfos || getStatusText(ctx.status);
    await next();
};
