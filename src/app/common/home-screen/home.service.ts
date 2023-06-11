import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';

export interface Course {
  course_id: string;
  course_code: string;
  course_name: string;
  number_of_students: string;
  term_id: string;
}
interface responseData {
  data: Course[];
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getHomeData() {
    return this.http.get<responseData>(
      `${this.baseUrl}/list-courses-assigned-to-user`
    );
  }
}
