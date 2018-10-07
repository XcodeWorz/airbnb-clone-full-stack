import * as yup from "yup";
import userMessages from "./../utils/validationMessages/userMessages";

const registerPasswordValidation = yup
  .string()
  .min(3, userMessages.passwordNotLongEnough)
  .required()
  .max(255);

const firstNameValidation = yup
  .string()
  .min(3, userMessages.firstNameNotLongEnough)
  .required(userMessages.firstNameIsRequired)
  .max(255);
const lastNameValidation = yup
  .string()
  .min(3, userMessages.lastNameNotLongEnough)
  .required(userMessages.lastNameIsRequired)
  .max(255);
const confirmPasswordValidation = yup
  .string()
  .oneOf([yup.ref("password"), null], userMessages.confirmPasswordDoesntMatch)
  .required();

const emailValidation = yup
  .string()
  .min(3, userMessages.emailNotLongEnough)
  .max(255)
  .email(userMessages.invalidEmail)
  .required();

export const validUserSchema = yup.object().shape({
  email: emailValidation,
  password: registerPasswordValidation,
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  confirmPassword: confirmPasswordValidation
});

export const loginSchema = yup.object().shape({
  email: emailValidation,
  password: registerPasswordValidation
});
