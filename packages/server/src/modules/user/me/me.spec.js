import * as faker from 'faker';
import { request, GraphQLClient } from 'graphql-request';

import config from '../../../config';
import { User } from '../../../models';

import { connectMongoose, clearDatabase } from '../../../utils/test/helpers';

import { TestClient } from '../../../utils/test/TestClient';

const SERVER_URL = process.env.SERVER_URL || config.SERVER_URL;

describe('Get user profile', () => {
  beforeAll(async () => {
    await connectMongoose();
  });
  afterAll(async () => {
    await clearDatabase();
  });
  const client = new TestClient(SERVER_URL);
  const email = faker.internet.email();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const password = faker.internet.password();

  it('should fail if no cookie has been set', async () => {
    const result = await client.me();
    expect(result.data.me.errors[0].path).toBe('session');
  });

  it('should get user profile using login cookie', (done) => {
    let user;
    User.create({
      email,
      firstName,
      lastName,
      password,
      confirmed: true,
    })
      .then((result) => {
        user = result;
        return client.login(user.email, password);
      })
      .then(() => client.me())
      .then((result) => {
        expect(result.data.me.result.email).toBe(email);
        done();
      });
  });
});
