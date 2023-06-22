import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddDepartmentService {
  constructor(private http: HttpClient) {}

  addDepartment(name: string, dept_code: string) {
    return this.http.post(`${environment.baseUrl}/add-department`, {
      name,
      dept_code,
    });
  }
}
