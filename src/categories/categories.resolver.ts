import { Args, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Role } from '../auth/role.decorator';
import {
  AllCategoriesInput,
  AllCategoriesOutput,
} from './dtos/all-categories.dto';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Role(['Any'])
  @Query(() => AllCategoriesOutput)
  allCategories(
    @Args('input') input: AllCategoriesInput,
  ): Promise<AllCategoriesOutput> {
    return this.categoriesService.findAllCategories(input);
  }
}
