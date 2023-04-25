import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  


  
}
