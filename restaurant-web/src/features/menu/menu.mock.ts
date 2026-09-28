import type { MenuItem } from "./menu.types";

export const INITIAL_CATEGORIES = [
    "Biryani",
    "Curries",
    "Breads",
    "Beverages",
    "Desserts",
];

export const INITIAL_ITEMS: MenuItem[] = [
    {
        id: "mock-1",
        name: "Chicken Biryani",
        category: "Biryani",
        price: 299,
        description:
            "Aromatic basmati rice with tender chicken, saffron & whole spices",
        image: "",
        available: true,
        foodType: "non_veg",
        vegan: false,
        halal: false,
        bestseller: true,
        spiceLevel: "medium",
        preparationTime: 20,
        rating: 4.5,
        totalReviews: 0,
    },
    {
        id: "mock-2",
        name: "Mutton Biryani",
        category: "Biryani",
        price: 380,
        description:
            "Slow-cooked dum biryani with succulent mutton pieces",
        image: "",
        available: true,
        foodType: "non_veg",
        vegan: false,
        halal: false,
        bestseller: false,
        spiceLevel: "hot",
        preparationTime: 25,
        rating: 4.5,
        totalReviews: 0,
    },
];


