import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  getConnection,
} from 'typeorm';

import { PropertyAccess } from './entity/property-access';
import { Language } from './language.entity';
import { Shop } from './shop.entity';
import * as Joi from 'joi';
import * as argon2 from 'argon2';

/**
 * Schema
 */

export const updateUserSchema = Joi.object()
  .keys({
    email: Joi.string().email(),
    password: Joi.string().min(8).max(100),
    firstName: Joi.string().max(42),
    lastName: Joi.string().max(42),
  })
  .required();

export const newUserSchema = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
    firstName: Joi.string().max(42).required(),
    lastName: Joi.string().max(42).required(),
  })
  .required();

/**
 * Entity
 */

@Entity()
export class User extends PropertyAccess {
  constructor() {
    super();
    this.addPublicProperties(['id', 'firstName', 'lastName', 'language']);
    this.addSelfProperties(['email']);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'password_hashed', default: '' })
  passwordHashed: string;

  @Column({ enum: Language })
  language: string;

  @OneToMany(() => Shop, (shop) => shop.owner)
  ownedShops: Shop;

  @ManyToMany(() => Shop)
  @JoinTable({
    name: 'user_followed_shops',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'shop_id',
      referencedColumnName: 'id',
    },
  })
  followedShops: Shop[];

  // activity: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  // orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

  async updatePassword(password) {
    this.passwordHashed = await argon2.hash(password);
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await argon2.verify(this.passwordHashed, password);
  }
}

export const getUserRepository = () => getConnection().getRepository(User);
