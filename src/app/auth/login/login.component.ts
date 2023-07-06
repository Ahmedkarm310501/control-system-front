import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild(SnackbarComponent) snackbar: SnackbarComponent;
  constructor(private authService: AuthService, private router: Router,
  ) { }
  error = '';
  message: string = ''
  type: string = ''


  ngOnInit(): void {}
  isAdmin: boolean;

  onSubmit(form: any) {
    this.authService.login(form.email, form.password).subscribe(
      (res) => {
        this.isAdmin = res.data.is_admin;
        this.router.navigate(['/courses']);
      },
      (err) => {
        if (err.status === 403) {
          this.message = 'User is not activated.'
          this.type = 'failed'
          this.snackbar.show();
        }
        else if (err.status === 401) {
          this.message = 'Invalid username or password.'
          this.type = 'failed'
          this.snackbar.show();
        }
        else {
          this.message = 'An error occurred while logging in. Please try again later.'
          this.type = 'failed'
          this.snackbar.show();
        }


      }
    );
  }

  onLogin() {}
}
