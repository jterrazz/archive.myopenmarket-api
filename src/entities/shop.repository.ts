import { getConnection } from 'typeorm';
import { HttpError } from '@services/error';

import { Shop } from './shop.entity';

export const getShop = async (handle: string): Promise<Shop> => {
    const shopRepository = getConnection().getRepository(Shop);
    const shopRecord = await shopRepository.findOne({ handle }, { relations: ['owner'] });

    console.log(shopRecord);

    if (!shopRecord) {
        throw new HttpError(422, 'Missing shop record or user record');
    }

    return shopRecord;
};
