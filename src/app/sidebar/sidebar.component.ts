import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import '../../styles.css';
import { SidebarService } from './sidebar.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  sideBarOpen: boolean;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
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
