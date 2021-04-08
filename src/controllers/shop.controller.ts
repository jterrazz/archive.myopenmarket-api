import { Middleware } from 'koa';

import { getShopByHandle, updateShop } from '@repositories/shop.repository';
import { createUpdateProfileActivity } from '@repositories/activity.repository';
import { updateShopValidator } from '@entities/shop.entity';

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

  const shopId = ctx.query.shopId;
  const shop = await updateShopValidator.validateAsync(ctx.body);

  const shopRecord = await updateShop(shopId, shop);
  await createUpdateProfileActivity(ctx.state.userSession);

  ctx.body = shopRecord.filterPublicProperties();
};
