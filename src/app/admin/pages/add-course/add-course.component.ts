import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddCourseService } from './add-course.service';
import { CourseDashboardService } from 'src/app/common/course-dashboard/course-dashboard.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  message: string;
  type: string;
  constructor(
    private router: Router,
    private addCourseService: AddCourseService,
    private courseDashboardService: CourseDashboardService
  ) {}

  ngOnInit(): void {
    this.courseDashboardService.getDepartments().subscribe(
      (res) => {
        console.log(res);
        this.departments = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  departments: any;

  onSubmit(form: any) {
    this.addCourseService
      .addCourse(form.course_name, form.course_code, form.dept_code)
      .subscribe(
        (res) => {
          this.message = 'Course Added Successfully';
          this.type = 'success';
          console.log(res);
          console.log(form);
          this.snackbar.show();
          setTimeout(() => {
            this.router.navigate(['/all-courses']);
          }, 2000);
        },
        (err) => {
          this.message = err.error.message;
          this.type = 'failed';
          this.snackbar.show();
        }
      );
  }
}
