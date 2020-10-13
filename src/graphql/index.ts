import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';

import Tracker from '@services/tracker';
import { ApiResolver } from './revolvers/api';

export default async () => {
    const schema = await buildSchema({
        resolvers: [ApiResolver],
    });

    return new ApolloServer({
        schema,
        context: ({ ctx }) => ({
            ...ctx,
            tracker: new Tracker(ctx),
        }),
    });
};
