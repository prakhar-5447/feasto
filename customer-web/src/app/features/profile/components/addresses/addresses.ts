import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideMapPin, LucidePlus, LucideTrash } from '@lucide/angular';
import { Address } from '@/app/features/profile/models/profile.models';


@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, LucideMapPin, LucidePlus, LucideTrash],
  templateUrl: './addresses.html',
  styleUrl: './addresses.sass',
})
export class Addresses {
  @Input({ required: true }) addresses!: Address[];
}
