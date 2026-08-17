import Joi from "joi";

export const createFoodSchema = Joi.object({
    name: Joi.string().required(),

    description: Joi.string().allow(""),

    price: Joi.number().required(),

    cuisine: Joi.string().allow(""),

    foodType: Joi.string()
        .valid("veg", "egg", "non-veg")
        .required(),

    isAvailable: Joi.boolean().default(true),

    image: Joi.string()
        .allow("")
        .optional(),
});