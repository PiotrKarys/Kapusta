const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please use a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)/)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password must contain at least one letter and one number",
      "any.required": "Password is required",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please use a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

const refreshTokenSchema = Joi.object({
  sid: Joi.string().required().messages({
    "any.required": "sid is required",
  }),
});

const periodDataSchema = Joi.object({
  date: Joi.string()
    .pattern(/^(?:\d{4}|\d{4}-\d{2})$/)
    .required()
    .messages({
      "string.base": `"date" should be a string`,
      "string.empty": `"date" cannot be empty`,
      "any.required": `"date" is required`,
      "string.pattern.base": `"date" must be in the format YYYY or YYYY-MM`,
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  periodDataSchema,
};
