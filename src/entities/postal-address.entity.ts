import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostalAddress {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created?: Date;
}
