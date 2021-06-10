import { Middleware } from 'koa';
import { StatusCodes } from 'http-status-codes';
import { insertFollowedShop } from '@repositories/user.repository';
import { shopIdSchema } from '~/models/shop.entity';

export const postNewFollowedShopController: Middleware = async (ctx) => {
  ctx.tracker.requestPostNewFollowedShop();

  const userId = ctx.state.user.id;
  const shopId = await shopIdSchema.parse(ctx.query.shopId);

  await insertFollowedShop(userId, shopId);
  ctx.body = StatusCodes.OK;
};
