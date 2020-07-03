import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import * as bcrypt from 'bcrypt';
import { ContextInterface } from '../../types/ContextInterface';

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true }) async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: ContextInterface
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }
    const isPasssWordValid = await bcrypt.compare(password, user.password);
    if (!isPasssWordValid) {
      return null;
    }
    ctx.req.session!.userId = user.id;
    return user;
  }
}
