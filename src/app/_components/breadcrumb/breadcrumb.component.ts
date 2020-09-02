import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from '../../_classes/breadcrumb';
import { distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
    breadcrumbs$ = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map(event => this.buildBreadCrumb(this.activatedRoute.root))
    );

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
                }

                ngOnInit(){}

                buildBreadCrumb(route: ActivatedRoute, url: string = '',
                                breadcrumbs: Array<Breadcrumb> = []): Array<Breadcrumb> {
                    let label = route.routeConfig ? route.routeConfig?.data?.breadcrumb : null;
                    let path = route.routeConfig ? route.routeConfig.path : '';


                    const lastRoutePart = path.split('/').pop();
                    const isDynamicRoute = lastRoutePart.startsWith(':');
                    if (isDynamicRoute && !!route.snapshot) {
                        const paramName = lastRoutePart.split(':')[1];
                        path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
                        label = route.snapshot.params[paramName];
                        if (label.length > 10){
                            label = label.substring(0, 8) + '...';
                        }
                    }


                    const nextUrl = `${url}${path}/`;

                    const breadcrumb = {
                        label,
                        url: nextUrl,
                    };

                    let newBreadcrumbs = breadcrumbs;
                    if (breadcrumb.label){
                        newBreadcrumbs = [...breadcrumbs, breadcrumb];
                    }

                    if (route.firstChild) {
                        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
                    }
                    return newBreadcrumbs;
                }
}
