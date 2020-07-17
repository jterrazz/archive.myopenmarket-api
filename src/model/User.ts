import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import _ from 'lodash';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field(() => String)
    firstName: string;

    @Column()
    @Field(() => String)
    lastName: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    passwordHashed: string;

    get publicData() {
        const publicKeys = ['id', 'firstName', 'lastName'];
        return _.pick(this, publicKeys);
    }
}
