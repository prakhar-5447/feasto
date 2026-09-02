import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal
} from '@angular/core';
import { NgClass } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faStar,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../shared/components/button/button';

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface ReviewsResponse {
  data: {
    reviews: Review[];
    totalItems: number;
  };
}

@Component({
  selector: 'app-tab-reviews',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgClass,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './tab-reviews.html',
  styleUrl: './tab-reviews.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabReviews {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  readonly faStar = faStar;
  readonly faThumbsUp = faThumbsUp;
  readonly faArrowLeft = faArrowLeft;
  readonly faArrowRight = faArrowRight;

  readonly stars = [1, 2, 3, 4, 5];

  readonly reviews = signal<Review[]>([]);
  readonly totalItems = signal(0);
  readonly currentPage = signal(1);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly itemsPerPage = 5;

  readonly rating = signal(4.3);
  readonly reviewCount = signal(1280);
  readonly selectedRating = signal(0);

  readonly reviewForm = this.fb.nonNullable.group({
    description: ['', [Validators.required, Validators.maxLength(1000)]]
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.totalItems() / this.itemsPerPage)
  );

  readonly pages = computed(() =>
    Array.from(
      { length: this.totalPages() },
      (_, index) => index + 1
    )
  );
  ngOnInit(): void {
    this.loadReviews();
  }

  private loadReviews(): void {
    this.route.parent?.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const slug = params.get('restaurant');

        if (!slug) {
          this.router.navigate(['/']);
          return;
        }

        this.fetchReviews(slug);
      });
  }

  private fetchReviews(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    const page = this.currentPage();

    this.http
      .get<ReviewsResponse>(
        `/api/v1/restaurants/slug/${slug}/reviews`,
        {
          params: {
            page,
            limit: this.itemsPerPage
          }
        }
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ data }) => {
          this.reviews.set(data.reviews);
          this.totalItems.set(data.totalItems);
          this.loading.set(false);
        },
        error: error => {
          console.error('Failed to load reviews:', error);
          this.error.set('Unable to load reviews.');
          this.loading.set(false);
        }
      });
  }

  changePage(page: number): void {
    if (
      page < 1 ||
      page > this.totalPages() ||
      page === this.currentPage()
    ) {
      return;
    }

    this.currentPage.set(page);
    this.loadReviews();
  }

  selectRating(rating: number): void {
    this.selectedRating.set(rating);
  }

  addReview(): void {
    if (this.reviewForm.invalid || !this.selectedRating()) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const review = {
      rating: this.selectedRating(),
      comment: this.reviewForm.controls.description.value
    };

    console.log(review);

    // POST review here.

    this.reviewForm.reset();
    this.selectedRating.set(0);
  }

  markHelpful(review: Review): void {
    // API call can be added here.
    console.log('Helpful:', review.id);
  }

  get roundRating(): number {
    return Math.round(this.rating());
  }
}