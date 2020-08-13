import { AuthenticationError } from 'apollo-server-koa';
import { Context } from 'koa';
import * as jwt from 'jsonwebtoken';

import { apiConfig } from '@config';
import apmClient from '~/services/elastic-apm';

export interface ContextUser {
    _id: string;
    assertIsLoggedIn(): void;
}

const getUserFromAuthorization = (koaContext: Context) => {
    const authorizationHeader = koaContext.req.headers.authorization || '';
    const authorizationSections = authorizationHeader.split('Bearer ');
    if (authorizationSections.length !== 2) {
        return null;
    }
    const bearerToken = authorizationSections[1];
    const { data } = jwt.verify(bearerToken, apiConfig.auth['jwt-signature']);

    apmClient.setUserContext(data.userId);
    return data.userId;
};

export const gqlAuthenticationMiddleware = (ctx) => {
    const loggedUser = getUserFromAuthorization(ctx.ctx);
    ctx.user = {
        _id: loggedUser,
        assertIsLoggedIn: () => {
            if (!loggedUser) {
                throw new AuthenticationError('User is not logged');
            }
        },
    };
    return ctx;
};
