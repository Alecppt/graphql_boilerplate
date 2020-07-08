import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { ContextInterface } from '../../types/ContextInterface';
import { redis } from '../../util/redis';

@Resolver()
export class ConfirmAccountResolver {
  @Mutation(() => Boolean) async confirmAccount(
    @Arg('token') token: string,
    @Ctx() ctx: ContextInterface
  ): Promise<Boolean> {
    const userId = await redis.get(token);
    if (userId) {
      await User.update({ id: userId }, { isConfirmed: true });
      redis.del(token);
      return true;
    }
    return false;
  }
}
