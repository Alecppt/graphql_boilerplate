import { IResolvers } from 'graphql-tools';
import * as bcrypt from 'bcrypt';
import { User } from './entity/User';

export const resolvers: IResolvers = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || 'World'}`,
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashPassword });
      await user.save();
      return true;
    },
  },
};
