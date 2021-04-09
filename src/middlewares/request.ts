import Koa from 'koa';
import logger from '@services/logger';
import { StatusCodes } from 'http-status-codes';

export const requestMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    const startTime = new Date().getTime();
    await next();
    const elapsedTime = new Date().getTime() - startTime;

    logger.http(`${ctx.request.method} ${ctx.request.url} => ${ctx.status} - ${elapsedTime} ms`);
  } catch (err) {
    if (err.name === 'ValidationError') {
      logger.debug(err);
      ctx.status = StatusCodes.UNPROCESSABLE_ENTITY;
      ctx.body = err.details;
    } else if (err.expose) {
      logger.debug(err);
      ctx.status = err.status;
      ctx.body = err.message;
    } else {
      logger.error(err);
      console.log(err);
      ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = 'Internal Server Error';
    }

    logger.http(`${ctx.request.method} ${ctx.request.url} => ${ctx.status} ${ctx.body}`);
  }
};
