import { Component, OnInit, ViewChild } from '@angular/core';
import { EditUserService } from './edit-user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/User';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Router } from '@angular/router';
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
  user: any;
  name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  national_id: string;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private editUserService: EditUserService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.editUserService.getUser(id).subscribe((res) => {
      this.isLoading = false;
      this.name = res.data.name;
      this.email = res.data.email;
      this.is_admin = res.data.is_admin;
      this.is_active = res.data.is_active;
      this.national_id = res.data.national_id;
    });
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

        // navigate to users page
        setTimeout(() => {
          this.router.navigate(['all-users']);
        }, 2000);
      },
      (err) => {
        this.message = err.error.message;
        this.type = 'failed';

        this.snackbar.show();
      }
    );
  }
  cancel() {
    this.router.navigate(['all-users']);
  }
}
