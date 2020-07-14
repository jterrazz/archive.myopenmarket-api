import Router from 'koa-router';

import { getStateController } from '@controller/state';

const router = new Router();

// General
router.get('/', getStateController);

export default router;
