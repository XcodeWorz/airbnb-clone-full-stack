import * as faker from 'faker';
import { TestClient } from '../../../utils/test/TestClient';
import { createForgotPasswordLink } from '../../../utils/createForgotPasswordLink';
import { userMessages } from '../../../utils/common/utils/validationMessages/userMessages';
import config from '../../../config';
import { User } from '../../../models';
import { connectMongoose, clearDatabase } from '../../../utils/test/helpers';

const Redis = require('ioredis');

const redis = new Redis('localhost', 6379);

const SERVER_URL = process.env.SERVER_URL || config.SERVER_URL;
let user;
const email = faker.internet.email();
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const password = faker.internet.password();

describe('Forgot password', () => {
  beforeAll(async () => {
    await connectMongoose();
  });
  afterAll(async () => {
    await clearDatabase();
  });
  const client = new TestClient();

  it('should send email to user and lock the account', async () => {
    user = await User.create({
      email,
      firstName,
      lastName,
      password,
      confirmed: true,
    });
    const result = await client.sendForgotPasswordEmail(user.email);

    expect(result.data.sendForgotPasswordEmail).toBe(true);
    const userInfo = await User.findOne({ email: user.email });

    expect(userInfo.accountLocked).toBe(true);
    const loginResult = await client.login(email, password);
    expect(loginResult.data.login.errors[0].message).toEqual(userMessages.accountLocked);
  });

  it('should handle error if password is too short', async () => {
    const url = await createForgotPasswordLink(SERVER_URL, user._id, redis);

    const parts = url.split('/');
    const key = parts[parts.length - 1];

    const response = await client.changePassword('a', key);
    expect(response.data.changePassword.errors[0].message).toEqual(
      userMessages.passwordNotLongEnough,
    );
  });
  it('should update user password', async () => {
    const url = await createForgotPasswordLink(SERVER_URL, user._id, redis);

    const parts = url.split('/');
    const key = parts[parts.length - 1];

    const response = await client.changePassword('newPassword', key);
    expect(response.data.changePassword.result).toBe(true);
    const result = await client.login(email, 'newPassword');
    expect(result.data.login.session).toBeDefined();
  });
});
