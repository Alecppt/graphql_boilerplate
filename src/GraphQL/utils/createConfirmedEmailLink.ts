import { v4 as uuid } from 'uuid';
import { redis } from '../../util/redis';

export const createConfirmEmailLink = async (
  // url: string,
  userId: string
) => {
  const token = uuid();
  await redis.set(token, userId, 'ex', 60 * 60 * 24);

  //TODO: seperate development/test/production URL
  //url includes '/graphql' which needs to be removed
  // const graphqlpath_str = '/graphql';
  // const new_url = url.slice(0, url.length - graphqlpath_str.length);
  return `http://localhost:4000/user/confirm/${token}`;
};
