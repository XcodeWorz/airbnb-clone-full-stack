import { register } from '../modules/user/register';
import { login } from '../modules/user/login';
import { logout } from '../modules/user/logout';
import { createAirbnb } from '../modules/airbnb/create';
import { sendForgotPasswordEmail, changePassword } from '../modules/user/forgotPassword';
import { deleteAirbnb } from '../modules/airbnb/delete';

const Mutation = {
  register,
  login,
  logout,
  sendForgotPasswordEmail,
  changePassword,
  createAirbnb,
  deleteAirbnb,
};

module.exports = { Mutation };
