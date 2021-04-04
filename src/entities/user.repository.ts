import { getConnection } from 'typeorm';
import { HttpError } from './errors/http-error';

import { Shop } from './shop.entity';
import { getUserRepository, User } from './user.entity';
import * as argon2 from 'argon2';

/**
 * Get
 */

export const getUserById = async (id: string): Promise<User> => {
  const userRepository = getConnection().getRepository(User);
  return userRepository.findOne(id);
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const userRepository = getConnection().getRepository(User);
  return userRepository.findOne({ email });
};

export const getUserFollowedShops = async (id: string): Promise<Shop[]> => {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne({ relations: ['followedShops'] });

  return user.followedShops; // TODO To public props
};

/**
 * Update
 */

const _assertInsertUserErrors = (e: any) => {
  if (e.detail && e.detail.match(/email(.*)already exists/)) {
    throw new HttpError(422, 'This email is already used');
  }
};

export const updateUser = async (id: string, data: any): Promise<User> => {
  try {
    const userRepository = getConnection().getRepository(User);
    const userRecord = await userRepository.findOne({ id });

    // TODO 404
    Object.assign(userRecord, data);
    // const activity = new Activity({ ipAddress, type: 'user-update' });
    // //         await activity.save();
    // //         userRecord.activity.push(activity);
    // //         await userRecord.save();
    // //         return userRecord;

    if (data.password) await userRecord.updatePassword(data.password);
    await userRepository.save(userRecord);

    return userRecord;
  } catch (e) {
    _assertInsertUserErrors(e);
  }
};

/**
 * Insert
 */

export const insertUser = async (data: any): Promise<User> => {
  try {
    const userRepository = getConnection().getRepository(User);
    const user = userRepository.create(data).pop();

    await user.updatePassword(data.password);

    await userRepository.save(user);

    return user;
  } catch (e) {
    _assertInsertUserErrors(e);
  }
};

export const insertFollowedShop = async (userId: string, shopId: string): Promise<any> => {
  try {
    const shopRepository = getConnection().getRepository(Shop);
    const shopRecord = await shopRepository.findOne({ id: shopId });

    if (!shopRecord) {
      throw new HttpError(404, 'Missing shop');
    }

    const userRepository = getConnection().getRepository(User);
    const userRecord = await userRepository.findOne({ id: userId });

    if (!userRecord) {
      throw new HttpError(404, 'Missing user');
    }

    await getConnection()
      .createQueryBuilder()
      .relation(User, 'followedShops')
      .of(userRecord)
      .add(shopRecord);
  } catch (e) {
    if (e.message && e.message.match(/duplicate key value violates unique constraint/)) {
      throw new HttpError(409, 'Entry already exist');
    }
    throw e;
  }
};

/**
 * Delete
 */

export const deleteUser = async (id: string, password: string): Promise<any> => {
  const userRepository = getConnection().getRepository(User);
  const userRecord = await userRepository.findOne({ id });

  if (!userRecord) {
    throw new HttpError(404, 'User not found');
  }

  if (!(await userRecord.verifyPassword(password))) {
    throw new HttpError(401, 'Incorrect password');
  }

  await userRepository.delete(userRecord);
};
