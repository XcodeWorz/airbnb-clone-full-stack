import Airbnb from '../../../models/Airbnb';

export const createAirbnb = async (_, { data }, { session }) => {
  if (!session.userId) {
    throw new Error('not authenticated');
  }
  await Airbnb.create({ ...data, host: session.userId });
  return true;
};
