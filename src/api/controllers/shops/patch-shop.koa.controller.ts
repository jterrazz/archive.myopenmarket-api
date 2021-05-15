import { Middleware } from 'koa';
import { createUpdateShopActivity } from '@repositories/activity.repository';
import { shopIdSchema, updateShopRequestSchema } from '@entities/shop.entity';
import { updateShop } from '@repositories/shop.repository';

export const patchShopController: Middleware = async (ctx) => {
  ctx.tracker.requestGetShop();

  const shopId = shopIdSchema.parse(ctx.query.shopId);
  const shop = updateShopRequestSchema.parse(ctx.body);

  const shopRecord = await updateShop(shopId, shop);
  await createUpdateShopActivity(ctx.state.userSession);

  ctx.body = shopRecord.filterPublicProperties();
};
