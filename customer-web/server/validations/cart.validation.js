const Joi = require("joi");

exports.addToCartSchema = Joi.object({

    foodId: Joi.string().required(),

    quantity: Joi.number().min(1).required()

});