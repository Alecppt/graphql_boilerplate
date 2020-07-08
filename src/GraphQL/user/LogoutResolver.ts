import 'reflect-metadata';
import { Resolver, Mutation, Ctx } from 'type-graphql';
// import { User } from '../../entity/User';
import { ContextInterface } from '../../types/ContextInterface';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean) async logout(
    @Ctx() ctx: ContextInterface
  ): Promise<Boolean> {
    return new Promise((res, rej) => {
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          rej(false);
        }
        ctx.res.clearCookie('sid');
        res(true);
      });
    });
  }
}
