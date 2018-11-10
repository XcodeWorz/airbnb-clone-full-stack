const { Query } = require('./Query');
const { Mutation } = require('./Mutation');

module.exports = {
  Airbnb: {
    image: (parent, _, { url }) => parent.image && `${url}/images/${parent.image}`,
    host: ({ host }, _, { userLoader }) => userLoader.load(host),
  },
  Query,
  Mutation,
};
