import { Middleware } from 'koa';
import { HttpError } from '@services/error';

export const isAuthenticated: Middleware = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        return await next();
    }
    throw new HttpError(401, 'This request requires authentication');
};
