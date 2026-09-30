import { NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';

import { LucideClock, LucideUtensils, LucideBike, LucideStar } from '@lucide/angular';


interface Features {
  icon: any;
  title: string;
  description: string;
}



@Component({
  selector: 'app-why-choose-feasto',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './why-choose-feasto.html',
  styleUrl: './why-choose-feasto.sass'
})
export class WhyChooseFeasto {

  readonly features: Features[] = [
    {
      icon: LucideClock,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less'
    },
    {
      icon: LucideUtensils,
      title: 'Wide Selection',
      description: 'Choose from thousands of restaurants and cuisines'
    },
    {
      icon: LucideBike,
      title: 'Track Order',
      description: 'Real-time tracking of your order from kitchen to doorstep'
    },
    {
      icon: LucideStar,
      title: 'Best Quality',
      description: 'Only verified restaurants with highest ratings'
    }
  ];
}