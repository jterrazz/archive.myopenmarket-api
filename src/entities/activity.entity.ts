import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

import { User } from '../entities/user.entity';
import { RoleFilter } from '@utils/role-filter';

export enum UserActivity {
  updateProfile = 'update-profile',
  updateShop = 'update-shop',
}

/**
 * Entity
 */

@Entity()
export class Activity extends RoleFilter {
  constructor() {
    super();
    this.addSelfProperties(['ipAddress', 'type', 'created']);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.activities)
  user: User;

  @Column({ name: 'ip_address' })
  ipAddress: string;

  @Column({ enum: UserActivity })
  type: UserActivity;

  @CreateDateColumn()
  created?: Date;
}
