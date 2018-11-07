import { hashSync } from 'bcrypt-nodejs';

import { changePasswordSchema } from '../../../utils/common/yupSchemas/user';
import config from '../../../config';
import { User } from '../../../models';
import { forgotPasswordPrefix, userSessionIdPrefix } from '../../../utils/constants';
import { handleErrors } from '../../../utils/handleErrors';
import { createForgotPasswordLink } from '../../../utils/createForgotPasswordLink';
import { formatYupErrors } from '../../../utils/formatYupErrors';

import { sendEmail } from '../../../utils/sendEmail';

export const sendForgotPasswordEmail = async (_, { email }, { redis }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  user.accountLocked = true;
  await user.save();

  if (process.env.NODE_ENV !== 'test') {
    const url = await createForgotPasswordLink(
      process.env.FRONTEND_HOST || config.FRONTEND_URL,
      user._id,
      redis,
    );

    await sendEmail(email, url, 'Click here to reset your password!');
  }

  return true;
};

export const changePassword = async (_, { newPassword, key }, { redis }) => {
  const redisKey = `${forgotPasswordPrefix}${key}`;
  let userId = null;
  try {
    await changePasswordSchema.validate({ newPassword }, { abortEarly: false });

    redis.get(redisKey, (error, result) => {
      if (error) {
        const { path, message } = formatYupErrors(error)[0];
        return handleErrors(path, message);
      }
      userId = result;
      if (!userId) {
        return handleErrors('newPassword', 'expired key');
      }
    });

    const hashedPassword = await hashSync(newPassword);
    await User.findOneAndUpdate(
      { _id: userId },
      {
        accountLocked: false,
        password: hashedPassword,
      },
    );

    await redis.del(redisKey);

    return { result: true };
  } catch (err) {
    const { path, message } = formatYupErrors(err)[0];
    return handleErrors(path, message);
  }
};
