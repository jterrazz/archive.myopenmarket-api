import { Middleware } from 'koa';
import { getShopByHandle } from '@repositories/shop.repository';

export const getShopController: Middleware = async (ctx) => {
  ctx.tracker.requestGetShop();

  const shopRecord = await getShopByHandle(ctx.params.shopHandle);

  ctx.body = shopRecord.filterPublicProperties();
};
