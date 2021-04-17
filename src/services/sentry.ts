import Koa from 'koa';

import * as Sentry from '@sentry/node';
import { servicesConfig } from '@config';

export const setupSentry = (app: Koa): void => {
  if (!servicesConfig.sentry) {
    return;
  }

  Sentry.init({
    release: 'service-website@' + process.env.npm_package_version,
    dsn: servicesConfig.sentry.dsn,
  });

  app.on('error', (err, ctx) => {
    Sentry.withScope(function (scope) {
      scope.addEventProcessor(function (event) {
        return Sentry.Handlers.parseRequest(event, ctx.request);
      });
      Sentry.captureException(err);
    });
  });
};
