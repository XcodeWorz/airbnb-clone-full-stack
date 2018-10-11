import jwt from 'jsonwebtoken';

import { User } from '../../../models';
import { handleErrors } from '../../../utils/handleErrors';
import config from '../../../config';
import { createMiddleware } from '../../../utils/createMiddleware';
import middleware from '../../../resolvers/middleware';

export const me = createMiddleware(middleware, async (_, __, context) => {
  let token = context.request.get('Authorization');
  let userId;
  if (token) {
    token = token.split(' ')[1];
    const { _id, ...rest } = jwt.verify(token, config.JWT_SECRET);

    userId = _id;
  } else {
    return handleErrors('token', 'invalid');
  }
  const user = await User.findById(userId);

  return { result: user };
});
