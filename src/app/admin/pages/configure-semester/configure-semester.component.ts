import { Component, OnInit, ViewChild } from '@angular/core';
import { AllCoursesService } from '../all-courses/all-courses.service';
import { ConfigureSemesterService } from './configure-semester.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-configure-semester',
  templateUrl: './configure-semester.component.html',
  styleUrls: ['./configure-semester.component.css'],
})
export class ConfigureSemesterComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;

  constructor(private configureSemester: ConfigureSemesterService) {}
  courses: any = [];
  allData: any = [];
  filteredData: any;
  departments: any = [];
  semester: any = [];
  coursesInSemester: any = [];
  selectedCourses = [];

  initalCoursesInSemester: any = [];

  message: string;
  type: string;
  ngOnInit(): void {
    this.configureSemester.Semester().subscribe(
      (res) => {
        this.allData = res.data;
        console.log(this.allData);

        this.courses = this.allData.courses;
        console.log(this.courses);

        this.departments = this.allData.departments;
        console.log(this.departments);

        this.semester = this.allData.newestSemester;
        console.log(this.semester);

        this.coursesInSemester = this.allData.coursesInSemester;
        console.log(this.coursesInSemester);
        this.initalCoursesInSemester = this.coursesInSemester.slice();

        this.filteredData = this.courses;
        this.selectedCourses = this.coursesInSemester;
      },
      (err) => {
        console.log(err);
      }
    );

    // check if course is in courseInSemester array then it should not appear in courses array
    // this.courses = this.courses.filter((item: any) => {
    //   return !this.coursesInSemester.some((item2: any) => {
    //     return item.id === item2.id;
    //   });
    // });
  }

  move() {
    this.coursesInSemester = this.coursesInSemester.concat(
      this.courses.filter((item) => item.checked)
    );
    this.coursesInSemester = this.coursesInSemester.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });

    this.courses = this.courses.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });

    this.courses = this.courses.filter((item) => !item.checked);
    // when moving course from courses to selectedCourses, it should not appear in courses array
    this.courses = this.courses.filter((item: any) => {
      return !this.coursesInSemester.some((item2: any) => {
        return item.id === item2.id;
      });
    });
    this.filteredData = this.courses;
    this.selectedCourses = this.coursesInSemester;
    console.log('move function');
    console.log(this.selectedCourses);
    console.log(this.filteredData);
  }
  moveBack() {
    this.courses = this.courses.concat(
      this.selectedCourses.filter((item) => item.checked)
    );
    this.courses = this.courses.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    this.selectedCourses = this.selectedCourses.filter((item) => !item.checked);
    // when moving course from courses to selectedCourses, it should not appear in courses array
    this.coursesInSemester = this.coursesInSemester.filter((item: any) => {
      return !this.courses.some((item2: any) => {
        return item.id === item2.id;
      });
    });
    this.filteredData = this.courses;
    this.selectedCourses = this.coursesInSemester;
    this.courses.checked = false;
    console.log('moveback function');
    console.log(this.selectedCourses);
    console.log(this.filteredData);
  }
  // filter by department
  onSelectDepartment(event: any) {
    if (event.target.value == 'all') {
      this.filteredData = this.courses;
      return;
    }
    const id = event.target.value;
    console.log(id);
    this.filteredData = this.courses.filter(
      (item: any) => item.department_id == id
    );
    console.log(this.filteredData);
  }
  // search by course name
  search(event: any) {
    if (event.target.value === null || event.target.value === '') {
      this.filteredData = this.courses;
      return;
    }

    const value = event.target.value.toLowerCase();
    this.filteredData = this.courses.filter((item) =>
      item.name.toLowerCase().includes(value)
    );

    if (event.target.value === null || event.target.value === '') {
      this.selectedCourses = this.selectedCourses;
      return;
    }

    const value2 = event.target.value.toLowerCase();
    this.selectedCourses = this.selectedCourses.filter((item) =>
      item.name.toLowerCase().includes(value2)
    );
  }

  // save semester
  saveSemester() {
    // if (this.selectedCourses.length == 0) {
    //   this.message = 'Please select course';
    //   this.type = 'failed';
    //   this.snackbar.show();
    //   return;
    // }

    // make array of course ids
    //  check if all course in initealCoursesInSemester are in coursesInSemester
    // if (
    //   this.initalCoursesInSemester.some((item: any) => {
    //     return !this.coursesInSemester.some((item2: any) => {
    //       return item.id === item2.id;
    //     });
    //   })
    // ) {
    //   // if not then show model hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

    //   return;
    // }

    const data = this.coursesInSemester.map((item: any) => item.id);
    console.log(data);
    this.configureSemester.SaveSemester(data).subscribe(
      (res) => {
        console.log(res);
        this.message = 'Semester configured successfully';
        this.type = 'success';
        this.snackbar.show();
      },
      (err) => {
        console.log(err);
        this.message = 'Something went wrong';
        this.type = 'failed';
        this.snackbar.show();
      }
    );
  }
  selectAll() {
    const allSelected = this.courses.every((item) => item.checked);

    this.courses = this.courses.map((item) => {
      return {
        ...item,
        checked: !allSelected,
      };
    });
    this.filteredData = this.courses;
  }
}
