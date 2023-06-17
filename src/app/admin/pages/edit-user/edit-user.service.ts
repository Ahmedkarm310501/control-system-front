import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

interface User {
  name: string;
  is_active: boolean;
  is_admin: boolean;
  password: string;
  email: string;
  national_id: string;
}
interface Res {
  data: User;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getUser(id: number) {
    return this.http.get<Res>(`${environment.baseUrl}/users/${id}`);
  }
}
