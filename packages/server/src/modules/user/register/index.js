import { userMessages, validUserSchema } from '@airbnb-clone/common';
import { User } from '../../../models';
import { createConfirmEmailLink } from '../../../utils/createConfirmEmailLink';

import { sendEmail } from '../../../utils/sendEmail';

import { handleErrors } from '../../../utils/handleErrors';
import { formatYupErrors } from '../../../utils/formatYupErrors';

export const register = async (_, { email, ...rest }, { redis, url }) => {
  try {
    await validUserSchema.validate({ email, ...rest }, { abortEarly: false });
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) return handleErrors('email', userMessages.emailAlreadyExists);

    const user = await User.create({
      email,
      ...rest,
    });

    if (process.env.NODE_ENV !== 'test') {
      const confirmEmailUrl = await createConfirmEmailLink(url, user._id, redis);
      await sendEmail(email, confirmEmailUrl, 'Click here to activate your account!');
    }

    return { result: true };
  } catch (e) {
    const { path, message } = formatYupErrors(e)[0];
    return handleErrors(path, message);
  }
};
