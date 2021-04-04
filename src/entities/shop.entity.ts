import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';

import { PropertyAccess } from './entity/property-access';
import { User } from './user.entity';

@Entity()
export class Shop extends PropertyAccess {
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
