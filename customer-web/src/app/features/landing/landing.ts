import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import { AppPromotion } from './app-promotion/app-promotion';
import { Cuisines } from './cuisines/cuisines';
import { Hero } from './hero/hero';
import { HowItWorks } from './how-it-works/how-it-works';
import { WhyChooseFeasto } from './why-choose-feasto/why-choose-feasto';

import { LocationServicePersistence } from '../../core/services/location.service';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    Hero,
    WhyChooseFeasto,
    Cuisines,
    HowItWorks,
    AppPromotion
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing {

  private readonly router = inject(Router);
  private readonly locationService = inject(
    LocationServicePersistence
  );

  ngOnInit(): void {
    this.redirectToSavedCity();
  }

  private redirectToSavedCity(): void {
    const city = this.locationService.getCity();

    if (!city) {
      return;
    }

    this.router.navigate(
      ['/india', city],
      {
        replaceUrl: true
      }
    );
  }
}