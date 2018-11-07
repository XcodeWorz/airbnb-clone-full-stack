import * as faker from 'faker';
import { TestClient } from '../../../utils/test/TestClient';
import { userMessages } from '../../../utils/common/utils/validationMessages/userMessages';
import config from '../../../config';
import { connectMongoose, clearDatabase } from '../../../utils/test/helpers';
import { User } from '../../../models';

const SERVER_URL = process.env.SERVER_URL || config.SERVER_URL;

beforeAll(async () => {
  await connectMongoose();
  await clearDatabase();
});
afterAll(async () => {
  await clearDatabase();
});

describe('Register users', () => {
  const client = new TestClient(SERVER_URL);

  it('should register new staff member', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const confirmPassword = password;

    const result = await client.register(email, password, firstName, lastName, confirmPassword);
    expect(result.data.register.result).toBe(true);
  });

  it('should handle duplicate email', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const confirmPassword = password;

    await User.create({
      email,
      firstName,
      lastName,
      password,
    });

    const result = await client.register(email, password, firstName, lastName, confirmPassword);

    expect(result.data.register.errors[0].path).toBe('email');
    expect(result.data.register.errors[0].message).toBe(userMessages.emailAlreadyExists);
  });

  it('should handle wrong confirm password', async () => {
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const confirmPassword = 'not the same';

    const result = await client.register(email, password, firstName, lastName, confirmPassword);

    expect(result.data.register.errors[0].path).toBe('confirmPassword');
    expect(result.data.register.errors[0].message).toBe(userMessages.confirmPasswordDoesntMatch);
  });
});
