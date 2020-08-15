import mongoose, { Document, Schema } from 'mongoose';
import { ShopInterface } from '@model';

export enum ProductCategory {
    food = 'food',
    item = 'item',
}

export enum ProductCondition {
    used = 'used',
    new = 'new',
}

export interface ProductInterface extends Document {
    store: ShopInterface;
    price: number;
    category: ProductCategory;
    condition: ProductCondition;
    tags: string[];
}

const ProductSchema: Schema = new Schema({
    shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
    price: { type: Number, required: true },
    category: { type: ProductCategory, required: true },
    condition: { type: ProductCondition, required: true },
    tags: [{ type: String }],
});

export const Product = mongoose.model<ProductInterface>('Product', ProductSchema);
