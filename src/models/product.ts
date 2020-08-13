import mongoose, { Document, Schema } from 'mongoose';
import { StoreInterface } from '@model';

export enum ProductCategory {
    food = 'food',
    item = 'item',
}

export enum ProductCondition {
    used = 'used',
    new = 'new',
}

export interface ProductInterface extends Document {
    store: StoreInterface;
    price: number;
    category: ProductCategory;
    condition: ProductCondition;
    tags: string[];
}

const ProductSchema: Schema = new Schema({
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    price: { type: Number, required: true },
    category: { type: ProductCategory, required: true },
    condition: { type: ProductCondition, required: true },
    tags: [{ type: String }],
});

export const Product = mongoose.model<ProductInterface>('Product', ProductSchema);
