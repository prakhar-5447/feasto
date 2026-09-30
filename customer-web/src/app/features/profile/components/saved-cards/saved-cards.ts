import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SavedCard } from '@/app/features/profile/models/profile.models';
import { LucidePlus, LucideTrash } from '@lucide/angular';

@Component({
  selector: 'app-saved-cards',
  standalone: true,
  imports: [CommonModule, LucidePlus, LucideTrash],
  templateUrl: './saved-cards.html',
  styleUrl: './saved-cards.sass',
})
export class SavedCards {
  @Input({ required: true }) cards!: SavedCard[];
}
