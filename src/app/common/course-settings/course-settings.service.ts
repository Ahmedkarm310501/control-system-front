import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Course } from '../home-screen/home.service';
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

interface Res {
  data: Course[];
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseSettingsService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getCourseData(courseId: string) {
    return this.http.get<ResponseData>(`${this.baseUrl}/courses/${courseId}`);
  }

  editCourseData(
    course_id: string,
    semester_id: string,
    course_code: string,
    course_name: string,
    dept_code: string,
    instructor: string,
    term_work: number,
    exam_work: number,
    total: number
  ) {
    return this.http.post(`${this.baseUrl}/edit-course`, {
      course_id: course_id,
      semester_id: semester_id,
      course_code: course_code,
      course_name: course_name,
      dept_code: dept_code,
      instructor: instructor,
      term_work: term_work,
      exam_work: exam_work,
      total: total,
    });
  }
  getAllDepartments() {
    return this.http.get<Res>(`${environment.baseUrl}/departments`);
  }
}
