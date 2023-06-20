import { Component, OnInit } from '@angular/core';

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

  pieChartData1: any = [30, 70];
  pieChartData2: any = [50, 50];
  barChartData1: any = [4, 7, 2, 7, 7, 1, 7, 8, 9];
  barChartData2: any = [5, 6, 2, 7, 8, 2, 8, 2, 5];


  constructor() {}

  ngOnInit(): void {}
}
