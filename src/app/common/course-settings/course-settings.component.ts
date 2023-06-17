import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CourseSettingsService } from './course-settings.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css'],
})
export class CourseSettingsComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  message: string;
  type: string;
  constructor(
    private route: ActivatedRoute,
    private courseSettingsService: CourseSettingsService
  ) {}
  course_id = this.route.snapshot.paramMap.get('courseId');
  semester_id = this.route.snapshot.paramMap.get('termId');
  course_name: string;
  course_code: string;
  dept_code: string = '';
  instructor: string;
  term_work: number;
  exam_work: number;
  total: number;
  departments: any = [];
  ngOnInit(): void {
    this.courseSettingsService.getCourseData(this.course_id).subscribe(
      (data) => {
        this.course_code = data.data.courseID;
        this.course_name = data.data.courseName;
        this.dept_code = data.data.department;
        this.instructor = data.data.instructor;
        this.term_work = data.data.termWork;
        this.exam_work = data.data.examWork;
        this.total = data.data.totalGrade;
      },
      (err) => {
        this.message = err.error.message;
        this.type = 'failed';
        console.log(err);
        this.snackbar.show();
      }
    );
    this.courseSettingsService.getAllDepartments().subscribe((res) => {
      this.departments = res.data;
      console.log(this.departments);
    });
  }
  onSubmit(form: any) {
    console.log(form);
    this.courseSettingsService
      .editCourseData(
        this.course_id,
        this.semester_id,
        form.course_code,
        form.course_name,
        form.dept_code,
        form.instructor,
        form.term_work,
        form.exam_work,
        form.total
      )
      .subscribe(
        (res) => {
          this.message = 'Course Updated Successfully';
          this.type = 'success';
          console.log(res);
          this.snackbar.show();
        },
        (err) => {
          this.message = err.error.message;
          this.type = 'failed';
          console.log(err);
          this.snackbar.show();
        }
      );
  }
}
