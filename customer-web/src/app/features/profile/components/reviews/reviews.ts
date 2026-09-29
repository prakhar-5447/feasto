import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Review } from '@/app/features/profile/models/profile.models';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.sass',
})
export class Reviews {
  @Input({ required: true }) reviews!: Review[];

  readonly faEdit = faEdit;
  readonly faStar = faStar;
  readonly faTrash = faTrash;

  stars(rating: number): number[] {
    return [1, 2, 3, 4, 5].filter((star) => star <= rating);
  }

  emptyStars(rating: number): number[] {
    return [1, 2, 3, 4, 5].filter((star) => star > rating);
  }
}
