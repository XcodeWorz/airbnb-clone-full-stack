export default async (resolver, parent, args, context, info) => {
  const result = await resolver(parent, args, context, info);
  return result;
};
