import { IResolvers } from 'graphql-tools';
import * as bcrypt from 'bcrypt';
import { User } from '../../entity/User';
import * as yup from 'yup';
import { formatYupErr } from '../../util/formatYupErr';
// import { creatConfirmEmailLink } from './createConfirmedEmailLink';
// import * as Redis from 'ioredis';

const schema = yup.object().shape({
  email: yup.string().email().min(6).max(255),
  password: yup.string().min(6).max(255),
});

export const resolvers: IResolvers = {
  Query: {
    dummyFixForRootQuery: () => 'this is bypass for the root query bug',
  },
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupErr(err);
      }

      const { email, password } = args;
      const isUser = await User.findOne({
        where: { email },
        select: ['id'],
      });
      if (isUser) {
        return [
          {
            path: 'email',
            message: 'the email is already existed',
          },
        ];
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashPassword });
      await user.save();
      // await creatConfirmEmailLink(url, user.id, redis);
      return null;
    },
  },
};
