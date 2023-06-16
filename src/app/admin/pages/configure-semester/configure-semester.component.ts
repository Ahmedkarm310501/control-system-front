import { Component, OnInit } from '@angular/core';
import { AllCoursesService } from '../all-courses/all-courses.service';
import { ConfigureSemesterService } from './configure-semester.service';

@Component({
  selector: 'app-configure-semester',
  templateUrl: './configure-semester.component.html',
  styleUrls: ['./configure-semester.component.css'],
})
export class ConfigureSemesterComponent implements OnInit {
  constructor(
    private allCourses: AllCoursesService,
    private configureSemester: ConfigureSemesterService
  ) {}
  courses: any = [];
  filteredData: any;
  departments: any = [];
  semester: any = [];

  ngOnInit(): void {
    // display all courses
    this.allCourses.getAllCourses().subscribe(
      (res) => {
        console.log(res);

        this.courses = res.data.map((item: any) => {
          return {
            ...item,
            checked: false,
          };
        });
        this.filteredData = this.courses;
      },
      (err) => {
        console.log(err);
      }
    );
    this.configureSemester.getAllDepartments().subscribe((res) => {
      this.departments = res.data;
      console.log(this.departments);
    });

    this.configureSemester.getCurrentSemester().subscribe((res) => {
      this.semester = res.data;
      console.log(this.semester);
    }, err => {
      console.log(err);
    }
    );

      
  }

  selectedCourses = [];

  move() {
    this.selectedCourses = this.selectedCourses.concat(
      this.courses.filter((item) => item.checked)
    );

    // this.selectedCourses = this.courses.filter(
    //   (item) => item.checked
    // );
    this.courses = this.courses.filter((item) => !item.checked);
    this.filteredData = this.courses;
  }
  moveBack() {
    this.courses = this.courses.concat(
      this.selectedCourses.filter((item) => item.checked)
    );
    this.selectedCourses = this.selectedCourses.filter((item) => !item.checked);
    this.filteredData = this.courses;
  }
  // filter by department
  onSelectDepartment(event: any) {
    if (event.target.value == 'all') {
      this.filteredData = this.courses;
      return;
    }
    const id = event.target.value;
    console.log(id);
    this.filteredData = this.courses.filter(
      (item: any) => item.department.dept_code == id
    );
    console.log(this.filteredData);
  }
  // search by course name
  search(event: any) {
    if (event.target.value === null || event.target.value === '') {
      this.filteredData = this.courses;
      return;
    }

    const value = event.target.value.toLowerCase();
    this.filteredData = this.courses.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
  }
}
