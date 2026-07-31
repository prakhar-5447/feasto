const reviewRepository = require("../repositories/review.repository");

const Restaurant = require("../models/restaurant.model");

exports.createReview = async (userId, restaurantId, data) => {

    const review = await reviewRepository.createReview({

        user: userId,
        restaurant: restaurantId,
        rating: data.rating,
        comment: data.comment

    });

    await updateRestaurantRating(restaurantId);

    return review;

};

const updateRestaurantRating = async (restaurantId) => {

    const reviews = await reviewRepository.getRestaurantReviews(restaurantId);

    const totalReviews = reviews.length;

    const avgRating = totalReviews === 0
        ? 0
        : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    await Restaurant.findByIdAndUpdate(restaurantId, {
        avgRating,
        totalReviews
    });

};

exports.getRestaurantReviews = async (restaurantId) => {

    return await reviewRepository.getRestaurantReviews(restaurantId);

};

exports.getAverageRating = async (restaurantId) => {

    return await reviewRepository.getAverageRating(restaurantId);

};

exports.updateReview = async (reviewId, data) => {

    const review = await reviewRepository.updateReview(reviewId, data);

    await updateRestaurantRating(review.restaurant);

    return review;

};

exports.deleteReview = async (reviewId) => {

    const review = await reviewRepository.deleteReview(reviewId);

    if (review) {
        await updateRestaurantRating(review.restaurant);
    }

};