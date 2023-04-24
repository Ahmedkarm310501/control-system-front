import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
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
      console.log(res);
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

  updatePassword() {
    if (this.updatePasswordForm.valid) {
      console.log('Password updated!');
    }
    //log the form values
    console.log(this.updatePasswordForm.value);
  }
}
