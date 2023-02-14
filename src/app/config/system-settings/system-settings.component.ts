import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.css'],
})
export class SystemSettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: any) {
    console.log(form);
  }
}
