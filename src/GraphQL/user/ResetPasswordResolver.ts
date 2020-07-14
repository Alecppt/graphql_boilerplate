import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { forgetPasswordPrefix } from '../utils/prefixConstant';
import { ContextInterface } from '../../types/ContextInterface';
import { redis } from '../../util/redis';
import * as bcrypt from 'bcrypt';

@Resolver()
export class ResetPasswordResolver {
  @Mutation(() => User, { nullable: true }) async resetPassword(
    @Arg('token') token: string,
    @Arg('password') password: string,
    @Ctx() ctx: ContextInterface
  ): Promise<User | null> {
    const redis_token = forgetPasswordPrefix + token;
    const userId = await redis.get(redis_token);
    if (!userId) return null;
    const user = await User.findOne(userId);
    if (user) {
      user.password = await bcrypt.hash(password, 10);
      user.save();
      redis.del(redis_token);
      return user;
    }
    return null;
  }
}
