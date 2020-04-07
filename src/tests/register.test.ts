function sum(a: number, b: number) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// import { request } from 'graphql-request';
// import { createConnection } from 'typeorm';

// // import { host } from './constants';
// import { User } from '../entity/User';

// const email = 'tom@bob.com';
// const password = 'jalksdf';

// const mutation = `
// mutation {
//   register(email: "${email}", password: "${password}")
// }
// `;

// test('Register user', async () => {
//   const response = await request('http://localhost:4000', mutation);
//   expect(response).toEqual({ register: true });
//   await createConnection();
//   const users = await User.find({ where: { email } });
//   expect(users).toHaveLength(1);
//   const user = users[0];
//   expect(user.email).toEqual(email);
//   expect(user.password).not.toEqual(password);
// });
