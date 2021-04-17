import { Middleware } from 'koa';

import { getShopByHandle, updateShop } from '@repositories/shop.repository';
import { createUpdateShopActivity } from '@repositories/activity.repository';
import { shopIdSchema, updateShopRequestSchema } from '@entities/shop.entity';

/**
 * Koa controllers
 */

export const getShopController: Middleware = async (ctx) => {
  ctx.tracker.requestGetShop();

  const shopRecord = await getShopByHandle(ctx.params.shopHandle);

  ctx.body = shopRecord.filterPublicProperties();
};

export const patchShopController: Middleware = async (ctx) => {
  ctx.tracker.requestGetShop();

  const shopId = shopIdSchema.parse(ctx.query.shopId);
  const shop = updateShopRequestSchema.parse(ctx.body);

  const shopRecord = await updateShop(shopId, shop);
  await createUpdateShopActivity(ctx.state.userSession);

  ctx.body = shopRecord.filterPublicProperties();
};
