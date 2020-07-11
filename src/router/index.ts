import Router from 'koa-router';

import { getStateController } from '~/controller/api';
import { getUsernameController } from '~/controller/user';

const router = new Router();

// General
router.get('/', getStateController);

// Users
router.get('/users/:username', getUsernameController);

export default router;
