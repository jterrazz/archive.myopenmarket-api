import { Middleware } from 'koa';
import { StatusCodes } from 'http-status-codes';

import { RawJson } from '@internal-types/koa';
import {
  User,
  newUserValidator,
  userEmailValidator,
  userPasswordValidator,
} from '@entities/user.entity';
import { createUser, getUserByEmail } from '@repositories/user.repository';
import { HttpError } from '@entities/errors/http.error';

/**
 * Koa controllers
 */

export const successAuthController: Middleware = async (ctx) => {
  ctx.logger.debug(`authentication successful for user <${ctx.state.user.email}>`);

  ctx.body = {
    message: 'Authentication successful',
    user: ctx.state.user.filterSelfProperties(),
  };
};

export const logoutController: Middleware = async (ctx) => {
  ctx.logger.debug(`logout for user <${ctx.state.user.email}>`);

  ctx.logout();

  ctx.status = StatusCodes.OK;
};

/**
 * Controllers
 */

export const signInWithPassword = async (
  rawEmail: RawJson,
  rawPassword: RawJson,
): Promise<User> => {
  const email = await userEmailValidator.validateAsync(rawEmail);
  const password = await userPasswordValidator.validateAsync(rawPassword);

  const userRecord = await getUserByEmail(email);

  if (!userRecord || !(await userRecord.verifyPassword(password))) {
    throw new HttpError(
      StatusCodes.UNAUTHORIZED,
      `Authentication for user <email:${rawEmail}> has failed`,
    );
  }

  return userRecord;
};

export const signUpWithPassword = async (rawUser: RawJson): Promise<User> => {
  const user = await newUserValidator.validateAsync(rawUser);

  return await createUser(user);
};
