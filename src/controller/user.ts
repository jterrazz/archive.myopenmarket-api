import Koa from 'koa';

export const getUsernameController: Koa.Middleware = async (ctx, next) => {
    ctx.tracker.track(ctx.trackerEvents.GET_USER);

    ctx.body = {
        user: {},
    };

    await next();
};
