import 'reflect-metadata';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './RegisterInputValidator';
import { SendEmail } from '../utils/sendEmail';
import { createConfirmEmailLink } from '../utils/createConfirmedEmailLink';
@Resolver()
export class RegisterResolver {
  @Mutation(() => User) async register(
    @Arg('data') { email, password }: RegisterInput
  ): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = User.create({ email, password: hashPassword });
    await user.save();
    await SendEmail(email, await createConfirmEmailLink(user.id));
    return user;
  }
}
