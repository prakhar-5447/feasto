import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass, faLocationDot
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.sass',
})
export class Hero {
  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;
}
