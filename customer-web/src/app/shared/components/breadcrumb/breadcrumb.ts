import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject
} from '@angular/core';

import {
    ActivatedRouteSnapshot,
    NavigationEnd,
    Router,
    RouterLink
} from '@angular/router';

import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LoggerService } from '../../../core/services/logger.service';


interface BreadcrumbData {
    label: string;
    url: string;
}


@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './breadcrumb.html',
    styleUrl: './breadcrumb.sass',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Breadcrumb {

    breadcrumbs: BreadcrumbData[] = [];

    private readonly router = inject(Router);
    private readonly cd = inject(ChangeDetectorRef);
    private readonly destroyRef = inject(DestroyRef);
    private readonly logger = inject(LoggerService);


    ngOnInit(): void {

        this.buildCurrentBreadcrumb();

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(event => {

                this.buildCurrentBreadcrumb();

                this.logger.logClientRoute(
                    event.urlAfterRedirects
                );

                this.cd.markForCheck();
            });
    }


    private buildCurrentBreadcrumb(): void {
        this.breadcrumbs = this.buildBreadcrumb(
            this.router.routerState.snapshot.root
        );
    }


    private buildBreadcrumb(
        root: ActivatedRouteSnapshot
    ): BreadcrumbData[] {

        const breadcrumbs: BreadcrumbData[] = [];

        let route: ActivatedRouteSnapshot =
            root;

        let url = '';

        while (route.firstChild) {

            route = route.firstChild;

            const segments = route.url;

            if (!segments.length) {
                continue;
            }


            // ----------------------------------------------------
            // Normal route segment processing
            // ----------------------------------------------------

            for (const segment of segments) {

                const path = segment.path;

                if (!path) {
                    continue;
                }

                url += `/${path}`;


                // ------------------------------------------------
                // India
                // ------------------------------------------------

                if (path === 'india') {
                    this.addBreadcrumb(
                        breadcrumbs,
                        'India',
                        url
                    );

                    continue;
                }


                // ------------------------------------------------
                // Dynamic city
                // /india/:city
                // ------------------------------------------------

                if (
                    route.data['breadcrumb'] === 'city' &&
                    route.params['city']
                ) {

                    this.addBreadcrumb(
                        breadcrumbs,
                        this.formatLabel(
                            route.params['city']
                        ),
                        url
                    );

                    continue;
                }


                // ------------------------------------------------
                // Dynamic restaurant
                // /india/:city/:restaurant
                // ------------------------------------------------

                if (
                    route.data['breadcrumb'] === 'restaurant' &&
                    route.params['restaurant']
                ) {

                    this.addBreadcrumb(
                        breadcrumbs,
                        this.formatLabel(
                            route.params['restaurant']
                        ),
                        url
                    );

                    continue;
                }


                // ------------------------------------------------
                // Static breadcrumb
                // Order / Reviews
                // ------------------------------------------------

                const label =
                    route.data['breadcrumb'] as
                    string | undefined;

                if (label) {

                    this.addBreadcrumb(
                        breadcrumbs,
                        this.formatLabel(label),
                        url
                    );
                }
            }


            // ----------------------------------------------------
            // Special routes:
            //
            // :restaurant/cart
            // :restaurant/checkout
            // :restaurant/payment
            //
            // Restaurant component is NOT loaded for these routes,
            // so restore the restaurant breadcrumb manually.
            // ----------------------------------------------------

            const restaurant =
                route.params['restaurant'];

            const label =
                route.data['breadcrumb'] as
                string | undefined;

            if (
                restaurant &&
                label &&
                label !== 'restaurant'
            ) {

                const restaurantUrl =
                    url.substring(
                        0,
                        url.lastIndexOf('/')
                    );

                this.addBreadcrumb(
                    breadcrumbs,
                    this.formatLabel(restaurant),
                    restaurantUrl
                );

                this.addBreadcrumb(
                    breadcrumbs,
                    this.formatLabel(label),
                    url
                );
            }
        }

        return breadcrumbs;
    }


    private addBreadcrumb(
        breadcrumbs: BreadcrumbData[],
        label: string,
        url: string
    ): void {

        const exists = breadcrumbs.some(
            breadcrumb => breadcrumb.url === url
        );

        if (!exists) {
            breadcrumbs.push({
                label,
                url
            });
        }
    }


    private formatLabel(value: string): string {

        return value
            .split('-')
            .filter(Boolean)
            .map(word =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase()
            )
            .join(' ');
    }
}