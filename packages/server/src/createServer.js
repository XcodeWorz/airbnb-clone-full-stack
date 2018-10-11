import config from './config';

const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');

const redis = require('./redis');
const { redisSessionPrefix } = require('./utils/constants');

const resolvers = require('./resolvers');
const connectDatabase = require('./db');

const db = connectDatabase();

const createServer = () => {
  const server = new GraphQLServer({
    typeDefs: importSchema('src/schema.graphql'),
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    resolvers,
    context: ({ request }) => ({
      request,
      redis,
      url: `${request.protocol}://${request.get('host')}`,
      session: request.session,
      db,
    }),
  });

  server.express.use(
    session({
      store: new RedisStore({
        client: redis,
        prefix: redisSessionPrefix,
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

  server.express.use((req, res, next) => {
    if (!req.session) {
      return next(new Error('oh no')); // handle error
    }
    next(); // otherwise continue
  });

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
};

module.exports = createServer;
