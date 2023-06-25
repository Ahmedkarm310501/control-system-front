import { Component, OnInit, ViewChild } from '@angular/core';
import { Course, HomeService } from './home.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
})
export class HomeScreenComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;

  constructor(private home: HomeService) {}
  Courses: Course[];
  filterCourses: Course[];
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
}
