import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css'],
})
export class AdminDataComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

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
    const navigationExtras: NavigationExtras = {
      replaceUrl: true,
      state: { setup: true },
    };
    this.router.navigate(['/system-setup'], navigationExtras);
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
