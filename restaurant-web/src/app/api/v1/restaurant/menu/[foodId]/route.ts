import {
    NextRequest,
    NextResponse,
} from "next/server";

import { getAuthenticatedUser } from "@/server/utils/auth.utils";
import * as restaurantService from "@/server/services/restaurant.service";
import * as foodService from "@/server/services/food.service";
import {
    validateFoodOwnership,
} from "@/server/utils/food.helper";

interface RouteContext {
    params: Promise<{
        foodId: string;
    }>;
}

export async function PATCH(
    request: NextRequest,
    context: RouteContext
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

        const { foodId } =
            await context.params;

        const food =
            await validateFoodOwnership(
                foodId,
                user._id.toString()
            );

        if (
            food.restaurant.toString() !==
            restaurant._id.toString()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "You do not own this food item",
                },
                { status: 403 }
            );
        }

        const body =
            await request.json();

        const updatedFood =
            await foodService.updateFood(
                foodId,
                body
            );

        if (!updatedFood) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Food not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message:
                "Food updated successfully",
            data: updatedFood,
        });
    } catch (error) {
        console.error(
            "PATCH /restaurant/menu/[foodId]:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to update food",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: RouteContext
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

        const { foodId } =
            await context.params;

        const food =
            await validateFoodOwnership(
                foodId,
                user._id.toString()
            );

        if (
            food.restaurant.toString() !==
            restaurant._id.toString()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "You do not own this food item",
                },
                { status: 403 }
            );
        }

        const deletedFood =
            await foodService.deleteFood(
                foodId
            );

        if (!deletedFood) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Food not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message:
                "Food deleted successfully",
            data: null,
        });
    } catch (error) {
        console.error(
            "DELETE /restaurant/menu/[foodId]:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to delete food",
            },
            { status: 500 }
        );
    }
}