import jwt from 'jsonwebtoken';
import { userMessages, validUserSchema } from '@airbnb-clone/common';
import { User } from '../../../models';
import config from '../../../config';

import { handleErrors } from '../../../utils/handleErrors';
import { formatYupErrors } from '../../../utils/formatYupErrors';

export const register = async (_, { email, ...rest }) => {
  try {
    await validUserSchema.validate({ email, ...rest }, { abortEarly: false });
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return handleErrors('email', userMessages.emailAlreadyExists);
    }

    const user = await User.create({
      email,
      ...rest,
    });

    const token = jwt.sign({ _id: user._id, email: user.email }, config.JWT_SECRET);

    return { token };
  } catch (e) {
    const { path, message } = formatYupErrors(e)[0];
    return handleErrors(path, message);
  }
};
