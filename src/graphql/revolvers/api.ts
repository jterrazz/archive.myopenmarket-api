import { Resolver, Query } from 'type-graphql';
import { apiConfig } from '@config';
import { ApiState } from '~/graphql/types/api';

@Resolver()
export class ApiResolver {
    @Query(() => ApiState)
    async state() {
        return {
            version: apiConfig.version,
            state: 'OK',
            env: apiConfig.env,
            time: new Date(),
        };
    }
}
