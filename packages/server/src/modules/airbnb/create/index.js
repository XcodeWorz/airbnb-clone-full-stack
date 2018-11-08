import { validAirbnbSchema } from '@airbnb-clone/common';
import Airbnb from '../../../models/Airbnb';

import { formatYupErrors } from '../../../utils/formatYupErrors';
import { handleErrors } from '../../../utils/handleErrors';

export const createAirbnb = async (_, { data }, { session }) => {
  try {
    const { latitude, longitude, ...rest } = data;
    const newAirbnb = {
      location: { type: 'Point', coordinates: [latitude, longitude] },
      ...rest,
      host: session.userId,
    };

    await validAirbnbSchema.validate(newAirbnb, { abortEarly: false });

    await Airbnb.create(newAirbnb);
    return {
      result: true,
    };
  } catch (e) {
    const { path, message } = formatYupErrors(e)[0];
    return handleErrors(path, message);
  }
};
