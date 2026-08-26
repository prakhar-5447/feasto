import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../../shared/components/button/button';
import { LocationServicePersistence } from '../../../core/services/location.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FontAwesomeModule, Button, FormsModule],
  templateUrl: './hero.html',
  styleUrl: './hero.sass',
})
export class Hero {

  locationQuery = '';

  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;

  private readonly router = inject(Router);

  private readonly locationService = inject(LocationServicePersistence);

  selectCity(city: string): void {
    this.locationService.setCity(city);
  }

  findFood(): void {

    const city = this.locationQuery
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

    if (!city) {
      this.router.navigate(['/india']);
      return;
    }

    this.locationService.setCity(city);

    this.router.navigate([
      '/india',
      city
    ]);
  }
}