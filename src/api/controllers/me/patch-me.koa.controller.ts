import { Middleware } from 'koa';
import { createUpdateProfileActivity } from '@repositories/activity.repository';
import { updateUser } from '@repositories/user.repository';
import { updateUserRequestSchema } from '@entities/user.entity';

export const patchMeController: Middleware = async (ctx) => {
  ctx.tracker.requestPatchMe();

  const userId = ctx.state.user.id;
  const parsedUser = updateUserRequestSchema.parse(ctx.request.body);

  const userRecord = await updateUser(userId, parsedUser);
  await createUpdateProfileActivity(ctx.state.userSession);

  ctx.body = userRecord.filterSelfProperties();
};
