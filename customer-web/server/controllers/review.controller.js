const reviewService = require("../services/review.service");

exports.createReview = async (req, res, next) => {

    try {

        const review = await reviewService.createReview(
            req.user.id,
            req.params["restaurantId"],
            req.body
        );

        res.status(201).json({
            success: true,
            data: review
        });

    } catch (error) {
        next(error);
    }

};

exports.getRestaurantReviews = async (req, res, next) => {

    try {

        const reviews = await reviewService.getRestaurantReviews(
            req.params["restaurantId"]
        );

        res.json({
            success: true,
            data: reviews
        });

    } catch (error) {
        next(error);
    }

};

exports.updateReview = async (req, res, next) => {

    try {

        const review = await reviewService.updateReview(
            req.params["id"],
            req.body
        );

        res.json({
            success: true,
            data: review
        });

    } catch (error) {
        next(error);
    }

};

exports.deleteReview = async (req, res, next) => {

    try {

        await reviewService.deleteReview(req.params.id);

        res.json({
            success: true,
            message: "Review deleted"
        });

    } catch (error) {
        next(error);
    }

};