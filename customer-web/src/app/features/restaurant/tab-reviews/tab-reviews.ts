import { NgClass } from '@angular/common'
import { Component } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faStar, faThumbsUp, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { RestaurantService } from '../../../core/services/restaurent.service'

@Component({
  selector: 'app-tab-reviews',
  standalone: true,
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './tab-reviews.html',
  styleUrl: './tab-reviews.sass',
})
export class TabReviews {
  totalItems = 0
  itemsPerPage = 5
  currentPage = 1
  pages: number[] = [1, 2, 3, 4]
  totalPages = 6



  faStar = faStar
  faThumbsUp = faThumbsUp
  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight

  num: number = 3;
  stars: number[] = [1, 2, 3, 4, 5]

  restaurant = {
    rating: 4.3,
    reviewCount: 1280
  }

  constructor(
    public restaurantService: RestaurantService,
  ) { }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return
    this.currentPage = page
  }

  get roundRating() {
    return Math.round(this.restaurant.rating)
  }

  click(e: number) {
    this.num = e;
  }

  addReview() {

  }

  remove(id: String) {

  }


}
