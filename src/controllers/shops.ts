import { getShop } from '../entities/shop.repository';
import { getUser } from '../entities/user.repository';
import { Middleware } from 'koa';

import Logger from '@services/logger';
import { EVENTS } from '@services/tracker';

const logger = new Logger(__filename);

// Controllers

export const getShopController: Middleware = async (ctx) => {
  // ctx.tracker.track(EVENTS.routes.getUser);

  const shopRecord = await getShop(ctx.params.shopHandle);

  console.log('shopRecord');
  console.log(shopRecord);

  ctx.body = shopRecord.toPublicProps();
};
