import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { AddDepartmentService } from './add-department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  message: string;
  type: string;
  name = '';
  dept_code = '';
  constructor(
    private router: Router,
    private addDepartmentService: AddDepartmentService
  ) {}

  ngOnInit(): void {}

  onSubmit(name: string, dept_code: string) {
    this.addDepartmentService
      .addDepartment(this.name, this.dept_code)
      .subscribe(
        (res) => {
          this.message = 'Department Added Successfully';
          this.type = 'success';
          this.snackbar.show();
          setTimeout(() => {
            this.router.navigate(['/all-departments']);
          }, 2000);
        },
        (err) => {
          this.message = 'Department Added Failed';
          this.type = 'danger';
          this.snackbar.show();
        }
      );
  }
}
