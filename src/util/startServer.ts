import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { redis } from './redis';
import { createTypeormConnection } from './createTypeormConnection';
// import { confirmEmail } from '../routes/confirmEmail';
import { generateSchema } from './generateSchema';
import session from 'express-session';
import cors from 'cors';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv';

export const startServer = async () => {
  const app = express();
  const port = process.env.NODE_ENV === 'test' ? 8000 : 4000;
  dotenv.config({ path: 'src/.env' });
  const appollo = new ApolloServer({
    schema: await generateSchema(),
    context: ({ req, res }: any) => ({ req, res }),
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
