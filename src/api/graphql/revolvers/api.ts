import { Resolver, Query, Ctx } from 'type-graphql';

import { apiConfig } from '@config';
import { ApiState } from '~/api/graphql/types/api';
import { EVENTS } from '@services/tracker';
import { Context } from 'koa';

@Resolver()
export class ApiResolver {
    @Query(() => ApiState)
    async state(@Ctx() ctx: Context) {
        ctx.tracker.track(EVENTS.routes.getState);

        return {
            version: apiConfig.version,
            state: 'OK',
            env: apiConfig.env,
            time: new Date(),
        };
    }
}
