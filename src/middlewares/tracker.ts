import apmClient from '~/services/elastic-apm';

const reqIsGraphql = (ctx) => {
    return ctx.request.url == '/graphql';
};

export const startTrackerMiddleware = async (ctx, next) => {
    if (!reqIsGraphql(ctx)) {
        apmClient.setCustomContext({
            request: {
                body: ctx.request.body,
                query: ctx.request.query,
            },
        });
    }
    await next();
};

export const endTrackerMiddleware = async (ctx, next) => {
    if (!reqIsGraphql(ctx)) {
        apmClient.setCustomContext({
            request: {
                body: ctx.request.body,
                query: ctx.request.query,
            },
            response: {
                body: ctx.body,
            },
        });
    }
    await next();
};
