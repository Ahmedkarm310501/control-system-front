import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  //   sideBarOpen = true;
  sideBarOpen = new BehaviorSubject<boolean>(true);
  constructor() {}

  toggleSideBar() {
    // this.sideBarOpen = !this.sideBarOpen;
    this.sideBarOpen.next(!this.sideBarOpen.value);
  }

  getSideBarStatus() {
    // return this.sideBarOpen;
    return this.sideBarOpen.asObservable();
  }
}
