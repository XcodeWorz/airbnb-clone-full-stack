const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');

const resolvers = require('./resolvers');
const connectDatabase = require('./db');

const db = connectDatabase();

function createServer(redis) {
  return new GraphQLServer({
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
}

module.exports = createServer;
