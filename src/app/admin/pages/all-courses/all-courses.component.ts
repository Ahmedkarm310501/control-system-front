import { Component, OnInit } from '@angular/core';
import { AllCoursesService } from './all-courses.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
})
export class AllCoursesComponent implements OnInit {
  constructor(private allCourses: AllCoursesService) {}

  isLoading: boolean = true;
  courses: any = [];

  ngOnInit(): void {
    this.allCourses.getAllCourses().subscribe(
      (res) => {
        console.log(res);
        this.courses = res.data;
        this.filteredData = this.courses;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // getAllCourses() {
  //   this.allCourses.getAllCourses().subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.courses = res.data;
  //       this.filteredData = this.courses;
  //       this.isLoading = false;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  filteredData: any = this.courses;

  search(search: string) {
    this.filteredData = this.courses.filter((dummyData) => {
      return (
        dummyData.name.toLowerCase().includes(search.toLowerCase()) ||
        dummyData.course_code.toLowerCase().includes(search.toLowerCase()) ||
        dummyData.id.toString().includes(search)
      );
    });
  }
  sortOrder = 1;

  sortBy(property: string) {
    this.sortOrder = this.sortOrder * -1;
    this.filteredData.sort(
      (
        a: { [x: string]: { toLowerCase: () => number } },
        b: { [x: string]: { toLowerCase: () => number } }
      ) =>
        (a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1) *
        this.sortOrder
    );
  }
}
