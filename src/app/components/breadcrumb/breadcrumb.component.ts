// import { Component, OnInit, OnChanges } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-breadcrumb',
//   templateUrl: './breadcrumb.component.html',
//   styleUrls: ['./breadcrumb.component.css'],
// })
// export class BreadcrumbComponent implements OnInit {
//   breadcrumbs: Array<any> = [];

//   constructor(private router: Router) {}

//   ngOnInit() {
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.breadcrumbs = [];
//         let currentRoute = this.router.routerState.snapshot.root;
//         while (currentRoute) {
//           // console.log(currentRoute);
//           let routeData = currentRoute.routeConfig
//             ? currentRoute.routeConfig.data
//             : null;
//           if (routeData && routeData['breadcrumb']) {
//             this.breadcrumbs.push({
//               breadcrumb: routeData,
//               url: currentRoute.url,
//             });
//           }
//           currentRoute = currentRoute.firstChild;
//         }
//       }
//       console.log(this.breadcrumbs);
//     });
//   }
//   formatLink(link: Array<any>) {
//     let url = '';
//     if (link.length === 0) {
//       return url;
//     }
//     for (let i = 0; i < link.length; i++) {
//       url += '/' + link[i];
//     }
//     return url;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface BreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadCrumb[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      });
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadCrumb[] = []
  ): BreadCrumb[] {
    const label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data['breadcrumb']
        : '';
    const path = route.routeConfig ? route.routeConfig.path : '';

    // Remove leading slash from the path and the URL
    const trimmedPath = path ? path.replace(/^\//, '') : '';
    const trimmedUrl = url ? url.replace(/\/$/, '') : '';

    const nextUrl = `${trimmedUrl}/${trimmedPath}`;

    const breadcrumb = {
      label: label,
      url: nextUrl,
    };

    const newBreadcrumbs = [...breadcrumbs, breadcrumb];

    if (route.firstChild) {
      return this.getBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
