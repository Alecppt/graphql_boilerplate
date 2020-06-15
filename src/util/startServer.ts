import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
// import http = require('http');
import express = require('express');
import { importSchema } from 'graphql-import';
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { createTypeormConnection } from './createTypeormConnection';
import * as path from 'path';
import * as fs from 'fs';
import * as Redis from 'ioredis';
import { User } from '../entity/User';

export const startServer = async () => {
  const app = express();
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, '../modules'));
  folders.forEach((folder) => {
    const { resolvers } = require(`../modules/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `../modules/${folder}/schema.graphql`)
    );
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });

  const redis = new Redis();

  const appollo = new ApolloServer({
    schema: mergeSchemas({ schemas }),
    context: ({ req }) => ({
      redis,
      url: req.protocol + '://' + req.get('host'),
    }),
    playground: true,
  });
  await createTypeormConnection();

  app.get('/confirm/:id', async (req, res) => {
    const { id } = req.params;
    const userId = await redis.get(id);
    if (userId) {
      await User.update({ id: userId }, { isConfirmed: true });
      res.send('ok');
    } else {
      res.send('user not found');
    }
  });
  // const port = process.env.NODE_ENV === 'test' ? 0 : 4000;

  appollo.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${appollo.graphqlPath}`
    )
  );
  return app;
};
