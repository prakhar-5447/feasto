import { NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';

import { LucideMapPin, LucideSearch, LucideCreditCard, LucidePackage } from '@lucide/angular';

interface HowItWorksStep {
  icon: any;
  title: string;
  description: string;
  step: string;
}


@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.sass',
})
export class HowItWorks {

  readonly steps: HowItWorksStep[] = [
    {
      icon: LucideMapPin,
      title: 'Select Location',
      description: 'Enter your delivery address to discover nearby restaurants',
      step: '01'
    },
    {
      icon: LucideSearch,
      title: 'Choose Restaurant',
      description: 'Browse through menus and select your favorite dishes',
      step: '02'
    },
    {
      icon: LucideCreditCard,
      title: 'Pay Online',
      description: 'Secure payment with multiple payment options',
      step: '03'
    },
    {
      icon: LucidePackage,
      title: 'Enjoy Your Meal',
      description: 'Get your food delivered hot and fresh to your doorstep',
      step: '04'
    }
  ];
}