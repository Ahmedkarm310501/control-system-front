import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

import { SidebarService } from './sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'control-system-front';
  sideBarOpen: boolean;
  currentRoute!: string;
  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService,
    private router: Router
  ) {}

  isAuth: boolean;

  ngOnInit() {
    this.authService.autoLogin();

    this.authService.isLoggedIn.subscribe((value) => {
      this.isAuth = value;
    });

    this.sidebarService.sideBarOpen.subscribe((res) => {
      this.sideBarOpen = res;
    });
  }

  ngOnDestroy() {
    this.authService.user.unsubscribe();
    // this.sidebarService.sideBarOpen.unsubscribe();
  }
}
