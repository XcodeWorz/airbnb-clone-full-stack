import * as faker from "faker";
import { request } from "graphql-request";
import config from "./../../../config";
import { connectMongoose, clearDatabase } from "./../../../utils/test/helpers";
import { userMessages } from "@airbnb-clone/common";

const SERVER_URL = process.env.SERVER_URL || config.SERVER_URL;

beforeAll(connectMongoose);
afterAll(clearDatabase);

describe("Register users", () => {
  const email = faker.internet.email();
  const mutation = (email, password, firstName, lastName, confirmPassword) => `
    mutation {
      register(email: "${email}", password: "${password}", firstName: "${firstName}", lastName: "${lastName}", confirmPassword: "${confirmPassword}") {
        errors {
          path
          message
        }
        token
      }
    }
    `;

  it("should register new staff member", async () => {
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const confirmPassword = password;

    const result = await request(
      SERVER_URL,
      mutation(email, password, firstName, lastName, confirmPassword)
    );

    expect(result.register.token).toBeDefined();
  });

  it("should handle duplicate email", async () => {
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const confirmPassword = password;

    const result = await request(
      SERVER_URL,
      mutation(email, password, firstName, lastName, confirmPassword)
    );

    expect(result.register.errors[0].path).toBe("email");
    expect(result.register.errors[0].message).toBe(
      userMessages.emailAlreadyExists
    );
  });

  it("should handle wrong confirm password", async () => {
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const confirmPassword = "not the same";

    const result = await request(
      SERVER_URL,
      mutation(email, password, firstName, lastName, confirmPassword)
    );

    expect(result.register.errors[0].path).toBe("confirmPassword");
    expect(result.register.errors[0].message).toBe(
      userMessages.confirmPasswordDoesntMatch
    );
  });
});
