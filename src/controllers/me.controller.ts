import { Middleware } from 'koa';

import {
  getUserById,
  updateUser,
  removeUser,
  getUserFollowedShops,
  insertFollowedShop,
  getUserActivities,
} from '@repositories/user.repository';
import { updateUserValidator, userPasswordValidator } from '@entities/user.entity';
import { shopIdValidator } from '@entities/shop.entity';
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
  const userPassword = await userPasswordValidator.validateAsync(ctx.request.body.password);

  await removeUser(userId, userPassword);

  ctx.status = 200;
};

export const patchMeController: Middleware = async (ctx) => {
  ctx.tracker.requestPatchMe();

  const userId = ctx.state.user.id; // TODO Type loggedUser + add ip
  const parsedUser = await updateUserValidator.validateAsync(ctx.request.body);

  const userRecord = await updateUser(userId, parsedUser);
  await createUpdateProfileActivity(ctx.state.userSession);
  ctx.body = userRecord.filterSelfProperties();
};

export const getMyActivitiesController: Middleware = async (ctx) => {
  ctx.tracker.requestGetMyFollowedShops();

  const userId = ctx.state.user.id;

  ctx.body = await getUserActivities(userId);
};

export const getMyFollowedShopsController: Middleware = async (ctx) => {
  ctx.tracker.requestGetMyFollowedShops();

  const userId = ctx.state.user.id;

  ctx.body = await getUserFollowedShops(userId);
};

export const postFollowShopController: Middleware = async (ctx) => {
  ctx.tracker.requestInsertFollowedShops();

  const userId = ctx.state.user.id;
  const shopId = await shopIdValidator.validateAsync(ctx.query.shopId);

  await insertFollowedShop(userId, shopId);
  ctx.body = 200;
};
