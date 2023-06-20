import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

type RES = {
  message: string;
  data: {
    number_of_passed_students: number;
    number_of_failed_students: number;
    perecentage_passed: number;
    perecentage_failed: number;
    grade_A_plus: number;
    grade_A: number;
    grade_B_plus: number;
    grade_B: number;
    grade_C_plus: number;
    grade_C: number;
    grade_D_plus: number;
    grade_D: number;
    grade_F: number;
  };
};
@Injectable({
  providedIn: 'root',
})
export class ExtraGradesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  addExtraGrades(courseId: string, numberOfGrades: number) {
    return this.http.post<RES>(`${this.baseUrl}/raafa-grades`, {
      course_id: courseId,
      number_of_grades: numberOfGrades,
    });
  }
}
