import Router from 'koa-router';

import { getShopController, patchShopController } from '@controllers/shop.controller';

export const shopsRouter = new Router();

// .get('/search);
shopsRouter.get('/:shopHandle', getShopController).patch('/:shopHandle', patchShopController);
// shopRouter.delete('/:shopHandle', patchShopController);
