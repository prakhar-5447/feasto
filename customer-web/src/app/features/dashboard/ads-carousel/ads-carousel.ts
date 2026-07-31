import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft, faArrowRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ads-carousel',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './ads-carousel.html',
  styleUrl: './ads-carousel.sass',
})
export class AdsCarousel {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  ads = [
    {
      id: 1,
      title: '50% OFF on First Order',
      subtitle: 'Enjoy delicious meals at half price',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop&q=80'
    },
    {
      id: 2,
      title: 'Free Delivery Weekend',
      subtitle: 'Order now and save on delivery',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=400&fit=crop&q=80'
    },
    {
      id: 3,
      title: 'Late Night Cravings',
      subtitle: 'Food delivered till 2 AM',
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1200&h=400&fit=crop&q=80'
    }
  ];

  currentIndex = 0;

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.ads.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.ads.length) % this.ads.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
