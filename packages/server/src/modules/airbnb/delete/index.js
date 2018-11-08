import Airbnb from '../../../models/Airbnb';

export const deleteAirbnb = async (_, { id }, { session }) => {
  const airbnb = await Airbnb.findById(id);

  if (!airbnb) {
    throw new Error('does not exist');
  }

  if (airbnb.host.toString() !== session.userId) {
    throw new Error('not authorized');
  }

  await Airbnb.remove({ _id: id });

  return true;
};
