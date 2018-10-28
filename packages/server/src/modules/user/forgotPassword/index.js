import { hashSync } from "bcrypt-nodejs";

import { changePasswordSchema } from "@airbnb-clone/common";
import config from "../../../config";
import { User } from "../../../models";
import { forgotPasswordPrefix } from "../../../utils/constants";
import { handleErrors } from "../../../utils/handleErrors";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { formatYupErrors } from "../../../utils/formatYupErrors";

import { sendEmail } from "./../../../utils/sendEmail";

export const sendForgotPasswordEmail = async (_, { email }, { redis }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return { ok: true };
  }

  const url = await createForgotPasswordLink(
    process.env.FRONTEND_HOST || config.FRONTEND_URL,
    user._id,
    redis
  );

  await sendEmail(email, url, "Click here to reset your password!");
  return true;
};

export const changePassword = async (_, { newPassword, key }, { redis }) => {
  const redisKey = `${forgotPasswordPrefix}${key}`;

  try {
    const userId = await redis.get(redisKey);
    if (!userId) {
      return handleErrors("newPassword", "expired key");
    }

    await changePasswordSchema.validate({ newPassword }, { abortEarly: false });
    const hashedPassword = await hashSync(newPassword);
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        password: hashedPassword
      }
    );

    // await redis.del(redisKey);

    return null;
  } catch (err) {
    const { path, message } = formatYupErrors(err)[0];
    console.log(path, message);
    return handleErrors("changePassword", "oops");
  }
};
