import { v4 as uuid } from 'uuid';
import { redis } from '../../util/redis';

export const createEmailLink = async (
  // url: string,
  userId: string,
  prefix: string,
  route: string[]
) => {
  const token = uuid();
  //60*60*24 = 1 day
  await redis.set(prefix + token, userId, 'ex', 60 * 60 * 24);
  let route_path = '';
  route.forEach((s) => {
    route_path += s + '/';
  });
  //TODO: seperate development/test/production URL
  //url includes '/graphql' which needs to be removed
  // const graphqlpath_str = '/graphql';
  // const new_url = url.slice(0, url.length - graphqlpath_str.length);
  return `http://localhost:4000/${route_path}${token}`;
};
