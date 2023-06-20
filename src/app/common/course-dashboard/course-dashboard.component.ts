import { Component, OnInit } from '@angular/core';
import { CourseDashboardService } from './course-dashboard.service';
import { ConfigureSemesterService } from '../../admin/pages/configure-semester/configure-semester.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css'],
})
export class CourseDashboardComponent implements OnInit {
  selectedDepartment: any = null;
  selectedCourse: any = null;
  show: boolean = false;
  message: string;
  type: string;

  constructor(
    private courseDashboardService: CourseDashboardService,
    private configureSemester: ConfigureSemesterService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  departments: any = [];
  courses: any = [];
  filteredData: any = [];
  semester: any;
  pie: any = [];
  bar: any = [];
  courseId: any;
  ngOnInit(): void {
    this.courseDashboardService.getDepartments().subscribe((res) => {
      this.departments = res.data;
      console.log(this.departments);
    });
    this.courseDashboardService.getCourses().subscribe((res) => {
      this.courses = res.data;
      console.log(this.courses);
    });
    this.configureSemester.getCurrentSemester().subscribe(
      (res) => {
        this.semester = res.data;
        console.log(this.semester);
        console.log(this.semester.id);
      },
      (err) => {
        console.log(err);
        // this.message = err.error.message;
        // this.type = 'failed';
      }
    );
  }

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
  graphOne: any;
  graphTwo: any;
  getGraphs(event: any) {
    const course_id = event.target.value;
    this.courseId = course_id.toString();
    this.courseDashboardService.graphOne(course_id, this.semester.id).subscribe(
      (res) => {
        this.graphOne = res.data;

        console.log(this.courseId);
        console.log(this.semester.id);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.courseDashboardService.graphTwo(course_id).subscribe(
      (res) => {
        this.show = false;
        this.graphTwo = res.data;
        console.log(this.graphTwo);
        this.pie = [
          this.graphTwo.perecentage_passed,
          this.graphTwo.perecentage_failed,
        ];
        this.bar = [
          this.graphTwo.grade_F,
          this.graphTwo.grade_D,
          this.graphTwo.grade_D_plus,
          this.graphTwo.grade_C,
          this.graphTwo.grade_C_plus,
          this.graphTwo.grade_B,
          this.graphTwo.grade_B_plus,
          this.graphTwo.grade_A,
          this.graphTwo.grade_A_plus,
        ];
        console.log(this.pie);
        console.log(this.bar);
        this.show = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getFlooredAverageGrade() {
    return Math.floor(this.graphOne.average_grade);
  }
}
