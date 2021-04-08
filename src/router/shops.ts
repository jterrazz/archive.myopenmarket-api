import Router from 'koa-router';

import { getShopController, patchShopController } from '@controllers/shop.controller';

const shopRouter = new Router();

shopRouter.get('/:shopHandle', getShopController);
shopRouter.patch('/:shopHandle', patchShopController);

export default shopRouter;
