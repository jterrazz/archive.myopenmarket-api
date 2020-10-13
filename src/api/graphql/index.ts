import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';

import { ApiResolver } from './revolvers/api';

export default async () => {
    const schema = await buildSchema({
        resolvers: [ApiResolver],
    });

    return new ApolloServer({
        schema,
        context: ({ ctx }) => {
            return ctx;
        },
    });
};
