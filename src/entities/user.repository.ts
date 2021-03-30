import { getConnection } from 'typeorm';
import { HttpError } from '@services/error';

import { Shop } from './shop.entity';
import { User } from './user.entity';

const _assertNewUserErrors = (e: any) => {
  if (e.detail && e.detail.match(/email(.*)already exists/)) {
    throw new HttpError(422, 'This email is already used');
  }
};

export const getUser = async (id: string): Promise<User> => {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne(id);

  return user;
};

export const updateUser = async (id: string, data: object): Promise<User> => {
  try {
    const userRepository = getConnection().getRepository(User);
    const userRecord = await userRepository.findOne({ id });

    Object.assign(userRecord, data);
    // const activity = new Activity({ ipAddress, type: 'user-update' });
    // //         await activity.save();
    // //         userRecord.activity.push(activity);
    // //         await userRecord.save();
    // //         return userRecord;
    await userRepository.save(userRecord);

    return userRecord;
  } catch (e) {
    _assertNewUserErrors(e);
  }
};

export const createUser = async (data: object): Promise<User> => {
  try {
    const userRepository = getConnection().getRepository(User);
    const user = userRepository.create(data);

    await userRepository.save(user);

    return user;
  } catch (e) {
    _assertNewUserErrors(e);
  }
};

export const getUserFollowedShops = async (id: string): Promise<Shop[]> => {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne({ relations: ['followedShops'] });

  return user.followedShops;
};

export const addUserFollowedShop = async (id: string, shopId: string): Promise<boolean> => {
  try {
    const shopRepository = getConnection().getRepository(Shop);
    const shopRecord = await shopRepository.findOne({ id: shopId });
    const userRepository = getConnection().getRepository(User);
    const userRecord = await userRepository.findOne({ id });

    if (!shopRecord || !userRecord) {
      throw new HttpError(422, 'Missing shop record or user record');
    }

    await getConnection()
      .createQueryBuilder()
      .relation(User, 'followedShops')
      .of(userRecord)
      .add(shopRecord);

    return true;
  } catch (e) {
    if (e.message && e.message.match(/duplicate key value violates unique constraint/)) {
      throw new HttpError(409, 'Entry already exist');
    }
    throw e;
  }
};
