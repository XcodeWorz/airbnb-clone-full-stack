import * as yup from "yup";
import airbnbMessages from "./../utils/validationMessages/airbnbMessages";
import { categories } from "./../utils/constants";

const nameValidation = yup
  .string()
  .min(3, airbnbMessages.nameNotLongEnough)
  .required(airbnbMessages.nameIsRequired)
  .max(255);

const descriptionValidation = yup
  .string()
  .min(3, airbnbMessages.descriptionNotLongEnough)
  .required(airbnbMessages.descriptionIsRequired)
  .max(255);

const categoryValidation = yup
  .mixed()
  .oneOf(categories)
  .required();
const priceValidation = yup.number().min(1, airbnbMessages.priceTooCheap);

export const validAirbnbSchema = yup.object().shape({
  name: nameValidation,
  description: descriptionValidation,
  category: categoryValidation,
  price: priceValidation
});
