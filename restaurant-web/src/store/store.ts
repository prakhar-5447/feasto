import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from '@/features/restaurant/restaurant.slice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            restaurant: restaurantReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];