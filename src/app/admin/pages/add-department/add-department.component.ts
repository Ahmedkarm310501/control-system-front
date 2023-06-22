import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  message: string;
  type: string;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: any) {
    console.log('Form Submitted!');
    // navigate to configure semester page
    this.message = 'Department Added Successfully';
    this.type = 'success';
    this.snackbar.show();
    setTimeout(() => {
      this.router.navigate(['/configure-department']);
    }, 2000);
  }
}
