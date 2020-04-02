import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';

// import { importSchema } from 'graphql-import';
// import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { createConnection } from 'typeorm';

// const schema = makeExecutab  leSchema({ typeDefs, resolvers });

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});
createConnection().then(() => {
  server.start(() => console.log('Server is running on localhost:4000'));
});
