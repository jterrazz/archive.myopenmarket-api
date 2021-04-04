import { getConnection } from 'typeorm';
import { HttpError } from '@entities/errors/http-error';

import { Shop } from './shop.entity';

export const getShopByHandle = async (handle: string): Promise<Shop> => {
  const shopRepository = getConnection().getRepository(Shop);
  const shopRecord = await shopRepository.findOne({ handle }, { relations: ['owner'] });

  if (!shopRecord) {
    throw new HttpError(404, `Shop ${handle} not found`);
  }

  return shopRecord;
};
