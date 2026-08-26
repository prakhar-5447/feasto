import User, { IUser } from "../models/user.model";
import Order, { IOrder } from "../models/order.model";
import Review, { IReview } from "../models/review.model";


// --------------------------------------------------
// AUTH
// --------------------------------------------------

export const findByPhone = (
    phone: string
): Promise<IUser | null> => {

    return User.findOne({
        phone
    });
};


export const findById = (
    id: string
): Promise<IUser | null> => {

    return User.findById(id);
};


export const createUser = (
    data: Partial<IUser>
): Promise<IUser> => {

    return User.create(data);
};


// --------------------------------------------------
// USER
// --------------------------------------------------

export const updateUser = (
    id: string,
    data: Partial<IUser>
): Promise<IUser | null> => {

    return User.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};


export const deleteUser = (
    id: string
): Promise<IUser | null> => {

    return User.findByIdAndDelete(id);
};


export const findByUsername = (
    username: string
): Promise<IUser | null> => {

    return User.findOne({
        username,
        isActive: true
    }).select(
        "_id name username avatar"
    );
};


// --------------------------------------------------
// LOGIN
// --------------------------------------------------

export const updateLastLogin = (
    id: string
): Promise<IUser | null> => {

    return User.findByIdAndUpdate(
        id,
        {
            lastLogin: new Date()
        },
        {
            new: true
        }
    );
};


// --------------------------------------------------
// ORDERS
// --------------------------------------------------

export const findUserOrders = (
    userId: string
): Promise<IOrder[]> => {

    return Order.find({
        user: userId
    }).sort({
        createdAt: -1
    });
};


// --------------------------------------------------
// REVIEWS
// --------------------------------------------------

export const findUserReviews = (
    userId: string
): Promise<IReview[]> => {

    return Review.find({
        user: userId
    }).sort({
        createdAt: -1
    });
};