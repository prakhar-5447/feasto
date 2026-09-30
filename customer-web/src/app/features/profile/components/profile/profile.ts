import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideBell, LucideClock, LucideCreditCard, LucideGlobe, LucideHeart, LucideMapPin, LucideStar, LucideUser } from '@lucide/angular';


import {
  Address,
  FavoriteRestaurant,
  NavigationGroup,
  Order,
  ProfileSection,
  Review,
  SavedCard,
  UserProfile,
} from '@/app/features/profile/models/profile.models';
import { ProfileHero } from '@/app/features/profile/components/profile-hero/profile-hero';
import { ProfileSidebar } from '@/app/features/profile/components/profile-sidebar/profile-sidebar';
import { ProfileDetails } from '@/app/features/profile/components/profile-details/profile-details';
import { OrderHistory } from '@/app/features/profile/components/order-history/order-history';
import { OrderDetails } from '@/app/features/profile/components/order-details/order-details';
import { Reviews } from '@/app/features/profile/components/reviews/reviews';
import { Favorites } from '@/app/features/profile/components/favorites/favorites';
import { Addresses } from '@/app/features/profile/components/addresses/addresses';
import { SavedCards } from '@/app/features/profile/components/saved-cards/saved-cards';
import { Notifications } from '@/app/features/profile/components/notifications/notifications';
import { Settings } from '@/app/features/profile/components/settings/settings';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileHero,
    ProfileSidebar,
    ProfileDetails,
    OrderHistory,
    OrderDetails,
    Reviews,
    Favorites,
    Addresses,
    SavedCards,
    Notifications,
    Settings,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.sass',
})
export class Profile {
  readonly navigation: NavigationGroup[] = [
    {
      group: 'Account',
      items: [
        { id: 'details', label: 'Profile Details', icon: LucideUser },
      ],
    },
    {
      group: 'Activity',
      items: [
        { id: 'orders', label: 'Order History', icon: LucideClock },
        { id: 'reviews', label: 'My Reviews', icon: LucideStar },
        { id: 'favorites', label: 'Favorites', icon: LucideHeart },
      ],
    },
    {
      group: 'Payment',
      items: [
        { id: 'addresses', label: 'Addresses', icon: LucideMapPin },
        { id: 'cards', label: 'Saved Cards', icon: LucideCreditCard },
      ],
    },
    {
      group: 'More',
      items: [
        { id: 'notifications', label: 'Notifications', icon: LucideBell },
        { id: 'settings', label: 'Settings', icon: LucideGlobe },
      ],
    },
  ];

  readonly sectionTitles: Record<ProfileSection, string> = {
    details: 'Profile Details',
    orders: 'Order History',
    'order-details': 'Order Details',
    reviews: 'My Reviews',
    favorites: 'Favorites',
    addresses: 'Saved Addresses',
    cards: 'Saved Cards',
    notifications: 'Notifications',
    settings: 'Settings',
  };

  activeSection: ProfileSection = 'orders';
  selectedOrder: Order | null = null;
  saved = false;

  user: UserProfile = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    dob: '1995-04-12',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    joinedDate: 'January 2024',
  };

  readonly orders: Order[] = [
    {
      id: 'FEA20240901',
      restaurantName: 'Spice Garden',
      restaurantImage: 'https://images.unsplash.com/photo-1572517499173-4e2cb8bef19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      date: '2 Jan 2025, 7:45 PM',
      items: [
        { name: 'Chicken Biryani', qty: 2, price: 220 },
        { name: 'Paneer Tikka', qty: 1, price: 180 },
      ],
      total: 650,
      deliveryFee: 30,
      address: '123 MG Road, Koramangala, Bangalore',
      status: 'Delivered',
      paymentMethod: 'UPI',
    },
    {
      id: 'FEA20240872',
      restaurantName: 'Wok Express',
      restaurantImage: 'https://images.unsplash.com/photo-1682224932581-1fe063b105fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      date: '28 Dec 2024, 1:10 PM',
      items: [
        { name: 'Hakka Noodles', qty: 1, price: 160 },
        { name: 'Chilli Chicken', qty: 1, price: 210 },
      ],
      total: 380,
      deliveryFee: 0,
      address: 'Tech Park, Whitefield, Bangalore',
      status: 'Delivered',
      paymentMethod: 'UPI',
    },
    {
      id: 'FEA20240741',
      restaurantName: 'La Pasta',
      restaurantImage: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      date: '22 Dec 2024, 8:20 PM',
      items: [
        { name: 'Margherita Pizza', qty: 2, price: 350 },
        { name: 'Pasta Arrabiata', qty: 1, price: 280 },
        { name: 'Tiramisu', qty: 1, price: 180 },
      ],
      total: 1200,
      deliveryFee: 40,
      address: '45 HSR Layout, Bangalore',
      status: 'Delivered',
      paymentMethod: 'Cash on Delivery',
    },
  ];

  readonly addresses: Address[] = [
    { id: '1', type: 'Home', address: '123 MG Road, Koramangala, Bangalore — 560034', isDefault: true },
    { id: '2', type: 'Work', address: 'Tech Park, Whitefield, Bangalore — 560066', isDefault: false },
    { id: '3', type: 'Other', address: '45 HSR Layout, Sector 1, Bangalore — 560102', isDefault: false },
  ];

  readonly cards: SavedCard[] = [
    { id: '1', type: 'Visa', lastFour: '4242', expiry: '12/25', isDefault: true },
    { id: '2', type: 'Mastercard', lastFour: '8888', expiry: '08/26', isDefault: false },
  ];

  readonly reviews: Review[] = [
    {
      id: '1',
      restaurantName: 'Spice Garden',
      restaurantImage: 'https://images.unsplash.com/photo-1572517499173-4e2cb8bef19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 5,
      comment: 'Amazing biryani! Flavours were authentic and portion size was generous.',
      date: '2 Jan 2025',
    },
    {
      id: '2',
      restaurantName: 'La Pasta',
      restaurantImage: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4,
      comment: 'Good pizza but a bit pricey. Quality is great though!',
      date: '22 Dec 2024',
    },
  ];

  readonly favorites: FavoriteRestaurant[] = [
    {
      id: '1',
      name: 'Spice Garden',
      cuisine: 'Indian · North Indian',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1572517499173-4e2cb8bef19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    },
    {
      id: '2',
      name: 'La Pasta',
      cuisine: 'Italian · Continental',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    },
  ];

  constructor(private readonly router: Router) { }

  selectSection(section: Exclude<ProfileSection, 'order-details'>): void {
    this.activeSection = section;
    this.selectedOrder = null;
  }

  viewOrder(order: Order): void {
    this.selectedOrder = order;
    this.activeSection = 'order-details';
  }

  backToOrders(): void {
    this.selectedOrder = null;
    this.activeSection = 'orders';
  }

  saveProfile(): void {
    this.saved = true;
    window.setTimeout(() => (this.saved = false), 3000);
  }

  logout(): void {
    this.router.navigate(['/']);
  }
}
