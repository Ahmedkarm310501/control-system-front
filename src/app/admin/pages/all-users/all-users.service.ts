import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
interface User {
  id: number;
  name: string;
  email: string;
}
interface Res {
  data: User[];
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AllUsersService {
  enviroment = environment;

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<Res>(`${this.enviroment.baseUrl}/list-users`);
  }

}
