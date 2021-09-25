const joi = require('joi');

const UserRegisterSchema = joi.object({
    name: joi.string()
        .min(6)
        .required(),
    email: joi.string()
        .required()
        .email(),
    password: joi.string()
        .min(6)
        .required(),
    role : joi.string()
        .required()
});

const UserLoginSchema = joi.object({
    email: joi.string()
        .required()
        .email(),
    password: joi.string()
        .min(6)
        .required(),
});

module.exports = { UserRegisterSchema, UserLoginSchema  };