import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  updatePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.updatePasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.checkPasswords }
    );
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
