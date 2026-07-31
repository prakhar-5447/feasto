import { Component } from '@angular/core';
import { AdsCarousel } from './ads-carousel/ads-carousel';
import { Categories } from './categories/categories';
import { RestaurantList } from './restaurant-list/restaurant-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUtensils
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdsCarousel, Categories, RestaurantList, FontAwesomeModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.sass',
})
export class Dashboard {
  faUtensils = faUtensils
  selectedCategory: string | null = null;

  onCategorySelect(categoryId: string | null) {
    this.selectedCategory = categoryId;
  }
}
