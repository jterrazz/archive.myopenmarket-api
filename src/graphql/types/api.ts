import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class ApiState {
    @Field()
    version: string;

    @Field()
    state: string;

    @Field()
    env: string;

    @Field()
    time: string;
}
