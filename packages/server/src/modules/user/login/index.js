import jwt from 'jsonwebtoken';
import { userMessages, validLoginSchema } from '@airbnb-clone/common';
import { User } from '../../../models';
import { handleErrors } from '../../../utils/handleErrors';

import config from '../../../config';

export const login = async (_, { email, password }, { session, redis, request }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return handleErrors('email', userMessages.invalidLogin);
  }

  const valid = await user.authenticateUser(password);

  if (!valid) {
    return handleErrors('password', userMessages.invalidLogin);
  }

  const token = jwt.sign({ _id: user._id, email: user.email }, config.JWT_SECRET);

  session.userId = user.id;

  if (request.sessionID) {
    await redis.lpush(`userSids:${user.id}`, request.sessionID);
  }

  return { token };
};
