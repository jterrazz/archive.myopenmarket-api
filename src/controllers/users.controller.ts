import { Middleware } from 'koa';

import {
  getUserById,
  updateUser,
  deleteUser,
  getUserFollowedShops,
  insertFollowedShop,
} from '~/entities/user.repository';
import { updateUserSchema } from '@entities/user.entity';

/**
 * User controllers
 */

export const getUserController: Middleware = async (ctx) => {
  ctx.tracker.requestGetUser();

  const userRecord = await getUserById(ctx.params.userId);

  ctx.body = userRecord.getPublicProperties();
};

/**
 * Me controllers
 */

export const getMeController: Middleware = async (ctx) => {
  ctx.tracker.requestGetMe();

  const userRecord = await getUserById(ctx.state.user.id);

  ctx.body = userRecord.getSelfProperties();
};

export const deleteMeController: Middleware = async (ctx) => {
  ctx.tracker.requestDeleteMe();

  await deleteUser(ctx.state.user.id, ctx.request.body.password);

  ctx.status = 200;
};

export const updateMeController: Middleware = async (ctx) => {
  ctx.tracker.requestPatchMe();

  const parsedUser = await updateUserSchema.validateAsync(ctx.request.body);
  const userRecord = await updateUser(ctx.state.user.id, parsedUser);

  ctx.body = userRecord.getSelfProperties();
};

export const getMyFollowedShopsController: Middleware = async (ctx) => {
  ctx.tracker.requestGetMyFollowedShops();

  ctx.body = await getUserFollowedShops(ctx.state.user.id);
};

export const followShopController: Middleware = async (ctx) => {
  ctx.tracker.requestInsertFollowedShops();

  await insertFollowedShop(ctx.state.user.id, ctx.query.shopId);

  ctx.body = 200;
};
