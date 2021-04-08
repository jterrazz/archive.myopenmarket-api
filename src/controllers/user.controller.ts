import { Middleware } from 'koa';

import { getUserById } from '@repositories/user.repository';

/**
 * Koa controllers
 */

export const getUserController: Middleware = async (ctx) => {
  ctx.tracker.requestGetUser();

  const userId = ctx.state.user.id;
  const userRecord = await getUserById(userId);

  ctx.body = userRecord.filterPublicProperties();
};
