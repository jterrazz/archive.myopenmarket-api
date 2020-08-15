import Koa from 'koa';

import { Logger } from '@tom';

const logger = new Logger(__filename);

export const errorHandlerMiddleware: Koa.Middleware = async (ctx, next) => {
    try {
        // logger.http(`HTTP Request: ${JSON.stringify(ctx.request, null, 4)}`);
        // logger.http(`Body: ${JSON.stringify(ctx.request.body, null, 4)}`);
        await next();
    } catch (err) {
        if (!err.status && err.isJoi) {
            err.status = 422;
            ctx.messageInfos = err.message;
        }

        ctx.status = err.status || 500;
        ctx.body = ctx.messageInfos;

        logger.error(`HTTP response: ${ctx.status} - ${ctx.body}`);
        ctx.app.emit('error', err, ctx);
    }
};
