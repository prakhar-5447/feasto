import Joi from "joi";

export const createFoodSchema = Joi.object({
    name: Joi.string().required(),

    description: Joi.string().allow(""),

    price: Joi.number()
        .min(0)
        .required(),

    cuisine: Joi.string().allow(""),

    foodType: Joi.string()
        .valid("VEG", "EGG", "NON_VEG")
        .required(),

    preparationTime: Joi.number()
        .min(1)
        .required(),

    isAvailable: Joi.boolean()
        .default(true),

    isFeatured: Joi.boolean()
        .default(false),

    image: Joi.string()
        .allow("")
        .optional()
});