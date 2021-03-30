import { Middleware } from 'koa';
import logger from '@services/logger';

/**
 * Requires that ctx.state.user is populated with the user model (Like in signin / signup)
 * @param ctx
 */
export const successAuthController: Middleware = async (ctx) => {
  logger.http(`<${ctx.state.user.email}> Authentication successful`);
  ctx.body = {
    message: 'Authentication successful',
    user: ctx.state.user.toPrivateProps(),
  };
};

export const logoutController: Middleware = async (ctx) => {
  ctx.logout();
  ctx.status = 200;
};
