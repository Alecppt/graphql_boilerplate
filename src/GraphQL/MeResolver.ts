import 'reflect-metadata';
import { Resolver, Ctx, Query } from 'type-graphql';
import { User } from '../entity/User';
import { ContextInterface } from '../types/ContextInterface';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true }) async me(
    @Ctx() ctx: ContextInterface
  ): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }
    return User.findOne(ctx.req.session!.userId);
  }
}
