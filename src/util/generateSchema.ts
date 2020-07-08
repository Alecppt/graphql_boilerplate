import { buildSchema } from 'type-graphql';
import { RegisterResolver } from '../GraphQL/user/RegisterResolver';
import { LoginResolver } from '../GraphQL/user/LoginResolver';
import { HelloResolver } from '../GraphQL/helloworld/HelloResolver';
import { MeResolver } from '../GraphQL/MeResolver';
import { ConfirmAccountResolver } from '../GraphQL/user/ConfirmAccountResolver';
// import { User } from '../entity/User';
export const generateSchema = () => {
  return buildSchema({
    resolvers: [
      RegisterResolver,
      HelloResolver,
      LoginResolver,
      MeResolver,
      ConfirmAccountResolver,
    ],
    // authChecker: ({ context: { req } }) => {
    //   return !!req.session.userId;
    // },
  });
};
