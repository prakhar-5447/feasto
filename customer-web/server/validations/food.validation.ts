import Joi from "joi";

export const createFoodSchema = Joi.object({

    name: Joi.string().required(),

    description: Joi.string().allow(""),

    price: Joi.number().required(),

    category: Joi.string().required(),

    image: Joi.string().allow("")
});