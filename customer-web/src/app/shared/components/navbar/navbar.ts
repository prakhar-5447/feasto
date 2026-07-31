import { Component, Output, EventEmitter, Inject, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLocationDot, faLocationCrosshairs, faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocationService, LocationServicePersistence } from '../../../core/services/location.service';
import { ClickOutsideDirective } from "../../directive/clickOutside.directive";
import { Router } from '@angular/router';
import { selectUser } from '../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state'; // ✅ add this
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import * as AuthActions from '../../../store/auth/auth.actions';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ClickOutsideDirective, CommonModule, Loader],
  templateUrl: './navbar.html',
  styleUrl: './navbar.sass',
})
export class Navbar {
  private store = inject(Store<AppState>);

  user$: Observable<any> = this.store.select(selectUser);
  constructor(private http: HttpClient, private router: Router, private locationService: LocationService, private locationServicePersistence: LocationServicePersistence, private authService: AuthService
  ) { }

  @Output() openAuth = new EventEmitter<void>();
  faLocationDot = faLocationDot;
  faLocationCrosshairs = faLocationCrosshairs;
  faMagnifyingGlass = faMagnifyingGlass;

  selectedLocation = signal('Select Location');
  locationQuery = '';
  locationResults: any[] = [];
  showLocationDropdown = false;
  showRestaurantDropdown = false;

  restaurantQuery = '';
  restaurantResults: any[] = [];

  detectLocationLoader = signal<boolean>(false)
  goToProfile(user: string) {
    this.router.navigate(['/users', user])
  }

  toTitleCase(value: string | null): string {
    if (!value) return ""
    return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  closeDropdown() {
    this.showLocationDropdown = false;
    this.showRestaurantDropdown = false;
    this.restaurantQuery = ''
  }

  toggleLocationDropdown() {
    this.showRestaurantDropdown = false;
    this.showLocationDropdown = !this.showLocationDropdown;
  }

  toggleRestaurantDropdown() {
    this.showLocationDropdown = false;
    this.showRestaurantDropdown = !this.showRestaurantDropdown;
  }

  searchLocation() {

    if (!this.locationQuery) {
      this.locationResults = [];
      return;
    }

    this.locationService.search(this.locationQuery)
      .subscribe((data: any) => {
        this.locationResults = data;
      });
  }

  selectLocation(item: any) {
    this.locationServicePersistence.setCity(item.text)
    this.router.navigate(['india', item.text.toLowerCase()], {
      replaceUrl: true
    })
    this.locationResults = [];
    this.showLocationDropdown = false;
    this.locationQuery = '';
  }

  detectLocation() {
    if (!this.detectLocationLoader()) {
      this.detectLocationLoader.set(true)
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          this.locationService
            .reverseGeocode(latitude, longitude)
            .subscribe((data: any) => {
              this.selectedLocation.set(data['context'][1]['text'])
              this.detectLocationLoader.set(false)
              this.locationServicePersistence.setCity(data['context'][2]['text'])
              this.showLocationDropdown = false
              this.router.navigate(['/india', data['context'][2]['text'].toLowerCase()]);
            })
        },
        error => {
          console.error(error);
          this.detectLocationLoader.set(false)
          alert('Location permission denied');
          this.showLocationDropdown = false
        }
      );
    }
  }

  searchRestaurant() {

    if (!this.restaurantQuery) {
      this.restaurantResults = [];
      return;
    }

    // Replace with your API later
    this.restaurantResults = [
      { name: 'Dominos Pizza' },
      { name: 'Burger King' },
      { name: 'KFC' },
      { name: 'Subway' }
    ].filter(r =>
      r.name.toLowerCase().includes(this.restaurantQuery.toLowerCase())
    );

    this.showRestaurantDropdown = true;
  }

  selectRestaurant(res: any) {
    this.restaurantQuery = res.name;
    this.restaurantResults = [];
    this.showRestaurantDropdown = false;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {

        // 🔥 clear ngrx state
        this.store.dispatch(AuthActions.logout());

        // 🔥 reload AFTER cookie cleared
        window.location.href = '/';
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}