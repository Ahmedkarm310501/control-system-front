import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css'],
})
export class CourseSettingsComponent implements OnInit {
  onSubmit(form: any) {
    console.log(form);
  }

  constructor() {}

  ngOnInit(): void {}
  courseID = 'IS123';
  courseNamee = 'Intro to Database Systems';
  termWorkk = 40;
  examWorkk = 60;
  departmentt = 'IS';
  instructorr = 'Ali Zidane';
  creditss = 3;
  raafaa = 2;
}
