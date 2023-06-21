import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminLogService {
  constructor(private http: HttpClient) {}

  getAdminLog() {
    return this.http.get(`${environment.baseUrl}/get-logs`);
  }
  downloadLog(file: any) {
    return this.http.get<Blob>(`${environment.baseUrl}/get-file${file}`, {
      observe: 'response',
      responseType: 'blob' as 'json',
    });
  }
}
