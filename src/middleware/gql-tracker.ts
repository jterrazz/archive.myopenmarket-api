import TTracker from '@tom/server/tom_tracker';

export const gqlTrackerMiddleware = (ctx) => {
    ctx.tracker = new TTracker();

    return ctx;
};
