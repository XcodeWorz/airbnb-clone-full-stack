import * as faker from 'faker';
import { TestClient } from '../../../utils/test/TestClient';
import { userMessages } from '../../../utils/common/utils/validationMessages/userMessages';
import config from '../../../config';
import { User } from '../../../models';

import { connectMongoose, clearDatabase } from '../../../utils/test/helpers';

const SERVER_URL = process.env.SERVER_URL || config.SERVER_URL;

beforeAll(async () => {
  await connectMongoose();
  await clearDatabase();
});
afterEach(async () => {
  await clearDatabase();
});

describe('Login user', () => {
  const client = new TestClient(SERVER_URL);

  it('should not login the user if already exists in db but the email has not been confirmed', async () => {
    const email = faker.internet.email();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const password = faker.internet.password();

    await User.create({
      email,
      firstName,
      lastName,
      password,
    });

    const result = await client.login(email, password);
    expect(result.data.login.errors[0].message).toBe(userMessages.emailNotConfirmed);
  });

  it('should not login the user if already exists in db the email has been confirmed but the account is locked', async () => {
    const email = faker.internet.email();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const password = faker.internet.password();
    await User.create({
      email,
      firstName,
      lastName,
      password,
      confirmed: true,
      accountLocked: true,
    });

    const result = await client.login(email, password);
    expect(result.data.login.errors[0].message).toBe(userMessages.accountLocked);
  });

  it('should login the user if already exists in db and the email has been confirmed', async () => {
    const email = faker.internet.email();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const password = faker.internet.password();
    await User.create({
      email,
      firstName,
      lastName,
      password,
      confirmed: true,
    });

    const result = await client.login(email, password);
    expect(result.data.login.session).toBeDefined();
  });

  it('should fail login if the user is not in db', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const result = await client.login(email, password);
    expect(result.data.login.session).toBe(null);
    expect(result.data.login.errors[0].message).toBe(userMessages.invalidLogin);
  });
});
