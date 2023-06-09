import joi from "joi";

export const registerSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.password().min(3).required(),
    repeatPassword: joi.ref('password').required()
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.password().required()
});