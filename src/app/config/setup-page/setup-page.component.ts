import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.css'],
})
export class SetupPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: any) {
    console.log(form);
    // navigate to admin-data do not allow back button
    const navigationExtras: NavigationExtras = {
      replaceUrl: true,
      state: { setup: true },
    };
    this.router.navigate(['/admin-data'], navigationExtras);
  }
}
