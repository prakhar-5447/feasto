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

    {
        path: '',
        // canActivate: [authGuard],
        loadComponent: () => LandingLayout,
    },

    {
        path: 'india',

        data: {
            breadcrumb: 'india'
        },

        loadComponent: () => DashboardLayout,

        children: [

            {
                path: '',
                loadComponent: () => Location,

                data: {
                    hideBreadcrumb: true
                }
            },

            {
                path: ':city',

                data: {
                    breadcrumb: 'city'
                },

                children: [

                    {
                        path: '',
                        loadComponent: () => Dashboard
                    },

                    {
                        path: ':restaurant',

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

                            {
                                path: 'order',

                                loadComponent: () => TabMenu,

                                data: {
                                    breadcrumb: 'Order'
                                }
                            },

                            {
                                path: 'reviews',

                                loadComponent: () => TabReviews,

                                data: {
                                    breadcrumb: 'Reviews'
                                }
                            }
                        ]
                    },

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

                    {
                        path: ':restaurant/checkout',

                        loadComponent: () => Checkout,

                        resolve: {
                            restaurant: RestaurantResolver
                        },

                        data: {
                            breadcrumb: 'Checkout',
                            hideBreadcrumb: true
                        }
                    },

                    {
                        path: ':restaurant/payment',

                        loadComponent: () => Payment,

                        resolve: {
                            restaurant: RestaurantResolver
                        },

                        data: {
                            breadcrumb: 'Payment',
                            hideBreadcrumb: true
                        }
                    }
                ]
            }
        ]
    },

    {
        path: '**',
        redirectTo: ''
    }
];