import { Component, OnInit, ViewChild } from '@angular/core';
import { AllCoursesService } from './all-courses.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
})
export class AllCoursesComponent implements OnInit {
  @ViewChild(SnackbarComponent) snackbar: SnackbarComponent;
  constructor(private allCourses: AllCoursesService) {}

  isLoading: boolean = true;
  courses: any = [];
  departments: any = [];
  dep_id: any;
  type: any;
  message: any;
  ngOnInit(): void {
    this.allCourses.getAllCourses().subscribe(
      (res) => {
        this.courses = res.data;
        this.filteredData = this.courses;
        this.isLoading = false;
      },
      (err) => {}
    );
    this.allCourses.getAllDepartments().subscribe(
      (res) => {
        this.departments = res.data;
      },
      (err) => {}
    );
  }
  isShown = false;
  shown() {
    this.isShown = !this.isShown;
  }
  // getAllCourses() {
  //   this.allCourses.getAllCourses().subscribe(
  //     (res) => {
  //       this.courses = res.data;
  //       this.filteredData = this.courses;
  //       this.isLoading = false;
  //     },
  //     (err) => {
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
  //     },
  //     (err) => {
  //     }
  //   );
  // }
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
    if (property === 'id') {
      this.filteredData.sort(
        (a: { id: number }, b: { id: number }) =>
          (a.id > b.id ? 1 : -1) * this.sortOrder
      );
      return;
    }
    this.filteredData.sort(
      (
        a: { [x: string]: { toLowerCase: () => number } },
        b: { [x: string]: { toLowerCase: () => number } }
      ) =>
        (a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1) *
        this.sortOrder
    );
  }

  onUpload(files: FileList) {
    const file = files[0];

    this.isLoading = true;
    this.allCourses.ImportCourses(file).subscribe(
      (res) => {
        this.message = 'Courses Added Successfully';
        this.type = 'success';
        this.snackbar.show();
        this.isLoading = false;

        this.ngOnInit();
      },
      (err) => {
        this.message = err.error.message;
        this.type = 'failed';
        this.snackbar.show();
        this.isLoading = false;
      }
    );
  }
}
