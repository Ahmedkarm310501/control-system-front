import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddSemesterService } from './add-semester.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-add-semester',
  templateUrl: './add-semester.component.html',
  styleUrls: ['./add-semester.component.css'],
})
export class AddSemesterComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  message: string;
  type: string;
  user_password: string;
  constructor(
    private router: Router,
    private addSemester: AddSemesterService
  ) {}

  ngOnInit(): void {}
  semester: any = [];
  onSubmit(form: any) {
    this.addSemester
      .addSemester(form.term, form.year, this.user_password)
      .subscribe(
        (res) => {
          this.semester = res.data;
          this.message = 'Semester Added Successfully';
          this.type = 'success';

          this.snackbar.show();
          setTimeout(() => {
            this.router.navigate(['/configure-semester']);
          }, 2000);
        },
        (err) => {
          // console.log(err);
          this.message = err.error.error;
          this.type = 'failed';
          this.snackbar.show();
        }
      );
    console.log('Form Submitted!');
    // navigate to configure semester page
    // this.router.navigate(['/configure-semester']);
  }
}
