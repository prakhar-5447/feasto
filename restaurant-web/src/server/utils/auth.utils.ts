import {
    cookies,
} from 'next/headers';

import jwt from 'jsonwebtoken';

import User, {
    type IUser,
} from '@/server/models/user.model';


interface AccessTokenPayload {
    userId: string;
}


export const getAuthenticatedUser =
    async (): Promise<IUser> => {

        const cookieStore =
            await cookies();

        const token =
            cookieStore.get(
                'accessToken',
            )?.value;


        if (!token) {
            throw new Error(
                'Authentication required',
            );
        }


        let decoded:
            AccessTokenPayload;


        try {

            decoded =
                jwt.verify(
                    token,
                    process.env[
                    'ACCESS_TOKEN_SECRET'
                    ]!,
                ) as AccessTokenPayload;

        } catch {
            throw new Error(
                'Access token expired or invalid',
            );
        }


        if (!decoded.userId) {
            throw new Error(
                'Invalid access token',
            );
        }


        const user =
            await User.findById(
                decoded.userId,
            );


        if (!user) {
            throw new Error(
                'User not found',
            );
        }


        if (!user.isActive) {
            throw new Error(
                'User account is inactive',
            );
        }


        return user;
    };