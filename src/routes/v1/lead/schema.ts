import Joi from 'joi';

export const createLeadSchema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    message: Joi.string().required()
});

export const submitLeadRequestSchema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    message: Joi.string().required()
});