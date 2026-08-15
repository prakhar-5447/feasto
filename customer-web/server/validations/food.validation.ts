import Joi from "joi";

export const createFoodSchema = Joi.object({

    name: Joi.string()
        .required(),

    description: Joi.string()
        .allow("")
        .optional(),

    price: Joi.number()
        .required(),

    cuisine: Joi.string()
        .allow("")
        .optional(),

    image: Joi.string()
        .allow("")
        .optional(),

    isAvailable: Joi.boolean()
        .default(true)
});