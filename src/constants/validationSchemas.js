import * as Yup from "yup";

export const VALIDATION_MESSAGES = {
  EMAIL_IS_REQUIRED: "Email is required",
  INVALID_EMAIL: "Invalid email format",
};

export const EMAIL_VALIDATION_SCHEMA = Yup.string()
  .required(VALIDATION_MESSAGES.EMAIL_IS_REQUIRED)
  .email(VALIDATION_MESSAGES.INVALID_EMAIL);
