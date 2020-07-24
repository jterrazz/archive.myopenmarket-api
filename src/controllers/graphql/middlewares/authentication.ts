import { AuthenticationError } from 'apollo-server-koa';
import { Context } from 'koa';
import apmClient from '~/services/elastic-apm';

const _getUserIdentificationObject = () => {
    return {
        id: 6,
        username: 'jb',
        email: 'test@gmail.com',
    };
};

function getUserFromAuthorization(koaContext: Context) {
    const token = koaContext.req.headers.authorization || '';

    apmClient.setUserContext(_getUserIdentificationObject());

    // Decode JWT
    return _getUserIdentificationObject();
}

export const gqlAuthenticationMiddleware = (ctx) => {
    ctx.user = getUserFromAuthorization(ctx.ctx);

    ctx.assertIsLoggedIn = () => {
        if (ctx.user.id != 6) {
            throw new AuthenticationError('User is not logged');
        }
    };

    return ctx;
};
