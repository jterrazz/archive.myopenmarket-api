import * as Sentry from '@sentry/node';

Sentry.init({ dsn: 'https://29afdd2d3e02471fb65a1b41871bb9ab@o198215.ingest.sentry.io/5391529' });

export const setupSentry = (app) => {
    app.on('error', (err, ctx) => {
        Sentry.withScope(function (scope) {
            scope.addEventProcessor(function (event) {
                return Sentry.Handlers.parseRequest(event, ctx.request);
            });
            Sentry.captureException(err);
        });
    });
};
