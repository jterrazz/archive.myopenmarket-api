import { Middleware } from 'koa';
import { apiConfig } from '@config';
import { EVENTS } from '@services/tracker';

export const getStateController: Middleware = async (ctx, next) => {
    ctx.tracker.track(EVENTS.routes.getState);
    ctx.body = {
        version: apiConfig.version,
        state: 'OK',
        time: new Date(),
    };
    await next();
};
