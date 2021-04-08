import { Middleware } from 'koa';
import { HttpError } from '@entities/errors/http.error';
import { UserSession } from '@entities/user-session.entity';

export const isAuthenticated: Middleware = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next();
  }

  throw new HttpError(401, 'This request requires authentication');
};

export const userSessionMiddleware: Middleware = async (ctx, next) => {
  ctx.state.userSession = new UserSession(ctx);

  await next();
};
