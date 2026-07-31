import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { ImageCarousel } from './image-carousel/image-carousel';
import { RestaurantInfo } from './restaurant-info/restaurant-info';
import { RestaurantService } from '../../core/services/restaurent.service';
import { LocationServicePersistence } from '../../core/services/location.service';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FontAwesomeModule, ImageCarousel, RestaurantInfo],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.sass',
})
export class Restaurant {
  faArrowLeft = faArrowLeft;
  restaurants = [
    {
      id: "1",
      name: "Spice Garden",
      cuisine: "Indian, North Indian",
      rating: 4.3,
      time: "30-35 mins",
      distance: "2.5 km",
      image: "https://images.unsplash.com/photo-1572517499173-4e2cb8bef19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByZXN0YXVyYW50JTIwdGhhbGl8ZW58MXx8fHwxNzczMzEwNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      offer: "50% OFF up to ₹100",
      isOpen: true,
      priceForTwo: 400,
      address: "123 MG Road, Koramangala, Bangalore - 560034",
      openTime: "11:00 AM",
      closeTime: "11:00 PM",
      reviewCount: 1250,
      images: [
        "https://images.unsplash.com/photo-1572517499173-4e2cb8bef19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByZXN0YXVyYW50JTIwdGhhbGl8ZW58MXx8fHwxNzczMzEwNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzczMjc0NjQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBjaGlja2VufGVufDF8fHx8MTc3MzMxMDY1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjB0aWtrYSUyMGluZGlhbnxlbnwxfHx8fDE3NzMyMjMxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    {
      id: "2",
      name: "Wok Express",
      cuisine: "Chinese, Asian",
      rating: 4.1,
      time: "25-30 mins",
      distance: "3.2 km",
      image: "https://images.unsplash.com/photo-1682224932581-1fe063b105fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwcmVzdGF1cmFudCUyMG5vb2RsZXN8ZW58MXx8fHwxNzczMjk4Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      offer: "Free Delivery",
      isOpen: true,
      priceForTwo: 350,
      address: "45 HSR Layout, Sector 1, Bangalore - 560102",
      openTime: "12:00 PM",
      closeTime: "10:30 PM",
      reviewCount: 890,
      images: [
        "https://images.unsplash.com/photo-1682224932581-1fe063b105fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwcmVzdGF1cmFudCUyMG5vb2RsZXN8ZW58MXx8fHwxNzczMjk4Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5jaHVyaWFuJTIwY2hpbmVzZXxlbnwxfHx8fDE3NzMzMTA2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1512149519538-136d1b8c574a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWZ8ZW58MXx8fHwxNzczMjg3ODc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    {
      id: "3",
      name: "La Pasta",
      cuisine: "Italian, Continental",
      rating: 4.5,
      time: "35-40 mins",
      distance: "4.1 km",
      image: "https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MzIxODEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      offer: "30% OFF",
      isOpen: false,
      priceForTwo: 600,
      address: "78 Indiranagar, 100 Feet Road, Bangalore - 560038",
      openTime: "12:30 PM",
      closeTime: "11:30 PM",
      reviewCount: 2100,
      images: [
        "https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MzIxODEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1559978137-8c560d91e9e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwcGl6emElMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzczMDU3OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1767485448798-a52641008246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGJhbm5lcnxlbnwxfHx8fDE3NzMyNzc5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1512149519538-136d1b8c574a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWZ8ZW58MXx8fHwxNzczMjg3ODc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    {
      id: "4",
      name: "Burger King",
      cuisine: "Fast Food, Burgers",
      rating: 4.2,
      time: "20-25 mins",
      distance: "1.8 km",
      image: "https://images.unsplash.com/photo-1716068107414-fad614ac83a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwZm9vZCUyMHJlc3RhdXJhbnQlMjBidXJnZXJzfGVufDF8fHx8MTc3MzMxMDY1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      offer: "Buy 1 Get 1",
      isOpen: true,
      priceForTwo: 300,
      address: "22 Whitefield, ITPL Main Road, Bangalore - 560066",
      openTime: "10:00 AM",
      closeTime: "12:00 AM",
      reviewCount: 3400,
      images: [
        "https://images.unsplash.com/photo-1716068107414-fad614ac83a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwZm9vZCUyMHJlc3RhdXJhbnQlMjBidXJnZXJzfGVufDF8fHx8MTc3MzMxMDY1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1651843465180-5965076f7368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmcmllcyUyMG1lYWx8ZW58MXx8fHwxNzczMDI5NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1761207850834-69151e9bc810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNjb3VudCUyMGZvb2QlMjBvZmZlcnxlbnwxfHx8fDE3NzMzMTA2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
  ];

  restaurantMenus: Record<string, any> = {
    "1": {
      name: "Spice Garden",
      categories: [
        {
          name: "Recommended",
          items: [
            {
              id: "1-1",
              name: "Chicken Biryani",
              description: "Aromatic basmati rice cooked with tender chicken pieces",
              price: 299,
              image: "https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzczMjc0NjQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: false,
              bestseller: true,
            },
            {
              id: "1-2",
              name: "Paneer Tikka",
              description: "Cottage cheese marinated in spices and grilled",
              price: 249,
              image: "https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjB0aWtrYSUyMGluZGlhbnxlbnwxfHx8fDE3NzMyMjMxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: true,
              bestseller: true,
            },
          ]
        },
        {
          name: "Main Course",
          items: [
            {
              id: "1-3",
              name: "Dal Makhani",
              description: "Black lentils cooked in butter and cream",
              price: 199,
              image: "https://images.unsplash.com/photo-1640542509430-f529fdfce835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWwlMjBtYWtoYW5pJTIwY3Vycnl8ZW58MXx8fHwxNzczMzAzNjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: true,
              bestseller: false,
            },
            {
              id: "1-4",
              name: "Butter Chicken",
              description: "Chicken in rich tomato and butter gravy",
              price: 329,
              image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBjaGlja2VufGVufDF8fHx8MTc3MzMxMDY1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: false,
              bestseller: true,
            },
          ]
        },
        {
          name: "Breads",
          items: [
            {
              id: "1-5",
              name: "Butter Naan",
              description: "Leavened bread brushed with butter",
              price: 49,
              image: "https://images.unsplash.com/photo-1586524068358-77d2196875e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3RpJTIwbmFhbiUyMGJyZWFkfGVufDF8fHx8MTc3MzMxMDY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: true,
              bestseller: false,
            },
            {
              id: "1-6",
              name: "Garlic Naan",
              description: "Naan topped with garlic and coriander",
              price: 59,
              image: "https://images.unsplash.com/photo-1586524068358-77d2196875e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3RpJTIwbmFhbiUyMGJyZWFkfGVufDF8fHx8MTc3MzMxMDY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: true,
              bestseller: true,
            },
          ]
        }
      ]
    },
    // Add more restaurant menus as needed
    "2": {
      name: "Wok Express",
      categories: [
        {
          name: "Recommended",
          items: [
            {
              id: "2-1",
              name: "Hakka Noodles",
              description: "Stir-fried noodles with vegetables",
              price: 199,
              image: "https://images.unsplash.com/photo-1682224932581-1fe063b105fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwcmVzdGF1cmFudCUyMG5vb2RsZXN8ZW58MXx8fHwxNzczMjk4Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: true,
              bestseller: true,
            },
            {
              id: "2-2",
              name: "Manchurian",
              description: "Deep fried vegetable balls in spicy sauce",
              price: 179,
              image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5jaHVyaWFuJTIwY2hpbmVzZXxlbnwxfHx8fDE3NzMzMTA2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: true,
              bestseller: true,
            },
          ]
        }
      ]
    },
    "3": {
      name: "La Pasta",
      categories: [
        {
          name: "Recommended",
          items: [
            {
              id: "3-1",
              name: "Alfredo Pasta",
              description: "Creamy white sauce pasta with herbs",
              price: 349,
              image: "https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MzIxODEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: true,
              bestseller: true,
            },
            {
              id: "3-2",
              name: "Margherita Pizza",
              description: "Classic pizza with tomato, mozzarella, and basil",
              price: 299,
              image: "https://images.unsplash.com/photo-1559978137-8c560d91e9e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwcGl6emElMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzczMDU3OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: true,
              bestseller: true,
            },
          ]
        }
      ]
    },
    "4": {
      name: "Burger King",
      categories: [
        {
          name: "Recommended",
          items: [
            {
              id: "4-1",
              name: "Whopper",
              description: "Flame-grilled beef patty with fresh vegetables",
              price: 189,
              image: "https://images.unsplash.com/photo-1716068107414-fad614ac83a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwZm9vZCUyMHJlc3RhdXJhbnQlMjBidXJnZXJzfGVufDF8fHx8MTc3MzMxMDY1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: false,
              bestseller: true,
            },
            {
              id: "4-2",
              name: "Veg Whopper",
              description: "Crispy veggie patty with fresh vegetables",
              price: 159,
              image: "https://images.unsplash.com/photo-1651843465180-5965076f7368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmcmllcyUyMG1lYWx8ZW58MXx8fHwxNzczMDI5NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              isVeg: true,
              bestseller: true,
            },
          ]
        }
      ]
    },
  };

  restaurantReviews: Record<string, any[]> = {
    "1": [
      {
        id: "r1-1",
        userName: "Rajesh Kumar",
        rating: 5,
        date: "2 days ago",
        comment: "Amazing biryani! The flavors were authentic and the portion size was generous. Highly recommend the Chicken Biryani.",
        helpful: 23
      },
      {
        id: "r1-2",
        userName: "Priya Sharma",
        rating: 4,
        date: "5 days ago",
        comment: "Good food quality but delivery was a bit slow. The Paneer Tikka was delicious though!",
        helpful: 15
      },
      {
        id: "r1-3",
        userName: "Amit Patel",
        rating: 5,
        date: "1 week ago",
        comment: "Best Indian restaurant in the area. Dal Makhani is a must-try. The butter naan was perfectly cooked.",
        helpful: 31
      },
      {
        id: "r1-4",
        userName: "Sneha Reddy",
        rating: 3,
        date: "1 week ago",
        comment: "Food was okay, but nothing exceptional. Expected more based on the ratings.",
        helpful: 8
      },
      {
        id: "r1-5",
        userName: "Vikram Singh",
        rating: 5,
        date: "2 weeks ago",
        comment: "Excellent service and fantastic food. The Butter Chicken is the best I've had in Bangalore!",
        helpful: 45
      }
    ],
    "2": [
      {
        id: "r2-1",
        userName: "Meera Joshi",
        rating: 4,
        date: "1 day ago",
        comment: "Great Chinese food! The Hakka Noodles were perfect. Will order again.",
        helpful: 12
      },
      {
        id: "r2-2",
        userName: "Karan Mehta",
        rating: 5,
        date: "3 days ago",
        comment: "Love their Manchurian! Quick delivery and hot food. Highly recommended.",
        helpful: 18
      }
    ],
    "3": [
      {
        id: "r3-1",
        userName: "Sofia D'Souza",
        rating: 5,
        date: "1 day ago",
        comment: "Best Italian food in town! The Alfredo Pasta was creamy and delicious. Worth every penny!",
        helpful: 42
      },
      {
        id: "r3-2",
        userName: "Arjun Nair",
        rating: 4,
        date: "4 days ago",
        comment: "Good pizza but a bit pricey. Quality is great though!",
        helpful: 20
      },
      {
        id: "r3-3",
        userName: "Divya Iyer",
        rating: 5,
        date: "1 week ago",
        comment: "Amazing ambiance and even better food. The Margherita Pizza was authentic Italian style.",
        helpful: 35
      }
    ],
    "4": [
      {
        id: "r4-1",
        userName: "Rohan Gupta",
        rating: 4,
        date: "Today",
        comment: "Classic Whopper never disappoints! Fast delivery too.",
        helpful: 9
      },
      {
        id: "r4-2",
        userName: "Ananya Das",
        rating: 5,
        date: "2 days ago",
        comment: "Love their Veg Whopper! Great value for money and tasty.",
        helpful: 14
      },
      {
        id: "r4-3",
        userName: "Siddharth Kapoor",
        rating: 3,
        date: "5 days ago",
        comment: "Decent burgers. Sometimes the fries are cold when delivered.",
        helpful: 6
      }
    ]
  };

  id!: string;
  restaurant: any;
  menu: any;
  reviews: any[] = [];
  activeTab: string = 'order';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public cartService: CartService,
    public restaurantService: RestaurantService,
    public locationServicePersistence: LocationServicePersistence
  ) { }

  showCarousel() {
    return this.router.url.includes('/order')
  }

  ngOnInit() {
    this.activeTab = this.route.firstChild?.snapshot.routeConfig?.path || 'order'
    // this.id = this.route.snapshot.paramMap.get('id')!;
    this.id = '1';
    this.restaurant = this.restaurants.find((r) => r.id === this.id);
    this.restaurantService.restaurant = this.restaurant
    this.menu = this.restaurantMenus[this.id];
    this.restaurantService.menu = this.menu
    this.reviews = this.restaurantReviews[this.id] || [];
    this.restaurantService.reviews = this.reviews
  }


  setTab(tab: string) {
    this.activeTab = tab;
  }

  get cartItems() {
    return this.restaurantService.cart.filter((i: any) => i.restaurantId === this.id);
  }

  get cartTotal() {
    return this.cartItems.reduce(
      (sum: number, i: any) => sum + i.price * i.quantity,
      0
    );
  }

  get cartCount() {
    return this.cartItems.reduce(
      (sum: number, i: any) => sum + i.quantity,
      0
    );
  }
}
