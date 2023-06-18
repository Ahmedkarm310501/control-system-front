import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AllCoursesService } from '../all-courses/all-courses.service';

interface Course {
  id: number;
  name: string;
  course_code: string;
}
interface Department {
  id: number;
  dept_code: string;
}
interface Res {
  data: Course[];
  message: string;
}
interface Semester {
  id: number;
  year: string;
  term: string;
}
interface Res2 {
  data: Semester;
  message: string;
}
interface Res3 {
  data: Department[];
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigureSemesterService {
  enviroment = environment;
  dummyDataCourses: any = [];

  constructor(
    private http: HttpClient,
    private allCourses: AllCoursesService
  ) {}

  getAllCourses() {
    return this.http.get(`${environment.baseUrl}/list-courses`);
  }
  getAllDepartments() {
    return this.http.get<Res3>(`${environment.baseUrl}/departments`);
  }
  getCurrentSemester() {
    return this.http.get<Res2>(`${environment.baseUrl}/current-semester`);
  }
  // getCoursesInSemester(semester_id: number) {
  //   return this.http.get<Res2>(`${environment.baseUrl}/courses-in-semester/${semester_id}`
  //   );
  // }
  SaveSemester(data: number[]) {
    return this.http.post<Res>(`${environment.baseUrl}/edit-course-semester`, {
      course_ids: data,
    });
  }

  Semester() {
    return this.http.get<Res2>(
      `${environment.baseUrl}/courses-in-semester-merge`
    );
  }
}
