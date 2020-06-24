import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { redis } from './redis';
import { createTypeormConnection } from './createTypeormConnection';
import { confirmEmail } from '../routes/confirmEmail';
// import { getSchema } from './getSchema';
import { generateSchema } from './generateSchema';
export const startServer = async () => {
  const app = express();
  const port = process.env.NODE_ENV === 'test' ? 8000 : 4000;

  const appollo = new ApolloServer({
    schema: await generateSchema(),
    context: ({ req }: any) => ({
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
