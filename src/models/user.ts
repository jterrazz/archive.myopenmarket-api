import mongoose, { Schema, Document } from 'mongoose';
import _ from 'lodash';

import { ActivityInterface, OrderInterface, ShopInterface } from '@model';

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

export const User = mongoose.model<UserInterface>('User', UserSchema);
