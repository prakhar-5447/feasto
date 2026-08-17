import Joi from "joi";

export const createRestaurantSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    address: Joi.string(),

    cuisine: Joi.array().items(
        Joi.string()
    ),

    priceRange: Joi.number()
        .min(1)
        .max(5),

    priceForTwo: Joi.number(),

    estimatedDeliveryTime: Joi.number(),

    avgRating: Joi.number(),

    totalReviews: Joi.number(),

    openTime: Joi.number(),

    closeTime: Joi.number(),

    offer: Joi.array().items(
        Joi.string()
    ),

    location: Joi.object({
        type: Joi.string().required(),

        coordinates: Joi.array()
            .items(Joi.number())
            .length(2)
            .required()
    }).required()
});