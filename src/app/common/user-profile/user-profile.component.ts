import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from './user.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;

  updatePasswordForm: FormGroup;
  userName: string;
  userEmail: string;
  userNationalId: string;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.updatePasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUserProfile().subscribe((res) => {
      this.userName = res.data.name;
      this.userEmail = res.data.email;
      this.userNationalId = res.data.national_id;
      this.isLoading = false;
    });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  // updatePassword() {
  //   if (this.updatePasswordForm.valid) {
  //
  //   }
  //   //log the form values
  //
  // }

  message: string;
  type: string;
  updatePass(form: any) {
    this.userService
      .updatePassword(
        form.current_password,
        form.new_password,
        form.new_password_confirmation
      )
      .subscribe(
        (res) => {
          this.message = 'Password Updated Successfully';
          this.type = 'success';
          this.snackbar.show();
        },
        (err) => {
          this.message = err.error.message;
          this.type = 'failed';
          this.snackbar.show();
        }
      );
  }
}
