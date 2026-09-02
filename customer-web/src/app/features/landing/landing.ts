import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AppPromotion } from './app-promotion/app-promotion';
import { Cuisines } from './cuisines/cuisines';
import { Hero } from './hero/hero';
import { HowItWorks } from './how-it-works/how-it-works';
import { WhyChooseFeasto } from './why-choose-feasto/why-choose-feasto';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Hero, WhyChooseFeasto, Cuisines, HowItWorks, AppPromotion],
  templateUrl: './landing.html',
  styleUrl: './landing.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing {}