import { Middleware } from 'koa';
import * as Joi from '@hapi/joi';

import { User, Activity } from '@model';
import { Logger } from '@tom';
import AuthenticationService from '@services/authentication';

const logger = new Logger(__filename);

export const getUserController: Middleware = async (ctx, next) => {
    const userRecord = await User.findOne({ _id: ctx.params.userId });
    return userRecord ? userRecord.toPublicProps() : null; // TODO Tranform to es2020 syntax
};

export const deleteMeController: Middleware = async (ctx, next) => {
    await new AuthenticationService().deleteUser(ctx.user._id, ctx.body.password);
};

export const updateMeController: Middleware = async (ctx, next) => {
    const userRecord = await User.findOne({ _id: ctx.user._id });
    if (!userRecord) {
        throw new Error('Logged user not found');
    }

    Object.assign(userRecord, ctx.body); // TODO Validate body with shared schema !!!!
    const activity = new Activity({ ipAddress: 'test', type: 'test' });
    await activity.save();
    userRecord.activity.push(activity);
    await userRecord.save();
    ctx.body = userRecord.toPrivateProps();

    await next();
};
