import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SavedCard } from '@/app/features/profile/models/profile.models';

@Component({
  selector: 'app-saved-cards',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './saved-cards.html',
  styleUrl: './saved-cards.sass',
})
export class SavedCards {
  @Input({ required: true }) cards!: SavedCard[];

  readonly faPlus = faPlus;
  readonly faTrash = faTrash;
}
