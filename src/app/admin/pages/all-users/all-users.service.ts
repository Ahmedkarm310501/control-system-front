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
  providedIn: 'root',
})
export class AllUsersService {
  enviroment = environment;

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<Res>(`${this.enviroment.baseUrl}/list-users`);
  }

  onDelete(id: number) {
    return this.http.delete(`${this.enviroment.baseUrl}/delete-user?id=${id}`);
  }

  assignUserToCourse(course_ids:number [], user_id: any) {
    return this.http.post(`${this.enviroment.baseUrl}/assign-user-to-course`, {
      course_ids,
      user_id,
    });
  }
  getAllCoursesByDepartment(id: any , user_id: any) {
    return this.http.get<Res>(
      `${environment.baseUrl}/courses-in-department-for-user/${id}/${user_id}`
    );

  } 
}
