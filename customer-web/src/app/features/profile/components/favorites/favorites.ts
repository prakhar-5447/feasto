import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FavoriteRestaurant } from '@/app/features/profile/models/profile.models';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.sass',
})
export class Favorites {
  @Input({ required: true }) favorites!: FavoriteRestaurant[];

  readonly faHeart = faHeart;
  readonly faStar = faStar;
}
