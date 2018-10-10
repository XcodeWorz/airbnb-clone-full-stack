import { User } from "./../../../models";
import { handleErrors } from "./../../../utils/handleErrors";
import jwt from "jsonwebtoken";
import { userMessages, validLoginSchema } from "@airbnb-clone/common";

import config from "./../../../config/index";

export const login = async (_, { email, password }, { session }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return handleErrors("email", userMessages.invalidLogin);
  }

  const valid = await user.authenticateUser(password);

  if (!valid) {
    return handleErrors("password", userMessages.invalidLogin);
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    config.JWT_SECRET
  );

  session.userId = user.id;

  return { token };
};
