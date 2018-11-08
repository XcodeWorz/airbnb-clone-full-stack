import redis from './redis';

const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');

const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const config = require('./config');

const resolvers = require('./resolvers');
const { connectDatabase } = require('./db');
const { redisSessionPrefix } = require('./utils/constants');
const { authMiddleware } = require('./middlewares/authMiddleware');

const db = connectDatabase();
const store = new RedisStore({
  client: redis,
  prefix: redisSessionPrefix,
});

const middlewares = [authMiddleware];

const createServer = () => {
  const server = new GraphQLServer({
    typeDefs: importSchema('src/schema.graphql'),
    resolvers,
    context: ({ request }) => ({
      redis,
      url: `${request.protocol}://${request.get('host')}`,
      session: request.session,
      req: request,
      db,
    }),
    middlewares,
  });

  server.express.use(
    session({
      secret: config.SESSION_SECRET,
      store,
      name: 'qid',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    }),
  );

  server.express.use((req, res, next) => {
    if (!req.session) {
      return next(new Error('oh no')); // handle error
    }
    return next(); // otherwise continue
  });

  server.start(
    {
      cors: {
        credentials: process.env.NODE_ENV === 'test' ? 'include' : true,
        origin: process.env.NODE_ENV === 'test' ? '*' : config.FRONTEND_URL,
      },
      port: process.env.PORT || config.PORT,
    },
    ({ port }) => {
      console.log(`[⚙️ ] Server is up and running at http://localhost:${port}`);
    },
  );
};

module.exports = createServer;
