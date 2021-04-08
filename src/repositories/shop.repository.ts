import { getConnection } from 'typeorm';

import { HttpError } from '@entities/errors/http.error';
import { Shop } from '@entities/shop.entity';
import { ParsedJson } from '~/types/koa';

export const getShopRepository = () => getConnection().getRepository(Shop);

/**
 * Get
 */

export const getShopById = async (id: string): Promise<Shop> => {
  const shopRepository = getConnection().getRepository(Shop);
  const shopRecord = await shopRepository.findOne({ id });

  if (!shopRecord) {
    throw new HttpError(404, `Shop <id:${id}> not found`);
  }

  return shopRecord;
};

export const getShopByHandle = async (handle: string): Promise<Shop> => {
  const shopRecord = await getShopRepository().findOne({ handle }, { relations: ['owner'] });

  if (!shopRecord) {
    throw new HttpError(404, `Shop <handle:${handle}> not found`);
  }

  return shopRecord;
};

/**
 * Save
 */

export const saveShop = async (shopRecord: Shop) => {
  try {
    await getShopRepository().save(shopRecord);
  } catch (e) {
    if (e.detail && e.detail.match(/handle(.*)already exists/)) {
      // TODO To test
      throw new HttpError(422, 'This handle is already used');
    }
    throw e;
  }
};

/**
 * Create
 */

export const createShop = async (shop: ParsedJson): Promise<Shop> => {
  const shopRecord = getShopRepository().create(shop);

  await saveShop(shopRecord);

  return shopRecord;
};

/**
 * Update
 */

export const updateShop = async (shopId: string, shop: ParsedJson): Promise<Shop> => {
  const shopRecord = await getShopById(shopId);

  Object.assign(shopRecord, shop);
  await saveShop(shopRecord);

  return shopRecord;
};
