import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import '../../styles.css';
import { SidebarService } from './sidebar.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  sideBarOpen: boolean;
  userName: string;
  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.user.value.userName;
    this.sidebarService.sideBarOpen.subscribe((res) => {
      this.sideBarOpen = res;
    });
  }

  toggleDisplay: any = {};

  clickEvent(name: string) {
    this.toggleDisplay[name] = !this.toggleDisplay[name];
    for (let key in this.toggleDisplay) {
      if (key !== name) {
        this.toggleDisplay[key] = false;
      }
    }
  }

  ngOnDestroy() {
    // this.sidebarService.sideBarOpen.unsubscribe();
  }
}
