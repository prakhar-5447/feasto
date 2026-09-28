export interface CartItem {
    food: {
        _id: string;
        name: string;
        image: string;
        price: number;
    };
    name: string;
    price: number;
    quantity: number;
}