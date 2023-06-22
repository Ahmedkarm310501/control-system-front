import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { CourseDashboardService } from '../course-dashboard/course-dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigureSemesterService } from '../../admin/pages/configure-semester/configure-semester.service';
import { ExtraGradesService } from './extra-grades.service';
import { GradeService } from '../course-grades/grade.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
@Component({
  selector: 'app-extra-grades',
  templateUrl: './extra-grades.component.html',
  styleUrls: ['./extra-grades.component.css'],
})
export class ExtraGradesComponent implements OnInit {
  @ViewChild(SnackbarComponent) snackbar: SnackbarComponent;
  pie: any = [];
  bar: any = [];
  initialPie: any = [];
  initialBar: any = [];
  graphOne: any;
  graphTwo: any;
  show: boolean = true;
  extraGrades: number = 0;
  message: string;
  type: string;
  courseId = this.route.snapshot.paramMap.get('courseId');
  semester: any;
  isLoading: boolean = true;
  courseID: any;
  courseName: string;
  deptName: string;
  instructor: string;
  toAll: boolean = false;

  constructor(
    private courseDashboardService: CourseDashboardService,
    private route: ActivatedRoute,
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
        this.initialPie = this.pie.slice();
        this.initialBar = this.bar.slice();
        console.log(this.pie);
        console.log(this.bar);
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onInput() {
    // this.extraGrades = event.target.value;
    if (
      this.extraGrades === 0 ||
      this.extraGrades === null ||
      this.extraGrades < 0 ||
      this.extraGrades > 20
    ) {
      // this.extraGrades = 0;
      return;
    }

    this.extra
      .addExtraGrades(this.courseId, this.extraGrades, this.toAll)
      .subscribe((res) => {
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

  addGrades() {
    this.extra
      .applyExtraGrades(this.courseId, this.extraGrades, this.toAll)
      .subscribe(
        (res) => {
          this.ngOnInit();
          this.message = 'Extra grades added successfully';
          this.type = 'success';
          this.snackbar.show();
        },
        (err) => {
          this.message = err.error.message;
          this.type = 'danger';
          this.snackbar.show();
        }
      );
  }
  showSaveCancelButtons() {
    this.show = false;
  }

  cancel() {
    this.extraGrades = 0;
    this.toAll = false;
    this.pie = this.initialPie.slice();
    this.bar = this.initialBar.slice();
    console.log(this.toAll);
    console.log(this.extraGrades);
  }
}
