import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { LucideMapPin } from '@lucide/angular';

import { Button } from '@/app/shared/components/button/button';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [Button, FormsModule, LucideMapPin],
  templateUrl: './hero.html',
  styleUrl: './hero.sass',
})
export class Hero {

  locationQuery = '';

  private readonly router = inject(Router);

  findFood(): void {

    const city = this.locationQuery
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

    if (!city) {
      this.router.navigate(['/india']);
      return;
    }

    this.router.navigate([
      '/india',
      city
    ]);
  }
}