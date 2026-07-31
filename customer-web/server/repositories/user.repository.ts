import User, { IUser } from "../models/user.model";

export const findByPhone = (phone: string): Promise<IUser | null> => {
    return User.findOne({ phone });
};

export const findById = (id: string): Promise<IUser | null> => {
    return User.findById(id);
};

export const createUser = (data: Partial<IUser>): Promise<IUser> => {
    return User.create(data);
};

export const updateUser = (
    id: string,
    data: Partial<IUser>
): Promise<IUser | null> => {
    return User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = (id: string): Promise<IUser | null> => {
    return User.findByIdAndDelete(id);
};