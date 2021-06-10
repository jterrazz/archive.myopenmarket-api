import { Middleware } from 'koa';
import { UserSession } from '~/models/user-session';

export const userSessionMiddleware: Middleware = async (ctx, next) => {
  ctx.state.userSession = new UserSession(ctx);

  await next();
};
