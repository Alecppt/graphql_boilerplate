import { Maybe } from 'type-graphql';
import { generateSchema } from '../util/generateSchema';
import { graphql, GraphQLSchema } from 'graphql';

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
  userId?: string;
}

let schema: GraphQLSchema;

export const graphCallHelper = async ({
  source,
  variableValues,
  userId,
}: Options) => {
  //to cache the schema
  if (!schema) {
    schema = await generateSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: { session: { userId } },
      res: { clearCookie: jest.fn() },
    },
  });
};
