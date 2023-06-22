import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Semester {
  id: number;
  year: number;
  term: number;
}
interface Res {
  data: Semester[];
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class AddSemesterService {
  constructor(private http: HttpClient) {}

  addSemester(term: number, year: number) {
    return this.http.post<Res>(`${environment.baseUrl}/add-semester`, {
      term,
      year,
    });
  }
}
