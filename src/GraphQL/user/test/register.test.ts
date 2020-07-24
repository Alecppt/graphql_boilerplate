import { request } from 'graphql-request';
import { User } from '../../../entity/User';
import { createTypeormConnection } from '../../../util/createTypeormConnection';
import { Connection } from 'typeorm';

const email = 'regina@gmail.com';
const password = '456rtewtwtw';

const mutation = (email: string, password: string) => `
mutation{
  register( data: {
    email: "${email}",
    password: "${password}"
  }){
    email
  }
}
`;
let conn: Connection;
beforeAll(async () => {
  conn = await createTypeormConnection();
});
afterAll(async () => {
  await conn.close();
});

describe('Register user', () => {
  it('registering a new user', async () => {
    const res = await request(
      process.env.TEST_GRAPHQL_HOST as string,
      mutation(email, password)
    );
    const { register } = res;
    expect(register.email).toBe(email);

    const user = await User.findOne({ where: { email } });
    expect(user).toBeDefined();
    if (user) expect(user.isConfirmed).toBeFalsy();
  });

  it('check using duplicate email to register', async () => {
    try {
      const res = await request(
        process.env.TEST_GRAPHQL_HOST as string,
        mutation(email, password)
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    // const {
    //   errors: [message],
    // } = res;
    // expect(message).toContain('duplicate key');
    // expect(register.error).toBeTruthy();
    // const users = await User.find({ where: { email } });
    // expect(users).toHaveLength(1);
    // const user = users[0];
    // expect(user.email).toEqual(email);
    // expect(user.password).not.toEqual(password);

    // const response1 = await request(
    //   process.env.TEST_GRAPHQL_HOST as string,
    //   mutation(email, password)
    // );
    // expect(response1.register).toHaveLength(1);
    // expect(response1.register[0].path).toEqual('email');
  });

  // it('check registering email format', async () => {
  //   const response_with_wrong_email = await request(
  //     process.env.TEST_GRAPHQL_HOST as string,
  //     mutation('2434@gamil', password)
  //   );
  //   expect(response_with_wrong_email.register).toHaveLength(1);
  //   expect(response_with_wrong_email.register[0].path).toEqual('email');
  // });

  // it('check registerinng password format', async () => {
  //   const response_with_short_password = await request(
  //     process.env.TEST_GRAPHQL_HOST as string,
  //     mutation(email, '123')
  //   );
  //   expect(response_with_short_password.register).toHaveLength(1);
  //   expect(response_with_short_password.register[0].path).toEqual('password');
  // });
});
