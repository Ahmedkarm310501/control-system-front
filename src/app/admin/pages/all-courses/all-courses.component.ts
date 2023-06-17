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
  departments: any = [];
  dep_id: any;
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
    this.allCourses.getAllDepartments().subscribe(
      (res) => {
        this.departments = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  isShown = false;
  shown() {
    this.isShown = !this.isShown;
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
  // getAllCoursesByDepartment(id: any) {
  //   this.isLoading = true;
  //   this.allCourses.getAllCoursesByDepartment(id).subscribe(
  //     (res) => {
  //       this.courses = res.data;
  //       this.filteredData = this.courses;
  //       this.isLoading = false;
  //       console.log(res);
  //       console.log(this.filteredData);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
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
  onUpload(event: any) {
    // get uploaded file and paste it as an object in console
    console.log(event.target.files[0]);
  }
}
