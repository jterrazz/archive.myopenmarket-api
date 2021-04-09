import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import * as Joi from 'joi';
import * as argon2 from 'argon2';

import { RoleFilter } from '@utils/role-filter';
import { Language } from './language.entity';
import { Shop } from './shop.entity';
import { Activity } from './activity.entity';

/**
 * Schema
 */

export const userSchema = {
  id: Joi.string().id().disallow(null),
  email: Joi.string().email().disallow(null),
  password: Joi.string().min(8).max(100).disallow(null),
  firstName: Joi.string().min(1).max(42).disallow(null),
  lastName: Joi.string().min(1).max(42).disallow(null),
};

export const userEmailValidator = userSchema.email.required();
export const userPasswordValidator = userSchema.password.required();
export const updateUserValidator = Joi.object({
  email: userSchema.email,
  password: userSchema.password,
  firstName: userSchema.firstName,
  lastName: userSchema.lastName,
}).required();
export const newUserValidator = Joi.object({
  email: userSchema.email.required(),
  password: userSchema.password.required(),
  firstName: userSchema.firstName.required(),
  lastName: userSchema.lastName.required(),
}).required();

/**
 * Entity
 */

@Entity()
export class User extends RoleFilter {
  constructor() {
    super();
    this.addPublicProperties(['id', 'firstName', 'lastName', 'language', 'activities']);
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

  @Column({ enum: Language, nullable: true })
  language: string;

  @OneToMany(() => Activity, (activity) => activity.user)
  activities: Activity[];

  @OneToMany(() => Shop, (shop) => shop.owner)
  ownedShops: Shop[];

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
