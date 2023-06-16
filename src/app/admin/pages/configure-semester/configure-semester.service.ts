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
  year: number;
  term: number;
}
@Injectable({
  providedIn: 'root',
})
export class ConfigureSemesterService {
  enviroment = environment;
  dummyDataCourses: any = [];


  constructor(private http: HttpClient,
    private allCourses: AllCoursesService) { }

  getAllCourses() {
    return this.http.get(`${environment.baseUrl}/list-courses`);
  }
  getAllDepartments() {
    return this.http.get<Res>(`${environment.baseUrl}/departments`);
  }
  getCurrentSemester() {
    return this.http.get<Res>(`${environment.baseUrl}/current-semester`);
  }
  SaveSemester(data:number []) {
    return this.http.post(`${environment.baseUrl}/semester`, data);
  }
}
