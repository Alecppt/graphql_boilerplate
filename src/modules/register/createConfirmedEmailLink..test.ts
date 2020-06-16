import { creatConfirmEmailLink } from './createConfirmedEmailLink';
import { createTypeormConnection } from '../../util/createTypeormConnection';
import { User } from '../../entity/User';
import { redis } from '../../util/redis';
import fetch from 'node-fetch';
let userId = '';

// let conn: Connection;
beforeAll(async () => {
  await createTypeormConnection();
  const user = await User.create({
    email: 'idiot@idiot.com',
    password: 'rqetrtogportjgpew',
  }).save();
  userId = user.id;
});

describe('test Email Link for confirming account creation', () => {
  it('confirming account using email link', async () => {
    const url = await creatConfirmEmailLink(
      process.env.TEST_GRAPHQL_HOST as string,
      userId,
      redis
    );
    let status = 0;
    await fetch(url, { method: 'GET' }).then((res) => {
      console.log(res.status);
      status = res.status;
    });
    expect(status).toEqual(200);
    const user = await User.findOne({ where: { id: userId } });
    expect((user as User).isConfirmed).toBeTruthy();

    const x = url.split('/');
    const redis_key = x[x.length - 1];
    const id = await redis.get(redis_key);
    expect(id).toBeNull();
  });
});
