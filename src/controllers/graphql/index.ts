import { ApolloServer, addSchemaLevelResolveFunction } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';

// Graphql resolvers
import { UserResolver } from './resolvers/user';
import rootLevelResolver from './resolvers/root';

// Graphql middlewares
import { gqlAuthenticationMiddleware } from '@controllers/graphql/middlewares/authentication';
const GQL_MIDDLEWARES = [gqlAuthenticationMiddleware];

export const buildGraphQlServer = async () => {
    const schema = await buildSchema({
        resolvers: [UserResolver],
    });

    addSchemaLevelResolveFunction(schema, rootLevelResolver);

    return new ApolloServer({
        schema,
        context: (ctx) => {
            return GQL_MIDDLEWARES.reduce((accumulator: object, middleware: Function) => {
                return middleware(accumulator);
            }, ctx);
        },
        engine: {
            reportSchema: true,
        },
    });
};
