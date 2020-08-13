import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql';

import { User, UserInterface, Activity } from '@model';
import { GqlContext, UpdateUserInput, PublicUserSchema } from '@types';
import AuthenticationService from '@services/authentication';

@Resolver()
export class UserResolver {
    @Query(() => PublicUserSchema, { nullable: true })
    async user(@Ctx() context: GqlContext, @Arg('id') id: string): Promise<UserInterface> {
        const userRecord = await User.findOne({ _id: id });
        return userRecord ? userRecord.toPublicProps() : null;
    }

    @Mutation(() => PublicUserSchema)
    async updateUser(@Ctx() context: GqlContext, @Arg('data') input: UpdateUserInput): Promise<UserInterface> {
        context.user.assertIsLoggedIn();
        const userRecord = await User.findOne({ _id: context.user._id });
        if (!userRecord) {
            throw new Error('User not found!');
        }

        Object.assign(userRecord, input);
        const activity = new Activity({ ipAddress: 'test', type: 'test' });
        await activity.save();
        userRecord.activity.push(activity);
        await userRecord.save();
        return userRecord.toPrivateProps();
    }

    @Mutation(() => Boolean)
    async deleteUser(@Ctx() context: GqlContext, @Arg('password') password: string): Promise<boolean> {
        context.user.assertIsLoggedIn();
        await new AuthenticationService().deleteUser(context.user._id, password);
        return true;
    }
}
