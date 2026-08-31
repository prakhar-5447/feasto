import { ChangeDetectionStrategy, Component, ElementRef, output, signal, ViewChild } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../../core/restaurant/models/category.model';
import { RESTAURANT_CATEGORIES } from '../../../core/restaurant/data/restaurant-categories';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './categories.html',
  styleUrl: './categories.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Categories {
  faChevronLeft = faChevronLeft
  faChevronRight = faChevronRight

  @ViewChild('categoryList')
  categoryList!: ElementRef<HTMLDivElement>;

  readonly canScrollPrevious = signal(false);
  readonly canScrollNext = signal(true);

  readonly categoryCardWidth = 104;
  readonly categoryGap = 12;

  readonly categorySelected = output<Category>();
  readonly categories = RESTAURANT_CATEGORIES;

  ngAfterViewInit(): void {
    this.updateScrollButtons();
  }

  private updateScrollButtons(): void {

    const element = this.categoryList.nativeElement;

    const maxScrollLeft = element.scrollWidth - element.clientWidth;

    this.canScrollPrevious.set(
      element.scrollLeft > 0
    );

    this.canScrollNext.set(
      element.scrollLeft < maxScrollLeft - 1
    );
  }


  onCategoryScroll(): void {

    const element = this.categoryList.nativeElement;

    const maxScroll = element.scrollWidth -
      element.clientWidth;

    this.canScrollPrevious.set(
      element.scrollLeft > 1
    );

    this.canScrollNext.set(
      element.scrollLeft < maxScroll - 1
    );
  }


  selectCategory(category: Category): void {
    this.categorySelected.emit(category);
  }


  scrollNext(): void {

    this.categoryList.nativeElement.scrollBy({
      left: this.getScrollAmount(),
      behavior: 'smooth'
    });
  }


  scrollPrevious(): void {

    this.categoryList.nativeElement.scrollBy({
      left: -this.getScrollAmount(),
      behavior: 'smooth'
    });
  }

  private getScrollAmount(): number {

    const element = this.categoryList.nativeElement;

    const card = element.querySelector<HTMLElement>(
      '.category-card'
    );

    if (!card)
      return 0;

    const gap =
      parseFloat(
        getComputedStyle(element).columnGap
      ) || 0;

    return card.offsetWidth + gap;
  }

}