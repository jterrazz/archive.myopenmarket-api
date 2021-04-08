import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

import { User } from '../entities/user.entity';

export enum UserActivity {
  updateProfile = 'update-profile',
}

/**
 * Entity
 */

@Entity()
export class Activity {
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
