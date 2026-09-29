import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationGroup, ProfileSection } from '@/app/features/profile/models/profile.models';

@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './profile-sidebar.html',
  styleUrl: './profile-sidebar.sass',
})
export class ProfileSidebar {
  @Input({ required: true }) navigation!: NavigationGroup[];
  @Input({ required: true }) activeSection!: ProfileSection;
  @Output() sectionChange = new EventEmitter<Exclude<ProfileSection, 'order-details'>>();

  selectSection(section: Exclude<ProfileSection, 'order-details'>): void {
    this.sectionChange.emit(section);
  }

  isActive(section: Exclude<ProfileSection, 'order-details'>): boolean {
    return this.activeSection === section ||
      (section === 'orders' && this.activeSection === 'order-details');
  }
}
