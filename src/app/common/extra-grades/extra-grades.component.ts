import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extra-grades',
  templateUrl: './extra-grades.component.html',
  styleUrls: ['./extra-grades.component.css'],
})
export class ExtraGradesComponent implements OnInit {
  courses: any = [];
  filteredData: any = [];
  semester: any;
  pie: any = [];
  bar: any = [];
  graphOne: any;
  graphTwo: any;
  show: boolean = false;
  message: string;
  type: string;

  constructor() {}

  ngOnInit(): void {}
  getGraphs(event: any) {
    const course_id = event.target.value;

    // this.courseDashboardService.graphOne(course_id, this.semester.id).subscribe(
    //   (res) => {
    //     this.graphOne = res.data;
    //     console.log(this.semester.id);
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    // this.courseDashboardService.graphTwo(course_id, this.semester.id).subscribe(
    //   (res) => {
    //     this.show = false;
    //     this.graphTwo = res.data;
    //     console.log(this.graphTwo);
    //     this.pie = [
    //       this.graphTwo.perecentage_passed,
    //       this.graphTwo.perecentage_failed,
    //     ];
    //     this.bar = [
    //       this.graphTwo.grade_A,
    //       this.graphTwo.grade_A_plus,
    //       this.graphTwo.grade_B,
    //       this.graphTwo.grade_B_plus,
    //       this.graphTwo.grade_C,
    //       this.graphTwo.grade_C_plus,
    //       this.graphTwo.grade_D,
    //       this.graphTwo.grade_D_plus,
    //       this.graphTwo.grade_F,
    //     ];
    //     console.log(this.pie);
    //     console.log(this.bar);
    //     this.show = true;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
  getFlooredAverageGrade() {
    return Math.floor(this.graphOne.average_grade);
  }
}
