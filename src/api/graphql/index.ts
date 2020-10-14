import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';

import { ApiResolver } from './revolvers/api';
import { UserResolver } from './revolvers/user';

export default async () => {
    const schema = await buildSchema({
        resolvers: [ApiResolver, UserResolver],
    });

    return new ApolloServer({
        schema,
        context: ({ ctx }) => {
            return ctx;
        },
    });
};
