import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';

import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LoggerService } from '../../../core/services/logger.service';
import { RestaurantLabelPipe } from '../../pipes/restaurant-label.pipe';
import { LabelPipe } from '../../pipes/label.pipe';

interface BreadcrumbData {
    label: string;
    url: string;
}


@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [RouterLink, RestaurantLabelPipe],
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

    readonly labelPipe = inject(LabelPipe);

    ngOnInit(): void {

        this.buildBreadcrumbs();

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(event => {

                this.buildBreadcrumbs();

                this.logger.logClientRoute(
                    event.urlAfterRedirects
                );

                this.cd.markForCheck();
            });
    }


    private buildBreadcrumbs(): void {

        const urlTree = this.router.parseUrl(this.router.url);

        const breadcrumbs: BreadcrumbData[] = [];

        const pathSegments = this.getPathSegments(urlTree);


        // --------------------------------------------------------
        // India
        // --------------------------------------------------------

        if (pathSegments[0] === 'india') {

            breadcrumbs.push({
                label: 'India',
                url: '/india'
            });
        }


        // --------------------------------------------------------
        // City
        //
        // /india/:city
        // --------------------------------------------------------

        const city = pathSegments[0] === 'india'
            ? pathSegments[1]
            : undefined;

        if (city) {
            breadcrumbs.push({
                label: this.labelPipe.transform(city),
                url: `/india/${city}`
            });
        }


        // --------------------------------------------------------
        // Restaurant
        //
        // /india/:city/r/:restaurant
        // --------------------------------------------------------

        const restaurantIndex = pathSegments.indexOf('r');

        const restaurant = restaurantIndex >= 0
            ? pathSegments[restaurantIndex + 1]
            : undefined;

        if (restaurant && city) {
            breadcrumbs.push({
                label: restaurant,
                url: `/india/${city}/r/${restaurant}`
            });
        }


        // --------------------------------------------------------
        // Current page
        //
        // Order / Reviews / Cart / Checkout / Payment
        // --------------------------------------------------------

        const page = this.getCurrentPage(pathSegments);

        if (page) {
            breadcrumbs.push({
                label: page.label,
                url: page.path
            });
        }


        this.breadcrumbs = breadcrumbs;
    }

    private getPathSegments(urlTree: ReturnType<Router['parseUrl']>): string[] {

        const primary = urlTree.root.children['primary'];

        if (!primary)
            return [];

        return primary.segments
            .map(segment => segment.path)
            .filter(Boolean);
    }


    private getCurrentPage(segments: string[]): { label: string; path: string; } | null {

        const pages: Record<string, string> = {
            order: 'Order',
            reviews: 'Reviews',
            cart: 'Cart',
            checkout: 'Checkout',
            payment: 'Payment'
        };


        const page = [...segments]
            .reverse()
            .find(
                segment => pages[segment]
            );


        if (!page)
            return null;


        return {
            label: pages[page],
            path: '/' + segments.join('/')
        };
    }
}