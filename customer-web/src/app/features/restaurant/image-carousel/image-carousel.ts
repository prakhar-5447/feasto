import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCarousel {

  readonly faArrowLeft = faArrowLeft;
  readonly faArrowRight = faArrowRight;

  currentIndex = 0;

  readonly images = input<string[]>([]);



  next(): void {

    const total =
      this.images().length;

    if (total <= 1) {
      return;
    }

    this.currentIndex =
      (this.currentIndex + 1) % total;
  }


  prev(): void {

    const total =
      this.images().length;

    if (total <= 1) {
      return;
    }

    this.currentIndex =
      (this.currentIndex - 1 + total) % total;
  }

}