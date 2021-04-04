import Router from 'koa-router';

import { getShopController } from '@controllers/shops.controller';

const shopRouter = new Router();

shopRouter.get('/:shopHandle', getShopController);

export default shopRouter;
