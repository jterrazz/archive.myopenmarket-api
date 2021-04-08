import Koa from 'koa';
import logger from '@services/logger';

export const requestMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    const startTime = new Date().getTime();
    await next();
    const elapsedTime = new Date().getTime() - startTime;

    logger.http(`${ctx.request.method} ${ctx.request.url} => ${ctx.status} - ${elapsedTime} ms`);
  } catch (err) {
    if (err.name === 'ValidationError') {
      logger.debug(err);
      ctx.status = 422;
      ctx.body = err.details;
    } else if (err.expose) {
      logger.debug(err);
      ctx.status = err.status;
      ctx.body = err.message;
    } else {
      logger.error(err);
      console.log(err);
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
    }

    logger.http(`${ctx.request.method} ${ctx.request.url} => ${ctx.status} ${ctx.body}`);
  }
};
