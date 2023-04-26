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
  providedIn: 'root'
})
export class AllCoursesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCourses() {
    return this.http.get<Res>(`${environment.baseUrl}/list-courses`);
  }
}
