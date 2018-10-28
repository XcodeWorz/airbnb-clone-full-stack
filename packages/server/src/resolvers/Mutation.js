import { register } from "../modules/user/register";
import { login } from "../modules/user/login";
import { logout } from "../modules/user/logout";
import {
  sendForgotPasswordEmail,
  changePassword
} from "../modules/user/forgotPassword";

const Mutation = {
  register,
  login,
  logout,
  sendForgotPasswordEmail,
  changePassword
};

module.exports = { Mutation };
