import { Middleware } from 'koa';
import Logger from '@services/logger';
import AuthenticationService from '@services/authentication';
import { EVENTS } from '@services/tracker';
import { persistUser, retrieveUserSimple } from '@models/user';

const logger = new Logger(__filename);

// Controllers

export const getUserController: Middleware = async (ctx) => {
    ctx.tracker.track(EVENTS.routes.getUser);
    const userRecord = await retrieveUserSimple(ctx.state.user._id);
    ctx.body = userRecord.toPublicProps();
};

export const getMeController: Middleware = async (ctx) => {
    ctx.tracker.track(EVENTS.routes.getAuthenticatedUser);
    const userRecord = await retrieveUserSimple(ctx.state.user._id);
    ctx.body = userRecord.toPrivateProps();
};

export const deleteMeController: Middleware = async (ctx) => {
    ctx.tracker.track(EVENTS.routes.deleteAuthenticatedUser);
    await new AuthenticationService().deleteUser(ctx.state.user._id, ctx.request.body.password);
    ctx.status = 200;
};

export const updateMeController: Middleware = async (ctx) => {
    // TODO Validate body with shared schema !!!!
    ctx.tracker.track(EVENTS.routes.patchAuthenticatedUser);
    const userRecord = await retrieveUserSimple(ctx.state.user._id);

    Object.assign(userRecord, ctx.request.body);
    await persistUser(userRecord, ctx.request.ip);
    ctx.body = userRecord.toPrivateProps();
};
