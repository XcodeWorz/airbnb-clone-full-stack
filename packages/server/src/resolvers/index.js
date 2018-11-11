const { Query } = require('./Query');
const { Mutation } = require('./Mutation');

module.exports = {
  Airbnb: {
    images: (parent, _, { url }) => {
      const updatedImages = [];
      parent.images.forEach((image) => {
        updatedImages.push(`${url}/images/${image}`);
      });
      return updatedImages;
    },
    host: ({ host }, _, { userLoader }) => userLoader.load(host),
  },
  Query,
  Mutation,
};
