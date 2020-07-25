// import { request } from 'graphql-request';
import { User } from '../../../entity/User';
import { createTypeormConnection } from '../../../util/createTypeormConnection';
import { Connection } from 'typeorm';
import { graphCallHelper } from '../../../testSetup/graphRequestHelper';
// import { GraphQLError } from 'graphql';

const user_data = {
  email: 'regina@gmail.com',
  password: '456rtewtwtw',
};

const mutation = `
mutation register($data: RegisterInput!){
  register(
    data: $data
  ) {
    id
    email
    isConfirmed
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
    const res = await graphCallHelper({
      source: mutation,
      variableValues: {
        data: {
          email: user_data.email,
          password: user_data.password,
        },
      },
    });
    expect(res).toMatchObject({
      data: {
        register: {
          email: user_data.email,
          isConfirmed: false,
        },
      },
    });
    const email = res.data!.register.email;
    const user = await User.findOne({ where: { email } });
    expect(user).toBeDefined();
  });

  it('check using duplicate email to register', async () => {
    const res = await graphCallHelper({
      source: mutation,
      variableValues: {
        data: {
          email: user_data.email,
          password: user_data.password,
        },
      },
    });
    expect(res.errors!.toString()).toMatch('email is already registered!');
    expect(res.data!).toBeNull();
  });

  it('check registering email format', async () => {
    const res = await graphCallHelper({
      source: mutation,
      variableValues: {
        data: {
          email: 'feifiewjfpoq',
          password: user_data.password,
        },
      },
    });
    expect(res.errors!.toString()).toMatch('Validation Error');
  });
});
