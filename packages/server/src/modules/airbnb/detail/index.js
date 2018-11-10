import Airbnb from '../../../models/Airbnb';

export const airbnbDetails = async (_, { id }) => {
  const airbnb = await Airbnb.findById(id);

  if (!airbnb) {
    return null;
  }

  return airbnb;
};
