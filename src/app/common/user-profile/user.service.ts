import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/auth/auth.service';

interface responseData {
  data: {
    email: string;
    name: string;
    national_id: string;
  };
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserProfile() {
    return this.http.get<responseData>(`${this.baseUrl}/user-profile`);
  }

  updatePassword(
    current_password: string,
    new_password: string,
    new_password_confirmation: string
  ) {
    return this.http.post(`${this.baseUrl}/update-password`, {
      current_password,
      new_password,
      new_password_confirmation,
    });
  }
}
