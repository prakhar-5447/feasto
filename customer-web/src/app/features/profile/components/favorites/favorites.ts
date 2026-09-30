import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FavoriteRestaurant } from '@/app/features/profile/models/profile.models';
import { LucideHeart, LucideStar } from '@lucide/angular';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, LucideHeart, LucideStar],
  templateUrl: './favorites.html',
  styleUrl: './favorites.sass',
})
export class Favorites {
  @Input({ required: true }) favorites!: FavoriteRestaurant[];

}
