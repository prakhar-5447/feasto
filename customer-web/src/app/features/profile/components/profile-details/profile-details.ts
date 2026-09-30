import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '@/app/features/profile/models/profile.models';
import { LucideCalendar, LucideCamera, LucideCircleCheck, LucideMail, LucidePhone, LucideUser } from '@lucide/angular';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideCalendar, LucideCamera, LucideCircleCheck, LucideMail, LucidePhone, LucideUser],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.sass',
})
export class ProfileDetails {
  @Input({ required: true }) user!: UserProfile;
  @Input() saved = false;
  @Output() save = new EventEmitter<void>();
}
