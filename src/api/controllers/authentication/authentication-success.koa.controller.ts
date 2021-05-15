import { Middleware } from 'koa';

export const authenticationSuccessController: Middleware = async (ctx) => {
  ctx.logger.debug(`authentication successful for user <${ctx.state.user.email}>`);
  ctx.body = {
    message: 'Authentication successful',
    user: ctx.state.user.filterSelfProperties(),
  };
};
