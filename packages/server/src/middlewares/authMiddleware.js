const isAuthenticated = async (resolve, root, args, context, info) => {
  if (!context.session.userId) {
    throw new Error('not authenticated from graphql middleware');
  }
  return resolve(root, args, context, info);
};

export const authMiddleware = {
  Mutation: {
    createAirbnb: isAuthenticated,
    deleteAirbnb: isAuthenticated,
  },
};
