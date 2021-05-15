import Router from 'koa-router';

import { authRouter } from './authentication';
import { getStateController } from '~/api/controllers/api/get-api-state.koa.controller';
import { meRouter } from './me';
import { ordersRouter } from './orders';
import { shopsRouter } from './shops';
import { usersRouter } from './users';

const buildRouter = (): Router => {
  const router = new Router();

  /*
   * Route categories
   */

  router.get('/', getStateController);
  router
    .use('/auth', authRouter.routes(), authRouter.allowedMethods())
    .use('/users', usersRouter.routes(), usersRouter.allowedMethods())
    .use('/shops', shopsRouter.routes(), shopsRouter.allowedMethods())
    .use('/orders', ordersRouter.routes(), ordersRouter.allowedMethods())
    .use('/me', meRouter.routes(), meRouter.allowedMethods());

  return router;
};

export default buildRouter;
