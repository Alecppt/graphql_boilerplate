import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { createTypeormConnection } from './util/createTypeormConnection';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

export const startServer = async () => {
  await createTypeormConnection();
  await server.start(() => console.log('Server is running on localhost:4000'));
};

startServer();
