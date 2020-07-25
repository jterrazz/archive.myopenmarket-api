// isUserStore

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import _ from 'lodash';

@Entity()
@ObjectType()
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Field(() => String)
    alias: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    description: string;

    @Column()
    @Field(() => String)
    address: string;

    @Column()
    @Field(() => Boolean)
    isUser: boolean;

    // @Column()
    // @Field(() => Boolean)
    // owner: User;
}
