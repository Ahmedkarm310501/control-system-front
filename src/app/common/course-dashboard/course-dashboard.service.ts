import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
interface Department {
  id: number;
  dept_code: string;
}
interface Course {
  id: number;
  name: string;
  course_code: string;
}
interface Res {
  data: Department[];
  message: string;
}
interface Res2 {
  data: Course[];
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseDashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getDepartments() {
    return this.http.get<Res>(`${environment.baseUrl}/departments`);
  }
  getCourses() {
    return this.http.get<Res2>(`${environment.baseUrl}/list-courses`);
  }
  graphOne(course_id: number, semester_id: number) {
    return this.http.post<Res2>(`${environment.baseUrl}/graph-one`, {
      course_id,
      semester_id,
    });

  }
  graphTwo(course_id: number, semester_id: number) {
    return this.http.post<Res2>(`${environment.baseUrl}/graph-two`, {
      course_id,
      semester_id,
    });

  }
}
