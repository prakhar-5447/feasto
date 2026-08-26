import { Routes } from '@angular/router';

import { Cart } from './features/cart/cart';
import { Checkout } from './features/checkout/checkout';
import { Dashboard } from './features/dashboard/dashboard';
import { Landing } from './features/landing/landing';
import { Location } from './features/location/location';
import { Payment } from './features/payment/payment';
import { Restaurant } from './features/restaurant/restaurant';
import { TabMenu } from './features/restaurant/tab-menu/tab-menu';
import { TabReviews } from './features/restaurant/tab-reviews/tab-reviews';

import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { LandingLayout } from './layouts/landing-layout/landing-layout';

import { RestaurantResolver } from './shared/pipes/resolver';
import { validCityGuard } from './core/guards/valid-city.guard';

export const routes: Routes = [

    // ============================================================
    // Landing
    // ============================================================

    {
        path: '',
        loadComponent: () => LandingLayout,

        children: [
            {
                path: '',
                loadComponent: () => Landing
            },


            // ============================================================
            // Location selection
            // ============================================================
            {
                path: 'india',
                loadComponent: () => Location
            }
        ]
    },


    // ============================================================
    // City dashboard
    // ============================================================

    {
        path: 'india/:city',
        loadComponent: () => DashboardLayout,
        canActivate:[validCityGuard],
        children: [

            // /india/dhanbad
            {
                path: '',
                loadComponent: () => Dashboard
            },

            // /india/dhanbad/r/dominos-pizza
            {
                path: 'r/:restaurant',

                loadComponent: () => Restaurant,

                data: {
                    breadcrumb: 'restaurant'
                },

                children: [

                    {
                        path: '',
                        redirectTo: 'order',
                        pathMatch: 'full'
                    },

                    // /india/dhanbad/r/dominos-pizza/order
                    {
                        path: 'order',
                        loadComponent: () => TabMenu,

                        data: {
                            breadcrumb: 'Order'
                        }
                    },

                    // /india/dhanbad/r/dominos-pizza/reviews
                    {
                        path: 'reviews',
                        loadComponent: () => TabReviews,

                        data: {
                            breadcrumb: 'Reviews'
                        }
                    }
                ]
            },


            // /india/dhanbad/r/dominos-pizza/cart
            {
                path: 'r/:restaurant/cart',

                loadComponent: () => Cart,

                resolve: {
                    restaurant: RestaurantResolver
                },

                data: {
                    breadcrumb: 'Cart'
                }
            },


            // /india/dhanbad/r/dominos-pizza/checkout
            {
                path: 'r/:restaurant/checkout',

                loadComponent: () => Checkout,

                resolve: {
                    restaurant: RestaurantResolver
                },

                data: {
                    breadcrumb: 'Checkout',
                    hideBreadcrumb: true
                }
            },


            // /india/dhanbad/r/dominos-pizza/payment
            {
                path: 'r/:restaurant/payment',

                loadComponent: () => Payment,

                resolve: {
                    restaurant: RestaurantResolver
                },

                data: {
                    breadcrumb: 'Payment',
                    hideBreadcrumb: true
                }
            },
        
        ]
    },


    // ============================================================
    // 404
    // ============================================================

    {
        path: '**',
        redirectTo: ''
    }
];