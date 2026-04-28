import { Routes } from '@angular/router';
import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth.guard';
import { Location } from './features/location/location';
import { Restaurant } from './features/restaurant/restaurant';
import { TabMenu } from './features/restaurant/tab-menu/tab-menu';
import { TabReviews } from './features/restaurant/tab-reviews/tab-reviews';
import { Cart } from './features/cart/cart';
import { RestaurantResolver } from './shared/pipes/resolver';
import { Checkout } from './features/checkout/checkout';

export const routes: Routes = [
    {
        path: '',
        // canActivate: [authGuard],
        loadComponent: () => LandingLayout,
    },
    {
        path: 'india',
        data: { breadcrumb: 'india' },
        loadComponent: () => DashboardLayout,
        children: [
            {
                path: '',
                loadComponent: () => Location
            },
            {
                path: ':city',
                data: { breadcrumb: 'city' },
                children: [
                    {
                        path: '',
                        loadComponent: () => Dashboard
                    },
                    {
                        path: ':restaurant',
                        loadComponent: () => Restaurant,
                        data: { breadcrumb: 'restaurant' },
                        children: [
                            {
                                path: '',
                                redirectTo: 'order', pathMatch: 'full'
                            },
                            {
                                path: 'order',
                                loadComponent: () => TabMenu,
                                data: { breadcrumb: 'Order' },

                            },
                            {
                                path: 'reviews',
                                loadComponent: () => TabReviews,
                                data: { breadcrumb: 'Reviews' },

                            },
                        ]

                    },
                    {
                        path: ':restaurant/cart' ,
                        loadComponent: () => Cart,
                        resolve: {
                            restaurant: RestaurantResolver
                        },
                        data: {
                            breadcrumb: 'cart'
                        }
                    },
                    {
                        path: ':restaurant/checkout',
                        loadComponent: () => Checkout,
                        resolve: {
                            restaurant: RestaurantResolver
                        },
                        data: {
                            breadcrumb: 'checkout'
                        }
                    }
                ]
            },

        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
