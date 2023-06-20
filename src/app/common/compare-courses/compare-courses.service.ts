import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
interface Course {
  id: number;
  name: string;
  course_code: string;
}
interface Res {
  data: Course[];
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompareCoursesService {
  constructor(private http: HttpClient) {}

  getCourseSemesters(course_id: any) {
    return this.http.post(`${environment.baseUrl}/get-course-semesters`, {
      course_id,
    });
  }
  compareCourses(
    course_id_one,
    course_id_two,
    semester_id_one,
    semester_id_two
  ) {
    return this.http.post(`${environment.baseUrl}/compare-courses-semesters`, {
      course_id_one,
      course_id_two,
      semester_id_one,
      semester_id_two,
    });
  }
}
