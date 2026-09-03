import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  QueryList,
  inject,
  signal,
  computed,
  ViewChildren
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
  Store
} from '@ngrx/store';

import {
  AppState
} from '../../../store/app.state';

import * as CartActions
  from '../../../store/cart/cart.actions';

import {
  selectCartItems,
  selectUpdatingItemIds,
  selectRemovingItemIds
} from '../../../store/cart/cart.selectors';

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

  private readonly store =
    inject(Store<AppState>);


  // --------------------------------------------------
  // Icons
  // --------------------------------------------------

  readonly faMinus = faMinus;
  readonly faPlus = faPlus;


  // --------------------------------------------------
  // Menu state
  // --------------------------------------------------

  readonly menu =
    signal<RestaurantMenu | null>(null);

  readonly activeCategory =
    signal(0);

  readonly loading =
    signal(true);


  readonly skeletonCategories =
    [1, 2, 3];

  readonly skeletonItems =
    [1, 2, 3];


  // --------------------------------------------------
  // Cart state
  // --------------------------------------------------

  readonly cartItems =
    this.store.selectSignal(selectCartItems);

  readonly updatingItemIds =
    this.store.selectSignal(selectUpdatingItemIds);

  readonly removingItemIds =
    this.store.selectSignal(selectRemovingItemIds);


  /**
   * Creates an O(1) lookup for cart quantities.
   *
   * Instead of searching the cart array every time
   * getItemQuantity() is called, we create:
   *
   * foodId -> quantity
   */
  readonly cartQuantityMap = computed(() => {

    const map =
      new Map<string, number>();

    for (const item of this.cartItems()) {

      map.set(
        item.food._id,
        item.quantity
      );

    }

    return map;
  });


  // --------------------------------------------------
  // Constants
  // --------------------------------------------------

  private readonly HEADER_OFFSET = 340;


  // --------------------------------------------------
  // Category sections
  // --------------------------------------------------

  @ViewChildren('categorySection')
  private categorySections!: QueryList<
    ElementRef<HTMLElement>
  >;


  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------

  ngOnInit(): void {

    const slug =
      this.route.parent
        ?.snapshot
        .paramMap
        .get('restaurant');

    if (!slug) {
      return;
    }

    this.loadFoods(slug);
  }


  // --------------------------------------------------
  // Menu API
  // --------------------------------------------------

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


  // --------------------------------------------------
  // Cart operations
  // --------------------------------------------------

  /**
   * Add a food item to the cart.
   *
   * The Cart Store updates optimistically, so the UI
   * changes immediately. The Cart Effect handles the
   * actual API request in the background.
   */
  addToCart(item: FoodItem): void {
    if (this.isUpdating(item._id)) {
      return;
    }

    this.store.dispatch(
      CartActions.addItem({
        food: item,
        quantity: 1
      })
    );
  }


  /**
   * Increase or decrease the quantity of an item.
   */
  updateQuantity(
    itemId: string,
    quantity: number,
    increase: boolean
  ): void {

    if (
      this.isUpdating(itemId) ||
      this.isRemoving(itemId)
    ) {
      return;
    }

    const newQuantity =
      increase
        ? quantity + 1
        : quantity - 1;


    /**
     * Quantity should never become zero through
     * updateQuantity().
     *
     * If you want quantity 0 to remove the item,
     * dispatch removeItem instead.
     */
    if (newQuantity < 1) {
      this.removeItem(itemId);
      return;
    }


    this.store.dispatch(
      CartActions.updateQuantity({
        foodId: itemId,
        quantity: newQuantity
      })
    );
  }


  /**
   * Remove an item from the cart.
   */
  removeItem(itemId: string): void {

    if (
      this.isUpdating(itemId) ||
      this.isRemoving(itemId)
    ) {
      return;
    }

    this.store.dispatch(
      CartActions.removeItem({
        foodId: itemId
      })
    );
  }


  // --------------------------------------------------
  // Cart helpers
  // --------------------------------------------------

  /**
   * Returns the current quantity of a food item.
   */
  getItemQuantity(itemId: string): number {
    const quantity =
      this.cartQuantityMap().get(itemId) ?? 0;
    return quantity;
  }


  /**
   * Whether this specific item is currently being
   * updated by the Cart Store.
   */
  isUpdating(
    itemId: string
  ): boolean {

    return this.updatingItemIds()
      .includes(itemId);
  }


  /**
   * Whether this specific item is currently being
   * removed.
   */
  isRemoving(
    itemId: string
  ): boolean {

    return this.removingItemIds()
      .includes(itemId);
  }


  // --------------------------------------------------
  // Menu helpers
  // --------------------------------------------------

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


  // --------------------------------------------------
  // Scroll handling
  // --------------------------------------------------

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


  // --------------------------------------------------
  // Category navigation
  // --------------------------------------------------

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
  }

}