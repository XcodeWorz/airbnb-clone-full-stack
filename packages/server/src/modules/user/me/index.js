import jwt from 'jsonwebtoken';

import { User } from '../../../models';
import { handleErrors } from '../../../utils/handleErrors';
import config from '../../../config';

export const me = async (_, __, { request, session }) => {
  let token = request.get('Authorization');

  let userId;
  if (token) {
    token = token.split(' ')[1];
    const { _id } = jwt.verify(token, config.JWT_SECRET);

    userId = _id;
  } else {
    return handleErrors('token', 'invalid');
  }
  const user = await User.findById(userId);

  return { result: user };
};
