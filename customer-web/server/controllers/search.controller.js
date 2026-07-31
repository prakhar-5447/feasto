const searchService = require("../services/search.service");

exports.searchRestaurants = async (req, res, next) => {

    try {

        const result = await searchService.searchRestaurants(req.query);

        res.json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {

        next(error);

    }

};