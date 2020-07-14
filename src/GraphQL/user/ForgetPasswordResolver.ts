import 'reflect-metadata';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { SendEmail } from '../utils/sendEmail';
import { createEmailLink } from '../utils/createEmailLink';
import { forgetPasswordPrefix } from '../utils/prefixConstant';

@Resolver()

//get user email, then send user an email with a
//link to change the password
//if no user found then return false
export class ForgetPasswordResolver {
  @Mutation(() => Boolean) async forgetPassword(
    @Arg('email') email: string
  ): Promise<Boolean> {
    const user = await User.findOne({ where: { email } });
    if (user) {
      SendEmail(
        user.email,
        await createEmailLink(user.id, forgetPasswordPrefix, ['user', 'reset'])
      );
      return true;
    }
    return false;
  }
}
