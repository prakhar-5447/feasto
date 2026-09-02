import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  inject,
  signal
} from '@angular/core';

import { NgClass } from '@angular/common';

import {
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';

import {
  faMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

import {
  ActivatedRoute
} from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

import {
  CartService
} from '../../../core/services/cart.service';

import {
  FoodItem,
  MenuCategory,
  RestaurantMenu
} from '../../../core/restaurant/models/menu.model';


@Component({
  selector: 'app-tab-menu',
  standalone: true,

  imports: [
    NgClass,
    FontAwesomeModule
  ],

  templateUrl: './tab-menu.html',
  styleUrl: './tab-menu.sass',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabMenu {

  private readonly http =
    inject(HttpClient);

  private readonly route =
    inject(ActivatedRoute);

  private readonly destroyRef =
    inject(DestroyRef);

  readonly cartService =
    inject(CartService);


  readonly faMinus = faMinus;
  readonly faPlus = faPlus;


  readonly menu =
    signal<RestaurantMenu | null>(null);

  readonly cartItems =
    signal<any[]>([]);

  readonly activeCategory =
    signal(0);

  readonly loading =
    signal(true);


  private readonly HEADER_OFFSET = 340;


  @ViewChildren('categorySection')
  private categorySections!: QueryList<ElementRef<HTMLElement>>;


  ngOnInit(): void {

    const slug =
      this.route.parent?.snapshot.paramMap.get('restaurant');

    if (!slug) {
      return;
    }

    this.loadFoods(slug);
    this.loadCart();
  }


  private loadFoods(slug: string): void {

    this.loading.set(true);

    this.http
      .get<{ data: FoodItem[] }>(
        `/api/v1/foods/restaurant/${slug}/foods`
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: ({ data }) => {
          this.menu.set({
            categories:
              this.groupByCuisine(data)
          });

          this.loading.set(false);
        },

        error: error => {

          console.error(
            'Failed to load restaurant menu:',
            error
          );

          this.menu.set({
            categories: []
          });

          this.loading.set(false);
        }

      });
  }


  private loadCart(): void {

    this.cartService
      .getCart()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: (res: any) => {

          const items =
            res.data?.items ?? [];

          this.cartItems.set(items);

          const count =
            items.reduce(
              (total: number, item: any) =>
                total + item.quantity,
              0
            );

          this.cartService.cartCount.set(count);
        },

        error: error => {

          console.error(
            'Failed to load cart:',
            error
          );

        }

      });
  }


  addToCart(item: FoodItem): void {

    this.cartService
      .addToCart(item._id, 1)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: () => {
          this.loadCart();
        },

        error: error => {

          console.error(
            'Failed to add item:',
            error
          );

          alert(
            error.error?.message ??
            'Unable to add item'
          );
        }

      });
  }


  updateQuantity(
    itemId: string,
    quantity: number,
    increase: boolean
  ): void {

    const newQuantity =
      increase
        ? quantity + 1
        : quantity - 1;

    this.cartService
      .updateQuantity(
        itemId,
        newQuantity
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: () => {
          this.loadCart();
        },

        error: error => {
          console.error(
            'Failed to update quantity:',
            error
          );
        }

      });
  }


  getItemQuantity(
    itemId: string
  ): number {

    const item =
      this.cartItems().find(
        cartItem =>
          cartItem.food._id === itemId
      );

    return item?.quantity ?? 0;
  }


  private groupByCuisine(
    foods: FoodItem[]
  ): MenuCategory[] {

    const grouped =
      new Map<string, FoodItem[]>();

    for (const food of foods) {

      const cuisine =
        food.cuisine?.trim() ||
        'Others';

      const items =
        grouped.get(cuisine) ?? [];

      items.push(food);

      grouped.set(
        cuisine,
        items
      );
    }

    return Array.from(
      grouped,
      ([name, items]) => ({
        name,
        items
      })
    );
  }


  @HostListener('window:scroll')
  onScroll(): void {

    if (!this.categorySections) {
      return;
    }

    const sections =
      this.categorySections.toArray();

    let activeIndex = 0;

    for (
      let index = 0;
      index < sections.length;
      index++
    ) {

      const rect =
        sections[index]
          .nativeElement
          .getBoundingClientRect();

      if (
        rect.top <= this.HEADER_OFFSET
      ) {

        activeIndex = index;

      } else {

        break;

      }
    }

    this.activeCategory.set(
      activeIndex
    );
  }


  scrollToCategory(
    index: number
  ): void {

    const section =
      this.categorySections
        ?.get(index)
        ?.nativeElement;

    if (!section) {
      return;
    }

    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      this.HEADER_OFFSET;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });

    this.activeCategory.set(index);
  }

}