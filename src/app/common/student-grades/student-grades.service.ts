import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
type response = {
  student_name: string;
  data: [
    {
      course_name: string;
      exam_work: string;
      grade: string;
      term_work: string;
      semester_term: string;
      semester_year: string;
    }
  ];
};
@Injectable({
  providedIn: 'root',
})
export class StudentGradesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getStudentGrades(student_id: string) {
    return this.http.post<response>(this.baseUrl + '/student-courses', {
      student_id: student_id,
    });
  }
}
