import Joi from "joi";

export const createRestaurantSchema = Joi.object({

    name: Joi.string().required(),

    description: Joi.string().allow(""),

    address: Joi.string().required(),

    cuisine: Joi.array()
        .items(Joi.string())
        .default([]),

    priceRange: Joi.number()
        .min(1)
        .max(5),

    location: Joi.object({
        type: Joi.string().valid("Point").required(),
        coordinates: Joi.array()
            .items(Joi.number())
            .length(2)
            .required()
    })

});