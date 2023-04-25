import { AddUserService } from './add-user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  message: string;
  type: string;
  constructor(private addUser: AddUserService) {}

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
        },
        (err) => {
          this.message = 'Error Adding User';
          this.type = 'failed';
          console.log(err);
          this.snackbar.show();          
        }
      );
    console.log(form.is_admin);
  }
}
