import { Component, OnInit } from '@angular/core';
import { Course, HomeService } from './home.service';
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
})
export class HomeScreenComponent implements OnInit {
  constructor(private home: HomeService) {}
  Courses: Course[];
  filterCourses: Course[];
  noCorseFound = false;

  ngOnInit(): void {
    this.noCorseFound = false;
    //console.log(this.Courses.length);
    this.home.getHomeData().subscribe((res) => {
      this.filterCourses = res.data;
      this.Courses = res.data;
      if (this.Courses.length == 0) {
        this.noCorseFound = true;
        console.log('No courses found');
      }
    });
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
