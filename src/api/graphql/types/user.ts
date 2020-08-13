import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@ObjectType()
export class PublicUserSchema {
    @Field(() => ID)
    _id: string;
    @Field()
    lastName: string;
    @Field()
    language: string;
    @Field()
    firstName: string;
}

interface CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
}

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    @Length(1, 30)
    firstName?: string;

    @Field({ nullable: true })
    @Length(1, 30)
    lastName?: string;
}
