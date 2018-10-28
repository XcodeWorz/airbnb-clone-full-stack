import jwt from "jsonwebtoken";
import { userMessages } from "@airbnb-clone/common";
import { User } from "../../../models";
import { handleErrors } from "../../../utils/handleErrors";
import { userSessionIdPrefix } from "./../../../utils/constants";

import config from "../../../config";

export const login = async (
  _,
  { email, password },
  { session, redis, req }
) => {
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
  if (req.sessionID) {
    await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
  }

  return { token };
};
