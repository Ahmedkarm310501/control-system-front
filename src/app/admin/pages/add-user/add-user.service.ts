import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {

  constructor(private http: HttpClient) {}

  addUser(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    national_id: string,
    is_admin: boolean,
  ) {
    return this.http.post(`${environment.baseUrl}/add-user`, {
      name,
      email,
      password,
      password_confirmation,
      national_id,
      is_admin
    });
  }
}
