import { AddUserService } from './add-user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  message: string;
  type: string;
  isAdmin: boolean = false;
  constructor(private addUser: AddUserService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(form: any) {
    this.addUser
      .addUser(
        form.name,
        form.email,
        form.password,
        form.password_confirmation,
        form.national_id,
        form.is_admin
      )
      .subscribe(
        (res) => {
          this.message = 'User Added Successfully';
          this.type = 'success';
          console.log(res);
          this.snackbar.show();
          setTimeout(() => {
            this.router.navigate(['/all-users']);
          }, 2000);
        },
        (err) => {
          this.message = err.error.message;
          this.type = 'failed';
          console.log(err);
          this.snackbar.show();
        }
      );
    console.log(form.is_admin);
  }
  // function to reset all form fields after submit
  resetForm(form: any) {
    form.name = '';
    form.email = '';
    form.password = '';
    form.password_confirmation = '';
    form.national_id = '';
    form.is_admin = false;
  }
}
