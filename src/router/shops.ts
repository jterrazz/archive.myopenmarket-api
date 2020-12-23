import Router from 'koa-router';

import { getShopController } from './../controllers/shops';

const shopRouter = new Router();

shopRouter.get('/:shopHandle', getShopController);

export default shopRouter;
