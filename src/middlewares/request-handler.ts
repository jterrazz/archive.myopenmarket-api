import Koa from 'koa';
import Logger from '@services/logger';

const logger = new Logger(__filename);

export const requestHandlerMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    const startTime = new Date().getTime();
    await next();
    const elapsedTime = new Date().getTime() - startTime;
    logger.http(`${ctx.request.method} ${ctx.request.url} - ${ctx.status} - ${elapsedTime} ms`);
  } catch (err) {
    if (err.expose) {
      ctx.status = err.status;
      ctx.body = err.message;
    } else {
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
      logger.error(err);
      ctx.app.emit('error', err, ctx);
    }
    logger.error(`${ctx.request.method} ${ctx.request.url} - ${ctx.status} ${ctx.body}`);
  }
};
