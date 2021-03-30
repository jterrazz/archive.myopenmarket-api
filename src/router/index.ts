import Router from 'koa-router';

import authRouter from './authentication';
import usersRouter from './users';
import meRouter from './me';
import shopsRouter from './shops';
import { getStateController } from '@controllers/state';

const buildRouter = async () => {
  const router = new Router();

  /*
   * Route categories
   */

  router.get('/', getStateController);
  router
    .use('/auth', authRouter.routes(), authRouter.allowedMethods())
    .use('/users', usersRouter.routes(), usersRouter.allowedMethods())
    .use('/shops', shopsRouter.routes(), shopsRouter.allowedMethods())
    .use('/me', meRouter.routes(), meRouter.allowedMethods());

  return router;
};

export default buildRouter;
