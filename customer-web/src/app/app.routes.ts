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

import { RestaurantResolver } from './shared/pipes/resolver';

import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { LandingLayout } from './layouts/landing-layout/landing-layout';


export const routes: Routes = [

    {
        path: '',
        loadComponent: () => LandingLayout,

        children: [
            {
                path: '',
                loadComponent: () => Landing,
            },
            {
                path: 'india',
                loadComponent: () => Location,
            }
        ]
    },

    {
        path: 'india/:city',
        data: {
            breadcrumb: 'city'
        },
        loadComponent: () => DashboardLayout,

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
            },
        
        ]
    },

    {
        path: '**',
        redirectTo: ''
    }
];