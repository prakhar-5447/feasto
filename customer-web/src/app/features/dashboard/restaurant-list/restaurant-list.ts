import { Component, Input } from '@angular/core';
import { RestaurantCard } from '../../../shared/components/restaurant-card/restaurant-card';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [RestaurantCard, RouterLink],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.sass',
})
export class RestaurantList {
  @Input() selectedCategory: string | null = null;
  currentCity = ''
  constructor(private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.currentCity = params.get('city') || ""
    })
  }

  formatSlug(name: string) {
    return name.
      toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
  }

  restaurants = [
    {
      id: 1,
      name: 'Burger King',
      cuisine: 'Burgers, Fast Food',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&h=400&fit=crop&q=80',
      rating: 4.4,
      time: '25 mins',
      priceForTwo: 400,
      distance: '1.2 km',
      offer: '20% OFF up to ₹100',
      isOpen: true
    },
    {
      id: 2,
      name: 'Dominos Pizza',
      cuisine: 'Pizza, Italian',
      image: 'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?w=1200&h=400&fit=crop&q=80',
      rating: 4.2,
      time: '30 mins',
      priceForTwo: 500,
      distance: '2.0 km',
      offer: 'Buy 1 Get 1',
      isOpen: true
    },
    {
      id: 3,
      name: 'Biryani House',
      cuisine: 'Biryani, Mughlai',
      image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1200&h=400&fit=crop&q=80',
      rating: 4.6,
      time: '35 mins',
      priceForTwo: 600,
      distance: '1.5 km',
      offer: 'Flat ₹150 OFF',
      isOpen: true
    },
    {
      id: 4,
      name: 'Chinese Wok',
      cuisine: 'Chinese, Asian',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=400&fit=crop&q=80',
      rating: 4.3,
      time: '28 mins',
      priceForTwo: 450,
      distance: '2.3 km',
      offer: '10% OFF',
      isOpen: true
    },
    {
      id: 5,
      name: 'Sweet Tooth',
      cuisine: 'Desserts, Bakery',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&h=400&fit=crop&q=80',
      rating: 4.7,
      time: '20 mins',
      priceForTwo: 350,
      distance: '0.9 km',
      offer: 'Free Brownie',
      isOpen: true
    },
    {
      id: 6,
      name: 'Spice Garden',
      cuisine: 'South Indian',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&h=400&fit=crop&q=80',
      rating: 4.5,
      time: '22 mins',
      priceForTwo: 300,
      distance: '1.8 km',
      offer: '',
      isOpen: true
    },
    {
      id: 7,
      name: 'Punjabi Dhaba',
      cuisine: 'North Indian',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&h=400&fit=crop&q=80',
      rating: 4.3,
      time: '32 mins',
      priceForTwo: 550,
      distance: '3.0 km',
      offer: '15% OFF',
      isOpen: false
    },
    {
      id: 8,
      name: 'Juice Junction',
      cuisine: 'Juices, Beverages',
      image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=1200&h=400&fit=crop&q=80',
      rating: 4.1,
      time: '18 mins',
      priceForTwo: 200,
      distance: '0.7 km',
      offer: 'Free Delivery',
      isOpen: true
    }
  ];
}
