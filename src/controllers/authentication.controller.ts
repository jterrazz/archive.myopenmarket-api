import { Middleware } from 'koa';

import { HttpError } from '@entities/errors/http-error';
import { User, newUserSchema } from '@entities/user.entity';
import { insertUser, getUserByEmail } from '@entities/user.repository';

/**
 * Koa controllers
 */

export const successAuthController: Middleware = async (ctx) => {
  ctx.logger.debug(`authentication successful for user <${ctx.state.user.email}>`);

  ctx.body = {
    message: 'Authentication successful',
    user: ctx.state.user.getSelfProperties(),
  };
};

export const logoutController: Middleware = async (ctx) => {
  ctx.logger.debug(`logout for user <${ctx.state.user.email}>`);

  ctx.logout();
  ctx.status = 200;
};

/**
 * Controllers
 */

export const signInWithPassword = async (email, password): Promise<User> => {
  const userRecord = await getUserByEmail(email);

  if (!userRecord || !(await userRecord.verifyPassword(password))) {
    throw new HttpError(401, 'Authentication failed');
  }

  return userRecord;
};

export const signUp = async (user): Promise<User> => {
  const parsedUser = await newUserSchema.validateAsync(user);

  return await insertUser(parsedUser);
};
