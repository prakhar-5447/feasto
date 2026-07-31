import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTag, faStar
} from '@fortawesome/free-solid-svg-icons';
import {
  faClock
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.sass',
})
export class RestaurantCard {
  @Input() restaurant: any;
  faTag = faTag
  faStar = faStar
  faClock = faClock
}
