import 'reflect-metadata';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './RegisterInputValidator';
// import * as yup from 'yup';
// import { formatYupErr } from '../../util/formatYupErr';

// const schema = yup.object().shape({
//   email: yup.string().email().min(6).max(255),
//   password: yup.string().min(6).max(255),
// });

@Resolver()
export class RegisterResolver {
  @Mutation(() => User) async register(
    @Arg('data') { email, password }: RegisterInput
  ): Promise<User> {
    // try {
    //   await schema.validate(Arg, { abortEarly: false });
    // } catch (err) {
    //   return formatYupErr(err);
    // }

    // const isUser = await User.findOne({
    //   where: { email },
    //   select: ['id'],
    // });

    // if (isUser) {
    //   return [
    //     {
    //       path: 'email',
    //       message: 'the email is already existed',
    //     },
    //   ];
    // }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = User.create({ email, password: hashPassword });
    await user.save();
    return user;
  }
}
