export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    avatar: string;
    joinedDate: string;
}

export interface OrderItem {
    name: string;
    qty: number;
    price: number;
}

export interface Order {
    id: string;
    restaurantName: string;
    restaurantImage: string;
    date: string;
    items: OrderItem[];
    total: number;
    deliveryFee: number;
    address: string;
    status: string;
    paymentMethod: string;
}

export interface Address {
    id: string;
    type: string;
    address: string;
    isDefault: boolean;
}

export interface SavedCard {
    id: string;
    type: 'Visa' | 'Mastercard';
    lastFour: string;
    expiry: string;
    isDefault: boolean;
}

export interface Review {
    id: string;
    restaurantName: string;
    restaurantImage: string;
    rating: number;
    comment: string;
    date: string;
}

export interface FavoriteRestaurant {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    image: string;
}

export type ProfileSection =
    | 'details'
    | 'orders'
    | 'order-details'
    | 'reviews'
    | 'favorites'
    | 'addresses'
    | 'cards'
    | 'notifications'
    | 'settings';

export interface NavigationItem {
    id: Exclude<ProfileSection, 'order-details'>;
    label: string;
    icon: any;
}

export interface NavigationGroup {
    group: string;
    items: NavigationItem[];
}
