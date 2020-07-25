import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import _ from 'lodash';

export enum UserLanguage {
    fr = 'fr-FR',
    en = 'en-EN',
}

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Field(() => String)
    email: string;

    @Column()
    passwordHashed: string;

    @Column()
    @Field(() => String)
    firstName: string;

    @Column()
    @Field(() => String)
    lastName: string;

    @Column({ default: UserLanguage.en })
    @Field(() => String)
    language: UserLanguage;

    /**
     * JS Getters
     */

    PUBLIC_DATA_KEYS = ['firstName', 'lastName', 'username', 'language'];
    get publicData() {
        return _.pick(this, this.PUBLIC_DATA_KEYS);
    }

    PRIVATE_DATA_KEYS = ['email', ...this.PUBLIC_DATA_KEYS];
    get privateData() {
        return _.pick(this, this.PRIVATE_DATA_KEYS);
    }
}
