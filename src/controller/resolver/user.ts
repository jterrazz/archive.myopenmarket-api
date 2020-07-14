import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql';

import { User } from '@model';
import { getRepository } from 'typeorm';

@Resolver()
export class UserResolver {
    @Query(() => User, { nullable: true })
    async users(@Ctx() ctx: any) {
        ctx.tracker.track(ctx.trackerEvents.GET_USER);

        const userRepository = getRepository(User);

        return await userRepository.findOne();
    }

    // @Mutation(() => Boolean)
    // async deleteUser(@Arg('id') id: string) {
    //     const user = await userRepository.findOne({ where: { id } });

    //     if (!user) {
    //         throw new Error(`The user with id: ${id} does not exist!`);
    //     }

    //     // await user.remove();
    //     return true;
    // }
}
