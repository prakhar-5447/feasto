import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.sass',
})
export class Breadcrumb {
  breadcrumbs: any[] = [];

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((e) => {
        this.breadcrumbs = [...this.buildBreadcrumb(this.router.routerState.root)];
        this.logger.logClientRoute(e.urlAfterRedirects);
        this.cd.markForCheck();
      });
    this.breadcrumbs = [...this.buildBreadcrumb(this.router.routerState.root)];
  }

  buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
    const child = route.firstChild;
    let routeURL = child?.snapshot.url.map(segment => segment.path).join('/');

    if (!child) return breadcrumbs;

    if (routeURL === '') return breadcrumbs;
    if (routeURL) url += `/${routeURL}`;

    let label = child.snapshot.data['breadcrumb'];

    // 🔥 Replace dynamic params
    if (label === 'city') {
      label = child.snapshot.params['city'];
    }
    if (label === 'restaurant') {
      label = child.snapshot.params['restaurant']
        ?.split('-')
        .slice(0, -1) // remove mongo id if slug contains id
        .join(' ');
    }
    if (label === 'cart' || label === 'checkout') {
      const restaurantParam = child.snapshot.params['restaurant']
        ?.split('-')
        .slice(0, -1) // remove mongo id if slug contains id
        .join(' ');

      if (restaurantParam) {
        const formattedRestaurant = restaurantParam
          .split('-')
          .filter(Boolean)
          .map((word: string) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");

        breadcrumbs.push({
          label: formattedRestaurant,
          url: url.replace(`/${label}`, '') // 👈 restaurant URL
        });
      }
    }

    if (label) {
      label = label.split('-')
        .filter(Boolean)
        .map((word: string) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
      breadcrumbs.push({ label, url });
    }

    return this.buildBreadcrumb(child, url, breadcrumbs);
  }

}
