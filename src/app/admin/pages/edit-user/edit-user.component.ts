import { Component, OnInit, ViewChild } from '@angular/core';
import { EditUserService } from './edit-user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/User';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  message: string;
  type: string;
  isAdmin: boolean = false;
  isActive: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
  }
  id = +this.route.snapshot.paramMap.get('id');
  // edit user with id from snapshot
  editUser(
    id = +this.route.snapshot.paramMap.get('id'),
    name: string,
    email: string,
    password: string,
    is_admin: boolean,
    is_active: boolean,
    national_id: string
  ) {
    return this.http.post(`${environment.baseUrl}/edit-user`, {
      id,
      name,
      email,
      password,
      is_admin,
      is_active,
      national_id,
    });
  }

  editUserSubmit(form: any) {
    this.editUser(
      this.id,
      form.name,
      form.email,
      form.password,
      form.is_admin,
      form.is_active,
      form.national_id
    ).subscribe(
      (res) => {
        this.message = 'User Edited Successfully';
        this.type = 'success';

        this.snackbar.show();
        console.log(res);
      },
      (err) => {
        this.message = err.error.message;
        this.type = 'failed';
        console.log(err);
        this.snackbar.show();
      }
    );
  }
}
