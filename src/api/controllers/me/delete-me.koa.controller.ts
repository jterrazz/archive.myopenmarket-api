import { Middleware } from 'koa';
import { StatusCodes } from 'http-status-codes';
import { removeUser } from '@repositories/user.repository';
import { userPasswordSchema } from '@entities/user.entity';

export const deleteMeController: Middleware = async (ctx) => {
  ctx.tracker.requestDeleteMe();

  const userId = ctx.state.user.id;
  const userPassword = userPasswordSchema.parse(ctx.request.body?.password);

  await removeUser(userId, userPassword);

  ctx.status = StatusCodes.OK;
};
