import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Footer } from "../../shared/components/footer/footer";
import { Auth } from '../../features/auth/auth';
import { Modal } from '../../shared/components/modal/modal';
import { LocationServicePersistence } from '../../core/services/location.service';
import { Breadcrumb } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [Navbar, RouterOutlet, Footer, Auth, Breadcrumb],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.sass',
})
export class DashboardLayout {

  constructor(private route: ActivatedRoute, private locationService: LocationServicePersistence) { }

  ngOnInit() {
    this.route.firstChild?.paramMap.subscribe(params => {
      const city = params.get('city')
      if (city) {
        this.locationService.setCity(city)
      }
    })
  }

  showAuthModal = false;

  openAuth() {
    this.showAuthModal = true;
  }

  closeAuth() {
    console.log("dajwijowij")
    this.showAuthModal = false;
  }
}
