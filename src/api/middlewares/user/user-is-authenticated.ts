import { HttpError } from '@entities/errors/http.error';
import { Middleware } from 'koa';
import { StatusCodes } from 'http-status-codes';

export const userIsAuthenticated: Middleware = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return await next();
  }

  throw new HttpError(StatusCodes.UNAUTHORIZED, 'This request requires authentication');
};
