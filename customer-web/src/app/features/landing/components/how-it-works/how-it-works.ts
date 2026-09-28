import { Component } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faCreditCard, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


interface HowItWorksStep {
  icon: typeof faLocationDot;
  title: string;
  description: string;
  step: string;
}


@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.sass',
})
export class HowItWorks {

  readonly steps: HowItWorksStep[] = [
    {
      icon: faLocationDot,
      title: 'Select Location',
      description: 'Enter your delivery address to discover nearby restaurants',
      step: '01'
    },
    {
      icon: faMagnifyingGlass,
      title: 'Choose Restaurant',
      description: 'Browse through menus and select your favorite dishes',
      step: '02'
    },
    {
      icon: faCreditCard,
      title: 'Pay Online',
      description: 'Secure payment with multiple payment options',
      step: '03'
    },
    {
      icon: faBox,
      title: 'Enjoy Your Meal',
      description: 'Get your food delivered hot and fresh to your doorstep',
      step: '04'
    }
  ];
}