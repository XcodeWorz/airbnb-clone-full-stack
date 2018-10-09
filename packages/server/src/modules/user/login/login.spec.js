import * as faker from "faker";
import { request } from "graphql-request";
import config from "./../../../config";
import { User } from "../../../models";

import { userMessages } from "@airbnb-clone/common";
import { connectMongoose, clearDatabase } from "./../../../utils/test/helpers";

const SERVER_URL = process.env.SERVER_URL || config.SERVER_URL;

beforeAll(connectMongoose);
afterAll(clearDatabase);

describe("Login user", () => {
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
  it("should login the user if already exists in db", async () => {
    const email = faker.internet.email();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const password = faker.internet.password();
    await User.create({
      email,
      firstName,
      lastName,
      password
    });

    const result = await request(SERVER_URL, mutation(email, password));
    expect(result.login.token).toBeDefined();
  });

  it("should fail login if the user is not in db", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const result = await request(SERVER_URL, mutation(email, password));
    expect(result.login.token).toBe(null);
    expect(result.login.errors[0].message).toBe(userMessages.invalidLogin);
  });
});
