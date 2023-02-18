import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isClicked = false;
  sideBarOpen: boolean;
  toggleClick() {
    this.isClicked = !this.isClicked;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  onToggleSideBar() {
    this.sidebarService.toggleSideBar();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    // this.sidebarService.toggleSideBar();
  }

  ngOnInit(): void {
    this.sidebarService.sideBarOpen.subscribe((res) => {
      this.sideBarOpen = res;
    });
  }

  ngOnDestroy() {
    // this.sidebarService.sideBarOpen.unsubscribe();
  }
}
