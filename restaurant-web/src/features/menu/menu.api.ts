import { restaurantApi } from "@/features/restaurant/restaurant.api";
import type { MenuItem } from "./menu.types";

interface MenuApiItem {
    _id: string;
    name: string;
    image?: string;
    description?: string;
    category: string;
    cuisine?: string;
    price: number;
    foodType: "veg" | "non_veg" | "egg";
    isVegan: boolean;
    isHalal: boolean;
    spiceLevel: "mild" | "medium" | "hot";
    preparationTime: number;
    isAvailable: boolean;
    isFeatured: boolean;
    rating: number;
    totalReviews: number;
}

interface MenuApiResponse {
    success: boolean;
    message: string;
    data: MenuApiItem[];
}

interface FoodApiResponse {
    success: boolean;
    message: string;
    data: MenuApiItem;
}

interface MenuResponse {
    success: boolean;
    message: string;
    data: MenuItem[];
}

interface FoodResponse {
    success: boolean;
    message: string;
    data: MenuItem;
}

const mapFoodToMenuItem = (food: MenuApiItem): MenuItem => ({
    id: food._id,
    name: food.name,
    category: food.category,
    price: food.price,
    description: food.description ?? "",
    image: food.image ?? "",
    available: food.isAvailable,
    foodType: food.foodType,
    vegan: food.isVegan,
    halal: food.isHalal,
    bestseller: food.isFeatured,
    spiceLevel: food.spiceLevel,
    preparationTime: food.preparationTime,
    rating: food.rating,
    totalReviews: food.totalReviews,
});

export const menuApi = restaurantApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyMenu: builder.query<MenuResponse, void>({
            query: () => ({
                url: "/restaurant/menu",
                method: "GET",
            }),

            transformResponse: (
                response: MenuApiResponse
            ): MenuResponse => ({
                ...response,
                data: response.data.map(mapFoodToMenuItem),
            }),

            providesTags: ["Restaurant"],
        }),

        addFood: builder.mutation<FoodResponse, FormData>({
            query: (body) => ({
                url: "/restaurant/menu",
                method: "POST",
                body,
            }),

            transformResponse: (
                response: FoodApiResponse
            ): FoodResponse => ({
                ...response,
                data: mapFoodToMenuItem(response.data),
            }),

            invalidatesTags: ["Restaurant"],
        }),

        updateFood: builder.mutation<
            FoodResponse,
            {
                foodId: string;
                body: Record<string, unknown> | FormData;
            }
        >({
            query: ({ foodId, body }) => ({
                url: `/restaurant/menu/${foodId}`,
                method: "PATCH",
                body,
            }),

            transformResponse: (
                response: FoodApiResponse
            ): FoodResponse => ({
                ...response,
                data: mapFoodToMenuItem(response.data),
            }),

            invalidatesTags: ["Restaurant"],
        }),

        deleteFood: builder.mutation<
            {
                success: boolean;
                message: string;
                data: null;
            },
            string
        >({
            query: (foodId) => ({
                url: `/restaurant/menu/${foodId}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Restaurant"],
        }),

        updateAvailability: builder.mutation<
            FoodResponse,
            {
                foodId: string;
                isAvailable: boolean;
            }
        >({
            query: ({ foodId, isAvailable }) => ({
                url: `/restaurant/menu/${foodId}/availability`,
                method: "PATCH",
                body: {
                    isAvailable,
                },
            }),

            transformResponse: (
                response: FoodApiResponse
            ): FoodResponse => ({
                ...response,
                data: mapFoodToMenuItem(response.data),
            }),

            invalidatesTags: ["Restaurant"],
        }),
    }),
});

export const {
    useGetMyMenuQuery,
    useAddFoodMutation,
    useUpdateFoodMutation,
    useDeleteFoodMutation,
    useUpdateAvailabilityMutation,
} = menuApi;