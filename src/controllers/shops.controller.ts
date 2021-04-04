import { Middleware } from 'koa';

import { getShopByHandle } from '@entities/shop.repository';

// Controllers

export const getShopController: Middleware = async (ctx) => {
  ctx.tracker.requestGetShop();

  const shopRecord = await getShopByHandle(ctx.params.shopHandle);

  ctx.body = shopRecord.getPublicProperties();
};
