import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql';
import { getRepository } from 'typeorm';

import { User } from '@model';
import { UpdateUserInput } from '@controllers/graphql/inputs/UpdateUserInput';

@Resolver()
export class UserResolver {
    @Query(() => User, { nullable: true })
    async user(@Ctx() context: any, @Arg('id') id: number) {
        const userRecord = await getRepository(User).findOne({ id });

        return userRecord ? userRecord.publicData : null;
    }

    @Mutation(() => User)
    async updateUser(@Ctx() context: any, @Arg('data') data: UpdateUserInput) {
        context.assertIsLoggedIn();
        const user = await getRepository(User).findOne({ id: context.user.id });
        if (!user) throw new Error('User not found!');

        Object.assign(user, data);
        const userRecord = await getRepository(User).save(user);
        return userRecord.privateData;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg('password') password: string) {
        console.log(password);

        return true;
    }
}
