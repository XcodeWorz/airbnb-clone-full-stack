import { register } from '../modules/user/register';
import { login } from '../modules/user/login';
import { logout } from '../modules/user/logout';

const Mutation = {
  register,
  login,
  logout,
};

module.exports = { Mutation };
