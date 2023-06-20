import { Component, OnInit, OnChanges } from '@angular/core';
import { CourseDashboardService } from '../course-dashboard/course-dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigureSemesterService } from '../../admin/pages/configure-semester/configure-semester.service';
import { ExtraGradesService } from './extra-grades.service';
import { GradeService } from '../course-grades/grade.service';
@Component({
  selector: 'app-extra-grades',
  templateUrl: './extra-grades.component.html',
  styleUrls: ['./extra-grades.component.css'],
})
export class ExtraGradesComponent implements OnInit {
  courses: any = [];
  filteredData: any = [];
  pie: any = [];
  bar: any = [];
  graphOne: any;
  graphTwo: any;
  show: boolean = true;
  message: string;
  type: string;
  courseId = this.route.snapshot.paramMap.get('courseId');
  semester: any;
  isLoading: boolean = true;
  courseID: any;
  courseName: string;
  deptName: string;
  instructor: string;
  constructor(
    private courseDashboardService: CourseDashboardService,
    private route: ActivatedRoute,
    private configureSemester: ConfigureSemesterService,
    private extra: ExtraGradesService,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    console.log(this.courseId);
    this.gradeService.getCourseData(this.courseId).subscribe((res) => {
      this.courseID = res.data.courseID;
      this.courseName = res.data.courseName;
      this.deptName = res.data.deptName;
      this.instructor = res.data.instructor;
    });

    this.courseDashboardService.graphTwo(+this.courseId).subscribe(
      (res) => {
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
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onInput(event) {
    let extraGrades = event.target.value;
    if (extraGrades === '' || extraGrades === null) {
      return;
    }

    this.extra.addExtraGrades(this.courseId, extraGrades).subscribe((res) => {
      this.message = res.message;
      this.pie = [res.data.perecentage_passed, res.data.perecentage_failed];
      this.bar = [
        res.data.grade_F,
        res.data.grade_D,
        res.data.grade_D_plus,
        res.data.grade_C,
        res.data.grade_C_plus,
        res.data.grade_B,
        res.data.grade_B_plus,
        res.data.grade_A,
        res.data.grade_A_plus,
      ];
      this.type = 'success';
      // this.ngOnInit();
    });
  }
  showSaveCancelButtons() {
    this.show = false;
  }
}
