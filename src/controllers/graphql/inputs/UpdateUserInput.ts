import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    @Length(1, 30)
    firstName?: string;

    @Field({ nullable: true })
    @Length(1, 30)
    lastName?: string;
}
