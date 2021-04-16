import Koa from 'koa';
import logger from '@services/logger';
import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';
import { ZodError } from 'zod';

export const requestMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    ctx.set('X-Request-ID', v4());

    const startTime = new Date().getTime();
    await next();
    const elapsedTime = new Date().getTime() - startTime;

    logger.http(`${ctx.request.method} ${ctx.request.url} => ${ctx.status} - ${elapsedTime} ms`);
  } catch (err) {
    if (err instanceof ZodError) {
      ctx.status = StatusCodes.UNPROCESSABLE_ENTITY;
      ctx.body = err.errors;
    } else if (err.expose) {
      ctx.status = err.status;
      ctx.body = err.message;
    } else {
      ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = 'Internal Server Error';
      logger.error(err);
    }

    logger.http(`${ctx.request.method} ${ctx.request.url} => ${ctx.status} ${ctx.body}`);
  }
};
