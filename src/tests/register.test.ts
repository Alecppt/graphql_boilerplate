import { request } from 'graphql-request';
import { getConnectionManager } from 'typeorm';
import { createTypeormConnection } from '../util/createTypeormConnection';
import { User } from '../entity/User';

beforeAll(async () => {
  await createTypeormConnection();
});

afterAll(async () => {
  await getConnectionManager().get().close();
});

const email = 'alec@test.com';
const password = 'jalksdf';

const mutation = `
mutation {
  register(email: "${email}", password: "${password}")
}
`;

test('Register user', async () => {
  const response = await request('http://localhost:4000', mutation);
  expect(response).toEqual({ register: true });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});
