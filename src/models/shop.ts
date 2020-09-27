import mongoose, { Document, Schema } from 'mongoose';
import _ from 'lodash';
import { UserInterface } from '@models/user';
import { ProductInterface } from '@models/product';

// Produit/store: Enseigne
// Et disponible à distance

export interface ShopInterface extends Document {
    handle: string;
    name: string;
    description: string;
    address: string;
    owner: UserInterface;
    products: ProductInterface;
}

const ShopSchema: Schema = new Schema({
    handle: { type: String, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true }, // TODO Maybe use array
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

/**
 * JS Getters
 */

const PUBLIC_DATA_KEYS = ['_id', 'name', 'description', 'address', 'owner', 'product'];
const PRIVATE_DATA_KEYS = [...PUBLIC_DATA_KEYS];

ShopSchema.methods = {
    toPublicProps: function (): UserInterface {
        return _.pick(this, PUBLIC_DATA_KEYS);
    },
    toPrivateProps: function () {
        return _.pick(this, PRIVATE_DATA_KEYS);
    },
};

const Shop = mongoose.model<ShopInterface>('Shop', ShopSchema);

export default Shop;
