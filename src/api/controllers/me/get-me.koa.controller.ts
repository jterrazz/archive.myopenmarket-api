import { Middleware } from 'koa';
import { getUserById } from '@repositories/user.repository';

export const getMeController: Middleware = async (ctx) => {
  ctx.tracker.requestGetMe();

  const userId = ctx.state.user.id;
  const userRecord = await getUserById(userId);

  ctx.body = userRecord.filterSelfProperties();
};
