import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import type {
    GetRestaurantResponse,
    UpdateRestaurantRequest,
    UpdateRestaurantResponse,
} from './restaurant.types';

const baseQuery = fetchBaseQuery({
    baseUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api/v1',

    credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (
    args,
    api,
    extraOptions,
) => {

        let result = await baseQuery(
            args,
            api,
            extraOptions,
        );

        if (result.error?.status === 401) {

            const refreshResult =
                await baseQuery(
                    {
                        url: '/auth/refresh',
                        method: 'POST',
                    },
                    api,
                    extraOptions,
                );

            if (refreshResult.data) {

                result = await baseQuery(
                    args,
                    api,
                    extraOptions,
                );

            } else {

                api.dispatch(
                    restaurantApi.util.resetApiState(),
                );

                if (
                    typeof window !== 'undefined'
                ) {
                    window.location.href =
                        '/login';
                }
            }
        }

        return result;
    };


export const restaurantApi =
    createApi({

        reducerPath: 'restaurantApi',

        baseQuery:
            baseQueryWithReauth,

        tagTypes: [
            'Restaurant',
            'Auth',
            'Order',
        ],

        endpoints: (builder) => ({

            getRestaurant: builder.query<
                any,
                void
            >({
                query: () => ({
                    url: '/restaurant/my',
                    method: 'GET',
                }),

                providesTags: [
                    'Restaurant',
                ],
            }),


            updateRestaurant: builder.mutation<
                UpdateRestaurantResponse,
                UpdateRestaurantRequest
            >({
                query: (data) => ({
                    url: '/restaurant/update',
                    method: 'PATCH',
                    body: data,
                }),
                invalidatesTags: ['Restaurant'],
            }),

        }),
    });


export const {
    useGetRestaurantQuery,
    useUpdateRestaurantMutation,
} = restaurantApi;