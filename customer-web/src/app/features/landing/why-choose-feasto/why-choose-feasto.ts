import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClock,
  faUtensils,
  faMotorcycle,
  faStar
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-why-choose-feasto',
   standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './why-choose-feasto.html',
  styleUrl: './why-choose-feasto.sass',
})
export class WhyChooseFeasto {
  faClock = faClock;
  faUtensils = faUtensils;
  faMotorcycle = faMotorcycle;
  faStar = faStar;

  features = [
    {
      icon: faClock,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less'
    },
    {
      icon: faUtensils,
      title: 'Wide Selection',
      description: 'Choose from thousands of restaurants and cuisines'
    },
    {
      icon: faMotorcycle,
      title: 'Track Order',
      description: 'Real-time tracking of your order from kitchen to doorstep'
    },
    {
      icon: faStar,
      title: 'Best Quality',
      description: 'Only verified restaurants with highest ratings'
    }
  ];
}
