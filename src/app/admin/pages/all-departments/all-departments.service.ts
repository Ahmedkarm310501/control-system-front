import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

type res = {
  data: [
    {
      department_id: number;
      name: string;
      dept_code: string;
    }
  ];
  message: string;
};
@Injectable({
  providedIn: 'root',
})
export class AllDepartmentsService {
  constructor(private http: HttpClient) {}

  deleteDepartment(id: number) {
    return this.http.delete(`${environment.baseUrl}/delete-department/${id}`);
  }

  editDepartment(department_id: number, name: string, dept_code: string) {
    return this.http.post<res>(`${environment.baseUrl}/edit-department`, {
      department_id,
      name,
      dept_code,
    });
  }
}
