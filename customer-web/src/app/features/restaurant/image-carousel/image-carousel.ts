import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { RestaurantService } from '../../../core/services/restaurent.service';
@Component({
  selector: 'app-image-carousel',
  imports: [FontAwesomeModule],
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.sass',
})
export class ImageCarousel {
  currentIndex = 0
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  constructor(public restaurantService: RestaurantService
  ) { }

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.restaurantService.restaurant?.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.restaurantService.restaurant?.images.length) % this.restaurantService.restaurant?.images.length;
  }
}
