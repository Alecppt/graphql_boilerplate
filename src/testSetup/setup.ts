import { startServer } from '../util/startServer';

export const setup = async () => {
  await startServer();
  // const port = process.env.NODE_ENV === 'test' ? 0 : 4000;
  process.env.TEST_HOST = `http://localhost:4000/graphql`;
};
