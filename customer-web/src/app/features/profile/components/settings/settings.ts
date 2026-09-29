import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faGlobe, faLock, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './settings.html',
  styleUrl: './settings.sass',
})
export class Settings {
  @Output() logout = new EventEmitter<void>();

  readonly faChevronRight = faChevronRight;
  readonly faGlobe = faGlobe;
  readonly faLock = faLock;
  readonly faRightFromBracket = faRightFromBracket;
}
