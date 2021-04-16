import Router from 'koa-router';

import { getShopController, patchShopController } from '@controllers/shop.controller';

const shopRouter = new Router();

// .get('/search);
shopRouter.get('/:shopHandle', getShopController);
shopRouter.patch('/:shopHandle', patchShopController);
// shopRouter.delete('/:shopHandle', patchShopController);

export default shopRouter;
