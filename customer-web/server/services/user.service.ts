const userRepo = require('../repositories/user.repository');

export const getProfile = (userId: string) => {
    return userRepo.findById(userId);
};

export const updateProfile = (userId: string, data: any) => {
    return userRepo.updateUser(userId, data);
};

export const deleteProfile = (userId: string) => {
    return userRepo.deleteUser(userId);
};