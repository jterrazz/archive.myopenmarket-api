import Router from 'koa-router';

import { getStateController } from '~/controllers/state';
import authRouter from './authentication';
import userRouter from './user';
import meRouter from './me';

const router = new Router();

/*
 * Division of routes happens here
 */

router.get('/', getStateController);
router
    .use('/auth', authRouter.routes(), authRouter.allowedMethods())
    .use('/users', userRouter.routes(), userRouter.allowedMethods())
    .use('/me', meRouter.routes(), meRouter.allowedMethods());

export default router;
