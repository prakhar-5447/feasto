import { Routes } from '@angular/router';

import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

import { Location } from './features/location/location';
import { Dashboard } from './features/dashboard/dashboard';

import { Restaurant } from './features/restaurant/restaurant';
import { TabMenu } from './features/restaurant/tab-menu/tab-menu';
import { TabReviews } from './features/restaurant/tab-reviews/tab-reviews';

import { Cart } from './features/cart/cart';
import { Checkout } from './features/checkout/checkout';
import { Payment } from './features/payment/payment';

import { RestaurantResolver } from './shared/pipes/resolver'

export const routes: Routes = [

    // ============================================================
    // Landing
    // ============================================================

    {
        path: '',
        // canActivate: [authGuard],
        loadComponent: () => LandingLayout,
    },


    // ============================================================
    // Dashboard Layout
    // ============================================================

    {
        path: 'india',

        data: {
            breadcrumb: 'india'
        },

        loadComponent: () => DashboardLayout,

        children: [

            // --------------------------------------------------------
            // Location
            // /india
            // --------------------------------------------------------

            {
                path: '',
                loadComponent: () => Location
            },


            // --------------------------------------------------------
            // City
            // /india/:city
            // --------------------------------------------------------

            {
                path: ':city',

                data: {
                    breadcrumb: 'city'
                },

                children: [

                    // ------------------------------------------------
                    // Dashboard
                    // /india/:city
                    // ------------------------------------------------

                    {
                        path: '',
                        loadComponent: () => Dashboard
                    },


                    // ------------------------------------------------
                    // Restaurant
                    // /india/:city/:restaurant
                    // ------------------------------------------------

                    {
                        path: ':restaurant',

                        loadComponent: () => Restaurant,

                        data: {
                            breadcrumb: 'restaurant'
                        },

                        children: [

                            // ----------------------------------------
                            // Default restaurant tab
                            // ----------------------------------------

                            {
                                path: '',
                                redirectTo: 'order',
                                pathMatch: 'full'
                            },


                            // ----------------------------------------
                            // Order
                            // /india/:city/:restaurant/order
                            // ----------------------------------------

                            {
                                path: 'order',

                                loadComponent: () => TabMenu,

                                data: {
                                    breadcrumb: 'Order'
                                }
                            },


                            // ----------------------------------------
                            // Reviews
                            // /india/:city/:restaurant/reviews
                            // ----------------------------------------

                            {
                                path: 'reviews',

                                loadComponent: () => TabReviews,

                                data: {
                                    breadcrumb: 'Reviews'
                                }
                            }
                        ]
                    },


                    // ------------------------------------------------
                    // Cart
                    // /india/:city/:restaurant/cart
                    // ------------------------------------------------

                    {
                        path: ':restaurant/cart',

                        loadComponent: () => Cart,

                        resolve: {
                            restaurant: RestaurantResolver
                        },

                        data: {
                            breadcrumb: 'Cart'
                        }
                    },


                    // ------------------------------------------------
                    // Checkout
                    // /india/:city/:restaurant/checkout
                    // ------------------------------------------------

                    {
                        path: ':restaurant/checkout',

                        loadComponent: () => Checkout,

                        resolve: {
                            restaurant: RestaurantResolver
                        },

                        data: {
                            breadcrumb: 'Checkout'
                        }
                    },


                    // ------------------------------------------------
                    // Payment
                    // /india/:city/:restaurant/payment
                    // ------------------------------------------------

                    {
                        path: ':restaurant/payment',

                        loadComponent: () => Payment,

                        resolve: {
                            restaurant: RestaurantResolver
                        },

                        data: {
                            breadcrumb: 'Payment'
                        }
                    }
                ]
            }
        ]
    },


    // ============================================================
    // Fallback
    // ============================================================

    {
        path: '**',
        redirectTo: ''
    }
];