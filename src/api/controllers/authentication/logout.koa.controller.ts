import { Middleware } from 'koa';
import { StatusCodes } from 'http-status-codes';

export const logoutController: Middleware = async (ctx) => {
  ctx.logger.debug(`logout for user <${ctx.state.user.email}>`);
  ctx.logout();
  ctx.status = StatusCodes.OK;
};
