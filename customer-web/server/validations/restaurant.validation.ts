import Joi from "joi";

export const createRestaurantSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(""),
    address: Joi.string().allow(""),

    cuisine: Joi.array().items(
        Joi.string()
    ),

    priceRange: Joi.number()
        .min(1)
        .max(5),

    priceForTwo: Joi.number()
        .min(0),

    estimatedDeliveryTime: Joi.number()
        .min(0),

    openTime: Joi.number()
        .min(0)
        .max(23),

    closeTime: Joi.number()
        .min(0)
        .max(23),

    offer: Joi.array().items(
        Joi.string()
    ),

    location: Joi.object({
        type: Joi.string()
            .valid("Point")
            .required(),

        coordinates: Joi.array()
            .items(Joi.number())
            .length(2)
            .required()
    }).required()
});