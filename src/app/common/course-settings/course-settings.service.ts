import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
type ResponseData = {
  message: string;
  data: {
    courseID: string;
    courseName: string;
    department: string;
    instructor: string;
    termWork: number;
    examWork: number;
    totalGrade: number;
  };
};
@Injectable({
  providedIn: 'root',
})
export class CourseSettingsService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getCourseData(courseId: string) {
    return this.http.get<ResponseData>(`${this.baseUrl}/courses/${courseId}`);
  }
}
