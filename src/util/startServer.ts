import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
// import http = require('http');
import express = require('express');
import { redis } from './redis';
// import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
// import { GraphQLSchema } from 'graphql';
import { createTypeormConnection } from './createTypeormConnection';
// import * as path from 'path';
// import * as fs from 'fs';
import { confirmEmail } from '../routes/confirmEmail';
import { getSchema } from './getSchema';

export const startServer = async () => {
  const app = express();
  const port = process.env.NODE_ENV === 'test' ? 8000 : 4000;

  const appollo = new ApolloServer({
    schema: getSchema(),
    context: ({ req }) => ({
      redis,
      url: req.protocol + '://' + req.get('host'),
    }),
    playground: true,
  });

  appollo.applyMiddleware({ app });
  app.get('/confirm/:id', confirmEmail);

  await createTypeormConnection();
  app.listen({ port: port }, () =>
    console.log(
      `🚀 GrahpQl ready at http://localhost:${port}${appollo.graphqlPath}`,
      `🚀 REST ready at http://localhost:${port}`
    )
  );
  return app;
};
