import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'control-system-front';
  currentRoute!: string;
  constructor() {}

  isAuth = true;
  ngOnInit() {}
}
