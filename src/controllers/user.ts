import { Middleware } from 'koa';
import * as Joi from '@hapi/joi';

import { User, Activity } from '@model';
import { HttpError, Logger } from '@tom';
import AuthenticationService from '@services/authentication';

const logger = new Logger(__filename);

export const getUserController: Middleware = async (ctx) => {
    const userRecord = await User.findOne({ _id: ctx.params.userId });
    return userRecord ? userRecord.toPublicProps() : null; // TODO Tranform to es2020 syntax
};

export const deleteMeController: Middleware = async (ctx) => {
    // TODO Add schema check
    await new AuthenticationService().deleteUser(ctx.state.user._id, ctx.body.password);
};

export const updateMeController: Middleware = async (ctx) => {
    try {
        const userRecord = await User.findOne({ _id: ctx.state.user._id });
        if (!userRecord) {
            throw new HttpError(404, 'Authenticated user not found');
        }

        Object.assign(userRecord, ctx.request.body); // TODO Validate body with shared schema !!!!
        const activity = new Activity({ ipAddress: 'test', type: 'test' });
        await activity.save();
        userRecord.activity.push(activity);
        await userRecord.save();
        ctx.body = userRecord.toPrivateProps();
    } catch (e) {
        if (e.code == 11000 && e.keyPattern && e.keyPattern.hasOwnProperty('email')) {
            throw new HttpError(422, 'This email is already used');
        }
    }
};
