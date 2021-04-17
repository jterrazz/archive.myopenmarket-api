import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import * as z from 'zod';
import * as argon2 from 'argon2';

import { RoleFilter } from '@utils/role-filter';
import { Language } from './language.entity';
import { Shop } from './shop.entity';
import { Activity } from './activity.entity';

/**
 * Schema
 */

export const userSchema = {
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstName: z.string().min(1).max(42),
  lastName: z.string().min(1).max(42),
};

export const userEmailSchema = userSchema.email;
export const userPasswordSchema = userSchema.password;
export const updateUserRequestSchema = z.object({
  email: userSchema.email.optional(),
  password: userSchema.password.optional(),
  firstName: userSchema.firstName.optional(),
  lastName: userSchema.lastName.optional(),
});
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export const createUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;

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

  // orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

  async updatePassword(password: string): Promise<void> {
    this.passwordHashed = await argon2.hash(password);
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await argon2.verify(this.passwordHashed, password);
  }
}
