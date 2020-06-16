import { startServer } from '../util/startServer';

export const setup = async () => {
  await startServer();
  const port = process.env.NODE_ENV === 'test' ? 8000 : 4000;
  process.env.TEST_GRAPHQL_HOST = `http://localhost:${port}/graphql`;
  process.env.TEST_REST_HOST = `http://localhost:${port}`;
};
