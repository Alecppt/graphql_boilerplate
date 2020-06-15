import { creatConfirmEmailLink } from './createConfirmedEmailLink';
import { createTypeormConnection } from '../../util/createTypeormConnection';
import * as Redis from 'ioredis';
import { User } from '../../entity/User';

let userId = '';

beforeAll(async () => {
  await createTypeormConnection();
  const user = await User.create({
    email: 'idiot@idiot.com',
    password: 'rqetrtogportjgpew',
  }).save();
  userId = user.id;
});

test('test Email Link for confirming account creation', async () => {
  const url = await creatConfirmEmailLink(
    process.env.TEST_HOST as string,
    userId,
    new Redis()
  );
  console.log(url);
});
