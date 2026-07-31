const Restaurant = require("../models/restaurant.model");

exports.searchRestaurants = async (query) => {

    const {
        keyword,
        minRating,
        priceRange,
        lat,
        lng,
        radius
    } = query;

    const filter = {};

    if (keyword) {

        filter.$or = [
            { name: { $regex: keyword, $options: "i" } },
            { cuisine: { $regex: keyword, $options: "i" } }
        ];

    }

    if (minRating) {
        filter.avgRating = { $gte: Number(minRating) };
    }

    if (priceRange) {
        filter.priceRange = Number(priceRange);
    }

    if (lat && lng) {

        filter.location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [Number(lng), Number(lat)]
                },
                $maxDistance: Number(radius) || 5000
            }
        };

    }

    return await Restaurant.find(filter)
        .limit(20);

};