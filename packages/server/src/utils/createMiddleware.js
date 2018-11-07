export const createMiddleware = (middlewareFunc, resolverFunc) => (parent, args, context, info) => middlewareFunc(resolverFunc, parent, args, context, info);
