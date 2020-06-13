import Router from 'koa-router';

import { getStateController } from '~/controllers/api';
import { getUsernameController } from '~/controllers/user';

const router = new Router();

// General
router.get('/', getStateController);

// Users
router.get('/users/:username', getUsernameController);

export default router;
