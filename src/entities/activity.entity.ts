import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  type: string;

  @Column({ name: 'ip_address' })
  ipAddress: string;
}
