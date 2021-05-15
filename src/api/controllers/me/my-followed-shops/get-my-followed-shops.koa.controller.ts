import { Middleware } from 'koa';
import { getUserFollowedShops } from '@repositories/user.repository';

export const getMyFollowedShopsController: Middleware = async (ctx) => {
  ctx.tracker.requestGetMyFollowedShops();

  const userId = ctx.state.user.id;

  ctx.body = (await getUserFollowedShops(userId)).map((shop) => shop.filterPublicProperties());
};
