import * as faker from 'faker';
import { request, GraphQLClient } from 'graphql-request';
import config from '../../../config';
import { User } from '../../../models';

import { connectMongoose, clearDatabase } from '../../../utils/test/helpers';

const SERVER_URL = process.env.SERVER_URL || config.SERVER_URL;
let token;

beforeAll(connectMongoose);
afterAll(clearDatabase);

describe('Get user profile', () => {
  const email = faker.internet.email();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const password = faker.internet.password();

  const meQuery = () => `
  {
    me {
      errors {
        path
        message
      }
      result {
          email
      }
    }
  }
  `;

  const mutation = (email, password) => `
      mutation {
        login(email: "${email}", password: "${password}") {
          errors {
            path
            message
          }
          token
        }
      }
      `;
  it('should get user token from login', async () => {
    await User.create({
      email,
      firstName,
      lastName,
      password,
    });

    const result = await request(SERVER_URL, mutation(email, password));
    token = result.login.token;
  });

  it('should get user profile using login token', async () => {
    const client = new GraphQLClient(SERVER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await client.request(meQuery());
    expect(result.me.result.email).toBe(email);
  });

  it('should fail if no token is sent in Authorization header', async () => {
    const client = new GraphQLClient(SERVER_URL, {
      headers: {},
    });
    const result = await client.request(meQuery());
    expect(result.me.errors[0].path).toBe('token');
  });
});
