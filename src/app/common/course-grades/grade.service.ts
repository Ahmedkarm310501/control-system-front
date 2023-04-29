import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  // function to calculate grade for each student and return the grade

  getCourseGrades(courseId: string) {
    return this.http.get(`${this.baseUrl}/courses/${courseId}`);
  }

  calculateGrade(total: number) {
    if (total >= 90) {
      return 'A+';
    } else if (total >= 85) {
      return 'A';
    } else if (total >= 80) {
      return 'B+';
    } else if (total >= 75) {
      return 'B';
    } else if (total >= 70) {
      return 'C+';
    } else if (total >= 65) {
      return 'C';
    } else if (total >= 60) {
      return 'D+';
    } else if (total >= 50) {
      return 'D';
    } else {
      return 'F';
    }
  }
}
