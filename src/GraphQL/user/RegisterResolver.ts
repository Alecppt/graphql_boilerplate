import 'reflect-metadata';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './RegisterInputValidator';
import { SendEmail } from '../utils/sendEmail';
import { createEmailLink } from '../utils/createEmailLink';
import { registerAccountPrefix } from '../utils/prefixConstant';
import { ApolloError } from 'apollo-server-express';

@Resolver()
export class RegisterResolver {
  @Mutation(() => User) async register(
    @Arg('data') { email, password }: RegisterInput
  ): Promise<User> {
    const duplicate_email = User.findOne({ where: { email } });
    if (duplicate_email) {
      throw new ApolloError('email is already registered!');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = User.create({ email, password: hashPassword });
    await user.save();
    await SendEmail(
      email,
      await createEmailLink(user.id, registerAccountPrefix, ['user', 'confirm'])
    );
    return user;
  }
}
