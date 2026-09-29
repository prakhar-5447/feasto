import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { faMapMarkerAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Address } from '@/app/features/profile/models/profile.models';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './addresses.html',
  styleUrl: './addresses.sass',
})
export class Addresses {
  @Input({ required: true }) addresses!: Address[];

  readonly faMapMarkerAlt = faMapMarkerAlt;
  readonly faPlus = faPlus;
  readonly faTrash = faTrash;
}
