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
  isLoading: boolean = false;
  need_one_grade: any;
  need_two_grade: any;
  need_three_grade: any;
  need_four_grade: any;
  need_five_grade: any;

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
  line: any = [];
  courseId: any;
  ngOnInit(): void {
    this.courseDashboardService.getDepartments().subscribe((res) => {
      this.departments = res.data;
    });
    this.courseDashboardService.getCourses().subscribe((res) => {
      this.courses = res.data;
    });
    this.configureSemester.getCurrentSemester().subscribe(
      (res) => {
        this.semester = res.data;
      },
      (err) => {
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
    this.filteredData = this.courses.filter(
      (item: any) => item.department.dept_code == id
    );
  }
  graphOne: any;
  graphTwo: any;
  graphThree: any;
  getGraphs(event: any) {
    const course_id = event.target.value;
    this.isLoading = true;
    this.courseId = course_id.toString();
    this.courseDashboardService.graphOne(course_id, this.semester.id).subscribe(
      (res) => {
        this.graphOne = res.data;

        // this.show = true;
        this.isLoading = false;
      },
      (err) => {}
    );
    ////////////////////////////////////////
    this.courseDashboardService.graphTwo(course_id).subscribe(
      (res) => {
        // this.show = false;
        this.graphTwo = res.data;
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

        // this.show = true;
      },
      (err) => {}
    );
    //////////////////////////////////////
    this.courseDashboardService.graphThree(course_id).subscribe(
      (res) => {
        this.show = false;
        this.graphThree = res.data;
        this.need_one_grade = this.graphThree.need_one_grade;
        this.need_two_grade = this.graphThree.need_two_grade;
        this.need_three_grade = this.graphThree.need_three_grade;
        this.need_four_grade = this.graphThree.need_four_grade;
        this.need_five_grade = this.graphThree.need_five_grade;

        this.line = [
          this.graphThree.number_of_students_40,
          this.graphThree.number_of_students_41,
          this.graphThree.number_of_students_42,
          this.graphThree.number_of_students_43,
          this.graphThree.number_of_students_44,
          this.graphThree.number_of_students_45,
          this.graphThree.number_of_students_46,
          this.graphThree.number_of_students_47,
          this.graphThree.number_of_students_48,
          this.graphThree.number_of_students_49,
        ];
        this.show = true;
        this.isLoading = false;
      },
      (err) => {}
    );
  }
  getFlooredAverageGrade() {
    return Math.floor(this.graphOne.average_grade);
  }
}
