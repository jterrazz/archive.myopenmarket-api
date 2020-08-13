import { Context } from 'koa';
import { ContextUser } from '~/api/graphql/middlewares/authentication';

export interface GqlContext {
    ctx: Context;
    user?: ContextUser;
}
