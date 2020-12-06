import { Middleware } from 'koa';
import { getConnection } from 'typeorm';

import Logger from '@services/logger';
import AuthenticationService from '@services/authentication';
import { EVENTS } from '@services/tracker';
import { User } from '~/entities/user.entity';
import { UserRepository } from '~/entities/user.repository';

const logger = new Logger(__filename);

// Controllers

export const getUserController: Middleware = async (ctx) => {
    ctx.tracker.track(EVENTS.routes.getUser);

    const userRepository = await getConnection().getRepository(User);
    const userRecord = await userRepository.findOne({ id: ctx.state.user.id });

    ctx.body = userRecord.toPublicProps();
};

export const getMeController: Middleware = async (ctx) => {
    // TODO Asset is logged
    ctx.tracker.track(EVENTS.routes.getAuthenticatedUser);

    const userRepository = await getConnection().getRepository(User);
    const userRecord = await userRepository.findOne({ id: ctx.state.user.id });

    ctx.body = userRecord.toPrivateProps();
};

export const deleteMeController: Middleware = async (ctx) => {
    // TODO Asset is logged
    ctx.tracker.track(EVENTS.routes.deleteAuthenticatedUser);

    await new AuthenticationService().deleteUser(ctx.state.user.id, ctx.request.body.password);

    ctx.status = 200;
};

export const updateMeController: Middleware = async (ctx) => {
    // TODO Asset is logged
    // TODO Validate body with shared schema !!!!
    ctx.tracker.track(EVENTS.routes.patchAuthenticatedUser);

    const userRecord = await UserRepository.updateUser(ctx.state.user.id, ctx.request.body);

    ctx.body = userRecord.toPrivateProps();
};
