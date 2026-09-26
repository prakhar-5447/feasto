import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Ad {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  imageSrcSet: string;
}


@Component({
  selector: 'app-ads-carousel',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './ads-carousel.html',
  styleUrl: './ads-carousel.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdsCarousel {

  readonly faArrowLeft = faArrowLeft;
  readonly faArrowRight = faArrowRight;

  readonly currentIndex = signal(0);

  readonly ads: Ad[] = [
    {
      id: 1,
      title: '50% OFF on First Order',
      subtitle: 'Enjoy delicious meals at half price',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
      imageSrcSet: `
                https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=640 640w,
                https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=960 960w,
                https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200 1200w
            `
    },
    {
      id: 2,
      title: 'Free Delivery Weekend',
      subtitle: 'Order now and save on delivery',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1200',
      imageSrcSet: `
                https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=640 640w,
                https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=960 960w,
                https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1200 1200w
            `
    },
    {
      id: 3,
      title: 'Late Night Cravings',
      subtitle: 'Food delivered till 2 AM',
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=1200',
      imageSrcSet: `
                https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=640 640w,
                https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=960 960w,
                https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=1200 1200w
            `
    }
  ];


  next(): void {

    const total =
      this.ads.length;

    if (!total) {
      return;
    }

    this.currentIndex.update(
      index => (index + 1) % total
    );
  }


  prev(): void {

    const total =
      this.ads.length;

    if (!total) {
      return;
    }

    this.currentIndex.update(
      index => (index - 1 + total) % total
    );
  }


  goTo(index: number): void {

    if (
      index < 0 ||
      index >= this.ads.length
    ) {
      return;
    }

    this.currentIndex.set(index);
  }
}