import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css'],
})
export class AdminDataComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', Validators.required],
        nationalId: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{14}$/)],
        ],
      },
      {
        validator: this.matchingPasswords('password', 'repeatPassword'),
      }
    );
  }

  submitForm() {
    console.log(this.form.value);
  }

  matchingPasswords(passwordKey: string, repeatPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const repeatPassword = group.controls[repeatPasswordKey];

      if (password.value !== repeatPassword.value) {
        return repeatPassword.setErrors({ mismatchedPasswords: true });
      }
    };
  }
}
