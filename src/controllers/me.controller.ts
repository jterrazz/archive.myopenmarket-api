import { Middleware } from 'koa';
import { StatusCodes } from 'http-status-codes';

import {
  getUserById,
  updateUser,
  removeUser,
  getUserFollowedShops,
  insertFollowedShop,
  getUserActivities,
} from '@repositories/user.repository';
import { updateUserRequestSchema, userPasswordSchema } from '@entities/user.entity';
import { shopIdSchema } from '@entities/shop.entity';
import { createUpdateProfileActivity } from '@repositories/activity.repository';

/**
 * Koa controllers
 */

export const getMeController: Middleware = async (ctx) => {
  ctx.tracker.requestGetMe();

  const userId = ctx.state.user.id;
  const userRecord = await getUserById(userId);

  ctx.body = userRecord.filterSelfProperties();
};

export const deleteMeController: Middleware = async (ctx) => {
  ctx.tracker.requestDeleteMe();

  const userId = ctx.state.user.id;
  const userPassword = userPasswordSchema.parse(ctx.request.body.password);

  await removeUser(userId, userPassword);

  ctx.status = StatusCodes.OK;
};

export const patchMeController: Middleware = async (ctx) => {
  ctx.tracker.requestPatchMe();

  const userId = ctx.state.user.id;
  const parsedUser = updateUserRequestSchema.parse(ctx.request.body);

  const userRecord = await updateUser(userId, parsedUser);
  await createUpdateProfileActivity(ctx.state.userSession);

  ctx.body = userRecord.filterSelfProperties();
};

export const getMyActivitiesController: Middleware = async (ctx) => {
  ctx.tracker.requestGetMyFollowedShops();

  const userId = ctx.state.user.id;

  ctx.body = (await getUserActivities(userId))?.map((activity) => activity.filterSelfProperties());
};

export const getMyFollowedShopsController: Middleware = async (ctx) => {
  ctx.tracker.requestGetMyFollowedShops();

  const userId = ctx.state.user.id;

  ctx.body = (await getUserFollowedShops(userId)).map((shop) => shop.filterPublicProperties());
};

export const postFollowShopController: Middleware = async (ctx) => {
  ctx.tracker.requestInsertFollowedShops();

  const userId = ctx.state.user.id;
  const shopId = await shopIdSchema.parse(ctx.query.shopId);

  await insertFollowedShop(userId, shopId);
  ctx.body = StatusCodes.OK;
};
