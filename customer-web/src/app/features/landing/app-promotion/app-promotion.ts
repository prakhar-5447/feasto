import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMobileScreen,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-app-promotion',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './app-promotion.html',
  styleUrl: './app-promotion.sass',
})
export class AppPromotion {
  faMobile = faMobileScreen;
  faDownload = faDownload;
}
