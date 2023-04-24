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
          alert('User Added Successfully');
          console.log(res);
        },
        (err) => {
          alert('Error Occured');
          console.log(err);
        }
      );
    console.log(form.is_admin);
        this.snackbar.show();

  } 
}
