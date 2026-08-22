import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet
} from '@angular/router';

import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LocationServicePersistence } from '../../core/services/location.service';
import { Auth } from '../../features/auth/auth';
import { Breadcrumb } from '../../shared/components/breadcrumb/breadcrumb';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    Navbar,
    Breadcrumb,
    RouterOutlet,
    Auth,
    Footer
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayout {

  showAuthModal = false;
  showBreadcrumb = true;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly locationService = inject(
    LocationServicePersistence
  );


  ngOnInit(): void {

    this.updateRouteState();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.updateRouteState();
      });
  }


  private updateRouteState(): void {

    const activeRoute = this.getActiveRoute();

    const city = activeRoute.snapshot.paramMap.get('city');

    if (city) {
      this.locationService.setCity(city);
    }

    this.showBreadcrumb =
      activeRoute.snapshot.data['hideBreadcrumb'] !== true;
  }


  private getActiveRoute(): ActivatedRoute {

    let activeRoute = this.route;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    return activeRoute;
  }


  openAuth(): void {
    this.document.body.style.overflow = 'hidden';

    this.showAuthModal = true;
  }


  closeAuth(): void {
    this.document.body.style.overflow = '';

    this.showAuthModal = false;
  }
}