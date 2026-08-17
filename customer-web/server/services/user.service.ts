import * as userRepo from "../repositories/user.repository";

export const getProfile = (
    userId: string
) => {
    return userRepo.findById(userId);
};

export const updateProfile = (
    userId: string,
    data: any
) => {
    return userRepo.updateUser(
        userId,
        data
    );
};

export const deleteProfile = (
    userId: string
) => {
    return userRepo.deleteUser(userId);
};

export const getPublicProfile = (
    username: string
) => {
    return userRepo.findByUsername(username);
};

export const getOrderHistory = (
    userId: string
) => {
    return userRepo.findUserOrders(userId);
};

export const getReviewHistory = (
    userId: string
) => {
    return userRepo.findUserReviews(userId);
};
