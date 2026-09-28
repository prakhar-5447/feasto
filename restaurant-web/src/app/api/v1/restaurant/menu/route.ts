import { NextRequest, NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/server/utils/auth.utils";
import * as restaurantService from "@/server/services/restaurant.service";
import * as foodService from "@/server/services/food.service";
import { uploadToCloudinary } from "@/server/utils/uploadToCloudinary";

const FOOD_TYPES = [
    "veg",
    "non_veg",
    "egg",
] as const;

const SPICE_LEVELS = [
    "mild",
    "medium",
    "hot",
] as const;

export async function GET() {
    try {
        const user = await getAuthenticatedUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const restaurant =
            await restaurantService.getMyRestaurant(
                user._id.toString()
            );

        if (!restaurant) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Restaurant not found",
                },
                { status: 404 }
            );
        }

        const foods =
            await foodService.getRestaurantMenu(
                restaurant._id.toString()
            );

        return NextResponse.json({
            success: true,
            message: "Menu fetched successfully",
            data: foods,
        });
    } catch (error) {
        console.error(
            "GET /restaurant/menu:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch menu",
            },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest
) {
    try {
        const user =
            await getAuthenticatedUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const restaurant =
            await restaurantService.getMyRestaurant(
                user._id.toString()
            );

        if (!restaurant) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Restaurant not found",
                },
                { status: 404 }
            );
        }

        const formData =
            await request.formData();

        const name = String(
            formData.get("name") ?? ""
        ).trim();

        const category = String(
            formData.get("category") ?? ""
        ).trim();

        const description = String(
            formData.get("description") ?? ""
        ).trim();

        const cuisine = String(
            formData.get("cuisine") ?? ""
        ).trim();

        const price = Number(
            formData.get("price") ?? 0
        );

        const preparationTime = Number(
            formData.get(
                "preparationTime"
            ) ?? 15
        );

        const foodTypeValue = String(
            formData.get("foodType") ?? "veg"
        );

        const spiceLevelValue = String(
            formData.get("spiceLevel") ?? "mild"
        );

        const available =
            String(
                formData.get("available") ??
                "true"
            ) === "true";

        const vegan =
            String(
                formData.get("vegan") ??
                "false"
            ) === "true";

        const halal =
            String(
                formData.get("halal") ??
                "false"
            ) === "true";

        const bestseller =
            String(
                formData.get("bestseller") ??
                "false"
            ) === "true";

        if (!name) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Food name is required",
                },
                { status: 400 }
            );
        }

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Category is required",
                },
                { status: 400 }
            );
        }

        if (
            !Number.isFinite(price) ||
            price < 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid price",
                },
                { status: 400 }
            );
        }

        if (
            !Number.isFinite(
                preparationTime
            ) ||
            preparationTime < 1
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid preparation time",
                },
                { status: 400 }
            );
        }

        if (
            !FOOD_TYPES.includes(
                foodTypeValue as (typeof FOOD_TYPES)[number]
            )
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid food type",
                },
                { status: 400 }
            );
        }

        if (
            !SPICE_LEVELS.includes(
                spiceLevelValue as (typeof SPICE_LEVELS)[number]
            )
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid spice level",
                },
                { status: 400 }
            );
        }

        const foodType =
            foodTypeValue as (typeof FOOD_TYPES)[number];

        const spiceLevel =
            spiceLevelValue as (typeof SPICE_LEVELS)[number];

        let imageUrl = "";

        const image =
            formData.get("image");

        if (image instanceof File) {
            if (
                !image.type.startsWith(
                    "image/"
                )
            ) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Only image files are allowed",
                    },
                    { status: 400 }
                );
            }

            if (
                image.size >
                5 * 1024 * 1024
            ) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Image must be smaller than 5MB",
                    },
                    { status: 400 }
                );
            }

            imageUrl =
                await uploadToCloudinary(
                    image
                );
        }

        const food =
            await foodService.addFood(
                {
                    name,
                    category,
                    price,
                    description,
                    cuisine,
                    foodType,
                    vegan,
                    halal,
                    spiceLevel,
                    preparationTime,
                    available,
                    bestseller,
                },
                restaurant._id.toString(),
                imageUrl
            );

        return NextResponse.json(
            {
                success: true,
                message:
                    "Food added successfully",
                data: food,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(
            "POST /restaurant/menu:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to add food",
            },
            { status: 500 }
        );
    }
}