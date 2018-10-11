const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('./redis');

const config = require('./config');
const createServer = require('./createServer');

const server = createServer(redis);
server.express.use(
  session({
    store: new RedisStore({
      client: redis,
      prefix: 'sess:',
    }),
    name: 'qid',
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  }),
);

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL || config.FRONTEND_URL,
    },
    port: process.env.PORT || config.PORT,
  },
  ({ port }) => {
    console.log(`[⚙️ ] Server is up and running at http://localhost:${port}`);
  },
);
