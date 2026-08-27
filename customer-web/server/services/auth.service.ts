import * as userRepo from "../repositories/user.repository";

export interface CompleteSignupData {
    phone: string;
    name: string;
    email?: string;
    role: "CUSTOMER";
}

export const phoneAuth = async (phone: string) => {
    const user = await userRepo.findByPhone(phone);

    return {
        user,
        isNewUser: !user
    };
};

export const markLogin = async (userId: string) => {
    return userRepo.updateLastLogin(userId);
};

export const completeSignup = async (
    data: CompleteSignupData
) => {
    const existingUser = await userRepo.findByPhone(data.phone);

    if (existingUser) {
        throw new Error("User already exists");
    }

    return userRepo.createUser(data);
};

export const getUserById = async (userId: string) => {
    return {
        user: await userRepo.findById(userId)
    };
};