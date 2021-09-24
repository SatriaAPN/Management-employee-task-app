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

const UserUpdateSchema = joi.object({
    name: 
        joi.string()
        .required(),
    password: 
        joi.string()
        .min(6)
        .required(),
    about: 
        joi.string()
        .allow(null, ''),
}); 

const UserChangePasswordSchema = joi.object({
    oldPassword: 
        joi.string()
        .required(),
    newPassword: 
        joi.string()
        .min(6)
        .required(),
    confirmNewPassword: 
        joi.string()
        .required(),
}); 


module.exports = { UserRegisterSchema, UserLoginSchema, UserUpdateSchema, UserChangePasswordSchema };