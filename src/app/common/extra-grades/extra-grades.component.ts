import { Component, OnInit } from '@angular/core';
import { CourseDashboardService } from '../course-dashboard/course-dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigureSemesterService } from '../../admin/pages/configure-semester/configure-semester.service';

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

  constructor(
    private courseDashboardService: CourseDashboardService,
    private route: ActivatedRoute,
    private configureSemester: ConfigureSemesterService
  ) {}

  ngOnInit(): void {
    console.log(this.courseId);

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
  showSaveCancelButtons() {
    this.show = false;
  }
}
