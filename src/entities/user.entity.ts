import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import _ from 'lodash';

import { Shop } from './shop.entity';

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

    @OneToMany(() => Shop, (shop) => shop.owner)
    ownedShops: Shop;

    @ManyToMany(() => Shop)
    @JoinTable({
        name: 'user_followed_shops',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'shop_id',
            referencedColumnName: 'id',
        },
    })
    followedShops: Shop[];

    // activity: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    // orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

    toPublicProps() {
        return _.pick(this, PUBLIC_DATA_KEYS);
    }

    toPrivateProps() {
        return _.pick(this, PRIVATE_DATA_KEYS);
    }
}
