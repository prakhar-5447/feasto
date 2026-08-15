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

        this.router.events
            .pipe(
                filter(
                    event => event instanceof NavigationEnd
                ),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(event => {

                this.breadcrumbs = this.buildBreadcrumb(
                    this.router.routerState.snapshot.root
                );

                this.logger.logClientRoute(
                    event.urlAfterRedirects
                );

                this.cd.markForCheck();
            });


        // Build breadcrumbs for the initial page load.
        this.breadcrumbs = this.buildBreadcrumb(
            this.router.routerState.snapshot.root
        );
    }


    // ============================================================
    // Build breadcrumb hierarchy
    // ============================================================

    private buildBreadcrumb(
        route: ActivatedRouteSnapshot,
        url: string = '',
        breadcrumbs: BreadcrumbData[] = []
    ): BreadcrumbData[] {

        const child = route.firstChild;

        if (!child) {
            return breadcrumbs;
        }


        // --------------------------------------------------------
        // Get URL segment
        // --------------------------------------------------------

        const routeURL = child.url
            .map(segment => segment.path)
            .join('/');


        // --------------------------------------------------------
        // Empty route
        //
        // Example:
        // /india
        //     └── ''
        //
        // Continue traversing instead of stopping.
        // --------------------------------------------------------

        if (routeURL === '') {
            return this.buildBreadcrumb(
                child,
                url,
                breadcrumbs
            );
        }


        // --------------------------------------------------------
        // Build URL
        // --------------------------------------------------------

        url += `/${routeURL}`;


        // --------------------------------------------------------
        // Resolve breadcrumb label
        // --------------------------------------------------------

        const label = this.resolveLabel(child);


        // --------------------------------------------------------
        // Add breadcrumb
        // --------------------------------------------------------

        if (label) {

            breadcrumbs.push({
                label: this.formatLabel(label),
                url
            });

        }


        // --------------------------------------------------------
        // Continue through child routes
        // --------------------------------------------------------

        return this.buildBreadcrumb(
            child,
            url,
            breadcrumbs
        );
    }


    // ============================================================
    // Resolve breadcrumb label
    // ============================================================

    private resolveLabel(
        route: ActivatedRouteSnapshot
    ): string | undefined {

        const breadcrumb = route.data['breadcrumb'];

        if (!breadcrumb) {
            return undefined;
        }


        // --------------------------------------------------------
        // Dynamic city
        //
        // route:
        // :city
        //
        // breadcrumb:
        // city
        //
        // URL:
        // /india/dhanbad
        //
        // Result:
        // Dhanbad
        // --------------------------------------------------------

        if (breadcrumb === 'city') {

            return route.params['city'];
        }


        // --------------------------------------------------------
        // Dynamic restaurant
        //
        // route:
        // :restaurant
        //
        // breadcrumb:
        // restaurant
        //
        // URL:
        // /india/dhanbad/dominos-pizza
        //
        // Result:
        // Dominos Pizza
        // --------------------------------------------------------

        if (breadcrumb === 'restaurant') {

            return route.params['restaurant'];
        }


        // --------------------------------------------------------
        // Static breadcrumb
        // --------------------------------------------------------

        return breadcrumb;
    }


    // ============================================================
    // Format breadcrumb label
    // ============================================================

    private formatLabel(
        value: string
    ): string {

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