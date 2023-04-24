import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  error = '';

  ngOnInit(): void {}

  onSubmit(form: any) {
    this.authService.login(form.email, form.password).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/courses']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onLogin() {}
}
