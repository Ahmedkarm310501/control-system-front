import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor() {}

  ngOnInit(): void {}

  toggleDisplay: any = {};

  clickEvent(name: string) {
    this.toggleDisplay[name] = !this.toggleDisplay[name];
    for (let key in this.toggleDisplay) {
      if (key !== name) {
        this.toggleDisplay[key] = false;
      }
    }
  }
}
