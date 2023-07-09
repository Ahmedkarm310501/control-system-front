import { Component, OnInit, ViewChild } from '@angular/core';
import { Course, HomeService } from './home.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { AllCoursesService } from 'src/app/admin/pages/all-courses/all-courses.service';
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
})
export class HomeScreenComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;

  constructor(
    private home: HomeService,
    private allCourses: AllCoursesService
  ) {}
  Courses: Course[];
  filterCourses: Course[];
  departments: any = [];
  noCorseFound = false;
  isLoading: boolean = true;
  message: string;
  type: string;
  ngOnInit(): void {
    this.noCorseFound = false;

    this.home.getHomeData().subscribe(
      (res) => {
        this.filterCourses = res.data;
        this.Courses = res.data;
        if (this.Courses.length == 0) {
          this.noCorseFound = true;
        }
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
        this.message = err.error.message;
        this.type = 'failed';
        this.snackbar.show();
      }
    );

    this.allCourses.getAllDepartments().subscribe(
      (res) => {
        this.departments = res.data;
      },
      (err) => {}
    );
  }

  // filteredCourses: Course[];

  searchCourse(searchTerm: string) {
    this.filterCourses = this.Courses.filter((course) => {
      return (
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.course_code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }
  onSelectDepartment(event: any) {
    if (event.target.value == 'all') {
      this.filterCourses = this.Courses;
      return;
    }
    const id = event.target.value;
    this.filterCourses = this.Courses.filter(
      (item: any) => item.dept_code == id
    );
  }
}
