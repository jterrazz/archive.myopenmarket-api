import { Middleware } from 'koa';
import * as Joi from '@hapi/joi';

import AuthenticationService from '@services/authentication';
import { Logger } from '@tom';

const authenticationService = new AuthenticationService();
const logger = new Logger(__filename);

export const signInController: Middleware = async (ctx, next) => {
    try {
        const authHeader = ctx.request.headers.authorization;
        if (!authHeader) {
            throw new Error('No authorization header');
        }

        const encodedCredentials = authHeader.split(' ').pop();
        const credentials = Buffer.from(encodedCredentials, 'base64').toString().split(':');
        if (credentials.length !== 2) {
            throw new Error('Invalid authorization data');
        }

        logger.info(`Checking authentication for user <${credentials[0]}>`);
        ctx.body = await authenticationService.signIn(credentials[0], credentials[1]);
    } catch (e) {
        logger.error(e);
        ctx.throw(401);
    }

    await next();
};

export const signUpController: Middleware = async (ctx, next) => {
    const bodySchema = Joi.object({
        email: Joi.string().required(),
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().min(8).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    }).required();

    // @ts-ignore // TODO Replace this
    const { email, password, firstName, lastName } = await bodySchema.validateAsync(ctx.request.body);
    ctx.body = await authenticationService.signUp(email, password, firstName, lastName);

    await next();
};
