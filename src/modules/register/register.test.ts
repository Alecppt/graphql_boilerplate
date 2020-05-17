import { request } from 'graphql-request';
import { User } from '../../entity/User';
import { startServer } from '../../util/startServer';
import { AddressInfo } from 'net';

let host = () => '';

beforeAll(async () => {
  const app = await startServer();
  const { port } = app.address() as AddressInfo;
  host = () => `http://127.0.0.1:${port}`;
});

const email = 'alec@test.com';
const password = 'jalksdf';

const mutation = `
mutation {
  register(email: "${email}", password: "${password}")
}
`;

test('Register user', async () => {
  const response = await request(host(), mutation);
  expect(response).toEqual({ register: true });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});
