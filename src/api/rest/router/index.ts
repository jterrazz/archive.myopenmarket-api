import Router from 'koa-router';

import { getStateController } from '~/api/rest/controllers/state';
import { signInController, signUpController } from '~/api/rest/controllers/authentication';

const router = new Router();

// General
router.get('/', getStateController);

// Authentication
router.post('/auth/signin', signInController);
router.post('/auth/signup', signUpController);

export default router;
