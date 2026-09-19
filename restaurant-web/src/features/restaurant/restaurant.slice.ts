import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface RestaurantState {
    id: string | null;
    name: string;
    isOpen: boolean;
    acceptingOrders: boolean;
}

const initialState: RestaurantState = {
    id: null,
    name: '',
    isOpen: false,
    acceptingOrders: false,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurant: (
            state,
            action: PayloadAction<RestaurantState>
        ) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.isOpen = action.payload.isOpen;
            state.acceptingOrders =
                action.payload.acceptingOrders;
        },

        setRestaurantOpen: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isOpen = action.payload;
        },

        setAcceptingOrders: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.acceptingOrders =
                action.payload;
        },

        resetRestaurant: (state) => {
            state.id = null;
            state.name = '';
            state.isOpen = false;
            state.acceptingOrders = false;
        },
    },
});

export const {
    setRestaurant,
    setRestaurantOpen,
    setAcceptingOrders,
    resetRestaurant,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;