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

  constructor(
    private allCourses: AllCoursesService,
    private configureSemester: ConfigureSemesterService
  ) {}
  courses: any = [];
  filteredData: any;
  departments: any = [];
  semester: any = [];
  message: string;
  type: string;

  ngOnInit(): void {
    // display all courses
    this.allCourses.getAllCourses().subscribe(
      (res) => {
        console.log(res);

        this.courses = res.data.map((item: any) => {
          return {
            ...item,
            checked: false,
          };
        });
        this.filteredData = this.courses;
      },
      (err) => {
        console.log(err);
      }
    );
    this.configureSemester.getAllDepartments().subscribe((res) => {
      this.departments = res.data;
      console.log(this.departments);
    });

    this.configureSemester.getCurrentSemester().subscribe(
      (res) => {
        this.semester = res.data;

        console.log(this.semester);
      },
      (err) => {
        console.log(err);
      }
    );

    // this.configureSemester
    //   .getCoursesInSemester(this.semester.id)
    //   .subscribe(
    //     (res) => {
    //       console.log(this.semester.id);
    //       console.log(res);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );  need to be done
  }

  selectedCourses = [];

  move() {
    if (this.selectedCourses.length == 0) {
      this.message = 'Please select course';
      this.type = 'error';
      this.snackbar.show();
      return;
    }
    this.selectedCourses = this.selectedCourses.concat(
      this.courses.filter((item) => item.checked)
    );
    this.selectedCourses = this.selectedCourses.map((item) => {
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
    this.filteredData = this.courses;
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
    this.filteredData = this.courses;
    this.courses.checked = false;
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
      (item: any) => item.department.dept_code == id
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
    const data = this.selectedCourses.map((item: any) => item.id);
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

    // console.log(this.selectedCourses);
  }
  selectAll() {
    this.courses = this.courses.map((item) => {
      return {
        ...item,
        checked: !item.checked,
      };
    });
    this.filteredData = this.courses;
  }
}
