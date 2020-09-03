import Router from 'koa-router';

import authRouter from './authentication';
import userRouter from './users';
import meRouter from './me';
import shopRouter from './shop';
import { getStateController } from '@controllers/state';

const router = new Router();

/*
 * Route categories
 */

router.get('/', getStateController);
router
    .use('/auth', authRouter.routes(), authRouter.allowedMethods())
    .use('/users', userRouter.routes(), userRouter.allowedMethods())
    .use('/shops', shopRouter.routes(), shopRouter.allowedMethods())
    .use('/me', meRouter.routes(), meRouter.allowedMethods());

export default router;
