import User from "./../models/User";

const { Query } = require("./Query");
const { Mutation } = require("./Mutation");

module.exports = {
  Airbnb: {
    image: (parent, _, { url }) =>
      parent.image && `${url}/images/${parent.image}`,
    host: async ({ host }) => User.findById(host)
  },
  Query,
  Mutation
};
