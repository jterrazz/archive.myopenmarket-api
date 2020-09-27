import mongoose, { Schema, Document } from 'mongoose';
import _ from 'lodash';
import Activity, { ActivityInterface } from './activity';
import { OrderInterface } from './order';
import { ShopInterface } from './shop';
import { HttpError } from '@services/error';

export enum UserLanguage {
    fr = 'fr-FR',
    en = 'en-EN',
}

export interface UserInterface extends Document {
    email: string;
    firstName: string;
    lastName: string;
    passwordHashed: string;
    language: UserLanguage;
    activity: [ActivityInterface];
    orders: [OrderInterface];
    stores: [ShopInterface];

    toPublicProps(): UserInterface;
    toPrivateProps(): UserInterface;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passwordHashed: { type: String, required: true },
    language: { type: UserLanguage, required: true },
    activity: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    shops: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
});

/**
 * JS Getters
 */

const PUBLIC_DATA_KEYS = ['_id', 'firstName', 'lastName', 'language'];
const PRIVATE_DATA_KEYS = ['email', ...PUBLIC_DATA_KEYS];

UserSchema.methods = {
    toPublicProps: function (): UserInterface {
        return _.pick(this, PUBLIC_DATA_KEYS);
    },
    toPrivateProps: function () {
        return _.pick(this, PRIVATE_DATA_KEYS);
    },
};

const User = mongoose.model<UserInterface>('User', UserSchema);

// Database wrappers

export const retrieveUserSimple = async (id: string): Promise<UserInterface> => {
    const userRecord = await User.findOne(
        { _id: id },
        {
            activity: { $slice: [0, 3] },
            orders: { $slice: [0, 3] },
        },
    ).select('-orders');

    if (!userRecord) {
        throw new HttpError(404, 'User not found');
    }
    return userRecord;
};

export const persistUser = async (
    userRecord: UserInterface,
    ipAddress: string,
): Promise<UserInterface> => {
    try {
        const activity = new Activity({ ipAddress, type: 'user-update' });
        await activity.save();
        userRecord.activity.push(activity);
        await userRecord.save();
        return userRecord;
    } catch (e) {
        if (e.code == 11000 && e.keyPattern?.hasOwnProperty('email')) {
            throw new HttpError(422, 'This email is already used');
        }
        throw e;
    }
};

export default User;
