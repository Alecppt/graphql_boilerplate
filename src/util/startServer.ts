import 'reflect-metadata';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import express from 'express';
import { redis } from './redis';
import { createTypeormConnection } from './createTypeormConnection';
// import { confirmEmail } from '../routes/confirmEmail';
import { generateSchema } from './generateSchema';
import session from 'express-session';
import cors from 'cors';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import { v4 as uuid } from 'uuid';

export const startServer = async () => {
  const app = express();
  const port = process.env.NODE_ENV === 'test' ? 8000 : 4000;
  process.env.PORT = port.toString();
  dotenv.config({ path: 'src/.env' });

  const appollo = new ApolloServer({
    schema: await generateSchema(),
    context: ({ req, res }: any) => ({ req, res }),
    formatError: (err: GraphQLError) => {
      if (err.originalError instanceof ApolloError) {
        return err;
      }
      const errId = uuid();
      console.log('errId: ', errId);
      console.log(err);
      return new GraphQLError(`Internal Error: ${errId}`);
    },
    playground: true,
  });
  //session
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:4000',
    })
  );
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({ client: redis as any }),
      name: 'sid',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 5,
      },
    } as any)
  );

  appollo.applyMiddleware({ app });
  //change to GrapgQL resovler
  // app.get('/user/confirm/:id', confirmEmail);

  await createTypeormConnection();
  app.listen({ port: port }, () =>
    console.log(
      `🚀 GrahpQl ready at http://localhost:${port}${appollo.graphqlPath}`,
      `🚀 REST ready at http://localhost:${port}`
    )
  );

  return app;
};
