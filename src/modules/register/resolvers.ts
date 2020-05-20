import { IResolvers } from 'graphql-tools';
import * as bcrypt from 'bcrypt';
import { User } from '../../entity/User';

export const resolvers: IResolvers = {
  Query: {
    dummyFixForRootQuery: () => 'this is bypass for the root query bug',
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
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
      return null;
    },
  },
};
