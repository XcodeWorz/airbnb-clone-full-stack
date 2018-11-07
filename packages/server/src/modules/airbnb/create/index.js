import Airbnb from '../../../models/Airbnb';

export const createAirbnb = async (_, { data }, { session }) => {
  await Airbnb.create({ ...data, host: session.userId });
  return true;
};
