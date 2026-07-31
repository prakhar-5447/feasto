const Review = require("../models/review.model");

exports.createReview = async (data) => {

    return await Review.create(data);

};

exports.getRestaurantReviews = async (restaurantId) => {

    return await Review.find({ restaurant: restaurantId })
        .populate("user", "name");

};

exports.getAverageRating = async (restaurantId) => {

    const result = await Review.aggregate([
        { $match: { restaurant: restaurantId } },
        {
            $group: {
                _id: "$restaurant",
                avgRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 }
            }
        }
    ]);

    return result[0] || { avgRating: 0, totalReviews: 0 };

};

exports.updateReview = async (reviewId, data) => {

    return await Review.findByIdAndUpdate(reviewId, data, { new: true });

};

exports.deleteReview = async (reviewId) => {

    return await Review.findByIdAndDelete(reviewId);

};