import {
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import type { Restaurant } from './restaurant.types';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const restaurantApi = createApi({
    reducerPath: 'restaurantApi',

    baseQuery: fetchBaseQuery({
        baseUrl:
            process.env.NEXT_PUBLIC_API_BASE_URL ??
            '/api/v1',
        credentials: 'include',
    }),

    tagTypes: ['Restaurant'],

    endpoints: (builder) => ({
        getRestaurant: builder.query<
            Restaurant,
            void
        >({
            query: () => '/restaurant',

            transformResponse: (
                response: ApiResponse<Restaurant>
            ) => response.data,

            providesTags: ['Restaurant'],
        }),

        updateRestaurantStatus:
            builder.mutation<
                Restaurant,
                { isOpen: boolean }
            >({
                query: (body) => ({
                    url: '/restaurant/status',
                    method: 'PATCH',
                    body,
                }),

                transformResponse: (
                    response: ApiResponse<Restaurant>
                ) => response.data,

                invalidatesTags: ['Restaurant'],
            }),
    }),
});

export const {
    useGetRestaurantQuery,
    useUpdateRestaurantStatusMutation,
} = restaurantApi;