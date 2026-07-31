import * as userRepo from '../repositories/user.repository';

export const phoneAuth = async (phone: string) => {
    const user = await userRepo.findByPhone(phone);

    if (user) {
        user.lastLogin = new Date();
        await user.save();
        return { user, isNewUser: false };
    }

    return { user: null, isNewUser: true };
};

export const completeSignup = async (data: any) => {
    return userRepo.createUser(data);
};