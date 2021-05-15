import { HttpError } from '@entities/errors/http.error';
import { RawJson } from '~/types/koa';
import { StatusCodes } from 'http-status-codes';
import { User, userEmailSchema, userPasswordSchema } from '@entities/user.entity';
import { getUserByEmail } from '@repositories/user.repository';
import logger from '@services/logger';

export const signInWithPassword = async (
  rawEmail: RawJson,
  rawPassword: RawJson,
): Promise<User> => {
  const email = await userEmailSchema.parse(rawEmail);
  const password = await userPasswordSchema.parse(rawPassword);

  const userRecord = await getUserByEmail(email).catch(logger.debug);

  if (!userRecord || !(await userRecord.verifyPassword(password))) {
    throw new HttpError(
      StatusCodes.UNAUTHORIZED,
      `authentication for user <email:${rawEmail}> has failed`,
    );
  }

  return userRecord;
};
