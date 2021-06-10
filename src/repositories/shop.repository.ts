import { Repository, getConnection } from 'typeorm';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '~/models/errors/http.error';
import { Shop, UpdateShopRequest } from '~/models/shop.entity';

export const getShopRepository = (): Repository<Shop> => getConnection().getRepository(Shop);

/**
 * Get
 */

export const getShopById = async (id: string): Promise<Shop> => {
  const shopRepository = getConnection().getRepository(Shop);
  const shopRecord = await shopRepository.findOne({ id });

  if (!shopRecord) {
    throw new HttpError(StatusCodes.NOT_FOUND, `Shop <id:${id}> not found`);
  }

  return shopRecord;
};

export const getShopByHandle = async (handle: string): Promise<Shop> => {
  const shopRecord = await getShopRepository().findOne({ handle }, { relations: ['owner'] });

  if (!shopRecord) {
    throw new HttpError(StatusCodes.NOT_FOUND, `Shop <handle:${handle}> not found`);
  }

  return shopRecord;
};

/**
 * Save
 */

export const saveShop = async (shopRecord: Shop): Promise<void> => {
  try {
    await getShopRepository().save(shopRecord);
  } catch (e) {
    if (e.detail && e.detail.match(/handle(.*)already exists/)) {
      // TODO To test
      throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, 'This handle is already used');
    }
    throw e;
  }
};

/**
 * Create
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createShop = async (shop: string): Promise<Shop> => {
  // TODO type input
  const shopRecord = await getShopRepository().create({});

  await saveShop(shopRecord);

  return shopRecord;
};

/**
 * Update
 */

export const updateShop = async (shopId: string, shop: UpdateShopRequest): Promise<Shop> => {
  // TODO type input
  const shopRecord = await getShopById(shopId);

  Object.assign(shopRecord, shop);
  await saveShop(shopRecord);

  return shopRecord;
};
