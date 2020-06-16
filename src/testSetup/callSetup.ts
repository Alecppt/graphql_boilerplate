import { setup } from './setup';

module.exports = async () => {
  if (!process.env.TEST_GRAPHQL_HOST) {
    await setup();
  }

  return null;
};
