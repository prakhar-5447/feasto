import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppPromotion } from '@/app/features/landing/components/app-promotion/app-promotion';
import { Cuisines } from '@/app/features/landing/components/cuisines/cuisines';
import { Hero } from '@/app/features/landing/components/hero/hero';
import { HowItWorks } from '@/app/features/landing/components/how-it-works/how-it-works';
import { WhyChooseFeasto } from '@/app/features/landing/components/why-choose-feasto/why-choose-feasto';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Hero, WhyChooseFeasto, Cuisines, HowItWorks, AppPromotion],
  templateUrl: './landing.html',
  styleUrl: './landing.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing { }