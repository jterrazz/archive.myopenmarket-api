import * as argon2 from 'argon2';
import * as z from 'zod';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Activity } from './activity.entity';
import { Language } from './language.entity';
import { RoleFilter } from '@utils/role-filter';
import { Shop } from './shop.entity';

/**
 * Schema
 */

export const userSchema = {
  email: z.string().email(),
  firstName: z.string().min(1).max(42),
  id: z.string(),
  lastName: z.string().min(1).max(42),
  password: z.string().min(8).max(100),
};

export const userEmailSchema = userSchema.email;
export const userPasswordSchema = userSchema.password;
export const updateUserRequestSchema = z.object({
  email: userSchema.email.optional(),
  firstName: userSchema.firstName.optional(),
  lastName: userSchema.lastName.optional(),
  password: userSchema.password.optional(),
});
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export const createUserRequestSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
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

  @Column({ default: '', name: 'password_hashed' })
  passwordHashed: string;

  @Column({ enum: Language, nullable: true })
  language: string;

  @OneToMany(() => Activity, (activity) => activity.user)
  activities: Activity[];

  @OneToMany(() => Shop, (shop) => shop.owner)
  ownedShops: Shop[];

  @ManyToMany(() => Shop)
  @JoinTable({
    inverseJoinColumn: {
      name: 'shop_id',
      referencedColumnName: 'id',
    },
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    name: 'user_followed_shops',
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
