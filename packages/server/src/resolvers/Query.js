import { me } from '../modules/user/me';
import { findAirbnbs } from '../modules/airbnb/find';
import { airbnbDetails } from '../modules/airbnb/detail';

const Query = {
  me,
  findAirbnbs,
  airbnbDetails,
};

module.exports = { Query };
