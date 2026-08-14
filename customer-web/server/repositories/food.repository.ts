import Food, { IFood } from "../models/food.model";

export const findById = (
    id: string
): Promise<IFood | null> => {
    return Food.findById(id);
};

export const findByRestaurant = (
    restaurantId: string
): Promise<IFood[]> => {
    return Food.find({
        restaurant: restaurantId
    });
};

export const createFood = (
    data: Partial<IFood>
): Promise<IFood> => {
    return Food.create(data);
};

export const updateFood = (
    id: string,
    data: Partial<IFood>
): Promise<IFood | null> => {
    return Food.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteFood = (
    id: string
): Promise<IFood | null> => {
    return Food.findByIdAndDelete(id);
};

export const updateFoodAvailability = (
    id: string,
    isAvailable: boolean
): Promise<IFood | null> => {
    return Food.findByIdAndUpdate(
        id,
        { isAvailable },
        {
            new: true,
            runValidators: true
        }
    );
};

export const filterFoods = async (
    query: any
) => {

    const filter: any = {
        isAvailable: true
    };

    if (query.cuisine) {

        filter.cuisine = {
            $regex: query.cuisine,
            $options: "i"
        };
    }

    if (query.food) {

        filter.name = {
            $regex: query.food,
            $options: "i"
        };
    }

    return Food.find(filter)
        .populate(
            "restaurant",
            "name slug"
        );
};