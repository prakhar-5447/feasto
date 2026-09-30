import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserProfile } from '@/app/features/profile/models/profile.models';
import { LucideCamera } from '@lucide/angular';

@Component({
  selector: 'app-profile-hero',
  standalone: true,
  imports: [CommonModule, LucideCamera],
  templateUrl: './profile-hero.html',
  styleUrl: './profile-hero.sass',
})
export class ProfileHero {
  @Input({ required: true }) user!: UserProfile;
  @Input() ordersCount = 0;
  @Input() reviewsCount = 0;
  @Input() favoritesCount = 0;
}
