import { getConnection } from 'typeorm';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '@entities/errors/http.error';
import { CreateUserRequest, UpdateUserRequest, User } from '@entities/user.entity';
import { Shop } from '@entities/shop.entity';
import { getShopById } from '@repositories/shop.repository';
import { Activity } from '@entities/activity.entity';

const getUserRepository = () => getConnection().getRepository(User);

/**
 * Get
 */

export const getUserById = async (id: string): Promise<User> => {
  const userRecord = await getUserRepository().findOne({ id });

  if (!userRecord) {
    throw new HttpError(StatusCodes.NOT_FOUND, `User <id:${id}> not found`);
  }

  return userRecord;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const userRecord = await getUserRepository().findOne({ email });

  if (!userRecord) {
    throw new HttpError(StatusCodes.NOT_FOUND, `Shop <email:${email}> not found`);
  }

  return userRecord;
};

export const getUserActivities = async (id: string): Promise<Activity[]> => {
  const userRecord = await getConnection()
    .createQueryBuilder(User, 'users')
    .leftJoinAndSelect('users.activities', 'activities')
    .orderBy('activities.id', 'DESC')
    .where('users.id = :id', { id })
    .getOne();

  if (!userRecord) {
    throw new HttpError(StatusCodes.NOT_FOUND, `User <${id}> not found`);
  }

  return userRecord.activities;
};

export const getUserFollowedShops = async (id: string): Promise<Shop[]> => {
  const userRecord = await getUserRepository().findOne({ id }, { relations: ['followedShops'] });

  if (!userRecord) {
    throw new HttpError(StatusCodes.NOT_FOUND, `User <id:${id}> not found`);
  }

  return userRecord.followedShops;
};

/**
 * Save
 */

export const saveUser = async (user: User) => {
  try {
    await getUserRepository().save(user);
  } catch (e) {
    if (e.detail && e.detail.match(/email(.*)already exists/)) {
      throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, 'This email is already used');
    }
    throw e;
  }
};

/**
 * Create
 */

export const createUser = async (data: CreateUserRequest): Promise<User> => {
  const userRecord = getUserRepository().create(data);

  await userRecord.updatePassword(data.password);
  await saveUser(userRecord);

  return userRecord;
};

/**
 * Update
 */

export const updateUser = async (userId: string, data: UpdateUserRequest): Promise<User> => {
  const userRecord = await getUserById(userId);

  Object.assign(userRecord, data);

  if (data.password) await userRecord.updatePassword(data.password);
  await saveUser(userRecord);

  return userRecord;
};

export const insertFollowedShop = async (userId: string, shopId: string): Promise<void> => {
  try {
    const userRecord = await getUserById(userId);
    const shopRecord = await getShopById(shopId);

    await getConnection()
      .createQueryBuilder()
      .relation(User, 'followedShops')
      .of(userRecord)
      .add(shopRecord);
  } catch (e) {
    if (e.message && e.message.match(/duplicate key value violates unique constraint/)) {
      throw new HttpError(StatusCodes.CONFLICT, 'Entry already exist');
    }
    throw e;
  }
};

/**
 * Remove
 */

export const removeUser = async (id: string, password: string): Promise<void> => {
  const userRecord = await getUserById(id);

  if (!(await userRecord.verifyPassword(password))) {
    throw new HttpError(StatusCodes.UNAUTHORIZED, 'Incorrect password');
  }

  await getUserRepository().remove(userRecord);
};
