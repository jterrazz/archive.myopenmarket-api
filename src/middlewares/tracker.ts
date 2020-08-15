const reqIsGraphql = (ctx) => {
    return ctx.request.url == '/graphql';
};

export const startTrackerMiddleware = async (ctx, next) => {
    await next();
};

export const endTrackerMiddleware = async (ctx, next) => {
    await next();
};
