import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  //   sideBarOpen = true;
  sideBarOpen = new BehaviorSubject<boolean>(true);
  toggleDisplay = new BehaviorSubject<any>({});
  constructor() {}

  toggleSideBar() {
    // this.sideBarOpen = !this.sideBarOpen;
    this.sideBarOpen.next(!this.sideBarOpen.value);
  }

  toggleDisplayFunc(curr: any) {
    this.toggleDisplay.next({
      // ...this.toggleDisplay.value,
      [curr]: !this.toggleDisplay.value[curr],
    });
  }
}
