import {
    restaurantApi,
} from '@/features/restaurant/restaurant.api';

import type {
    HoursMap,
} from './components/operating-hours/operating-hours';


export interface RestaurantProfile {
    name: string;

    tagline: string;

    description: string;

    email: string;

    phone: string;

    altPhone: string;

    website: string;

    instagram: string;

    facebook: string;

    address: string;

    landmark: string;

    city: string;

    state: string;

    pincode: string;

    minOrder: number;

    avgCookTime: number;

    cuisine: string[];

    fssai: string;

    gstin: string;

    operatingHours: HoursMap;
}


interface ProfileResponse {
    success: boolean;

    message: string;

    data: RestaurantProfile;
}


export const profileApi =
    restaurantApi.injectEndpoints({

        endpoints: (builder) => ({

            getRestaurantProfile:
                builder.query<
                    ProfileResponse,
                    void
                >({

                    query: () => ({
                        url:
                            '/restaurant/profile',

                        method: 'GET',
                    }),

                    providesTags: [
                        'Restaurant',
                    ],
                }),


            updateRestaurantProfile:
                builder.mutation<
                    ProfileResponse,
                    Partial<
                        RestaurantProfile
                    >
                >({

                    query: (body) => ({
                        url:
                            '/restaurant/profile',

                        method: 'PATCH',

                        body,
                    }),

                    invalidatesTags: [
                        'Restaurant',
                    ],
                }),

        }),
    });


export const {
    useGetRestaurantProfileQuery,
    useUpdateRestaurantProfileMutation,
} = profileApi;