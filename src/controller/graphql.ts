import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';

import TTracker, { EVENTS } from '@tom/server/tom_tracker';

// Graphql resolvers
import { UserResolver } from './resolver/user';

export const buildGraphQlServer = async () => {
    const schema = await buildSchema({
        resolvers: [UserResolver],
    });

    return new ApolloServer({
        schema,
        context: ({ ctx }) => ({
            ...ctx,
            tracker: new TTracker(),
            trackerEvents: EVENTS,
        }),
    });
};
