import { Middleware } from 'koa';
import Logger from '@services/logger';

const logger = new Logger(__filename);

/**
 * Requires that ctx.state.user is populated with the user model (Like in signin / signup)
 * @param ctx
 */
export const successAuthController: Middleware = async (ctx) => {
    logger.http(`User <${ctx.state.user.email}> is logged in`);
    ctx.body = {
        message: 'Authentication successful',
        user: ctx.state.user.toPrivateProps(),
    };
};

export const logoutController: Middleware = async (ctx) => {
    ctx.logout();
    ctx.status = 200;
};
