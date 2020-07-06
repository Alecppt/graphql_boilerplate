import { Resolver, Query, UseMiddleware } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';

@Resolver()
export class HelloResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
