import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql';
import { getRepository } from 'typeorm';

import { User } from '@model';

@Resolver()
export class UserResolver {
    @Query(() => User, { nullable: true })
    async users(@Ctx() context: any) {
        context.assertIsLoggedIn();

        context.tracker.track(context.tracker.EVENTS.GET_USER);

        return await getRepository(User).findOne();
    }

    @Mutation(() => Boolean)
    async createUser(@Arg('firstName') firstName: string) {
        console.log(firstName);

        return true;
    }
}
