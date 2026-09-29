import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from '@/app/features/profile/models/profile.models';

@Component({
  selector: 'app-profile-hero',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './profile-hero.html',
  styleUrl: './profile-hero.sass',
})
export class ProfileHero {
  @Input({ required: true }) user!: UserProfile;
  @Input() ordersCount = 0;
  @Input() reviewsCount = 0;
  @Input() favoritesCount = 0;

  readonly faCamera = faCamera;
}
