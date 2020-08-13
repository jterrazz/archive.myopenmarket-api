import mongoose, { Document, Schema } from 'mongoose';
import { UserInterface, ProductInterface } from '@model';

export interface StoreInterface extends Document {
    alias: string;
    name: string;
    description: string;
    address: string;
    owner: UserInterface;
    products: ProductInterface;
}

const StoreSchema: Schema = new Schema({
    alias: { type: String, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true }, // TODO Maybe use array
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

export const Store = mongoose.model<StoreInterface>('Store', StoreSchema);
