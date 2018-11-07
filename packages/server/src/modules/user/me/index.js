import { User } from '../../../models';
import { handleErrors } from '../../../utils/handleErrors';
import { formatYupErrors } from '../../../utils/formatYupErrors';

import middleware from './middleware';
import { createMiddleware } from '../../../utils/createMiddleware';

export const me = async (_, __, { req }) => {
  try {
    if (!req.session.userId) return handleErrors('session', 'invalid session');

    const user = await User.findById(req.session.userId);
    if (!user) return handleErrors('session', 'invalid session');

    return { result: user };
  } catch (err) {
    const { path, message } = formatYupErrors(err)[0];
    return handleErrors(path, message);
  }
};
