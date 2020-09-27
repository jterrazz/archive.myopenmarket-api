import { Middleware } from 'koa';
import Logger from '@services/logger';
import { EVENTS } from '@services/tracker';
import Shop from '@models/shop';

const logger = new Logger(__filename);

// Controllers

export const getShopDetqailsController: Middleware = async (ctx) => {
    ctx.tracker.track(EVENTS.routes.getUser);
    const shopRecord = await
    ctx.body = shopRecord.toPublicProps();
};
