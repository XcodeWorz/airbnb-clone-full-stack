
const config = require("./config");

const createServer = require("./createServer");

const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL || config.FRONTEND_URL
    },
    port: process.env.PORT || config.PORT
  },
  ({ port }) => {
    console.log(`[⚙️ ] Server is up and running at http://localhost:${port}`);
  }
);