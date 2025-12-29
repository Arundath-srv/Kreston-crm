import { dynamicRequire, nameStartWithLetterRegex, objectIdRegex } from "@/helper/regex.js";
import { Error } from "express-error-catcher";
import * as yup from "yup";

export const clientSchema = async (body, required = true) => {
  const schema = yup
    .object({

      firstName: dynamicRequire(
        yup
          .string()
          .matches(nameStartWithLetterRegex, "first name must start with a letter and contain at least one letter")
          .max(200, "firstName must be below 200 characters"),
        required,
        "firstName is required"
      ),
      lastName: yup.string().max(200, "lastName must be below 200 characters"),
      mobile: yup.string().required(),

      email: yup.string().email().nullable().default(null),

      manager: dynamicRequire(yup.string().matches(objectIdRegex, "invalid manager id format"), required, "manager is required"),
      partner: dynamicRequire(yup.string().matches(objectIdRegex, "invalid partner id format"), required, "partner is required"),
    })
    .strict();

  try {
    let obj = { ...body };

    return await schema.validate(obj, { abortEarly: false });
  } catch (err) {
    let error = Array.isArray(err.errors) ? err.errors[0] : err.message;
    throw new Error(error, 400);
  }
};