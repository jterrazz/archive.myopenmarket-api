import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import * as Joi from 'joi';

import { RoleFilter } from '@utils/role-filter';
import { User } from './user.entity';

/**
 * Schema
 */

export const shopSchema = {
  id: Joi.string().id(),
  handle: Joi.string().id(),
  name: Joi.string().id(),
  description: Joi.string().id(),
};

export const shopIdValidator = shopSchema.id.required();
export const updateShopValidator = Joi.object({
  name: shopSchema.name.disallow(null),
}).required();

/**
 * Entity
 */

@Entity()
export class Shop extends RoleFilter {
  constructor() {
    super();
    this.addPublicProperties(['id', 'handle', 'name', 'description', 'owner']);
    this.addSelfProperties([]);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  handle: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User)
  users: User[];

  // @Column()
  // address: Address;

  @ManyToOne(() => User, (user) => user.ownedShops)
  owner: User;

  // @Column()
  // products: ProductInterface;
}
