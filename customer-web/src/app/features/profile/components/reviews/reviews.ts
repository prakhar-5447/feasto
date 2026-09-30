import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Review } from '@/app/features/profile/models/profile.models';
import { LucideSquarePen, LucideStar, LucideTrash } from '@lucide/angular';
@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, LucideSquarePen, LucideStar, LucideTrash],
  templateUrl: './reviews.html',
  styleUrl: './reviews.sass',
})
export class Reviews {
  @Input({ required: true }) reviews!: Review[];

  stars(rating: number): number[] {
    return [1, 2, 3, 4, 5].filter((star) => star <= rating);
  }

  emptyStars(rating: number): number[] {
    return [1, 2, 3, 4, 5].filter((star) => star > rating);
  }
}
