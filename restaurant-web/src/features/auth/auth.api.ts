import {
    restaurantApi,
} from '@/features/restaurant/restaurant.api';

export interface AuthUser {
    id: string;
    phone: string;
    name?: string;
    role: 'restaurant_partner';
}

export interface MeResponse {
    success: boolean;

    data?: {
        user: AuthUser;
    };

    message?: string;
}

export const authApi =
    restaurantApi.injectEndpoints({
        endpoints: (builder) => ({
            getMe: builder.query<
                MeResponse,
                void
            >({
                query: () => ({
                    url: '/restaurant/me',
                    method: 'GET',
                }),

                providesTags: ['Auth'],
            }),
        }),

        overrideExisting: false,
    });

export const {
    useGetMeQuery,
} = authApi;