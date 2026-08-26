import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.sass',
})
export class Footer {

  readonly faFacebook = faFacebook;
  readonly faInstagram = faInstagram;
  readonly faTwitter = faTwitter;
  readonly faYoutube = faYoutube;

  readonly currentYear = new Date().getFullYear();
}