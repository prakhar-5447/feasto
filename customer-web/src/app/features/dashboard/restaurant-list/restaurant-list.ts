import { Component, Input, OnInit } from '@angular/core';
import { RestaurantCard } from '../../../shared/components/restaurant-card/restaurant-card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [RestaurantCard, RouterLink],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.sass',
})
export class RestaurantList implements OnInit {
  @Input() selectedCategory: string | null = null;

  currentCity = '';

  restaurants: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.currentCity = params.get('city') || '';
    });

    this.route.queryParamMap.subscribe(params => {
      const cuisine = params.get('cuisine');
      const food = params.get('food');

      this.loadRestaurants(cuisine, food);
    });
  }

  loadRestaurants(
    cuisine: string | null,
    food: string | null
  ) {
    const params: any = {};

    if (cuisine) {
      params.cuisine = cuisine;
    }

    if (food) {
      params.food = food;
    }

    this.http.get<any>(
      '/api/v1/search/restaurants',
      { params }
    ).subscribe({
      next: (res) => {
        this.restaurants = res.data;
      },
      error: (error) => {
        console.error(error);
        this.restaurants = [];
      }
    });
  }

  formatSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
}