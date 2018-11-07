const rp = require('request-promise');

export class TestClient {
  constructor(url) {
    this.url = url || 'http://127.0.0.1:4000';
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true,
    };
  }

  async register(email, password, firstName, lastName, confirmPassword) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            register(email: "${email}", password: "${password}", firstName: "${firstName}", lastName: "${lastName}", confirmPassword: "${confirmPassword}") {
              errors {
                path
                message
              }
              result
            }
          }
        `,
      },
    });
  }

  async logout() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          logout
        }
        `,
      },
    });
  }

  async sendForgotPasswordEmail(email) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            sendForgotPasswordEmail(email: "${email}")
          }
        `,
      },
    });
  }

  async changePassword(newPassword, key) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            changePassword(newPassword: "${newPassword}", key: "${key}") {
              errors {
                path
                message
              }
              result
            }
          }
        `,
      },
    });
  }

  async me() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          {
            me {
                errors {
                  path
                  message
                }
                result{
                  email
                }
              }
          }
        `,
      },
    });
  }

  async login(email, password) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
            login(email: "${email}", password: "${password}") {
                errors {
                  path
                  message
                }
                session
              }
        }
        `,
      },
    });
  }
}
