import { AuthenticationError } from 'apollo-server-koa';
import { Context } from 'koa';

function getUserFromAuthorization(koaContext: Context) {
    const token = koaContext.req.headers.authorization || '';
    // Decode JWT
    return {
        userId: 42,
    };
}

export const gqlAuthenticationMiddleware = (ctx) => {
    ctx.user = getUserFromAuthorization(ctx.ctx);

    ctx.assertIsLoggedIn = () => {
        if (ctx.user && ctx.user.userId != 42) {
            throw new AuthenticationError('User is not logged');
        }
    };

    return ctx;
};
