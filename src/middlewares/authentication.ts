import { Middleware } from 'koa';
import { HttpError } from '@entities/errors/http-error';

export const isAuthenticated: Middleware = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return await next();
  }
  throw new HttpError(401, 'This request requires entity');
};
