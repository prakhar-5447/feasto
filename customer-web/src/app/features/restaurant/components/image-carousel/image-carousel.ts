import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';


@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [LucideChevronLeft, LucideChevronRight],
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCarousel {

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