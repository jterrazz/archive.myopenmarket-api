import { Resolver, Query, Ctx, Mutation, Arg } from 'type-graphql';
import { Context } from 'koa';

import { EVENTS } from '@services/tracker';
import { retrieveUserSimple } from '@models/user';
import { UserPrivateInfos } from '~/api/graphql/types/user';
import AuthenticationService from '@services/authentication';

@Resolver()
export class UserResolver {
    @Query(() => UserPrivateInfos, { nullable: true })
    async getAuthenticatedUser(@Ctx() ctx: Context) {
        // TODO Asset is logged
        ctx.tracker.track(EVENTS.routes.getAuthenticatedUser);

        const userRecord = await retrieveUserSimple(ctx.state.user._id);
        return userRecord.toPublicProps();
    }

    @Mutation(() => Boolean)
    async deleteAuthenticatedUser(@Ctx() ctx: Context, @Arg('password') password: string) {
        // TODO Asset is logged

        ctx.tracker.track(EVENTS.routes.deleteAuthenticatedUser);
        await new AuthenticationService().deleteUser(ctx.state.user._id, password);
        return true;
    }
}
