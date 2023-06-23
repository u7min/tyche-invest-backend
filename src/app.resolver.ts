import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  public appRoot(): string {
    return 'Hello world!';
  }
}
