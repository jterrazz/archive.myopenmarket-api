import { Resolver, Query, InputType } from 'type-graphql';

import { MaxLength, Length } from 'class-validator';

@InputType()
export class RecipeInput {
    @Field()
    @MaxLength(30)
    title: string;

    @Field({ nullable: true })
    @Length(30, 255)
    description?: string;

    @Field((type) => [String])
    @MaxArraySize(25)
    ingredients: string[];
}

@Resolver((of) => Recipe)
export class RecipeResolver {
    constructor(
        private readonly recipeRepository: Repository<Recipe>,
        private readonly rateRepository: Repository<Rate>,
    ) {}

    @Query((returns) => Recipe)
    async recipe(@Arg('recipeId') recipeId: string) {
        return this.recipeRepository.findOneById(recipeId);
    }

    @Mutation((returns) => Recipe)
    async addRecipe(@Arg('recipe') recipeInput: RecipeInput) {
        const newRecipe = this.recipeRepository.create(recipeInput);
        return this.recipeRepository.save(newRecipe);
    }

    @FieldResolver()
    ratings(@Root() recipe: Recipe) {
        return this.rateRepository.find({ recipeId: recipe.id });
    }
}
