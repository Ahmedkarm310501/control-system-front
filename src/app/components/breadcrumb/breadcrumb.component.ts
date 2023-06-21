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

  // private getBreadcrumbs(
  //   route: ActivatedRoute,
  //   url: string = '',
  //   breadcrumbs: BreadCrumb[] = []
  // ): BreadCrumb[] {
  //   const label =
  //     route.routeConfig && route.routeConfig.data
  //       ? route.routeConfig.data['breadcrumb']
  //       : '';
  //   const path = route.routeConfig ? route.routeConfig.path : '';

  //   // Remove leading slash from the path and the URL
  //   const trimmedPath = path ? path.replace(/^\//, '') : '';
  //   const trimmedUrl = url ? url.replace(/\/$/, '') : '';

  //   const nextUrl = `${trimmedUrl}/${trimmedPath}`;

  //   const breadcrumb = {
  //     label: label,
  //     url: nextUrl,
  //   };

  //   const newBreadcrumbs = [...breadcrumbs, breadcrumb];

  //   if (route.firstChild) {
  //     return this.getBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
  //   }

  //   return newBreadcrumbs;
  // }
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

    let nextUrl = `${trimmedUrl}/${trimmedPath}`;

    const breadcrumb = {
      label: label,
      url: nextUrl,
    };

    const newBreadcrumbs = [...breadcrumbs, breadcrumb];

    if (route.firstChild) {
      return this.getBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }

    // Check if the current route is "course-settings"
    if (route.routeConfig?.path === 'course-settings') {
      const parentRoute = route.parent;
      if (parentRoute) {
        const courseId = parentRoute.snapshot.paramMap.get('courseId');
        const termId = parentRoute.snapshot.paramMap.get('termId');

        if (courseId && termId) {
          nextUrl = `/courses/course/${courseId}/${termId}`;
        }
      }
    }

    // Update the URL for the previous breadcrumb if it exists
    if (newBreadcrumbs.length > 1) {
      const prevBreadcrumb = newBreadcrumbs[newBreadcrumbs.length - 2];
      prevBreadcrumb.url = nextUrl;
    }

    return newBreadcrumbs;
  }
}
