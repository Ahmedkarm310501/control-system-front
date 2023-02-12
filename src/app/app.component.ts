import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'control-system-front';
  currentRoute!: string;
  constructor(private authService: AuthService, private router: Router) {}

  isAuth: boolean;

  ngOnInit() {
    // console.log(this.router.config);

    this.authService.isLoggedIn.subscribe((value) => {
      this.isAuth = value;
    });
    console.log(this.isAuth);
  }
}
