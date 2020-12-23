import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import _ from 'lodash';

import { User } from './user.entity';

const PublicProp = () => {
    return (
        target: any,
        propertyKey: string,
        // descriptor?: TypedPropertyDescriptor<() => void>,
    ): any => {
        const getter = function () {
            return target['blyat'];
        };
        const setter = function (newVal: string) {
            target['blyat'] = newVal;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
        // if (descriptor) {
        //     descriptor.value = function () {
        //         return value || 'ok';
        //     };
        // }
        // return descriptor;
    };
};

class PublicPrivateEntity {
    publicProps?: string[];
    privateProps?: string[];

    toPublicProps() {
        // TODO Filter public props everywhere
        const props = _.pick(this, this.publicProps);

        if (props.owner) {
            props.owner = props.owner.toPublicProps(); // TODO For each prop and for private too
        }
        return props;
    }

    toPrivateProps() {
        return _.pick(this, [...this.publicProps, ...this.privateProps]);
    }
}

@Entity()
export class Shop extends PublicPrivateEntity {
    publicProps = ['handle', 'name', 'description', 'owner'];
    privateProps = [];

    @PrimaryGeneratedColumn()
    id: string;

    @PublicProp()
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
