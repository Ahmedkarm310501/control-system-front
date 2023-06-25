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
  checkbox: boolean = false;

  message: string;
  type: string;
  ngOnInit(): void {
    this.configureSemester.Semester().subscribe(
      (res) => {
        this.allData = res.data;

        this.courses = this.allData.courses;

        this.departments = this.allData.departments;

        this.semester = this.allData.newestSemester;

        this.coursesInSemester = this.allData.coursesInSemester;
        this.initalCoursesInSemester = this.coursesInSemester.slice();

        this.filteredData = this.courses;
        this.selectedCourses = this.coursesInSemester;
      },
      (err) => {}
    );
    // reset checkbox input to false if the courses array is empty

    // check if course is in courseInSemester array then it should not appear in courses array
    // this.courses = this.courses.filter((item: any) => {
    //   return !this.coursesInSemester.some((item2: any) => {
    //     return item.id === item2.id;
    //   });
    // });
  }

  move() {
    this.coursesInSemester = this.coursesInSemester.concat(
      this.filteredData.filter((item) => item.checked)
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
    // this.filteredData = this.courses;
    this.filteredData = this.filteredData.filter((item: any) => {
      return !this.coursesInSemester.some((item2: any) => {
        return item.id === item2.id;
      });
    });
    this.selectedCourses = this.coursesInSemester;

    this.checkbox = false;
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

    this.checkbox = false;
  }
  // filter by department
  onSelectDepartment(event: any) {
    if (event.target.value == 'all') {
      this.filteredData = this.courses;
      return;
    }
    const id = event.target.value;

    this.filteredData = this.courses.filter(
      (item: any) => item.department_id == id
    );
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
    const data = this.coursesInSemester.map((item: any) => item.id);
    this.configureSemester.SaveSemester(data).subscribe(
      (res) => {
        this.message = 'Semester configured successfully';
        this.type = 'success';
        this.snackbar.show();
      },
      (err) => {
        this.message = 'Something went wrong';
        this.type = 'failed';
        this.snackbar.show();
      }
    );
  }
  selectAll() {
    // const allSelected = this.filteredData.every((item) => item.checked);

    this.filteredData = this.filteredData.map((item) => {
      return {
        ...item,
        checked: !this.checkbox,
      };
    });
    // this.filteredData = this.courses;
  }
}
