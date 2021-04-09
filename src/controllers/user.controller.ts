import { Middleware } from 'koa';

import { getUserById } from '@repositories/user.repository';
import { StatusCodes } from 'http-status-codes';

/**
 * Koa controllers
 */

export const getUserController: Middleware = async (ctx) => {
  ctx.tracker.requestGetUser();

  const userId = ctx.params.userId;
  const userRecord = await getUserById(userId); // TODO If no user + test + check type of input i guess
  const user = userRecord?.filterPublicProperties();

  ctx.assert(user, StatusCodes.NOT_FOUND, 'User not found');

  ctx.body = user;
};
