import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css'],
})
export class CourseDashboardComponent implements OnInit {
  selectedDepartment: any = null;
  selectedCourse: any = null;

  constructor() {}

  ngOnInit(): void {}

  onDepartmentSelected() {
    // console.log(department);
    // this.selectedCourse = department;
  }

  onCourseSelected() {
    // this.selectedCourse = course;
  }
}
