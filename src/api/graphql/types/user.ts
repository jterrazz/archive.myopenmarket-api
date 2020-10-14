import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class UserPrivateInfos {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    language: string;
}
