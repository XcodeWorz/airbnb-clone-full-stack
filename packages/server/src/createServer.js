const { GraphQLServer } = require("graphql-yoga");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers");
const connectDatabase = require("./db");

const db = connectDatabase();

function createServer() {
  return new GraphQLServer({
    typeDefs: importSchema("src/schema.graphql"),
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    resolvers,
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
