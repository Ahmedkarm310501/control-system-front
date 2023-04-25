import { Component, OnInit } from '@angular/core';
import { EditUserService } from './edit-user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

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
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}
