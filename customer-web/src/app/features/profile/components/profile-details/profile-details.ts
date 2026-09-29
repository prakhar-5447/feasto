import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faCamera, faCheckCircle, faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from '@/app/features/profile/models/profile.models';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.sass',
})
export class ProfileDetails {
  @Input({ required: true }) user!: UserProfile;
  @Input() saved = false;
  @Output() save = new EventEmitter<void>();

  readonly faCamera = faCamera;
  readonly faCheckCircle = faCheckCircle;
  readonly faEnvelope = faEnvelope;
  readonly faPhone = faPhone;
  readonly faUser = faUser;
  readonly faCalendar = faCalendar;
}
