import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { StudentGradesService } from './student-grades.service';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css'],
})
export class StudentGradesComponent implements OnInit {
  filteredData: [
    {
      course_name: string;
      exam_work: string;
      grade: string;
      term_work: string;
      semester_term: string;
      semester_year: string;
    }
  ];
  isLoading = true;
  message: any;
  type: any;

  student_name: string;
  constructor(private stu: StudentGradesService) {}

  ngOnInit(): void {}

  search(student_id: string) {
    this.stu.getStudentGrades(student_id).subscribe((res: any) => {
      console.log(res);
      this.filteredData = res.data.courses;
      console.log(this.filteredData);
      this.student_name = res.data.student_name;
    });
  }
}
