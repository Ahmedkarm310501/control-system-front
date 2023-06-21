import { Component, OnInit } from '@angular/core';
import { CourseDashboardService } from '../course-dashboard/course-dashboard.service';
import { CompareCoursesService } from './compare-courses.service';

@Component({
  selector: 'app-compare-courses',
  templateUrl: './compare-courses.component.html',
  styleUrls: ['./compare-courses.component.css'],
})
export class CompareCoursesComponent implements OnInit {
  firstCourseColor: string = 'var(--main-color)';
  secondCourseColor: string = 'var(--box-color)';

  pie1 = 'one';
  pie2 = 'two';

  pieChartData1: any;
  pieChartData2: any;
  barChartData1: any;
  barChartData2: any;
  departments: any = [];
  courses: any = [];
  show: boolean = false;
  selectedDepartment1: any = '0';
  selectedDepartment2: any = '0';
  selectedCourse1: any = '0';
  selectedCourse2: any = '0';
  selectedSemester1: any = '0';
  selectedSemester2: any = '0';
  isLoading = false;

  isLoaded: boolean = false;

  constructor(
    public courseDashboardService: CourseDashboardService,
    public compareCoursesService: CompareCoursesService
  ) {}

  ngOnInit(): void {
    this.courseDashboardService.getDepartments().subscribe((res: any) => {
      this.departments = res.data;
      console.log(this.departments);
    });
    this.courseDashboardService.getCourses().subscribe((res: any) => {
      this.courses = res.data;
      console.log(this.courses);
    });
  }
  semesters1: any = [];
  semesters2: any = [];

  onCourseSelect1(event: any) {
    this.course_id_one = event.target.value;

    this.compareCoursesService.getCourseSemesters(this.course_id_one).subscribe(
      (res: any) => {
        this.semesters1 = res.data;
        console.log(res.data[0]);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  onCourseSelect2(event: any) {
    this.course_id_two = event.target.value;

    this.compareCoursesService.getCourseSemesters(this.course_id_two).subscribe(
      (res: any) => {
        if (res.data.length == 0) {
          this.semesters2 = [];
          return;
        }
        this.semesters2 = res.data;
        console.log(res.data[0]);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  filteredData1: any = [];
  filteredData2: any = [];
  onSelectDepartment1(event: any) {
    if (event.target.value == 'all') {
      this.filteredData1 = this.courses;
      return;
    }
    const id = event.target.value;
    console.log(id);
    this.filteredData1 = this.courses.filter(
      (item: any) => item.department.dept_code == id
    );
    console.log(this.filteredData1);
  }
  onSelectDepartment2(event: any) {
    if (event.target.value == 'all') {
      this.filteredData2 = this.courses;
      return;
    }
    const id = event.target.value;
    console.log(id);
    this.filteredData2 = this.courses.filter(
      (item: any) => item.department.dept_code == id
    );
    console.log(this.filteredData2);
  }

  onSelectSemester1(event: any) {
    this.semester_id_one = event.target.value;
    this.getGraphs();
  }
  onSelectSemester2(event: any) {
    this.semester_id_two = event.target.value;
    this.getGraphs();
  }

  course_id_one: any = null;
  course_id_two: any = null;
  semester_id_one: any = null;
  semester_id_two: any = null;
  // courses_semester_ids: any = [
  //   this.course_id_one,
  //   this.course_id_two,
  //   this.semester_id_one,
  //   this.semester_id_two,
  // ];
  first_graph_one: any = [];
  first_graph_two: any = [];
  second_graph_one: any = [];
  second_graph_two: any = [];
  coursecodes: any;

  getGraphs() {
    if (
      !this.course_id_one &&
      !this.course_id_two &&
      !this.semester_id_one &&
      !this.semester_id_two
    ) {
      return;
    }
    // check if user has selected both semesters
    if (!this.semester_id_one || !this.semester_id_two) {
      return;
    }

    this.isLoading = true;

    this.compareCoursesService
      .compareCourses(
        this.course_id_one,
        this.course_id_two,
        this.semester_id_one,
        this.semester_id_two
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.coursecodes = res.data;

          this.first_graph_one = res.data.first_graph_one;
          this.first_graph_two = res.data.first_graph_two;
          this.second_graph_one = res.data.second_graph_one;
          this.second_graph_two = res.data.second_graph_two;
          console.log(this.first_graph_one);
          console.log(this.first_graph_two);
          console.log(this.second_graph_one);
          console.log(this.second_graph_two);
          // take certain values from the array
          this.barChartData1 = [
            this.second_graph_one.grade_F,
            this.second_graph_one.grade_D_plus,
            this.second_graph_one.grade_D,
            this.second_graph_one.grade_C_plus,
            this.second_graph_one.grade_C,
            this.second_graph_one.grade_B_plus,
            this.second_graph_one.grade_B,
            this.second_graph_one.grade_A_plus,
            this.second_graph_one.grade_A,
          ];
          this.barChartData2 = [
            this.second_graph_two.grade_F,
            this.second_graph_two.grade_D_plus,
            this.second_graph_two.grade_D,
            this.second_graph_two.grade_C_plus,
            this.second_graph_two.grade_C,
            this.second_graph_two.grade_B_plus,
            this.second_graph_two.grade_B,
            this.second_graph_two.grade_A_plus,
            this.second_graph_two.grade_A,
          ];
          this.pieChartData1 = [
            this.first_graph_one.passed_students,
            this.first_graph_one.failed_students,
          ];
          this.pieChartData2 = [
            this.first_graph_two.passed_students,
            this.first_graph_two.failed_students,
          ];
          console.log(this.pieChartData1);
          console.log(this.pieChartData2);
          console.log(this.barChartData1);
          console.log(this.barChartData2);
          this.isLoaded = true;
          this.show = true;
          this.isLoading = false;
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
  getFlooredAverageGrade1() {
    if (!this.first_graph_one.average_grade) {
      return null;
    }
    return Math.floor(this.first_graph_one.average_grade);
  }
  getFlooredAverageGrade2() {
    if (!this.first_graph_two.average_grade) {
      return null;
    }
    return Math.floor(this.first_graph_two.average_grade);
  }
}
