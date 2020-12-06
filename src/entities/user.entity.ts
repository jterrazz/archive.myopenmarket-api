import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import _ from 'lodash';

const PUBLIC_DATA_KEYS = ['id', 'firstName', 'lastName', 'language'];
const PRIVATE_DATA_KEYS = ['email', ...PUBLIC_DATA_KEYS];

export enum UserLanguage {
    fr = 'fr-FR',
    en = 'en-EN',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true, nullable: true })
    handle: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'password_hashed', default: '' })
    passwordHashed: string;

    @Column({ enum: UserLanguage })
    language: string;

    // activity: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    // orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    // shops: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],

    toPublicProps(): User {
        return _.pick(this, PUBLIC_DATA_KEYS);
    }

    toPrivateProps() {
        return _.pick(this, PRIVATE_DATA_KEYS);
    }
}
