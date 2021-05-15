import { Middleware } from 'koa';
import { UserSession } from '@entities/user-session.entity';

export const userSessionMiddleware: Middleware = async (ctx, next) => {
  ctx.state.userSession = new UserSession(ctx);

  await next();
};
