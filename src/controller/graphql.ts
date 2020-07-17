import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';

// Graphql resolvers
import { UserResolver } from './resolver/user';

// Graphql middlewares
import { gqlAuthenticationMiddleware } from '~/middleware/gql-authentication';
import { gqlTrackerMiddleware } from '~/middleware/gql-tracker';

const GQL_MIDDLEWARES = [gqlAuthenticationMiddleware, gqlTrackerMiddleware];

export const buildGraphQlServer = async () => {
    const schema = await buildSchema({
        resolvers: [UserResolver],
    });

    return new ApolloServer({
        schema,
        context: (ctx) => {
            return GQL_MIDDLEWARES.reduce((accumulator: object, middleware: Function) => {
                return middleware(accumulator);
            }, ctx);
        },
    });
};
