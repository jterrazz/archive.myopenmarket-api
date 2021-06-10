import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoleFilter } from '@utils/role-filter';
import { User } from './/user.entity';

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
