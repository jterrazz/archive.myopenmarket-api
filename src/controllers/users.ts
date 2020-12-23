import { getUser } from '../entities/user.repository';
import { Middleware } from 'koa';
import { getConnection } from 'typeorm';

import Logger from '@services/logger';
import AuthenticationService from '@services/authentication';
import { EVENTS } from '@services/tracker';
import { User } from '~/entities/user.entity';
import { updateUser, getUserFollowedShops, addUserFollowedShop } from '~/entities/user.repository';

const logger = new Logger(__filename);

// Controllers

export const getUserController: Middleware = async (ctx) => {
    ctx.tracker.track(EVENTS.routes.getUser);

    const userRecord = await getUser(ctx.params.userId);

    ctx.body = userRecord.toPublicProps();
};

export const getMeController: Middleware = async (ctx) => {
    ctx.tracker.track(EVENTS.routes.getAuthenticatedUser);

    const userRecord = await getUser(ctx.state.user.id);

    ctx.body = userRecord.toPrivateProps();
};

export const deleteMeController: Middleware = async (ctx) => {
    ctx.tracker.track(EVENTS.routes.deleteAuthenticatedUser);

    await new AuthenticationService().deleteUser(ctx.state.user.id, ctx.request.body.password);

    ctx.status = 200;
};

export const updateMeController: Middleware = async (ctx) => {
    // TODO Validate body with shared schema !!!!
    ctx.tracker.track(EVENTS.routes.patchAuthenticatedUser);

    const userRecord = await updateUser(ctx.state.user.id, ctx.request.body);

    ctx.body = userRecord.toPrivateProps();
};

// Followed shops

export const getMyFollowedShopsController: Middleware = async (ctx) => {
    // ctx.tracker.track(EVENTS.routes.getAuthenticatedUser);

    ctx.body = await getUserFollowedShops(ctx.state.user.id);
};

export const followShopController: Middleware = async (ctx) => {
    // ctx.tracker.track(EVENTS.routes.getAuthenticatedUser);

    ctx.body = await addUserFollowedShop(ctx.state.user.id, ctx.query.shopId);
};
