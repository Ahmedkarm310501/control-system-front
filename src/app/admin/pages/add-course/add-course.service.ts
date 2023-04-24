import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddCourseService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  addCourse(course_name: string, course_code: string, dept_code: string) {
    return this.http.post(`${this.baseUrl}/add-course`, {
      course_name,
      course_code,
      dept_code,
    });
  }

}
