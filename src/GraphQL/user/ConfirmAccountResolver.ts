import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { ContextInterface } from '../../types/ContextInterface';
import { redis } from '../../util/redis';
import { registerAccountPrefix } from '../utils/prefixConstant';
@Resolver()
export class ConfirmAccountResolver {
  @Mutation(() => Boolean) async confirmAccount(
    @Arg('token') token: string,
    @Ctx() ctx: ContextInterface
  ): Promise<Boolean> {
    const redis_token = registerAccountPrefix + token;
    const userId = await redis.get(redis_token);
    if (userId) {
      await User.update({ id: userId }, { isConfirmed: true });
      redis.del(redis_token);
      return true;
    }
    return false;
  }
}
