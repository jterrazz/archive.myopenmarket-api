import * as z from 'zod';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoleFilter } from '@utils/role-filter';
import { User } from './user.entity';

/**
 * Schema
 */

export const shopSchema = {
  description: z.string(),
  handle: z.string(),
  id: z.string(),
  name: z.string(),
};

export const shopIdSchema = shopSchema.id;
export const updateShopRequestSchema = z.object({
  name: shopSchema.name.optional(),
});
export type UpdateShopRequest = z.infer<typeof updateShopRequestSchema>;

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
