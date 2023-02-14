import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.css'],
})
export class SetupPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: any) {
    console.log(form);
  }
}
