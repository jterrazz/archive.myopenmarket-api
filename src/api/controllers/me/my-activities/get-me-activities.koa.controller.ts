import { Middleware } from 'koa';
import { getUserActivities } from '@repositories/user.repository';

export const getMyActivitiesController: Middleware = async (ctx) => {
  ctx.tracker.requestGetMyFollowedShops();

  const userId = ctx.state.user.id;

  ctx.body = (await getUserActivities(userId))?.map((activity) => activity.filterSelfProperties());
};
