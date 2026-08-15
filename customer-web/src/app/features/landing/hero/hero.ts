import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLocationDot,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../shared/components/button/button';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FontAwesomeModule,Button],
  templateUrl: './hero.html',
  styleUrl: './hero.sass',
})
export class Hero {

  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;

  private readonly router = inject(Router);

  findFood(): void {
    this.router.navigate(['/india']);
  }
}