import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLineChart, faLocationDot, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { LocationServicePersistence } from '../../core/services/location.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './location.html',
  styleUrl: './location.sass',
})
export class Location {
  constructor(
    private router: Router,
    private locationService: LocationServicePersistence,
  ) { }
  faLineChart = faLineChart
  faLocationDot = faLocationDot
  faArrowRight = faArrowRight
  searchQuery = signal('');
  selectedCity = signal<any>(null);

  popularCities = [
    {
      id: "1",
      name: "Mumbai",
      subtitle: "City of Dreams",
      image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1200&h=400&fit=crop&q=80",
      areas: ["Bandra", "Andheri", "Powai", "Juhu", "Colaba", "Lower Parel"]
    },
    {
      id: "2",
      name: "Delhi",
      subtitle: "Heart of India",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=400&fit=crop&q=80",
      areas: ["Connaught Place", "Saket", "Hauz Khas", "Dwarka", "Rohini", "Vasant Kunj"]
    },
    {
      id: "3",
      name: "Bangalore",
      subtitle: "Silicon Valley of India",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&h=400&fit=crop&q=80",
      areas: ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Marathahalli", "Electronic City"]
    },
    {
      id: "4",
      name: "Hyderabad",
      subtitle: "City of Pearls",
      image: "https://images.unsplash.com/opengraph/1x1.png?auto=format&fit=crop&w=1200&h=630&q=60&mark-w=64&mark-align=top%2Cleft&mark-pad=50&blend-w=1&mark=https:%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&blend=https:%2F%2Fimages.unsplash.com%2Fphoto-1551161242-b5af797b7233%3Fixlib%3Drb-1.2.1%26w%3D1200%26fit%3Dcrop%26q%3D60%26fm%3Djpg%26crop%3Dfaces%252Cedges%26cs%3Dtinysrgb%26auto%3Dformat%26h%3D630%26mark-w%3D750%26mark-align%3Dmiddle%252Ccenter%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fauto%253Dformat%2526fit%253Dcrop%2526w%253D750%2526h%253D84%2526q%253D60%2526txt-color%253D000000%2526txt-size%253D40%2526txt-align%253Dmiddle%25252Cleft%2526txt-pad%253D80%2526txt-width%253D660%2526txt-clip%253Dellipsis%2526txt%253Dhyderabad%26blend%3D000000",
      areas: ["Hitech City", "Gachibowli", "Banjara Hills", "Jubilee Hills", "Madhapur", "Kukatpally"]
    },
    {
      id: "5",
      name: "Pune",
      subtitle: "Oxford of the East",
      image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=1200&h=400&fit=crop&q=80",
      areas: ["Koregaon Park", "Hinjewadi", "Kothrud", "Viman Nagar", "Magarpatta", "Wakad"]
    },
    {
      id: "6",
      name: "Chennai",
      subtitle: "Gateway of South India",
      image: "https://images.unsplash.com/photo-1568045919115-f2dacbaa1899?w=1200&h=400&fit=crop&q=80",
      areas: ["Anna Nagar", "T Nagar", "Velachery", "OMR", "Adyar", "Porur"]
    }
  ];

  allCities = [
    "Ahmedabad", "Agra", "Ajmer", "Amritsar", "Aurangabad",
    "Bhopal", "Bhubaneswar", "Chandigarh", "Coimbatore",
    "Dehradun", "Faridabad", "Ghaziabad", "Goa", "Gurgaon", "Guwahati",
    "Indore", "Jaipur", "Jalandhar", "Jamshedpur", "Jodhpur",
    "Kanpur", "Kochi", "Kolkata", "Lucknow", "Ludhiana",
    "Madurai", "Mangalore", "Meerut", "Mysore", "Nagpur",
    "Nashik", "Noida", "Patna", "Raipur", "Rajkot",
    "Ranchi", "Surat", "Thiruvananthapuram", "Udaipur", "Vadodara",
    "Varanasi", "Vijayawada", "Visakhapatnam"
  ];;

  handleCityClick(city: any) {
    this.locationService.setCity(city);
    this.router.navigate(['india', city]);
  }
}
