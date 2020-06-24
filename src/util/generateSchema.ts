import { buildSchema } from 'type-graphql';
import { RegisterResolver } from '../GraphQL/user/RegisterResolver';
import { HelloResolver } from '../GraphQL/helloworld/HelloResolver';
export const generateSchema = () => {
  return buildSchema({
    resolvers: [RegisterResolver, HelloResolver],
  });
};
