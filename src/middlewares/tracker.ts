import { Middleware } from 'koa';

import TTracker, { EVENTS } from '@tom/server/tom_tracker';

const trackerMiddleware: Middleware = async (ctx, next) => {
    ctx.tracker = new TTracker();
    ctx.trackerEvents = EVENTS;
    await next();
};

export default trackerMiddleware;
