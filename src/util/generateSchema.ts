import { buildSchema } from 'type-graphql';
import { RegisterResolver } from '../GraphQL/user/RegisterResolver';
import { LoginResolver } from '../GraphQL/user/LoginResolver';
import { HelloResolver } from '../GraphQL/helloworld/HelloResolver';
import { MeResolver } from '../GraphQL/MeResolver';
import { ConfirmAccountResolver } from '../GraphQL/user/ConfirmAccountResolver';
import { LogoutResolver } from '../GraphQL/user/LogoutResolver';
import { ForgetPasswordResolver } from '../GraphQL/user/ForgetPasswordResolver';
import { ResetPasswordResolver } from '../GraphQL/user/ResetPasswordResolver';
export const generateSchema = () => {
  return buildSchema({
    resolvers: [
      RegisterResolver,
      HelloResolver,
      LoginResolver,
      MeResolver,
      ConfirmAccountResolver,
      LogoutResolver,
      ForgetPasswordResolver,
      ResetPasswordResolver,
    ],
    // authChecker: ({ context: { req } }) => {
    //   return !!req.session.userId;
    // },
  });
};
