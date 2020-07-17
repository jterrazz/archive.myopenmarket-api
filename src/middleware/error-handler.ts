import Koa from 'koa';

import { getStatusText } from '@tom/tom_status';
import { TLogger } from '@tom';

const logger = new TLogger(__filename);

export const errorHandlerMiddleware: Koa.Middleware = async (ctx, next) => {
    try {
        logger.debug(`HTTP Request: ${JSON.stringify(ctx.request, null, 4)}`);
        logger.debug(`Body: ${JSON.stringify(ctx.request.body, null, 4)}`);
        await next();
    } catch (err) {
        if (!err.status && err.isJoi) err.status = 422;
        ctx.status = err.status || 500;
        ctx.body = ctx.messageInfos || getStatusText(ctx.status);
        logger.error(`HTTP response: ${ctx.status} - ${ctx.body}`);
        ctx.app.emit('error', err, ctx);
    }
};
