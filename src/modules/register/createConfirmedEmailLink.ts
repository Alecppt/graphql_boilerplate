import { v4 as uuid } from 'uuid';
import { Redis } from 'ioredis';

export const creatConfirmEmailLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = uuid();
  await redis.set(id, userId, 'ex', 60 * 60 * 24);
  //url includes '/graphql' which needs to be removed
  const graphqlpath_str = '/graphql';
  const new_url = url.slice(0, url.length - graphqlpath_str.length);
  return `${new_url}/confirm/${id}`;
};
