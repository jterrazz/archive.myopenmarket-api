import { getShopController } from '~/api/controllers/shops/get-shop.koa.controller';
import { patchShopController } from '~/api/controllers/shops/patch-shop.koa.controller';
import Router from 'koa-router';

export const shopsRouter = new Router();

// .get('/search);
shopsRouter.get('/:shopHandle', getShopController).patch('/:shopHandle', patchShopController);
// shopRouter.delete('/:shopHandle', patchShopController);
