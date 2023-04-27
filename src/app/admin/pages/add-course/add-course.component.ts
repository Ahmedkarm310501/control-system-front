import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AddCourseService } from './add-course.service';
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
    private addCourseService: AddCourseService
  ) {}

  ngOnInit(): void {}
  onSubmit(form: any) {
    this.addCourseService
      .addCourse(form.course_name, form.course_name, form.dept_code)
      .subscribe(
        (res) => {
          this.message = 'Course Added Successfully';
          this.type = 'success';
          console.log(res);
          console.log(form);
          this.snackbar.show();
          setTimeout(() => {
            this.router.navigate(['/courses']);
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
