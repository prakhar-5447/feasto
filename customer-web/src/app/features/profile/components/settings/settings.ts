import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { LucideChevronRight, LucideGlobe, LucideLock, LucideLogOut } from '@lucide/angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, LucideGlobe, LucideLock, LucideChevronRight, LucideLogOut],
  templateUrl: './settings.html',
  styleUrl: './settings.sass',
})
export class Settings {
  @Output() logout = new EventEmitter<void>();
}
