import { validAirbnbSchema } from "@airbnb-clone/common";
import * as shortid from "shortid";
import { createWriteStream } from "fs";
import Airbnb from "../../../models/Airbnb";

import { formatYupErrors } from "../../../utils/formatYupErrors";
import { handleErrors } from "../../../utils/handleErrors";

import { UPLOAD_PATH } from "../../../config";

const storeUpload = async (stream, mimetype) => {
  const extension = mimetype.split("/")[1];
  const id = `${shortid.generate()}.${extension}`;
  const path = `${UPLOAD_PATH}/${id}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
};

const processUpload = async upload => {
  const { stream, mimetype } = await upload;
  const { id } = await storeUpload(stream, mimetype);
  return id;
};

export const createAirbnb = async (_, { data }, { session }) => {
  try {
    const { latitude, longitude, image, ...rest } = data;

    const pictureUrl = await processUpload(image);

    const newAirbnb = {
      location: { type: "Point", coordinates: [latitude, longitude] },
      image: pictureUrl,
      ...rest,
      host: session.userId
    };

    await validAirbnbSchema.validate(newAirbnb, { abortEarly: false });

    await Airbnb.create(newAirbnb);
    return {
      result: true
    };
  } catch (e) {
    const { path, message } = formatYupErrors(e)[0];
    return handleErrors(path, message);
  }
};
