import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css']
})
export class CourseSettingsComponent implements OnInit {

  // Form Controls
  
  onSubmit(form: any) {
    console.log(form);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
