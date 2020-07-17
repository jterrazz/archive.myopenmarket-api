import Router from 'koa-router';

import { getStateController } from '@controller/state';
import { signInController, signUpController } from '@controller/authentication';

const router = new Router();

// General
router.get('/', getStateController);

// Authentication
router.post('/auth/signin', signInController);
router.post('/auth/signup', signUpController);

export default router;
