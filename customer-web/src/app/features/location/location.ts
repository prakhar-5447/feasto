import {
  Component,
  inject
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faLineChart,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';

import { LocationServicePersistence } from '../../core/services/location.service';


interface PopularCity {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  image: string;
  imageSrcSet: string;
  imageSizes: string;
  areas: string[];
}

interface City {
  name: string;
  slug: string;
}


@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLink
  ],
  templateUrl: './location.html',
  styleUrl: './location.sass',
})
export class Location {

  readonly faLineChart = faLineChart;
  readonly faLocationDot = faLocationDot;
  readonly faArrowRight = faArrowRight;

  readonly popularCities: PopularCity[] = [
    {
      id: '1',
      name: 'Mumbai',
      slug: 'mumbai',
      subtitle: 'City of Dreams',
      image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=640',
      imageSrcSet: `
                https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=480 480w,
                https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=640 640w,
                https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=960 960w
            `,
      imageSizes: '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw',
      areas: [
        'Bandra',
        'Andheri',
        'Powai',
        'Juhu',
        'Colaba',
        'Lower Parel'
      ]
    },
    {
      id: '2',
      name: 'Delhi',
      slug: 'delhi',
      subtitle: 'Heart of India',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=640',
      imageSrcSet: `
                https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=480 480w,
                https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=640 640w,
                https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=960 960w
            `,
      imageSizes: '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw',
      areas: [
        'Connaught Place',
        'Saket',
        'Hauz Khas',
        'Dwarka',
        'Rohini',
        'Vasant Kunj'
      ]
    },
    {
      id: '3',
      name: 'Bangalore',
      slug: 'bangalore',
      subtitle: 'Silicon Valley of India',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=640',
      imageSrcSet: `
                https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=480 480w,
                https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=640 640w,
                https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=960 960w
            `,
      imageSizes: '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw',
      areas: [
        'Koramangala',
        'Indiranagar',
        'Whitefield',
        'HSR Layout',
        'Marathahalli',
        'Electronic City'
      ]
    },
    {
      id: '4',
      name: 'Hyderabad',
      slug: 'hyderabad',
      subtitle: 'City of Pearls',
      image: 'https://images.unsplash.com/photo-1551161242-b5af797b7233?auto=format&fit=crop&q=80&w=640',
      imageSrcSet: `
                https://images.unsplash.com/photo-1551161242-b5af797b7233?auto=format&fit=crop&q=80&w=480 480w,
                https://images.unsplash.com/photo-1551161242-b5af797b7233?auto=format&fit=crop&q=80&w=640 640w,
                https://images.unsplash.com/photo-1551161242-b5af797b7233?auto=format&fit=crop&q=80&w=960 960w
            `,
      imageSizes: '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw',
      areas: [
        'Hitech City',
        'Gachibowli',
        'Banjara Hills',
        'Jubilee Hills',
        'Madhapur',
        'Kukatpally'
      ]
    },
    {
      id: '5',
      name: 'Pune',
      slug: 'pune',
      subtitle: 'Oxford of the East',
      image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&q=80&w=640',
      imageSrcSet: `
                https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&q=80&w=480 480w,
                https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&q=80&w=640 640w,
                https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&q=80&w=960 960w
            `,
      imageSizes: '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw',
      areas: [
        'Koregaon Park',
        'Hinjewadi',
        'Kothrud',
        'Viman Nagar',
        'Magarpatta',
        'Wakad'
      ]
    },
    {
      id: '6',
      name: 'Chennai',
      slug: 'chennai',
      subtitle: 'Gateway of South India',
      image: 'https://images.unsplash.com/photo-1568045919115-f2dacbaa1899?auto=format&fit=crop&q=80&w=640',
      imageSrcSet: `
                https://images.unsplash.com/photo-1568045919115-f2dacbaa1899?auto=format&fit=crop&q=80&w=480 480w,
                https://images.unsplash.com/photo-1568045919115-f2dacbaa1899?auto=format&fit=crop&q=80&w=640 640w,
                https://images.unsplash.com/photo-1568045919115-f2dacbaa1899?auto=format&fit=crop&q=80&w=960 960w
            `,
      imageSizes: '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw',
      areas: [
        'Anna Nagar',
        'T Nagar',
        'Velachery',
        'OMR',
        'Adyar',
        'Porur'
      ]
    }
  ];

  readonly allCities: City[] = [
    'Ahmedabad',
    'Agra',
    'Ajmer',
    'Amritsar',
    'Aurangabad',
    'Bhopal',
    'Bhubaneswar',
    'Chandigarh',
    'Coimbatore',
    'Dehradun',
    'Faridabad',
    'Ghaziabad',
    'Goa',
    'Gurgaon',
    'Guwahati',
    'Indore',
    'Jaipur',
    'Jalandhar',
    'Jamshedpur',
    'Jodhpur',
    'Kanpur',
    'Kochi',
    'Kolkata',
    'Lucknow',
    'Ludhiana',
    'Madurai',
    'Mangalore',
    'Meerut',
    'Mysore',
    'Nagpur',
    'Nashik',
    'Noida',
    'Patna',
    'Raipur',
    'Rajkot',
    'Ranchi',
    'Surat',
    'Thiruvananthapuram',
    'Udaipur',
    'Vadodara',
    'Varanasi',
    'Vijayawada',
    'Visakhapatnam'
  ].map(name => ({
    name,
    slug: this.createSlug(name)
  }));

  private readonly locationService = inject(
    LocationServicePersistence
  );


  selectCity(city: string): void {
    this.locationService.setCity(city);
  }


  private createSlug(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-');
  }
}