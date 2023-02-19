import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  constructor() { }
  university = 'Cairo University';
  faculty = 'computer science';
  With = 'national Id';
  j='true';
  lo = 'logo.png';
  ngOnInit(): void {
  }
  onSubmit(form: any) {
    console.log("onSubmit");
  }
}
