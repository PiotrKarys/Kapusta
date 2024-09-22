const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please use a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
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

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
};
